import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.Collections;
import java.util.concurrent.TimeUnit;

public class MonkeyTestISTD {
	private final String USER_USERNAME = System.getenv("ESC_USER_USERNAME");
	private final String ADMIN_USERNAME = System.getenv("ESC_ADMIN_USERNAME");
	private final String PASSWORD = System.getenv("ESC_USER_PASSWORD");
	private final String PHONENUMBER = System.getenv("ESC_PHONENUMBER");
	private final String baseURL = "https://escgroup-1.herokuapp.com";

	private WebDriver driver;
	private WebElement navbar;
	private WebDriverWait wait;

	protected final String webdriver = "webdriver.chrome.driver";
	protected final String pathtoDriver = System.getenv("HOME") + "/Documents/myVSCprojects/webapp_testing_modules/chromedriver_win32/chromedriver.exe";

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

	/**
	 * Not logged in
	 */
	@Test
	public void TestNoUser() {
		// get all the links
		java.util.List<WebElement> links = driver.findElements(By.tagName("a"));
		Collections.shuffle(links);
		for (int i = 0; i < links.size(); i = i + 1) {
			System.out.println("*** Navigating to" + " " + links.get(i).getAttribute("href"));
			if (links.get(i).getAttribute("href") == null)
				continue;
			boolean staleElementLoaded = true;
			while (staleElementLoaded) {
				try {
					driver.navigate().to(links.get(i).getAttribute("href"));
					driver.navigate().back();
					links = driver.findElements(By.tagName("a"));
					Collections.shuffle(links);
					System.out.println("*** Navigated to" + " " + links.get(i).getAttribute("href"));
					staleElementLoaded = false;
				} catch (StaleElementReferenceException e) {
					staleElementLoaded = true;
				}
			}
		}
	}

	/**
	 * Logged in as a user
	 */
	@Test
	public void TestUser() {
		navbar = driver.findElement(By.className("navbar"));
		navbar.findElement(By.id("btn_login")).click();
		driver.findElement(By.name("email")).sendKeys(USER_USERNAME);
		driver.findElement(By.name("password")).sendKeys(PASSWORD, Keys.ENTER);

		// get all the links
		java.util.List<WebElement> links = driver.findElements(By.tagName("a"));
		Collections.shuffle(links);
		for (int i = 0; i < links.size(); i = i + 1) {
			System.out.println("*** Navigating to" + " " + links.get(i).getAttribute("href"));
			if (links.get(i).getAttribute("href") == null)
				continue;
			boolean staleElementLoaded = true;
			while (staleElementLoaded) {
				try {
					driver.navigate().to(links.get(i).getAttribute("href"));
					driver.navigate().back();
					links = driver.findElements(By.tagName("a"));
					Collections.shuffle(links);
					System.out.println("*** Navigated to" + " " + links.get(i).getAttribute("href"));
					staleElementLoaded = false;
				} catch (StaleElementReferenceException e) {
					staleElementLoaded = true;
				}
			}
		}
	}

	/**
	 * Logged in as admin
	 */
	@Test
	public void TestAdmin() {
		navbar = driver.findElement(By.className("navbar"));
		navbar.findElement(By.id("btn_login")).click();
		driver.findElement(By.name("email")).sendKeys(ADMIN_USERNAME);
		driver.findElement(By.name("password")).sendKeys(PASSWORD, Keys.ENTER);

		// get all the links
		java.util.List<WebElement> links = driver.findElements(By.tagName("a"));
		Collections.shuffle(links);
		for (int i = 0; i < links.size(); i = i + 1) {
			System.out.println("*** Navigating to" + " " + links.get(i).getAttribute("href"));
			if (links.get(i).getAttribute("href") == null)
				continue;
			boolean staleElementLoaded = true;
			while (staleElementLoaded) {
				try {
					driver.navigate().to(links.get(i).getAttribute("href"));
					driver.navigate().back();
					links = driver.findElements(By.tagName("a"));
					Collections.shuffle(links);
					System.out.println("*** Navigated to" + " " + links.get(i).getAttribute("href"));
					staleElementLoaded = false;
				} catch (StaleElementReferenceException e) {
					staleElementLoaded = true;
				}
			}
		}
	}
}
