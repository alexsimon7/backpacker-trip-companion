const DB = require('./dbTest.json');
const {saveToDatabase} = require("./utils");

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

module.exports = {
  getAllProducts,
  createAProduct,
};