const tableName = 'users';
exports.up =async function(knex) {
  await knex.schema.createTable(tableName, (table)=> {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('name', 100).notNullable();
    table.string('address');
    table.string('email').unique().notNullable();
    table.string('password');
    table.json('photos');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at');
  });
};


exports.down = async function(knex) {
  await knex.schema.dropTable(tableName);
};
