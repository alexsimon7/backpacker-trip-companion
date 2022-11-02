const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

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
  let productArray = [];

  const browser = await puppeteer.launch({headless: false, executablePath: '/opt/google/chrome/google-chrome'});
  const page = await browser.newPage();

  //setViewport fixed bug where page opened was smaller version w/o menu
  await page.setViewport({
    width: 1280,
    height: 720,
  })

  await page.goto('https://www.rei.com/c/backpacking-packs');
  await delay(2500);

  let backpacks = await page.$$eval('#search-results > ul > li > a:first-of-type', productArray => {
    return productArray.map(element => `https://www.rei.com${element.getAttribute('href')}`);
  });

  await page.goto('https://www.rei.com/c/backpacking-tents');
  await delay(2500);

  let tents = await page.$$eval('#search-results > ul > li > a:first-of-type', productArray => {
    return productArray.map(element => `https://www.rei.com${element.getAttribute('href')}`);
  });

  productArray = productArray.concat(backpacks, tents);

  console.log(productArray);

  await delay(2500);

  await browser.close();
}

dataScrapper();
