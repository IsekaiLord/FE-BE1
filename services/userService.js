const bcrypt = require('bcrypt');
const crypto = require('crypto');
const userRepository = require('../repositories/userRepository');

const registerUser = async (userData) => {
  // Jelszó titkosítása bcrypt-tal
  const { email, name, password } = userData;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  // Allow setting isAdmin when provided (useful for local/dev admin creation)
  const isAdmin = userData.isAdmin === true || userData.isAdmin === 'true' ? true : false;
  return userRepository.create({ email, name, password: hashedPassword, isAdmin });
};

// --- MÓDOSÍTÁS KEZDETE ---
const loginUser = async (email, password) => {
  // 1. Felhasználó keresése e-mail alapján
  const user = await userRepository.findOne({ where: { email } });
  if (!user) {
    const error = new Error('Hibás e-mail cím vagy jelszó.');
    error.statusCode = 401; // Unauthorized
    throw error;
  }

  // 2. Jelszó ellenőrzése
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    const error = new Error('Hibás e-mail cím vagy jelszó.');
    error.statusCode = 401; // Unauthorized
    throw error;
  }

  // 3. Token generálása és érvényesség beállítása
  const token = crypto.randomBytes(32).toString('hex');
  const valid_thru = new Date(Date.now() + 10 * 60 * 1000); // 10 perc

  // 4. Felhasználó frissítése az új tokennel
  await userRepository.update(user, { token, valid_thru });

  // 5. Token visszaadása
  return { token };
};
// --- MÓDOSÍTÁS VÉGE ---

const getAllUsers = () => {
  return userRepository.findAll();
};

const deleteUser = async (id) => {
  // Először ellenőrizzük, hogy létezik-e a felhasználó
  const userToDelete = await userRepository.findById(id);
  if (!userToDelete) {
    return null; // Ha nem, null-t adunk vissza, a controller kezeli a 404-et
  }

  await userRepository.deleteById(id);
  return userToDelete; // Visszaadjuk a törölt felhasználó adatait a sikeres művelet jelzésére
};

module.exports = {
  getAllUsers,
  deleteUser,
  registerUser,
  // --- MÓDOSÍTÁS KEZDETE ---
  loginUser,
  // --- MÓDOSÍTÁS VÉGE ---
};