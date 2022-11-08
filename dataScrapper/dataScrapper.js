/*
TODO:
  Have Array of Product Urls
    Parse the Product Pages for:
      1. Product Name
      2. Product Weight
    Potential Issues:
      1. Products with Different Sizes
    Question:
      Can we get one page that encompasses most of the products and parse that page?
        https://www.rei.com/c/camping-and-hiking?ir=category%3Acamping-and-hiking&r=c%3Bbest-use%3ABackpacking may work

Input: None.
Output: None. Create JSON FILE with scraped products (including names, sku?, and weight)
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const fs = require('fs');
const productURLGrabber = require('./components/productURLGrabber');
const productNameAndWeightGrabber = require('./components/productNameAndWeightGrabber.js');
const delay = require('./components/delay.js');


async function saveToJSON(productObject) {
  const userJSON = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
  const userData = JSON.parse(userJSON);

  for (let element in productObject) {
    userData.push(productObject[element]);
  }

  const toSave = JSON.stringify(userData);
  fs.writeFileSync(`${__dirname}/data/data.json`, toSave, 'utf-8');
}


async function dataScrapper() {
  const browser = await puppeteer.launch({headless: false, executablePath: '/opt/google/chrome/google-chrome'});
  const page = await browser.newPage();

  // await page.setViewport({
  //   width: 1280,
  //   height: 720,
  // })

  // const arrayOfURLs = [
  //   'https://www.rei.com/c/backpacking-packs',
  //   'https://www.rei.com/c/backpacking-tents',
  //   'https://www.rei.com/c/mens-sleeping-bags',
  //   'https://www.rei.com/c/womens-sleeping-bags',
  //   'https://www.rei.com/c/stoves-and-grills',
  //   'https://www.rei.com/c/hammocks'
  // ]
  //
  // const listOfProductURLs = await productURLGrabber(page, arrayOfURLs);
  // console.log(listOfProductURLs);

  let arrayOfProductURLs = ['https://www.rei.com/product/168251/rei-co-op-trailbreak-60-pack-mens'];
  const listOfProductsWithInfo = await productNameAndWeightGrabber(page, arrayOfProductURLs)
  console.log(listOfProductsWithInfo);


  await delay(2500);
  await browser.close();
}

dataScrapper();



