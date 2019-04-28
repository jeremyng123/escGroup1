import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.concurrent.TimeUnit;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestNoUser {
    private final String USERNAME = System.getenv("ESC_USER_USERNAME");
    private final String PASSWORD = System.getenv("ESC_USER_PASSWORD");
    private final String PHONENUMBER = System.getenv("ESC_PHONENUMBER");
    private final String baseURL = "https://escgroup-1.herokuapp.com";

    private WebDriver driver;
    private WebElement navbar;
    private WebDriverWait wait;
    /**
     * Run this each time before each test cases!
     *
     * @throws Exception
     */
    @BeforeEach
    public void setUp() throws Exception {
        System.setProperty(DriverProperty.getWebdriver(), DriverProperty.getPathtoDriver());
        driver = new ChromeDriver();
        driver.get(baseURL);
        driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
        wait = new WebDriverWait(driver, 10);
    }

    /**
     * Run this each time after each test cases!
     *
     * @throws Exception
     */
    @AfterEach
    public void tearDown() {
        driver.quit();
        navbar = null;
    }
    /************** Test Cases **************/

    /**
     * Test case: 1 -- check that the Home page has the correct title.
     */
    @Test
    public void testHomePortal() {
        assertEquals("Accenture's ACNAPI Portal", driver.getTitle());
    }

    /**
     * Test case: 2 -- check that the Signup page has the correct title.
     *
     * @throws Exception
     */
    @Test
    public void openSignUpPage() {
        navbar = driver.findElement(By.className("navbar"));
        navbar.findElement(By.id("btn_signup")).click();
        assertEquals("ACNAPI Register", driver.getTitle());
    }

    /**
     * Test case: 3 -- Test prompt user to have longer password
     */
    @Test
    public void testShortPasswordPrompt() {
        String err_code = "err_password";
        navbar = driver.findElement(By.className("navbar"));
        navbar.findElement(By.id("btn_signup")).click();
        driver.findElement(By.name("email")).sendKeys(USERNAME);
        driver.findElement(By.name("firstName")).sendKeys("Balapoopi");
        driver.findElement(By.name("lastName")).sendKeys("Langkawi");
        driver.findElement(By.name("phoneNumber")).sendKeys(PHONENUMBER);
        driver.findElement(By.name("password")).sendKeys("1234567");
        driver.findElement(By.name("password2")).sendKeys("1234567", Keys.ENTER);

        WebElement err = wait.until(ExpectedConditions.presenceOfElementLocated(By.id(err_code)));
        assertEquals("Ensure that your password has a minimum of 8 characters", driver.findElement(By.id("err_password")).getText());
    }

    /**
     * Test case: 4 -- Test prompt user to only have alphanumberics + special characters that are ASCII formatted
     */
    @Test
    public void testInvalidCharactersInPassword() {
        String err_code = "err_password";

        navbar = driver.findElement(By.className("navbar"));
        navbar.findElement(By.id("btn_signup")).click();
        driver.findElement(By.name("email")).sendKeys(USERNAME);
        driver.findElement(By.name("firstName")).sendKeys("Balapoopi");
        driver.findElement(By.name("lastName")).sendKeys("Langkawi");
        driver.findElement(By.name("phoneNumber")).sendKeys(PHONENUMBER);
        driver.findElement(By.name("password")).sendKeys("1234567我爱你");
        driver.findElement(By.name("password2")).sendKeys("1234567我爱你", Keys.ENTER);

        WebElement err = wait.until(ExpectedConditions.presenceOfElementLocated(By.id(err_code)));
        assertEquals("Invalid characters in password, try another one!", err.getText());
    }

    /**
     * Test case: 5 -- Test prompt user to have valid 8 digit phone number
     */
    @Test
    public void testInvalidPhoneNumber() {
        String err_code = "err_phoneNumber";


        navbar = driver.findElement(By.className("navbar"));
        navbar.findElement(By.id("btn_signup")).click();
        driver.findElement(By.name("email")).sendKeys(USERNAME);
        driver.findElement(By.name("firstName")).sendKeys("Balapoopi");
        driver.findElement(By.name("lastName")).sendKeys("Langkawi");
        driver.findElement(By.name("phoneNumber")).sendKeys("1234567");
        driver.findElement(By.name("password")).sendKeys(PASSWORD);
        driver.findElement(By.name("password2")).sendKeys(PASSWORD, Keys.ENTER);

        WebElement err = wait.until(ExpectedConditions.presenceOfElementLocated(By.id(err_code)));
        assertEquals("Key in a valid phone number with 8 digits (i.e. 91234567). Omit all special characters and spaces.", err.getText());
    }

    /**
     * Test case: 6 -- Test prompt user to have proper email
     */
    @Test
    public void testInvalidEmail() {
        String err_code = "err_email";

        navbar = driver.findElement(By.className("navbar"));
        navbar.findElement(By.id("btn_signup")).click();
        driver.findElement(By.name("email")).sendKeys("some_invalid_email@192.168.0.1");
        driver.findElement(By.name("firstName")).sendKeys("Balapoopi");
        driver.findElement(By.name("lastName")).sendKeys("Langkawi");
        driver.findElement(By.name("phoneNumber")).sendKeys(PHONENUMBER);
        driver.findElement(By.name("password")).sendKeys(PASSWORD);
        driver.findElement(By.name("password2")).sendKeys(PASSWORD, Keys.ENTER);

        WebElement err = wait.until(ExpectedConditions.presenceOfElementLocated(By.id(err_code)));
        assertEquals("Please use valid email!", err.getText());
    }

    /**
     * Test case: 7 -- Prompts user that confirmation password is not the same as password input
     */
    @Test
    public void testDifferentPasswordInput() {
        String err_code = "err_password2";

        navbar = driver.findElement(By.className("navbar"));
        navbar.findElement(By.id("btn_signup")).click();
        driver.findElement(By.name("email")).sendKeys(USERNAME);
        driver.findElement(By.name("firstName")).sendKeys("Balapoopi");
        driver.findElement(By.name("lastName")).sendKeys("Langkawi");
        driver.findElement(By.name("phoneNumber")).sendKeys(PHONENUMBER);
        driver.findElement(By.name("password")).sendKeys(PASSWORD);
        driver.findElement(By.name("password2")).sendKeys(PASSWORD + "12", Keys.ENTER);

        WebElement err = wait.until(ExpectedConditions.presenceOfElementLocated(By.id(err_code)));
        assertEquals("Those passwords didn't match. Try again.", err.getText());
    }

    /**
     * Test case: 8 -- Inform existing account found
     */
    @Test
    public void testExistingAccount() {
        String err_code = "err_email";

        navbar = driver.findElement(By.className("navbar"));
        navbar.findElement(By.id("btn_signup")).click();
        driver.findElement(By.name("email")).sendKeys(USERNAME);
        driver.findElement(By.name("firstName")).sendKeys("Balapoopi");
        driver.findElement(By.name("lastName")).sendKeys("Langkawi");
        driver.findElement(By.name("phoneNumber")).sendKeys(PHONENUMBER);
        driver.findElement(By.name("password")).sendKeys(PASSWORD);
        driver.findElement(By.name("password2")).sendKeys(PASSWORD, Keys.ENTER);

        WebElement err = wait.until(ExpectedConditions.presenceOfElementLocated(By.id(err_code)));
        assertEquals("Email is already in use. Please login using your email or reset your password", err.getText());
    }

    /**
     * Test case: 9 -- Open login page
     */
    @Test
    public void openLoginPage() {
        navbar = driver.findElement(By.className("navbar"));
        navbar.findElement(By.id("btn_login")).click();
        assertEquals("ACNAPI Login", driver.getTitle());
    }

    /**
     * Test case: 10 -- Try wrong login credentials
     */
    @Test
    public void testWrongLoginCredentials() {
        navbar = driver.findElement(By.className("navbar"));
        navbar.findElement(By.id("btn_login")).click();
        driver.findElement(By.name("email")).sendKeys(USERNAME);
        driver.findElement(By.name("password")).sendKeys(PASSWORD + "wrong", Keys.ENTER);
        assertEquals("ACNAPI Login", driver.getTitle());     // check that it redirects back to login page
    }

    /**
     * Test case: 11 -- Try correct login credentials
     */
    @Test
    public void testLoginCredentials() {
        navbar = driver.findElement(By.className("navbar"));
        navbar.findElement(By.id("btn_login")).click();
        driver.findElement(By.name("email")).sendKeys(USERNAME);
        driver.findElement(By.name("password")).sendKeys(PASSWORD, Keys.ENTER);
        assertEquals("Accenture's ACNAPI Portal", driver.getTitle());     // check that it redirects back to home
    }

    /**
     * Test case: 12 -- Try visiting different routes and ensuring that the user returns to signup page
     */
    @Test
    public void testDifferentRoutesNotLoggedIn() {
        navbar = driver.findElement(By.className("navbar"));
        navbar.findElement(By.id("btn_tickets")).click();
        assertEquals("ACNAPI Register", driver.getTitle());     // check that it redirects back to login page
        navbar = driver.findElement(By.className("navbar"));
        navbar.findElement(By.id("btn_ticket-form")).click();
        assertEquals("ACNAPI Register", driver.getTitle());     // check that it redirects back to login page
        navbar = driver.findElement(By.className("navbar"));
        navbar.findElement(By.id("btn_chat")).click();
        assertEquals("ACNAPI Register", driver.getTitle());     // check that it redirects back to login page
        navbar = driver.findElement(By.className("navbar"));
        navbar.findElement(By.id("btn_consultant")).click();
        assertEquals("Bootstrap 4 Website Example", driver.getTitle());     // check that it redirects back to login page
    }
}
