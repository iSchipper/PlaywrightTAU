import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../pages/homePage';


const URL = 'https://playwright.dev/';
let homePage: HomePage;

test.beforeEach(async({page}) =>{
  await page.goto(URL);
  homePage = new HomePage(page);
});

async function clickGetStarted(page: Page) {
  await homePage.clickGetStarted();
};

test.describe('Playwright website', () => {
  test('has title', async () => {  
    // Expect a title "to contain" a substring.
    await homePage.assertPageTitle();
    });
    
  test('get started link', async ({ page }) => {  
    // Click the get started link.
    await clickGetStarted(page);
    
    // Expects page to have a heading with the name 'Installation'.
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
    });
    
  test('Check Java page', async ({page}) => {
    await clickGetStarted(page);
    await page.getByRole('button', {name: 'Node.js'}).hover();
    await page.getByText('Java', {exact: true}).click();
    await expect(page).toHaveURL('https://playwright.dev/java/docs/intro');
    await expect(page.getByText('Installing Playwright', { exact: true })).toBeHidden();
    const javaIntroText = `Playwright is distributed as a set of Maven modules.`
    await expect(page.getByText(javaIntroText)).toBeVisible();
    })
});