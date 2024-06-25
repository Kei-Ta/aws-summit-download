require('dotenv').config();
const { Builder, By, until } = require('selenium-webdriver');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const chrome = require('selenium-webdriver/chrome');

(async function downloadFiles() {
    // Set up the Chrome options to run in headless mode
    let options = new chrome.Options();
    options.addArguments('--headless');
    options.addArguments('--disable-gpu');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');

    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    try {
        console.log("start script");
        const loginUrl = 'https://jpsummit-smp24.awsevents.com/public/mypage?lang=ja';
        const downloadPageUrl = 'https://jpsummit-smp24.awsevents.com/public/application/add/273';
        const username = process.env.USERNAME;
        const password = process.env.PASSWORD;

        // Open the login page
        await driver.get(loginUrl);

        // Find the username and password fields and enter the credentials
        await driver.findElement(By.name('login_id')).sendKeys(username);
        await driver.findElement(By.name('login_password')).sendKeys(password);

        // Find and click the login button
        // Wait until the login button is present and interactable, then click it
        let loginButton = await driver.wait(until.elementLocated(By.xpath('//button[contains(@class, "btn-primary") and text()="ログイン"]')));
        await driver.wait(until.elementIsVisible(loginButton));
        await loginButton.click();
        await driver.wait(until.elementLocated(By.xpath('//a[@title="資料一覧サイト"]')), 5000);

        console.log("success login and move download page");

        await driver.get(downloadPageUrl);


        // Find all download links
        let links = await driver.findElements(By.xpath('//a[contains(@href, ".pdf") or contains(@href, ".zip")]'));

        console.log(`Found ${links.length} downloadable links on the page.`);

        // Create a directory for downloads if it doesn't exist
        if (!fs.existsSync('downloads')) {
            fs.mkdirSync('downloads');
        }

        // Download each file
        for (let link of links) {
            let href = await link.getAttribute('href');
            let fileName = path.basename(href);
            let filePath = path.join('downloads', fileName);

            // Use axios to download the file
            let response = await axios({
                method: 'get',
                url: href,
                responseType: 'stream'
            });

            response.data.pipe(fs.createWriteStream(filePath));

            console.log(`Downloaded: ${fileName}`);
        }

        console.log('All files downloaded.');

    } catch (err) {
        console.error("download failed");
        // console.error(err);
    } finally {
        // Close the browser
        await driver.quit();
    }
})();
