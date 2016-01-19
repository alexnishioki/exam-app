
exports.up = function(knex, Promise) {
  knex.schema.createTable('authors',function(table) {
  	table.increments('id');
  	table.string('author')

  }
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('author')
};
