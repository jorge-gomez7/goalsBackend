module.exports = (req, res, next) => {
  const apiKey = req.headers['authorization'];
  const myKey = '12345'; // Reemplaza con tu propia API key

  if (!apiKey || apiKey !== myKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
};
