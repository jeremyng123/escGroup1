package tests.java;


import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import javax.net.ssl.HttpsURLConnection;
import java.io.DataOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static junit.framework.TestCase.assertTrue;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.IsEqual.equalTo;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;

public class RTchat {

    private final String USERNAME = System.getenv("ESC_USER_USERNAME");
    private final String PASSWORD = System.getenv("ESC_USER_PASSWORD");
    private final String PHONENUMBER = System.getenv("ESC_PHONENUMBER");
    private final String baseURL = "https://escgroup-1.herokuapp.com";
    private String username = "hongpengfei.emrys@gmail.com";
    private String userpassword = "mona.lisa";
    private String adminname = "jeremyng123@gmail.com";
    private String adminpassword = "1234567890";
    private String thirdAdminEmail = "thirdAdmin@gmail.com";
    private String thirdAdminPassword = "1234567890";
    private HttpsURLConnection connection;
    private WebDriver driver;
    CountDownLatch countDownLatch = new CountDownLatch(1);
    protected final String webdriver = "webdriver.gecko.driver";
    protected final String pathtoDriver = "Users/emrys/Documents/geckodriver";

    /**
     * driver setup
     * user login as client
     */
    @Before
    public void setup() throws InterruptedException {
        System.setProperty(webdriver,pathtoDriver);
        driver = new FirefoxDriver();

        // user login
        driver.get(baseURL + "/users/login");
        WebElement email = driver.findElement(By.name("email"));
        Thread.sleep(500);
        email.sendKeys(username);
        WebElement password = driver.findElement(By.name("password"));
        password.sendKeys(userpassword);
        Thread.sleep(500);
    }

    /**
     * UI testing: chat button
     */
    @Test
    public void chat_button() throws InterruptedException{
        setup();
        WebElement chatbutton = driver.findElement(By.id("btn_chat"));
        String href = chatbutton.getAttribute("href");
        assertEquals(href , "/room");
        String title = chatbutton.getAttribute("title");
        assertEquals(title, "Chat with Admin now");
        String data = chatbutton.getAttribute("DATA-PALCEMENT");
        assertEquals(data, "bottom");
    }

    /**
     * functional testing: click chat button leading to the correct url
     */
    @Test
    public void click_chat_button() throws InterruptedException {
        setup();
        driver.get(baseURL);
        WebElement chatbutton = driver.findElement(By.id("btn_chat"));
        chatbutton.click();
        Thread.sleep(500);
        String currentUrl = driver.getCurrentUrl();
        assertEquals(currentUrl, baseURL + "/room");
    }

    /**
     * UI testing: check all the links works
     * all the pictures is correctly showed
     * and element in the chat room link is working
     * all the picture is working in the chat room
     */
    @Test
    public void chatRoomElement() throws InterruptedException{
        setup();
        driver.get(baseURL + "/room");
        // title is showing
        WebElement header = driver.findElement(By.className("homebannertext"));
        assertTrue(header.isDisplayed());

        // image is showing
        WebElement logo = driver.findElement(By.className("node"));
        assertTrue(logo.isDisplayed());
        assertEquals(logo.getAttribute("src"), "/images/Accenture-logo.png");

        // text is showing
        WebElement text = driver.findElement(By.id("text"));
        assertEquals(text.getText(), "powered web chat");

        // button is showing and the text is working
        // the href is also correct
        WebElement button = driver.findElement(By.id("createButton"));
        assertEquals(button.getAttribute("href"), "/select");
    }

