const {DURATION, SHORT_HAND_UNIT} = require('../../enums/jwt');
const DataNotFound = require('../../exceptions/DataNotFound');
const UserModel = require('../../models/user');
const CreditCardModel = require('../../models/creditCard');
const {setToken} = require('../../utils/jwtToken');
const {generatePassword, comparePassword} = require('../../utils/string');
const InvalidData = require('../../exceptions/InvalidData');

async function signUpWithEmail(body) {
  return await UserModel.transaction(async (trx)=>{
    const user = await UserModel.query(trx)
        .insert({
          name: body.name,
          address: body.address,
          email: body.email,
          password: generatePassword(body.password),
          photos: JSON.stringify(body.photos),
        });

    await CreditCardModel.query(trx).insert({
      user_id: user.id,
      type: body.creditcard_type,
      number: body.creditcard_number,
      name: body.creditcard_name,
      expired: body.creditcard_expired,
      cvv: body.creditcard_cvv,
    });

    return {
      user_id: user.id,
    };
  });
}

async function update(body) {
  return await UserModel.transaction(async (trx)=>{
    const user = await UserModel.query(trx)
        .findById(body.user_id);
    if (!user) {
      throw new InvalidData('User not found', 404);
    }
    await user.$query(trx).update({
      name: body.name,
      address: body.address,
      email: body.email,
      password: generatePassword(body.password),
      photos: JSON.stringify(body.photos),
    });

    const creditCard = await CreditCardModel.query(trx).findOne({user_id: user.id});
    const insertCC = {
      user_id: user.id,
      type: body.creditcard_type,
      number: body.creditcard_number,
      name: body.creditcard_name,
      expired: body.creditcard_expired,
      cvv: body.creditcard_cvv,
    };
    if (creditCard) {
      insertCC['id'] = creditCard.id;
    }
    await CreditCardModel.query(trx).upsertGraph(insertCC);
    return {
      success: true,
    };
  });
}

async function listUser(query) {
  const page = query.of ? query.of-1 : 0;
  const orderBy =query.ob || 'name';
  const sb = query.sb || 'desc';
  return await UserModel.query().modify('list')
      .withGraphFetched('creditcard(list)')
      .where((builder)=>{
        if (query.q) {
          builder.where('name', 'ilike', `%${query.q}%`)
              .orWhere('name', 'ilike', `%${query.q}%`);
        }
      })
      .orderBy(orderBy, sb)
      .page(page, query.lt||10);
}

async function userDetail(id) {
  const user = await UserModel.query()
      .modify('list')
      .withGraphFetched('creditcard(list)')
      .findById(id);

  if (!user) {
    throw new InvalidData('User not found.', 404);
  }
  return user;
}

async function signInWithEmail(body) {
  const user = await UserModel.query()
      .findOne({email: body.email});
  if (!user) throw new DataNotFound('Email Not Registered');
  //   compare password
  await comparePassword(user.password, body.password);
  const paramToken = {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    image: user.image,
  };
  return {
    user: paramToken,
    token: setToken(paramToken, {duration: DURATION, shorthandUnit: SHORT_HAND_UNIT}),
  };
}


module.exports ={
  signUpWithEmail,
  signInWithEmail,
  listUser,
  userDetail,
  update,
};
