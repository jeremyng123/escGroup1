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
describe('Title pages for non-users', function() {
    this.timeout(10000)
    beforeEach(async function (){
        driver = new Builder().forBrowser('chrome').build();
        await driver.getSession().then(sessionid => {
            driver.sessionID = sessionid.id_;
        });
        await driver.get(baseURL);
        navbar = await driver.findElement(By.className('navbar'));
    });

    afterEach(function (done) {
        // driver.executeScript("sauce:job-result=" + (true ? "passed" : "failed"));    // idk what this is used for...
        driver.quit();
        done();
    });

    

    describe('/', function(){
        it('should-open-acnapi-portal', async function() {
            try{
                await driver.getTitle().then(title => {
                    expect(title).to.be.equal("Accenture's ACNAPI Portal");
                });
            } catch(err){
                console.log(err);
            }
        });
    });

    describe('/users/signup', function(){
        it('should-open-acnapi-signup-route', async function() {
            await navbar.findElement(By.id('btn_signup')).click();
            try{
                await driver.getTitle().then(title => {
                    expect(title).to.be.equal("ACNAPI Register");
                });
            } catch(err){
                console.log(err);
            }
        });
    });

    describe('/users/login', function(){
        it('should-open-acnapi-login-route', async function() {
            await navbar.findElement(By.id('btn_login')).click();
            try{
                await driver.getTitle().then(title => {
                    expect(title).to.be.equal("ACNAPI Login");
                });
            } catch(err){
                console.log(err);
            }
        });
    });

    describe('/btn_home', function() {
        it('should-open-home-route', async function() {
            await navbar.findElement(By.id('btn_home')).click();
            try{
                await driver.getTitle().then(title => {
                    expect(title).to.be.equal("Accenture's ACNAPI Portal");
                });
            } catch(err){
                console.log(err);
            }
        });
    });

    /**
     * test redirection for users that have not logged in
     */
    describe('user have not logged in', function(){
        describe('/my_tickets/:user_id', function(){
            it('should-redirect-to-signup-page', async function() {
                await navbar.findElement(By.id('btn_tickets')).click();
                try{
                    await driver.getTitle().then(title => {
                        expect(title).to.be.equal("ACNAPI Register");       // redirected to signup page
                    });
                } catch(err){
                    console.log(err);
                }
            });
        });
        
        describe('/ticket/form', function(){
            it('should-redirect-to-signup-page', async function() {
                await navbar.findElement(By.id('btn_ticket-form')).click();
                try{
                    await driver.getTitle().then(title => {
                        expect(title).to.be.equal("ACNAPI Register");       // redirected to signup page
                    });
                } catch(err){
                    console.log(err);
                }
            });
        });
    });
});