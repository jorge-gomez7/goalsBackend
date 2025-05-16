const express = require('express');
const app = express();
const authMiddleware = require('./middleware/auth');
const routes = require('./routes/routes');

app.use(express.json());
app.use(authMiddleware);
app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
