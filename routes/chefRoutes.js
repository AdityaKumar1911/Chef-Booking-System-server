const express = require('express');
const Chef = require('../models/chefSchema');


const router = express.Router();

// Route to create a new chef
router.post('/chef', async (req, res) => {
  try {
    const newChef = new Chef(req.body);
    const savedChef = await newChef.save();
    res.status(201).json(savedChef);
  } catch (err) {
    console.error('Error saving chef:', err);
    res.status(400).json({ error: 'Bad Request', status: false });
  }
});

// Route to get all chefs
router.get('/chefs', async (req, res) => {
  try {
    const chefs = await Chef.find();
    res.status(200).json(chefs);
  } catch (err) {
    console.error('Error fetching chefs:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
