
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('code').unique();
    table.string('first_name');
    table.string("last_name");
    table.string('email');
    table.string('password');
    table.string("user_type").comment('traveler or business user');
    table.string('business_code');
    table.timestamps();
    table.datetime('deleted_at');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
