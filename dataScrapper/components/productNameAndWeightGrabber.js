/*
Input: Page Instance, Array of Product URLS
Output: Array of Objects {name = 'string', weight = 'string' (lbs, ounces), size = 'string' (if applicable)
 */

const delay = require('./delay.js');

async function productNameAndWeightGrabber(page, arrayOfProductURLs) {
  let arrayOfProductInfo = [];

  for(let i = 0; i < arrayOfProductURLs.length; i++) {
    let productObj = {};
    await page.goto(arrayOfProductURLs[i]);
    await delay(2500);

    await page.waitForSelector('#product-page-title');
    let element = await page.$('#product-page-title');

    productObj.name = (await element.evaluate((el) => el.textContent)).replace(/\r?\n|\r/g, '').trim();

    arrayOfProductInfo.push(productObj);
  }

  return arrayOfProductInfo;
}

module.exports = productNameAndWeightGrabber;