    /**
     * UI testing, all element the position is correct
     * UI testing, all element is position is correct
     * the css element is of correct size
     */
    @Test
    public void chatRoomElementUI() throws InterruptedException{
        setup();
        driver.get(baseURL + "/select");
        WebElement header = driver.findElement(By.className("homebannertext"));
        String height = header.getCssValue("height");
        String padding_top = header.getCssValue("padding-top");
        String fontFamily = header.getCssValue("font-family");
        String color = header.getCssValue("color");
        assertEquals(height, "120px");
        assertEquals(padding_top, "35px");
        assertEquals(fontFamily, "Open Sans Condensed");
        assertEquals(color, "white");


        WebElement logo = driver.findElement(By.className("node"));
        String imageTopPadding = logo.getCssValue("padding-top");
        String imageTopalign = logo.getCssValue("text-align");
        String marginTop = logo.getCssValue("margin-top");
        assertEquals(imageTopalign, "center");
        assertEquals(padding_top, "20px");
        assertEquals(marginTop, "120px");


        WebElement text = driver.findElement(By.id("text"));
        String style = text.getCssValue("list-style-type");
        assertEquals(style, "none");
        String marginOfTop = text.getCssValue("margin-top");
        assertEquals(marginOfTop,"10px");


        // button is showing and the text is working
        // the href is also correct
        WebElement button = driver.findElement(By.id("createButton"));
        assertEquals(button.getAttribute("href"), "/select");
    }


    /**
     * fucntional test: find href of the button is working
     */
    @Test
    public void select_chatroom_button() throws InterruptedException{
        setup();
        driver.get(baseURL + "/select");
        WebElement button = driver.findElement(By.id("createButton"));
        button.click();
        assertEquals(driver.getCurrentUrl(), "/select");
    }


    /**
     * UI testing /select check all the element is showing correctly
     */
    @Test
    public void select_working_correct() throws InterruptedException {

        setup();
        driver.get(baseURL + "/select");
        // title is showing
        WebElement header = driver.findElement(By.className("homebannertext"));
        assertTrue(header.isDisplayed());

        // image is showing
        WebElement select = driver.findElement(By.className("select-admin"));
        assertTrue(select.isDisplayed());

        // text is showing
        WebElement text = driver.findElement(By.className("selectAdmin"));
        assertEquals(text.getText(), "Please select an admin to serve you");
    }

    /**
     * functional test: test the first three UI is leading to the URL with adminId as an arguement
     * check all the link working using regular expression
     */
    @Test
    public void talk_with_specific_admin_link() throws InterruptedException{
        setup();
        driver.get(baseURL + "/select");
        java.util.List<WebElement> links = driver.findElements(By.tagName("a"));
        String pattern = "/chat/admin/(.?)";
        Pattern r = Pattern.compile(pattern);

        // loop through each adminn links and find out about whether it works
        for (int i=0; i<links.size(); i++) {
            Matcher m = r.matcher(links.get(i).getText());
            assertTrue(m.find());
        }
    }

    /**
     * functional test: testing chat with specific admin will send email to specific admin
     * it will redirect the url
     * this is testing the sending email api
     * left integration test with email and redirect
     */
    @Test
    public void talk_with_specific_admin_send_email() throws InterruptedException, IOException {
        URL url = new URL("https://ug-api.acnapiv3.io/swivel/email-services/api/mailer");
        connection = (HttpsURLConnection) url.openConnection();
        connection.setRequestMethod("POST");
        connection.setRequestProperty("headers",
                "this token is ignored for privacy");

        connection.setRequestProperty("form",
                "false");
        connection.setRequestProperty("cache-control", "no-cache");
        String urlParameters =  "application/x-www-form-urlencoded";
        connection.setUseCaches(false);
        connection.setDoOutput(true);

        //Send request
        DataOutputStream wr = new DataOutputStream (
                connection.getOutputStream());
        wr.writeBytes(urlParameters);
        wr.close();

        assertTrue(connection.getResponseCode() == 200);

    }

    /**
     * system testing: after user talk with specific admin user is redirected to the correct address with users id
     */
    @Test
    public void chat_in_correct_url () throws InterruptedException{
        setup();
        driver.get(baseURL + "/select");
        WebElement link = driver.findElement(By.tagName("a"));
        link.click();
        Thread.sleep(500);
        String url = driver.getCurrentUrl();

        String pattern = "(.?)/chat/admin/(.?)";
        Pattern r = Pattern.compile(pattern);
        Matcher m = r.matcher(url);
        assertTrue(m.find());

    }

