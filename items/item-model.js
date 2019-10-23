const db = require('../database/dbConfig.js');

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
};

function find() {
  return db('items');
}

function findById(id) {
  return db('items')
    .where({ id: Number(id) })
    .first();
}

function insert(user) {
  return db('items')
    .insert(user)
    .then(ids => ({ id: ids[0] }));
}

function update(id, user) {
  return db('items')
    .where('id', Number(id))
    .update(user);
}

function remove(id) {
  return db('items')
    .where('id', Number(id))
    .del();
}