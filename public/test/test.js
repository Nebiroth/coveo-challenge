// Load dependecies
test = require('selenium-webdriver/testing'),
webdriver = require('selenium-webdriver');

// Our test
describe('Test', function () {
it('should find in the html document at least one element with a class name card', function () {


async function TestFunction() {
    let driver = await new webdriver.Builder().forBrowser('firefox').build();
    try {
        await driver.get('http://localhost:3000/');
        await driver.findElement(webdriver.By.id('searchTerm')).sendKeys('Merlot');
        await driver.findElement(webdriver.By.id("submitButton")).click();
        await driver.wait(webdriver.until.elementLocated(webdriver.By.className("card")), 10000);        
    } finally {        
        await driver.quit();
    }
}


Promise.all([
    TestFunction()
  ]).then(_ => {
    console.log('All done!');
  }, err => {
    console.error('An error occured! ' + err);
    setTimeout(() => {throw err}, 0);
  });

});
});
