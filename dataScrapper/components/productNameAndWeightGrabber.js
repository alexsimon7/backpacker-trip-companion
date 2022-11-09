/*
Input: Page Instance, Array of Product URLS
Output: Array of Objects {name = 'string', weight = 'string' (lbs, ounces), size = 'string' (if applicable)
 */

const delay = require('./delay.js');

async function productNameAndWeightGrabber(page, arrayOfProductURLs) {
  const weightStringAlts = ['Packaged Weight', 'Weight With Batteries', 'Weight (Pair)', 'Net Weight'];
  let arrayOfProductInfo = [];

  for(let i = 0; i < arrayOfProductURLs.length; i++) {
    let productObj = {};
    console.log(arrayOfProductURLs[i]);
    await page.goto(arrayOfProductURLs[i]);
    await delay(2500);

    //Product Titles

    await page.waitForSelector('#product-page-title');
    let productNameElement = await page.$('#product-page-title');
    productObj.name = (await productNameElement.evaluate((el) => el.textContent)).replace(/\r?\n|\r/g, '').trim();

    //Product Weight
    let productWeightElement = await page.$x('//*[@id="tech-specs-collapsible"]//child::tr[th[normalize-space()="Weight"]]//child::p'); // Determine if Product Had Exact Weight Reference

    if(productWeightElement.length === 0) { //If Product's Weight is Not Referred To By The String 'Weight' Exactly Check For Other Weight Names
      let count = 0;
      while(productWeightElement.length === 0) {
        productWeightElement = await page.$x(`//*[@id="tech-specs-collapsible"]//child::tr[th[normalize-space()="${weightStringAlts[count]}"]]//child::p`);
        count++;

        if(count > weightStringAlts.length) {
          //Issue: Empty Array for productWeightElement -> Confirmed Causing Error (See https://www.rei.com/product/167532/the-north-face-eco-trail-bed-35-sleeping-bag)
          break;
        }
      }
    }

    if (productWeightElement.length > 1) { //If Product Has Sizes With Different Weights
      let whenProdSizesObj = {};

      for (let i = 0; i < productWeightElement.length; i++) {
        let productSizeAndWeight = (await productWeightElement[i].evaluate((el) => el.textContent)).replace(/\r?\n|\r/g, '').trim();
        productSizeAndWeight = productSizeAndWeight.split(':');
        whenProdSizesObj[`${productSizeAndWeight[0].trim()}`] = productSizeAndWeight[1].trim();
      }

      productObj.weight = whenProdSizesObj;

    } else { //If The Product Has One Size and One Weight (Referred to exactly as 'Weight' or Otherwise
      productObj.weight = (await productWeightElement[0].evaluate((el) => el.textContent)).replace(/\r?\n|\r/g, '').trim();
    }

    arrayOfProductInfo.push(productObj);
  }
  return arrayOfProductInfo;
}

module.exports = productNameAndWeightGrabber;