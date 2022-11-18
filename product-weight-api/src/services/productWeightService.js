const productWeight = require('../database/productWeight');

const getAllProducts = () => {
  return productWeight.getAllProducts();
}

const getAProduct = () => {
  return;
}

const createAProduct = (newProduct) => {
  const productToInsert = {
    ...newProduct,
  }

  const createdProduct = productWeight.createAProduct(productToInsert);
  return createdProduct;
}

const updateAProduct = () => {
  return;
}

const deleteAProduct = () => {
  return;
}

module.exports = {
  getAllProducts,
  getAProduct,
  createAProduct,
  updateAProduct,
  deleteAProduct
};