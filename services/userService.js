const bcrypt = require('bcrypt');
const userRepository = require('../repositories/userRepository');

const hashPassword = async (password) => {
  const saltRounds = 10; // Ajánlott salt körök száma, 10 jó alapértelmezett
  return bcrypt.hash(password, saltRounds);
};

const registerUser = async (userData) => {
  const { email, name, password } = userData;

  // Ellenőrizzük, hogy létezik-e már felhasználó ezzel az e-mail címmel
  const existingUser = await userRepository.findOne({ where: { email } });
  if (existingUser) {
    const error = new Error('Ez az e-mail cím már regisztrálva van.');
    error.statusCode = 409; // 409 Conflict
    throw error;
  }
  const hashedPassword = await hashPassword(password);
  return userRepository.create({ email, name, password: hashedPassword });
};

const createUser = async (userData) => {
  const { email, name, password } = userData; // Feltételezve, hogy a createUser is tartalmaz jelszót
  const hashedPassword = await hashPassword(password);
  return userRepository.create({ email, name, password: hashedPassword });
};

const getAllUsers = () => {
  return userRepository.findAll();
};

const deleteUser = async (id) => {
  const user = await userRepository.findById(id);

  if (!user) {
    return null;
  }

  await userRepository.destroy(user);
  return user;
};

module.exports = {
  createUser,
  getAllUsers,
  deleteUser,
  registerUser,
};