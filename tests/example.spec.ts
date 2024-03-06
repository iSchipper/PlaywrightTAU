import { test, expect } from '@playwright/test';

const homeUrl = 'https://playwright.dev/';

test('has title', async ({ page }) => {
  await page.goto(homeUrl);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto(homeUrl);

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});


/**
 * Open the page
 * Click 'Get Started'
 * Mouse hover the language dropdown
 * Click at Java
 * Check the URL
 * Check the text 'Installing Playwright' is not being displayed
 * Check the text below is displayed:
 * 'Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml 
 * as described below. If you're not familiar with Maven please refer to its documentation.'
 */

test('Check Java page', async ({page}) => {
  await page.goto(homeUrl);
  await page.getByRole('link', {name: 'Get started'}).click();
  await page.hover('a[class="navbar__link"]');
})