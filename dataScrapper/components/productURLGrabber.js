/*
Input: Page (instance of Page Object (Puppeteer), Array of Product Pages (eg: 'https://www.rei.com/c/backpacking-packs')
Output: Array of Product Links
 */

const delay = require('./delay.js');

async function productURLGrabber(page, arrayOfProductPages) {
  let arrayOfProductLinks = [];
  
  for (let i = 0; i < arrayOfProductPages.length; i++) {
    let pageCount = 1;

    while(true) {
      // await page.goto(pageCount === 1 ? arrayOfProductPages[i] : `${arrayOfProductPages[i]}?page=${pageCount}`);
      await page.goto(pageCount === 1 ? arrayOfProductPages[i] : `${arrayOfProductPages[i]}&page=${pageCount}`);
      await delay(2500);

      let productURLs = await page.$$eval('#search-results > ul > li > a:first-of-type', productArray => {
        return productArray.map(element => `https://www.rei.com${element.getAttribute('href')}`);
      });

      if(productURLs.length === 0) {
        break;
      }

      arrayOfProductLinks = arrayOfProductLinks.concat(productURLs);
      pageCount += 1;
    }
  }
  return arrayOfProductLinks;
  
}

module.exports = productURLGrabber;