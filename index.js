const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
const authMiddleware = require('./middleware/auth');
const routes = require('./routes/routes');

// Conexión a MongoDB Atlas
mongoose.connect('mongodb+srv://albertogomez:9h69a4SbskTrQRXO@cluster0.xlwao.mongodb.net/goalsdb?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB Atlas'))
.catch(err => console.error('❌ Error al conectar a MongoDB:', err));

app.use(cors());

app.use(express.json());
app.use(authMiddleware);
app.use(routes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
