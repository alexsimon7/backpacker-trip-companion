const express = require('express');
const bodyParser = require('body-parser');
const v1ProductRouter = require('./v1/routes/productWeightRoutes.js');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/v1/products', v1ProductRouter);


app.listen(PORT, () => {
  console.log(`API is listening on Port ${PORT}.`);
})