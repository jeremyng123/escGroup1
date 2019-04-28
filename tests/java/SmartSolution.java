package tests.java;



import javafx.scene.effect.InnerShadow;
import org.junit.Before;
import org.junit.Test;
import org.junit.experimental.theories.Theories;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.nio.channels.WritableByteChannel;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
    String searchString = "list-comprehension";
    private WebDriver driver;

    protected final String webdriver = "webdriver.gecko.driver";
    protected final String pathtoDriver =  "Users/emrys/Documents/geckodriver";

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
    @Test
    public void click_ticket_solution() throws InterruptedException {
        setup();
        WebElement ticket = driver.findElement(By.id("btn_ticket_form"));
        ticket.click();
        String currentUrl = driver.getCurrentUrl();
        assertEquals(currentUrl , baseURL + "/ticket_form/basics");
    }
    /**
     * UI test
     * /ticket_form/basics
     * issue type diplay content
     * description hidden test
     */
    @Test
    public void basics_UI() throws InterruptedException {
        setup();
        WebElement ticket = driver.findElement(By.id("btn_ticket_form"));
        ticket.click();
        WebElement formGroup = driver.findElement(By.className("form-group"));
        assertTrue(formGroup.isDisplayed());

        WebElement fromControl = driver.findElement(By.className("form-control"));
        assertTrue(fromControl.isDisplayed());

        WebElement progress = driver.findElement(By.className("progress"));
        assertTrue(progress.isDisplayed());
    }

    /**
     * UI test
     * /ticket_form/basics
     * UI size and style
     */
    @Test
    public void basics_UI_style() throws InterruptedException {
        setup();
        WebElement ticket = driver.findElement(By.id("btn_ticket_form"));
        ticket.click();
        WebElement topic = driver.findElement(By.tagName("form-group"));
        String topic_height = topic.getCssValue("height");
        String topic_display = topic.getCssValue("display");
        assertEquals(topic_height, "20px");
        assertEquals(topic_display, "flex");

        WebElement editor = driver.findElement(By.tagName("editor"));
        String editor_backgroud = editor.getCssValue("z-index");
        assertEquals(editor_backgroud, "1");

    }


    /**
     * functional test, correct url for checking solution button
     */
    @Test
    public void suggestion_url() throws InterruptedException {
        setup();
        WebElement ticket = driver.findElement(By.id("btn_ticket_form"));
        ticket.click();
        Thread.sleep(500);
        WebElement solution_button = driver.findElement(By.className("ghost-round full-width"));
        solution_button.click();
        Thread.sleep(500);

        String currentUrl = driver.getCurrentUrl();
        String pattern = "/ticket_form/solutions";
        Pattern r = Pattern.compile(pattern);
        Matcher matcher = r.matcher(currentUrl);
        assertTrue(matcher.find());
    }

    /**
     * system test:
     * /ticket_form/basics -> /ticket_form/
     */
    @Test
    public void suggestion_button() throws InterruptedException {
        setup();
        WebElement language = driver.findElement(By.className("form-group"));
        language.sendKeys("Python");
        Thread.sleep(500);
        WebElement description = driver.findElement(By.className("editor"));
        description.sendKeys("list comprehension");
        Thread.sleep(500);
        WebElement ticket = driver.findElement(By.id("btn_ticket_form"));
        ticket.click();
        Thread.sleep(500);
        WebElement solution_button = driver.findElement(By.className("ghost-round full-width"));
        solution_button.click();
        Thread.sleep(500);

        String currentUrl = driver.getCurrentUrl();
        String pattern = "(.?)/ticket_form/solutions/(.?)";
        Pattern r = Pattern.compile(pattern);
        Matcher matcher = r.matcher(currentUrl);
        assertTrue(matcher.find());
    }


    /**
     * function testing: accuracy for solution
     */
    @Test
    public void accuracy_smart_solution() throws InterruptedException {
        System.setProperty(webdriver,pathtoDriver);
        driver = new FirefoxDriver();
        driver.get("localhost:5000/smart_solution/"+ searchString);
        WebElement body = driver.findElement(By.tagName("Body"));
        String returnValue = body.getText();

        String[] keyValuePairs = returnValue.split(",");
        List<String> list = new ArrayList<>();
        int acc = 0;

        String[] search_string_list = searchString.split("-");
        for (String pair: keyValuePairs) {
            String[] entry = pair.split(":");
            list.add(entry[1]);
            for (String keyword: search_string_list) {
                if (entry[1].contains(keyword) ) {
                    acc += 1;
                }
            }
        }
        // assumes there is at least one searchable result that is correct
        assertTrue(acc>1);

    }


    /**
     * function testing: time performace for solution
     */
    @Test
    public void performance_smart_solution() throws InterruptedException {
        System.setProperty(webdriver,pathtoDriver);
        driver = new FirefoxDriver();
        WebDriverWait wait = new WebDriverWait(driver, 10);
        final long start_time = System.currentTimeMillis();
        driver.get("localhost:5000/smart_solution/"+ searchString);
        wait.until(ExpectedConditions.presenceOfElementLocated(By.tagName("Body")));
        final long end_time = System.currentTimeMillis();

        long timeTaken = end_time - start_time;
        // assumes the performance to be no more than 10 seconds
        assertTrue(timeTaken < 10000);

    }

    /**
     * UI testing:
     * /solution page for showing the solution of the corrected Url
     */
    @Test
    public void view_solutions() throws InterruptedException {
        setup();
        WebElement language = driver.findElement(By.className("form-group"));
        language.sendKeys("Python");
        Thread.sleep(500);
        WebElement description = driver.findElement(By.className("editor"));
        description.sendKeys("list comprehension");
        Thread.sleep(500);
        WebElement ticket = driver.findElement(By.id("btn_ticket_form"));
        ticket.click();
        Thread.sleep(500);

        List<WebElement> ths = driver.findElements(By.className("th"));
        for (WebElement th: ths) {
            String th_text = th.getText();
            assertTrue(th_text != null);
        }
    }

    /**
     * functional testing: go the detail page of the solution
     * solution is displayed and questions is displayed
     */
    @Test
    public void check_particular_solution() throws InterruptedException {
        setup();
        WebElement language = driver.findElement(By.className("form-group"));
        language.sendKeys("Python");
        Thread.sleep(500);
        WebElement description = driver.findElement(By.className("editor"));
        description.sendKeys("list comprehension");
        Thread.sleep(500);
        WebElement ticket = driver.findElement(By.id("btn_ticket_form"));
        ticket.click();
        Thread.sleep(500);
        WebElement th = driver.findElement(By.className("th"));
        th.click();
        Thread.sleep(500);

        WebElement Answers = driver.findElement(By.className("subtitle"));
        String answer = Answers.getText();
        assertTrue(answer != null);
        assertTrue(Answers.isDisplayed());
    }


    /**
     * system testing:
     * go to solution and previous page and go back
     */
    @Test
    public void going_forward_and_back() throws InterruptedException {
        setup();
        WebElement language = driver.findElement(By.className("form-group"));
        language.sendKeys("Python");
        Thread.sleep(500);
        WebElement description = driver.findElement(By.className("editor"));
        description.sendKeys("list comprehension");
        Thread.sleep(500);
        WebElement ticket = driver.findElement(By.id("btn_ticket_form"));
        ticket.click();
        Thread.sleep(5000);

        // get the details button
        WebElement detail_button = driver.findElement(By.tagName("button"));
        detail_button.click();

        // the details should already be auto filled
        Thread.sleep(500);
        WebElement last_button = driver.findElement(By.tagName("button"));
        last_button.click();
    }

    /**
     * system testing:
     * go to details page to create ticket and go back
     */
    @Test
    public void going_forward_and_forward() throws InterruptedException {
        setup();
        WebElement language = driver.findElement(By.className("form-group"));
        language.sendKeys("Python");
        Thread.sleep(500);
        WebElement description = driver.findElement(By.className("editor"));
        description.sendKeys("list comprehension");
        Thread.sleep(500);
        WebElement ticket = driver.findElement(By.id("btn_ticket_form"));
        ticket.click();
        Thread.sleep(5000);

        // get the details button
        WebElement detail_button = driver.findElement(By.tagName("button"));
        detail_button.click();

        WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.elementToBeClickable(By.className("button")));
    }
}