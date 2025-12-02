const { User } = require('../models'); // Feltételezzük, hogy a modellek egy index.js-en keresztül vannak exportálva

/**
 * Új felhasználó létrehozása az adatbázisban.
 * @param {object} userData A felhasználó adatai.
 * @returns {Promise<User>} A létrehozott felhasználó.
 */
const create = (userData) => {
  return User.create(userData);
};

/**
 * Egyedi felhasználó keresése feltétel alapján.
 * @param {object} query A Sequelize keresési feltétele (pl. { where: { email: '...' } }).
 * @returns {Promise<User|null>} A megtalált felhasználó vagy null.
 */
const findOne = (query) => {
  return User.findOne(query);
};

/**
 * Összes felhasználó lekérdezése.
 * @returns {Promise<User[]>} A felhasználók listája.
 */
const findAll = () => {
  return User.findAll();
};

/**
 * Felhasználó keresése azonosító alapján.
 * @param {number} id A felhasználó azonosítója.
 * @returns {Promise<User|null>} A megtalált felhasználó vagy null.
 */
const findById = (id) => {
  return User.findByPk(id);
};

module.exports = {
  create,
  findOne,
  findAll,
  findById,
};