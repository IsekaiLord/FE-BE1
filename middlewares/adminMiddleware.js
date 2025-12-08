const ensureAdmin = (req, res, next) => {
  // Assumes authenticateToken has already run and set req.user
  if (!req.user) {
    return res.status(401).json({ error: 'Hiányzó authentikációs információ.' });
  }

  if (!req.user.isAdmin) {
    return res.status(403).json({ error: 'Ehhez a művelethez admin jogosultság szükséges.' });
  }

  next();
};

module.exports = ensureAdmin;
