const puppeteer = require('puppeteer');
const fs = require('fs');

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

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
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  //setViewport fixed bug where page opened was smaller version w/o menu
  await page.setViewport({
    width: 1280,
    height: 720,
  })

  //set for each product individually, or create an array iterate?

  await page.goto('https://www.rei.com/c/backpacking-packs');
  await delay(2500);

  let products = await page.$$eval('#search-results > ul > li > a:first-of-type', productArray => {
    return productArray.map(element => element.getAttribute('href'));
  });

  console.log(products);

  await delay(2500);

  await browser.close();
}

dataScrapper();
