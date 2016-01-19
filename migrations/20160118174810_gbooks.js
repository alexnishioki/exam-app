
exports.up = function(knex, Promise) {
  knex.schema.createTable('books',function(table) {
  	table.increments('id');
  	table.string('book')
  	table.genre('genre')
  }
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('books')
};
