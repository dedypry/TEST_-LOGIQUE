const {raw} = require('objection');
const BaseModel = require('./baseModel');


/**
 * @extends Model
 */
class User extends BaseModel {
  static get tableName() {
    return 'credit_card';
  }

  static get modifiers() {
    /**
     * Return minimum column
     * @param  {any} query
     */
    return {
      list(query) {
        query.select(
            'type',
            raw(`'************' ||RIGHT(number,4)`).as('number'),
            'name',
            'expired',
        );
      },
    };
  }


  static table = this.tableName;
}

module.exports = User;
