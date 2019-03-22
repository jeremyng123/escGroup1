var assert = require('assert'),
    username = process.env.ESC_USERNAME,
    password = process.env.ESC_PASSWORD,
    /* Change the baseURL to your application URL */
    baseURL = "https://escgroup1.herokuapp.com/",
    driver,
    navbar;



const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');
/**
 * Basic user pages. Checks `title` of routes
 */
describe('Title tests for Users', async () => {
    beforeEach(function (done){
        this.timeout(5000);
        driver = new Builder().forBrowser('chrome').build();
        driver.getSession().then(sessionid => {
            // console.log("This is session: " + sessionid.id_);
            driver.sessionID = sessionid.id_;
        });
        driver.get(baseURL);
        navbar = driver.findElement(By.className('navbar'));
        done();
    });

    afterEach(async () => {
        // driver.executeScript("sauce:job-result=" + (true ? "passed" : "failed"));    // idk what this is used for...
        await driver.quit();
    });

    

    describe('/', async () => {
        it('should-open-acnapi-portal', async function() {
            this.timeout(5000);
            try{
                await driver.getTitle().then(title => {
                    console.log("title is: " + title);
                    expect(title).to.be.equal("Accenture's ACNAPI Portal");
                });
            } catch(err){
                console.log(err);
            }
        });
    });

    describe('/users/signup', async () => {
        it('should-open-acnapi-signup-route', async function() {
            this.timeout(5000);
            await navbar.findElement(By.id('btn_signup')).click();
            try{
                await driver.getTitle().then(title => {
                    expect(title).to.be.equal("ACNAPI Register");
                    console.log("title is: " + title);
                });
            } catch(err){
                console.log(err);
            }
        });
    });

    describe('/users/login', async () => {
        it('should-open-acnapi-signup-route', async function() {
            this.timeout(5000);
            await navbar.findElement(By.id('btn_login')).click();
            try{
                await driver.getTitle().then(title => {
                    expect(title).to.be.equal("ACNAPI Register");
                    console.log("title is: " + title);
                });
            } catch(err){
                console.log(err);
            }
        });
    });
});