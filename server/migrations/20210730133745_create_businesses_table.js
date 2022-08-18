
exports.up = function(knex) {
  return knex.schema.createTable('businesses', (table) => {
      table.increments('id');
      table.string('code').unique();
      table.string('business_name');
      table.string('main_user_code');
      table.timestamps();
      table.datetime('deleted_at');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('businesses');
};
