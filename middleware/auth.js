module.exports = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  const myKey = '12345';

  if (!apiKey || apiKey !== myKey) {
    return res.status(401).json({ error: 'Unauthorized: Invalid API key' });
  }

  next();
};
