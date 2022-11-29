const express = require('express');
const { getAllProducts, getAProduct, createAProduct, updateAProduct, deleteAProduct } = require('../../controllers/productWeightController.js');
const { body, validationResult } = require('express-validator');

const router = express.Router();

router.get('/', getAllProducts);

router.get('/:productName', getAProduct);

router.post('/',
  // body('name').isAlphanumeric('en-US', {ignore: '.'}),
  // body('weight').isAlphanumeric('en-US', {ignore: '.'}),
  createAProduct
);

router.patch('/:productName', updateAProduct);

router.delete('/:productId', deleteAProduct);

module.exports = router;