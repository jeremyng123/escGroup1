public class DriverProperty {
    protected static final String webdriver = "webdriver.chrome.driver";
    public int abc = 1;
    protected static final String pathtoDriver = "C:\\Users\\jem\\Documents\\myVSCprojects\\webapp_testing_modules\\chromedriver_win32\\chromedriver.exe";



    public static String getWebdriver() {
        return webdriver;
    }

    public static String getPathtoDriver() {
        return pathtoDriver;
    }

}
