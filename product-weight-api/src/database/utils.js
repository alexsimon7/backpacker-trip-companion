const fs = require('fs');

const saveToDatabase = (DB) => {
  // Currently Set to Test DB;
  fs.writeFileSync('product-weight-api/src/database/dbTest.json', JSON.stringify(DB, null, 2), {
    encoding: "utf-8",
  });
};

module.exports = { saveToDatabase };