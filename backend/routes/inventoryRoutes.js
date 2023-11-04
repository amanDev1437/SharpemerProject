const express = require('express');
const router = express.Router();
const Inventory = require('../models/InventoryModel');


router.post('/inventory', async (req, res) => {
    try {
      const { name, description, quantity, price } = req.body;
  
      const newItem = await Inventory.create({
        name,
        description,
        quantity,
        price,
      });
  
      res.json({ message: 'Item added to inventory', item: newItem });
    } catch (err) {
      console.error('Error inserting item:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

router.get('/inventory', async (req, res) => {
    try {
      const inventory = await Inventory.findAll();
      res.json({ inventory });
    } catch (err) {
      console.error('Error fetching inventory:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  router.put('/inventory/:itemId', async (req, res) => {
    try {
      const itemId = req.params.itemId;
  
      const item = await Inventory.findByPk(itemId);
  
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
  
      if (item.quantity > 0) {

        await item.update({ quantity: item.quantity - 1 });
        res.json({ message: 'Item quantity updated', item });
      } else {
        res.status(400).json({ message: 'Item is out of stock' });
      }
    } catch (err) {
      console.error('Error updating item:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

module.exports = router;
