const productWeightService = require('../services/productWeightService');
// const { body, validationResult } = require('express-validator');

const getAllProducts = (req, res) => {
  const allProducts = productWeightService.getAllProducts();
  res.send({ status: "OK", data: allProducts});
}

const getAProduct = (req, res) => {
  const aProduct = productWeightService.getAProduct();
  res.send("Get A Product.");
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
  const updatedProduct = productWeightService.updateAProduct();
  res.send("Update A Product.");
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