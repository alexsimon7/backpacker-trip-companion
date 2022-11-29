const DB = require('./dbTest.json');
const { saveToDatabase } = require("./utils");

const getAllProducts = () => {
  return DB;
}

const createAProduct = (newProduct) => {
  const isAlreadyAdded = DB.findIndex((product) => product.name === newProduct.name) > -1;

  if (isAlreadyAdded) {
    return;
  }

  DB.push(newProduct);
  saveToDatabase(DB);
  return newProduct;

}

const getAProduct = (aProductName) => {
  const theProduct = DB.find((product) => product.name === aProductName);

  if(!theProduct) {
    return
  }

  return theProduct;
}

const updateAProduct = (aProductName, changes) => {
  const productToUpdate = DB.findIndex((product) => product.name === aProductName);

  if (productToUpdate === -1) {
    return;
  }

  const updatedProduct = {
    ...changes,
  }

  DB[productToUpdate] = updatedProduct;
  saveToDatabase(DB);
  return changes;


}

module.exports = {
  getAllProducts,
  createAProduct,
  getAProduct,
  updateAProduct
};