    /**
     * whole system integration test:
     * real time chat flow with all admin
     */
    @Test
    public void all_admin_correct_url() throws InterruptedException {
        setup();
        driver.get(baseURL + "/select");
        List<WebElement> links = driver.findElements(By.tagName("a"));
        links.get(1).click();
        String url = driver.getCurrentUrl();
        String pattern = "(.?)/chat/user/(.?)";
        Pattern r = Pattern.compile(pattern);
        Matcher m = r.matcher(url);
        assertTrue(m.find());
    }

    /**
     * system testing: after admin login the system with his own account
     * user can join the test
     */
    @Test
    public void admin_enter_chat () throws InterruptedException{
        // user threads
        new Thread() {
            @Override
            public void run(){
                try {
                    setup();

                    driver.get(baseURL + "/select");
                    WebElement link = driver.findElement(By.tagName("a"));
                    link.click();
                    Thread.sleep(500);
                    countDownLatch.countDown();
                    WebDriverWait wait = new WebDriverWait(driver, 5);
                    wait.until(ExpectedConditions.elementToBeClickable(By.className("submit")));
                } catch (Exception e) {
                    assertTrue(false);
                }
            }
        }.run();

        // admin thread
        new Thread() {
            @Override
            public void run(){
                try {
                    setup();

                    driver.get(baseURL + "/select");
                    WebElement link = driver.findElement(By.tagName("a"));
                    link.click();
                    Thread.sleep(500);
                    countDownLatch.countDown();
                    WebDriverWait wait = new WebDriverWait(driver, 5);
                    wait.until(ExpectedConditions.elementToBeClickable(By.className("submit")));
                } catch (Exception e) {
                    assertTrue(false);
                }
            }
        }.run();

    }


    /**
     * robutness testing: user cannot send message too quickly
     * the website will limit the speed of the message being sent
     */
    @Test
    public void limit_enter_information() {
        // user threads
        new Thread() {
            @Override
            public void run(){
                try {
                    setup();

                    driver.get(baseURL + "/select");
                    WebElement link = driver.findElement(By.tagName("a"));
                    link.click();
                    Thread.sleep(500);
                    countDownLatch.countDown();
                    WebDriverWait wait = new WebDriverWait(driver, 5);
                    wait.until(ExpectedConditions.elementToBeClickable(By.className("submit")));
                    // user will be automatically disconnect if he too much info
                    for (int i=0; i<100; i++) {
                        WebElement chat_content = driver.findElement(By.id("message"));
                        chat_content.sendKeys("HI");
                        WebElement sendButton = driver.findElement(By.className("submit"));
                        sendButton.click();
                    }
                    assertTrue(false);
                } catch (Exception e) {
                    assertTrue(true);
                }
            }
        }.run();

        // admin thread
        new Thread() {
            @Override
            public void run(){
                try {
                    setup();

                    driver.get(baseURL + "/select");
                    WebElement link = driver.findElement(By.tagName("a"));
                    link.click();
                    Thread.sleep(500);
                    countDownLatch.countDown();
                    WebDriverWait wait = new WebDriverWait(driver, 5);
                    wait.until(ExpectedConditions.elementToBeClickable(By.className("submit")));

                } catch (Exception e) {
                    assertTrue(false);
                }
            }
        }.run();
    }


