const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');

const registerUser = async (userData) => {
  // Jelszó titkosítása bcrypt-tal
  const { email, name, password } = userData;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return userRepository.create({ email, name, password: hashedPassword });
};

const createUser = (userData) => {
  return userRepository.create(userData);
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