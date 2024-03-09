const environment = process.env.NODE_ENV || 'development';
const config = require('../../knexfile.js')[environment];
const {attachPaginate} = require('knex-paginate');

attachPaginate();

const {Model} = require('objection');
const knex = require('knex')(config);
const objectionSoftDelete = require('objection-js-soft-delete');

Model.knex(knex);

/**
 * Define Soft Delete Module
 */
const softDelete = objectionSoftDelete.default({
  columnName: 'deleted_at',
  deletedValue: new Date(),
  notDeletedValue: null,
});

/**
 * @extends Model
 */
class BaseModel extends softDelete(Model) {
  /**
     * create action before insert in database
     */
  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  /**
     * create action before update in database
     */
  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}

module.exports = BaseModel;