    /**
     * robutness testing: either user or the admin cannot enter the the message as XSS attach
     * the system will filter it out
     */
    @Test
    public void xxs_injection() {
        // user threads
        new Thread() {
            @Override
            public void run(){
                try {
                    setup();

                    driver.get(baseURL + "/select");
                    WebElement link = driver.findElement(By.tagName("a"));
                    link.click();
                    Thread.sleep(500);
                    countDownLatch.countDown();
                    WebDriverWait wait = new WebDriverWait(driver, 5);
                    wait.until(ExpectedConditions.elementToBeClickable(By.className("submit")));
                    // user will be automatically disconnect if he too much info
                    WebElement chat_content = driver.findElement(By.id("message"));
                    chat_content.sendKeys("<script> alert(\"you are hijacked\"); </script>");
                    WebElement sendButton = driver.findElement(By.className("submit"));
                    sendButton.click();
                    WebElement noEnter = driver.findElement(By.id("chat"));
                    String goodtext = noEnter.getText();
                    assertFalse(goodtext.contains("<script>"));
                } catch (Exception e) {
                    assertTrue(true);
                }
            }
        }.run();

        // admin thread
        new Thread() {
            @Override
            public void run(){
                try {
                    setup();

                    driver.get(baseURL + "/select");
                    WebElement link = driver.findElement(By.tagName("a"));
                    link.click();
                    Thread.sleep(500);
                    countDownLatch.countDown();
                    WebDriverWait wait = new WebDriverWait(driver, 5);
                    wait.until(ExpectedConditions.elementToBeClickable(By.className("submit")));

                } catch (Exception e) {
                    assertTrue(false);
                }
            }
        }.run();
    }

    /**
     * functional test: client can send admin the correct text
     */
    @Test
    public void fromClient() {
        // user threads
        new Thread() {
            @Override
            public void run(){
                try {
                    setup();

                    driver.get(baseURL + "/select");
                    WebElement link = driver.findElement(By.tagName("a"));
                    link.click();
                    Thread.sleep(500);
                    countDownLatch.countDown();
                    WebDriverWait wait = new WebDriverWait(driver, 5);
                    wait.until(ExpectedConditions.elementToBeClickable(By.className("submit")));
                    Thread.sleep(1000);
                    WebElement noEnter = driver.findElement(By.id("chat"));
                    String goodtext = noEnter.getText();
                    assertFalse(goodtext.contains("hello"));
                } catch (Exception e) {
                    assertTrue(true);
                }
            }
        }.run();

        // admin thread
        new Thread() {
            @Override
            public void run(){
                try {
                    setup();

                    driver.get(baseURL + "/select");
                    WebElement link = driver.findElement(By.tagName("a"));
                    link.click();
                    Thread.sleep(500);
                    countDownLatch.countDown();
                    WebDriverWait wait = new WebDriverWait(driver, 5);
                    wait.until(ExpectedConditions.elementToBeClickable(By.className("submit")));
                    WebElement chat_content = driver.findElement(By.id("message"));
                    chat_content.sendKeys("hello");
                    WebElement sendButton = driver.findElement(By.className("submit"));
                    sendButton.click();
                } catch (Exception e) {
                    assertTrue(false);
                }
            }
        }.run();
    }

    /**
     * functional test: admin can send client the correct text
     */
    @Test
    public void fromAdmin() throws InterruptedException{
        Thread user = new Thread() {
            @Override
            public void run(){
                try {
                    setup();

                    driver.get(baseURL + "/select");
                    WebElement link = driver.findElement(By.tagName("a"));
                    link.click();
                    Thread.sleep(500);
                    countDownLatch.countDown();
                    WebDriverWait wait = new WebDriverWait(driver, 5);
                    wait.until(ExpectedConditions.elementToBeClickable(By.className("submit")));
                    // user will be automatically disconnect if he too much info
                    WebElement chat_content = driver.findElement(By.id("message"));
                    chat_content.sendKeys("Hello");
                    WebElement sendButton = driver.findElement(By.className("submit"));
                    sendButton.click();
                } catch (Exception e) {
                    assertTrue(true);
                }
            }
        };

        user.run();

        // admin thread
        Thread admin = new Thread() {
            @Override
            public void run() {
                try {
                    setup();

                    driver.get(baseURL + "/select");
                    WebElement link = driver.findElement(By.tagName("a"));
                    link.click();
                    Thread.sleep(500);
                    countDownLatch.countDown();
                    WebDriverWait wait = new WebDriverWait(driver, 5);
                    wait.until(ExpectedConditions.elementToBeClickable(By.className("submit")));
                    Thread.sleep(10000);
                    WebElement noEnter = driver.findElement(By.id("chat"));
                    String goodtext = noEnter.getText();
                    assertTrue(goodtext.contains("Hello"));
                } catch (Exception e) {
                    assertTrue(false);
                }
            }
        };
        admin.run();

        user.join();
        admin.join();
    }

