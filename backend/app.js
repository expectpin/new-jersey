// app.js
const express = require('express');
const cors = require('cors'); // Importar o cors
const sequelize = require('./config/database');
const categoryRoutes = require('./routes/categoryRoutes');
const deviceRoutes = require('./routes/deviceRoutes');

// Importar modelos para sincronização e associações
require('./models/Category');
require('./models/Device');
require('./models/associations');


const app = express();

app.use(cors()); // Ativar o CORS para todos os pedidos
app.use(express.json());

app.use('/categories', categoryRoutes);
app.use('/devices', deviceRoutes);

// Usar { force: true } em desenvolvimento para recriar as tabelas a cada reinício
sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(3000, () => console.log('Server running on port 3000'));
});