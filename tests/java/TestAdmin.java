import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.concurrent.TimeUnit;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TestAdmin {
    private final String USERNAME = System.getenv("ESC_ADMIN_USERNAME");
    private final String PASSWORD = System.getenv("ESC_USER_PASSWORD");
    private final String PHONENUMBER = System.getenv("ESC_PHONENUMBER");
    private final String baseURL = "https://escgroup-1.herokuapp.com";


    private WebDriver driver;
    private WebElement navbar;
    private WebDriverWait wait;

    @BeforeEach
    public void setUp() {
        System.setProperty(DriverProperty.getWebdriver(), DriverProperty.getPathtoDriver());
        driver = new ChromeDriver();
        driver.get(baseURL);
        driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
        wait = new WebDriverWait(driver, 10);

        /* login to user account first */
        navbar = driver.findElement(By.className("navbar"));
        navbar.findElement(By.id("btn_login")).click();
        driver.findElement(By.name("email")).sendKeys(USERNAME);
        driver.findElement(By.name("password")).sendKeys(PASSWORD, Keys.ENTER);
    }

    @AfterEach
    public void tearDown(){
        driver.quit();
        navbar = null;
    }

    /************** Test Cases **************/

    /**
     * Test case: 1 -- check that the ticket pages are working
     */
    @Test
    public void testTicketClickables(){
        navbar = driver.findElement(By.className("navbar"));
        navbar.findElement(By.id("btn_tickets")).click();
        // get all the links
        List<WebElement> tickets = driver.findElements(By.tagName("tr"));
        Collections.shuffle(tickets);
        for (int i = 0; i < tickets.size(); i = i + 1) {
            if (tickets.get(i).getAttribute("href") == null)
                continue;
            boolean staleElementLoaded = true;
            while (staleElementLoaded) {
                try {
                    driver.navigate().to(tickets.get(i).getAttribute("href"));
                    Thread.sleep(1000);
                    driver.navigate().back();
                    tickets = driver.findElements(By.tagName("tr"));
                    Collections.shuffle(tickets);
                    System.out.println("*** Navigated to" + " " + tickets.get(i).getAttribute("href"));
                    staleElementLoaded = false;
                } catch (StaleElementReferenceException e) {
                    staleElementLoaded = true;
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
        driver.findElement(By.id("tickets1")).click();
        // get all the links
        tickets = driver.findElements(By.tagName("tr"));
        Collections.shuffle(tickets);
        for (int i = 0; i < tickets.size(); i = i + 1) {
            if (tickets.get(i).getAttribute("href") == null)
                continue;
            boolean staleElementLoaded = true;
            while (staleElementLoaded) {
                try {
                    driver.navigate().to(tickets.get(i).getAttribute("href"));
                    Thread.sleep(1000);
                    driver.navigate().back();
                    tickets = driver.findElements(By.tagName("tr"));
                    Collections.shuffle(tickets);
                    System.out.println("*** Navigated to" + " " + tickets.get(i).getAttribute("href"));
                    staleElementLoaded = false;
                } catch (StaleElementReferenceException e) {
                    staleElementLoaded = true;
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
        driver.findElement(By.id("tickets2")).click();
        // get all the links
        tickets = driver.findElements(By.tagName("tr"));
        Collections.shuffle(tickets);
        for (int i = 0; i < tickets.size(); i = i + 1) {
            if (tickets.get(i).getAttribute("href") == null)
                continue;
            boolean staleElementLoaded = true;
            while (staleElementLoaded) {
                try {
                    driver.navigate().to(tickets.get(i).getAttribute("href"));
                    Thread.sleep(1000);
                    driver.navigate().back();
                    tickets = driver.findElements(By.tagName("tr"));
                    Collections.shuffle(tickets);
                    System.out.println("*** Navigated to" + " " + tickets.get(i).getAttribute("href"));
                    staleElementLoaded = false;
                } catch (StaleElementReferenceException e) {
                    staleElementLoaded = true;
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    /**
     * Test case: 2 -- test ticket form (no bugs found)
     */
    @Test
    public void testTicketForm(){
        navbar = driver.findElement(By.className("navbar"));
        navbar.findElement(By.id("btn_ticket-form")).click();
        assertEquals("Creation process: Ticket Basics", driver.getTitle());

        driver.navigate().to(baseURL+"/ticket_form/details");
        assertEquals("ACNAPI Ticket Form", driver.getTitle());

        WebElement tinymce_frame = driver.findElement(By.tagName("iframe"));

        Select topics = new Select(driver.findElement(By.name("topic")));
        List<WebElement> topicOptions = topics.getOptions();
        topics.selectByIndex(new Random().nextInt(topicOptions.size()));
        String title = GA.GA.createRubbishTxt();
        String content = GA.GA.createRubbishTxt();
        driver.findElement(By.name("title")).sendKeys(title);
        driver.switchTo().frame(tinymce_frame);
        driver.findElement(By.tagName("body")).sendKeys(content);
        driver.switchTo().defaultContent();

        driver.findElement(By.className("ghost-round")).click();

        wait.until(ExpectedConditions.titleIs("Accenture's ACNAPI Portal"));
        assertEquals("Accenture's ACNAPI Portal", driver.getTitle());
        navbar = driver.findElement(By.className("navbar"));
        navbar.findElement(By.id("btn_tickets")).click();

        wait.until(ExpectedConditions.textToBePresentInElement(driver.findElement(By.tagName("table")),title));
        System.out.println(driver.getPageSource().contains(title));
        assertTrue(driver.getPageSource().contains(title));
    }
}
