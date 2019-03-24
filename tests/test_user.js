var assert = require('chai').assert,
    username = process.env.ESC_USERNAME,
    password = process.env.ESC_PASSWORD,
    /* Change the baseURL to your application URL */
    baseURL = "https://escgroup1.herokuapp.com",
    driver,
    navbar;



const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');
/**
 * Basic user pages. Checks `title` of routes
 */
describe('Title pages for Users', function() {
    this.timeout(10000)
    beforeEach(async function (){
        driver = new Builder().forBrowser('chrome').build();
        await driver.getSession().then(sessionid => {
            // console.log("This is session: " + sessionid.id_);
            driver.sessionID = sessionid.id_;
        });
        await driver.get(baseURL);
        navbar = await driver.findElement(By.className('navbar'));
        await navbar.findElement(By.id('btn_login')).click();     // enter login page
        await driver.findElement(By.name('email')).sendKeys(process.env.ESC_USER_USERNAME);         // enter default user email into `email` box
        await driver.findElement(By.name('password')).sendKeys(process.env.ESC_USER_PASSWORD, Key.ENTER);         // enter default user password into `password` box
        // await driver.wait(until.elementLocated(By.className('navbar-text')));
        console.log("user should have logged in");
    });

    afterEach(function (done) {
        // driver.executeScript("sauce:job-result=" + (true ? "passed" : "failed"));    // idk what this is used for...
        driver.quit();
        done();
    });

    /**
     * test users that is logged in
     */
    describe('user logged in', function(){
        it('should login', async function(){
            try{
                console.log("looking for navbar-text");
                navbar.wait(until.elementLocated(By.id('navbar-text'))).then(async function(element) {
                    console.log("User " + element + " logged in.");
                    await driver.getTitle().then(title => {
                        expect(title).to.be.equal("Accenture's ACNAPI Portal");     // after login, user is redirected to Homepage
                    });
                }, function(err){
                    if (err) console.log("Element not found: " + err);
                    else navbar.promise.rejected(err);
                })
            } catch(err){
                console.log(err);
            }
        });
        
        it('should-open-users-ticket-queue-page', async function() {
            await navbar.findElement(By.id('btn_tickets')).click();     // enter queue page for the first time
            try{
                await driver.getTitle().then(title => {
                    expect(title).to.be.equal("ACNAPI Tickets - Queued").throw
                });
            } catch(err){
                console.log(err);
            }
        });

        it('should-open-users-ticket-inprogress-page', async function() {
            await driver.findElement(By.id('tickets1')).click();        // click on `in-progress` Button
            try{
                await driver.getTitle().then(title => {
                    expect(title).to.be.equal("ACNAPI Tickets - In Progress");
                    console.log("title is: " + title);
                });
            } catch(err){
                console.log(err);
            }
        });

        it('should-open-users-ticket-solved-page', async function() {
            await driver.findElement(By.id('tickets2')).click();        // click on `solved` Button
            try{
                await driver.getTitle().then(title => {
                    expect(title).to.be.equal("ACNAPI Tickets - Solved");
                    console.log("title is: " + title);
                });
            } catch(err){
                console.log(err);
            }
        });

        it('should-open-users-ticket-queue-page', async function() {
            await driver.findElement(By.id('tickets0')).click();        // click on `solved` Button
            try{
                await driver.getTitle().then(title => {
                    expect(title).to.be.equal("ACNAPI Tickets - Queued");
                    console.log("title is: " + title);
                });
            } catch(err){
                console.log(err);
            }
        });
    });
});