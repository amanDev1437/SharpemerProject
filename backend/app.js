const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./utils/db');
const inventoryRoutes = require('./routes/inventoryRoutes');
const path = require('path'); 


app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend/public'))); 
app.use((req, res, next) => {
  res.header('Cache-Control', 'no-store');
  next();
});
app.use('/api', inventoryRoutes);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});
 

sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Database synchronization failed:', err);
  });
