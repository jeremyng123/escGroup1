package tests.java;

import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static junit.framework.TestCase.assertTrue;
import static org.junit.Assert.assertEquals;

public class RTchat {

    private final String USERNAME = System.getenv("ESC_USER_USERNAME");
    private final String PASSWORD = System.getenv("ESC_USER_PASSWORD");
    private final String PHONENUMBER = System.getenv("ESC_PHONENUMBER");
    private final String baseURL = "https://escgroup-1.herokuapp.com";
    private String username = "hongpengfei.emrys@gmail.com";
    private String userpassword = "mona.lisa";
    private String adminname = "jeremyng123@gmail.com";
    private String email = "1234567890";

    private WebDriver driver;

    protected final String webdriver = "webdriver.gecko.driver";
    protected final String pathtoDriver = System.getenv("HOME") + "Users/emrys/Documents/geckodriver";

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
        java.util.List<WebElement> links = driver.findElements(By.className("a"));
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
     * it will lead the url to
     */
    @Test
    public void talk_with_specific_admin_send_email() throws InterruptedException{

    }

    /**
     * system testing: after user talk with specific admin user is redirected to the correct address with users id
     */

    /**
     * system testing: after admin login the system with his own account
     * the url is displayed correctly with /users + userid
     */

    /**
     * system tesing: after admin login the sytem with correct adminId
     * he can enter the url with correctedId
     * he will be lead to the correct url with userID
     */

    /**
     * robutness testing: user cannot send message too quickly
     * the website will limit the speed of the message being sent
     */

    /**
     * robutness testing: either user or the admin cannot enter the the message as XSS attach
     * the system will filter it out
     */

    /**
     * functional test: client can send admin the correct text
     */

    /**
     * functional test: admin can send client the correct text
     */

    /**
     * funtional test: the admin is shown with
     * correct image enabled
     * correct name enabled
     */

    /**
     * functional test: the client is shown with
     * correct image enabled
     * correct named enabled
     */

    /**
     * user send message time is correctedly enabled
     */


    /**
     * functional test: both of them enter the chat room
     * user have a notification indicating someone have entered the room
     */


    /**
     * functional test: sending email to all the admin available to join the real time talk
     */

    /**
     * system test:
     * only two user can enter the same room others cannot enter
     * the display of the webpage if someonen else tries to enter
     */

    /**
     * system test:
     * if one user leaves the chat, the message will be shown on the screen of the other
     */

    /**
     * whole system integrationn test:
     * real time chat flow with individual admin
     */

    /**
     * whole system integration test:
     * real time chat flow with all admin
     */
}
