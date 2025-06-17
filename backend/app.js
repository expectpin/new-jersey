const express = require('express');
const sequelize = require('./config/database');
const categoryRoutes = require('./routes/categoryRoutes');
const deviceRoutes = require('./routes/deviceRoutes');

const app = express();
app.use(express.json());

app.use('/categories', categoryRoutes);
app.use('/devices', deviceRoutes);

sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(3000, () => console.log('Server running on port 3000'));
});