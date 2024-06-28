const CarPart = require('../models/CarPart');

module.exports = {
  getAll: (req, res) => {
    CarPart.find({})
      .then(data => res.json(data))
      .catch(error => res.status(500).json(error));
  },
  
  add: async (req, res) => {
    try {
      const savedItem = await new CarPart(req.body).save();
      res.json(savedItem);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  
  getOne: async (req, res) => {
    try {
      const item = await CarPart.findById(req.params.id);
      if (!item) return res.status(404).json({ error: 'Car part not found' });
      res.json(item);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  
  delete: async (req, res) => {
    try {
      const result = await CarPart.deleteOne({ _id: req.params.id });
      if (result.deletedCount === 0) return res.status(404).json({ error: 'Car part not found' });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  
  update: async (req, res) => {
    try {
      const item = await CarPart.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
      if (!item) return res.status(404).json({ error: 'Car part not found' });
      res.json(item);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  
  getByManufacturer: async (req, res) => {
    try {
      const items = await CarPart.find({ manufacturer: req.params.manufacturer });
      res.json(items);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  
  updateStockStatus: async (req, res) => {
    try {
      const item = await CarPart.findByIdAndUpdate(req.params.id, { inStock: req.body.inStock }, { new: true });
      if (!item) return res.status(404).json({ error: 'Car part not found' });
      res.json(item);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  
  getInStock: async (req, res) => {
    try {
      const items = await CarPart.find({ inStock: true });
      res.json(items);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
