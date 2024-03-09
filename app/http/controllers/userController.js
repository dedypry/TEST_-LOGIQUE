const SuccessResult = require('../../utils/SuccessResult');
const userService = require('../services/userService');

async function signUp(req, res) {
  const data = await userService.signUpWithEmail(req.body);
  return SuccessResult.make(res).send(data);
}

async function update(req, res) {
  const data = await userService.update(req.body);
  return SuccessResult.make(res).send(data);
}

async function list(req, res) {
  const data = await userService.listUser(req.query);
  return SuccessResult.make(res).send(data);
}

async function detail(req, res) {
  const data = await userService.userDetail(req.params.user_id);
  return SuccessResult.make(res).send(data);
}

async function login(req, res) {
  const data = await userService.signInWithEmail(req.body);
  return SuccessResult.make(res).sendMessageData(data, 'Berhasil Masuk');
}

async function getUser(req, res) {
  return SuccessResult.make(res).send(req.user);
}

module.exports = {
  signUp,
  list,
  login,
  getUser,
  detail,
  update,
};