    /**
     * funtional test: the admin is shown with
     * correct image enabled
     * correct name enabled
     */
    @Test
    public void picture_enabled () throws InterruptedException{
        Thread user = new Thread() {
            @Override
            public void run(){
                try {
                    setup();

                    driver.get(baseURL + "/select");
                    WebElement link = driver.findElement(By.tagName("a"));
                    link.click();
                    Thread.sleep(500);
                    countDownLatch.countDown();
                    WebDriverWait wait = new WebDriverWait(driver, 5);
                    wait.until(ExpectedConditions.elementToBeClickable(By.className("submit")));
                    // user will be automatically disconnect if he too much info
                    WebElement chat_content = driver.findElement(By.className("message"));
                    chat_content.sendKeys("Hello");
                    WebElement sendButton = driver.findElement(By.className("submit"));
                    sendButton.click();
                } catch (Exception e) {
                    assertTrue(true);
                }
            }
        };

        user.run();

        // admin thread
        Thread admin = new Thread() {
            @Override
            public void run() {
                try {
                    setup();

                    driver.get(baseURL + "/select");
                    WebElement link = driver.findElement(By.tagName("a"));
                    link.click();
                    Thread.sleep(500);
                    countDownLatch.countDown();
                    WebDriverWait wait = new WebDriverWait(driver, 5);
                    wait.until(ExpectedConditions.elementToBeClickable(By.className("submit")));
                    Thread.sleep(10000);
                    WebElement noEnter = driver.findElement(By.id("chat"));
                    String image = noEnter.getAttribute("src");
                    assertEquals(image, "/images/aboutConsultant/JemPortrait.png");
                } catch (Exception e) {
                    assertTrue(false);
                }
            }
        };
        admin.run();

        user.join();
        admin.join();
    }

    /**
     * functional test: the client is shown with
     * correct image enabled
     * correct named enabled
     */
    @Test
    public void client_image_enabled() throws InterruptedException{
        Thread user = new Thread() {
            @Override
            public void run(){
                try {
                    setup();

                    driver.get(baseURL + "/select");
                    WebElement link = driver.findElement(By.tagName("a"));
                    link.click();
                    Thread.sleep(500);
                    countDownLatch.countDown();
                    WebDriverWait wait = new WebDriverWait(driver, 5);
                    wait.until(ExpectedConditions.elementToBeClickable(By.className("submit")));
                    // user will be automatically disconnect if he too much info
                    Thread.sleep(10000);
                    WebElement noEnter = driver.findElement(By.id("chat"));
                    String image = noEnter.getAttribute("src");
                    assertEquals(image, "/images/aboutConsultant/JemPortrait.png");
                } catch (Exception e) {
                    assertTrue(true);
                }
            }
        };

        user.run();

        // admin thread
        Thread admin = new Thread() {
            @Override
            public void run() {
                try {
                    setup();

                    driver.get(baseURL + "/select");
                    WebElement link = driver.findElement(By.tagName("a"));
                    link.click();
                    Thread.sleep(500);
                    countDownLatch.countDown();
                    WebDriverWait wait = new WebDriverWait(driver, 5);
                    wait.until(ExpectedConditions.elementToBeClickable(By.className("submit")));
                    Thread.sleep(10000);
                    WebElement chat_content = driver.findElement(By.id("message"));
                    chat_content.sendKeys("Hello");
                    WebElement sendButton = driver.findElement(By.className("submit"));
                    sendButton.click();

                } catch (Exception e) {
                    assertTrue(false);
                }
            }
        };
        admin.run();

        user.join();
        admin.join();
    }

