const productWeight = require('../database/productWeight');

const getAllProducts = () => {
  return productWeight.getAllProducts();
}

const getAProduct = (aProduct) => {
  return productWeight.getAProduct(aProduct);
}

const createAProduct = (newProduct) => {
  const productToInsert = {
    ...newProduct,
  }

  const createdProduct = productWeight.createAProduct(productToInsert);
  return createdProduct;
}

const updateAProduct = (productName, changes) => {
  return productWeight.updateAProduct(productName, changes)
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