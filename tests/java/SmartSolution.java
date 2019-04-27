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


public class SmartSolution {
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
     * functional test:
     * send ticket button click
     */

    /**
     * UI test
     * /ticket_form/basics
     * issue type diplay content
     * description hidden test
     */


    /**
     * UI test
     * /ticket_form/basics
     * UI size and style
     */

    /**
     * functional test, correct url for checking solution button
     */


    /**
     * system test:
     * /ticket_form/basics -> /ticket_form/
     */

    /**
     * function testing: accuracy for solution
     */

    /**
     * function testing: time performace for solution
     */

    /**
     * UI testing:
     * /solution page for showing the solution of the corrected Url
     */

    /**
     * functional testing: go the detail page of the solution
     * solution is displayed and questions is displayed
     */

    /**
     * system testing:
     * go to solution and previous page and go back
     */

    /**
     * system testing:
     * go to details page to create ticket and go back
     */
}