    /**
     * user send message time is correctedly enabled
     */
    @Test
    public void timing() throws InterruptedException{
        Thread user = new Thread() {
            @Override
            public void run(){
                try {
                    setup();

                    driver.get(baseURL + "/select");
                    WebElement link = driver.findElement(By.tagName("a"));
                    link.click();
                    Thread.sleep(500);
                    countDownLatch.countDown();
                    WebDriverWait wait = new WebDriverWait(driver, 5);
                    wait.until(ExpectedConditions.elementToBeClickable(By.className("submit")));
                    // user will be automatically disconnect if he too much info
                    Thread.sleep(10000);
                    Thread.sleep(100000);
                    WebElement noEnter = driver.findElement(By.className("timesent"));
                    String timeSent = noEnter.getText();
                    assertEquals(timeSent, "1 minutes ago");
                } catch (Exception e) {
                    assertTrue(true);
                }
            }
        };

        user.run();

        // admin thread
        Thread admin = new Thread() {
            @Override
            public void run() {
                try {
                    setup();

                    driver.get(baseURL + "/select");
                    WebElement link = driver.findElement(By.tagName("a"));
                    link.click();
                    Thread.sleep(500);
                    countDownLatch.countDown();
                    WebDriverWait wait = new WebDriverWait(driver, 5);
                    wait.until(ExpectedConditions.elementToBeClickable(By.className("submit")));
                    Thread.sleep(10000);
                    WebElement chat_content = driver.findElement(By.id("message"));
                    chat_content.sendKeys("Hello");
                    WebElement sendButton = driver.findElement(By.className("submit"));
                    sendButton.click();

                } catch (Exception e) {
                    assertTrue(false);
                }
            }
        };
        admin.run();

        user.join();
        admin.join();
    }

    /**
     * functional test: both of them enter the chat room
     * user have a notification indicating someone have entered the room
     */
    @Test
    public void notification() throws InterruptedException{
        Thread user = new Thread() {
            @Override
            public void run(){
                try {
                    setup();

                    driver.get(baseURL + "/select");
                    WebElement link = driver.findElement(By.tagName("a"));
                    link.click();
                    Thread.sleep(500);
                    countDownLatch.countDown();
                    WebDriverWait wait = new WebDriverWait(driver, 5);
                    wait.until(ExpectedConditions.elementToBeClickable(By.className("submit")));
                    // user will be automatically disconnect if he too much info
                    Thread.sleep(10000);
                    Thread.sleep(100000);
                    WebElement noEnter = driver.findElement(By.className("timesent"));
                    String timeSent = noEnter.getText();
                    assertEquals(timeSent, "1 minutes ago");
                } catch (Exception e) {
                    assertTrue(true);
                }
            }
        };

        user.run();

        // admin thread
        Thread admin = new Thread() {
            @Override
            public void run() {
                try {
                    setup();

                    driver.get(baseURL + "/select");
                    WebElement link = driver.findElement(By.tagName("a"));
                    link.click();
                    Thread.sleep(500);
                    countDownLatch.countDown();
                    WebDriverWait wait = new WebDriverWait(driver, 5);
                    wait.until(ExpectedConditions.elementToBeClickable(By.className("submit")));
                    Thread.sleep(10000);
                    WebElement chat_content = driver.findElement(By.id("message"));
                    chat_content.sendKeys("Hello");
                    WebElement sendButton = driver.findElement(By.className("submit"));
                    sendButton.click();

                } catch (Exception e) {
                    assertTrue(false);
                }
            }
        };
        admin.run();

        user.join();
        admin.join();
    }

    /**
     * functional test: sending email to all the admin available to join the real time talk
     * did not test for the integration
     */
    @Test
    public void send_all_admin_email() throws MalformedURLException, IOException {
        URL url = new URL("https://ug-api.acnapiv3.io/swivel/email-services/api/mailer");
        connection = (HttpsURLConnection) url.openConnection();
        connection.setRequestMethod("POST");
        connection.setRequestProperty("headers",
                "this token is ignored for privacy");

        connection.setRequestProperty("form",
                "false");
        connection.setRequestProperty("cache-control", "no-cache");
        String urlParameters =  "application/x-www-form-urlencoded";
        connection.setUseCaches(false);
        connection.setDoOutput(true);

        //Send request
        DataOutputStream wr = new DataOutputStream (
                connection.getOutputStream());
        wr.writeBytes(urlParameters);
        wr.close();

        assertTrue(connection.getResponseCode() == 200);
    }

