// ============================================================
//  Jones Automation - Exercise
//  Automates the contact form on https://test.netlify.app/
// ============================================================

// 1) Import the "chromium" browser from the Playwright library.
const { chromium } = require('playwright');

// 2) Wrap everything in an async function so we can use "await".
//    "await" waits for each browser action to finish before the next.
async function run() {
  // 3) Launch the browser.
  //    channel: 'msedge' -> use Microsoft Edge (Chromium-based) that is
  //                         already installed on the machine.
  //    headless: false   -> show the browser window so we can watch it.
  //    slowMo: 500        -> slow each action by 500ms to follow along.
  const browser = await chromium.launch({ channel: 'msedge', headless: false, slowMo: 500 });

  // 4) Open a new page (tab).
  const page = await browser.newPage();

  // 5) Go to the target website.
  await page.goto('https://test.netlify.app/');

  // 6) Fill in the form fields (found by their placeholder text).
  await page.getByPlaceholder('Your full name').fill('Dema Said');
  await page.getByPlaceholder('Your email address').fill('dema.said@example.com');
  await page.getByPlaceholder('Your phone number').fill('0521234567');
  await page.getByPlaceholder('Company name').fill('Jones Automation');
  await page.getByPlaceholder('example.com').fill('https://www.example.com');

  // 7) BONUS: Change "Number of Employees" from "1-10" to "51-500".
  await page.getByRole('combobox').selectOption('51-500');

  // 8) Take a screenshot BEFORE clicking the button.
  await page.screenshot({ path: 'before-submit.png', fullPage: true });
  console.log('Screenshot saved as before-submit.png');

  // 9) Click the "Request a call back" button.
  await page.getByRole('button', { name: 'Request a call back' }).click();

  // 10) Wait for the thank-you page and log a message.
  await page.waitForLoadState('networkidle');
  console.log('Reached the thank you page!');

  // 11) Close the browser.
  await browser.close();
}

// Start the automation.
run();