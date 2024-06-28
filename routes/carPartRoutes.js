const express = require('express');
const router = express.Router();
const carPartService = require('../services/carPartService');
const ApiSecurity = require('../middleware/apiSecurity');

router.get('/all', ApiSecurity.requireLogin, carPartService.getAll);
router.get('/:id', ApiSecurity.requireLogin, carPartService.getOne);
router.post('/add', ApiSecurity.requireAdmin, carPartService.add);
router.delete('/:id', ApiSecurity.requireAdmin, carPartService.delete);
router.put('/:id', ApiSecurity.requireLogin, carPartService.update);
router.get('/manufacturer/:manufacturer', ApiSecurity.requireLogin, carPartService.getByManufacturer);
router.patch('/:id/in-stock', ApiSecurity.requireLogin, carPartService.updateStockStatus);
router.get('/in-stock', ApiSecurity.requireLogin, carPartService.getInStock);

module.exports = router;