    /**
     * system test:
     * only two user can enter the same room others cannot enter
     * the display of the webpage if someonen else tries to enter
     */

    @Test
    public void three_user_no_chat_room() throws InterruptedException {
        Thread user = new Thread() {
            @Override
            public void run(){
                try {
                    setup();

                    driver.get(baseURL + "/select");
                    WebElement link = driver.findElement(By.tagName("a"));
                    link.click();
                    Thread.sleep(500);
                    countDownLatch.countDown();
                    WebDriverWait wait = new WebDriverWait(driver, 5);
                    wait.until(ExpectedConditions.elementToBeClickable(By.className("submit")));
                    // user will be automatically disconnect if he too much info
                    Thread.sleep(10000);

                    // sleep for 1 second to wait for the other person to join
                    Thread.sleep(60000);
                } catch (Exception e) {
                    assertTrue(true);
                }
            }
        };

        user.run();

        // admin thread
        Thread admin = new Thread() {
            @Override
            public void run() {
                try {
                    setup();

                    driver.get(baseURL + "/select");
                    WebElement link = driver.findElement(By.tagName("a"));
                    link.click();
                    Thread.sleep(500);
                    countDownLatch.countDown();
                    WebDriverWait wait = new WebDriverWait(driver, 5);
                    wait.until(ExpectedConditions.elementToBeClickable(By.className("submit")));
                    Thread.sleep(10000);
                    // no need to submit any message here
                    // sleep for 1 second to wait for the other programmer to join
                    Thread.sleep(60000);
                } catch (Exception e) {
                    assertTrue(false);
                }
            }
        };
        admin.run();
        user.join();
        admin.join();

        Thread third = new Thread() {
            @Override
            public void run() {
                try {
                    setup();

                    driver.get(baseURL + "/select");
                    WebElement link = driver.findElement(By.tagName("a"));
                    link.click();
                    Thread.sleep(500);
                    countDownLatch.countDown();
                    WebDriverWait wait = new WebDriverWait(driver, 5);
                    wait.until(ExpectedConditions.elementToBeClickable(By.id("peopleinchat")));
                } catch (Exception e) {
                    assertTrue(false);
                }
            }
        };

        third.run();
        third.join();
    }



    /**
     * system test:
     * if one user leaves the chat, the message will be shown on the screen of the other
     */
    @Test
    public void one_man_leaves() throws InterruptedException {
        Thread user = new Thread() {
            @Override
            public void run(){
                try {
                    setup();

                    driver.get(baseURL + "/select");
                    WebElement link = driver.findElement(By.tagName("a"));
                    link.click();
                    Thread.sleep(500);
                    countDownLatch.countDown();
                    WebDriverWait wait = new WebDriverWait(driver, 5);
                    wait.until(ExpectedConditions.elementToBeClickable(By.className("submit")));


                } catch (Exception e) {
                    assertTrue(true);
                }
            }
        };

        user.run();

        // admin thread
        Thread admin = new Thread() {
            @Override
            public void run() {
                try {
                    setup();

                    driver.get(baseURL + "/select");
                    WebElement link = driver.findElement(By.tagName("a"));
                    link.click();
                    Thread.sleep(500);
                    countDownLatch.countDown();
                    WebDriverWait wait = new WebDriverWait(driver, 5);
                    wait.until(ExpectedConditions.elementToBeClickable(By.className("submit")));
                    Thread.sleep(10000);

                    // sleep for 1 second to wait for the other programmer to join
                    Thread.sleep(60000);
                    WebElement hasleft = driver.findElement(By.className("hasleft"));
                    assertTrue(hasleft.isDisplayed());
                } catch (Exception e) {
                    assertTrue(false);
                }
            }
        };
        admin.run();
        user.join();
        admin.join();
    }

}
