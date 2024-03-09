/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const tableName = 'credit_card';
exports.up = async function(knex) {
  await knex.schema.createTable(tableName, (table)=> {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('user_id');
    table.string('type');
    table.string('number');
    table.string('name');
    table.string('expired');
    table.string('cvv');

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at');
  });
};


exports.down = async function(knex) {
  await knex.schema.dropTable(tableName);
};
