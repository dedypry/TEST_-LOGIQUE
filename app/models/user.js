const {Model} = require('objection');
const BaseModel = require('./baseModel');


/**
 * @extends Model
 */
class User extends BaseModel {
  static get tableName() {
    return 'users';
  }

  static get modifiers() {
    /**
     * Return minimum column
     * @param  {any} query
     */
    return {
      list(query) {
        query.select(
            'id as user_id',
            'name',
            'email',
            'address',
            'photos',
        );
      },
    };
  }


  static table = this.tableName;

  /**
   * Define relation
   * @return {Object}
   */
  static relationMappings() {
    const CreditCardModel = require('./creditCard');
    return {
      creditcard: {
        relation: Model.BelongsToOneRelation,
        modelClass: CreditCardModel,
        join: {
          from: 'users.id',
          to: 'credit_card.user_id',
        },
      },
    };
  }
}

module.exports = User;
