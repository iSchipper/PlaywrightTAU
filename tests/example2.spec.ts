import { test, type Page } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { TopNavBar } from '../pages/topNavBar';

const URL = 'https://playwright.dev/';
let homePage: HomePage;
let topNavBar: TopNavBar;
const pageUrl = /.*intro/;

test.beforeEach(async ({page}) => {
    await page.goto(URL);
    homePage = new HomePage(page);
});

async function clickGetStarted(page: Page) {
    await homePage.clickGetStarted();
    topNavBar = new TopNavBar(page);
}

test.describe('Playwright website', () => {

    test('has title', async () => {
        await homePage.assertPageTitle();
    });
    
    test('get started link', async ({ page }) => {
        // Act
        await clickGetStarted(page);
        // Assert
        await topNavBar.assertPageUrl(pageUrl);
    });
    
    test('check Java page', async ({ page }) => {
        await test.step('Act', async () => {
            await clickGetStarted(page);
            await topNavBar.hoverNode();
            await topNavBar.clickJava();
        });
      
        await test.step('Assert', async () => {
            await topNavBar.assertPageUrl(pageUrl);
            await topNavBar.assertNodeDescriptionNotVisible();
            await topNavBar.assertJavaDescriptionVisible();
        });
    });
});