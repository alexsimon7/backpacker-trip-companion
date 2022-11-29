const productWeightService = require('../services/productWeightService');
// const { body, validationResult } = require('express-validator');

const getAllProducts = (req, res) => {
  const allProducts = productWeightService.getAllProducts();
  res.send({ status: "OK", data: allProducts});
}

const getAProduct = (req, res) => {
  const { params: { productName } } = req;
  if (!productName){
    return;
  }

  const aProduct = productWeightService.getAProduct(productName);
  res.send({ status: "OK", data: aProduct});
}

const createAProduct = (req, res) => {
  const { body } = req;
  // const errors = validationResult(req);
  //
  // if (!errors.isEmpty()) {
  //   return;
  // }

  const newProduct = {
    name: body.name,
    weight: body.weight
  };

  const createdProduct = productWeightService.createAProduct(newProduct);
  res.status(201).send({status: "OK", data: createdProduct});
}

const updateAProduct = (req, res) => {
  const { body, params: { productName } } = req;

  if (!productName) {
    return;
  }

  const updatedProduct = productWeightService.updateAProduct(productName, body);
  res.send({ status: "OK", data: updatedProduct});
}

const deleteAProduct = (req, res) => {
  productWeightService.deleteAProduct();
  res.send('Delete A Product.');
}

module.exports = {
  getAllProducts,
  getAProduct,
  createAProduct,
  updateAProduct,
  deleteAProduct
};