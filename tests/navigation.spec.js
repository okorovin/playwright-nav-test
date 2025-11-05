import { test, expect } from '@playwright/test';

test.describe('Навигация', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  async function checkPage(page, name) {
    const heading = page.locator('h1');
    await expect(heading).toHaveText(name);
    await expect(heading).toHaveCount(1);
    await expect(page).toHaveTitle(name);
  }

  async function checkLink(page, url, name) {
    const link = page.locator(`a[href="${url}"]`)

    await expect(link).toBeVisible();
    await expect(link).toHaveCount(1);
    await expect(link).toHaveText(name);

    await link.click();
    await expect(page).toHaveURL(url);

    await checkPage(page, name);
  }

  test('Отображается заголовок Home при открытии главной', async ({ page }) => {
    await checkPage(page, 'Home')
  });

  test('Проверка ссылки About', async ({ page }) => {
    await checkLink(page, 'about.html', 'About')
  });

  test('Проверка ссылки Contact', async ({ page }) => {
    await checkLink(page, 'contact.html', 'Contact')
  });


  test('Меню навигации корректно работает со страницы About', async ({ page }) => {
    await page.goto('/about.html');


    await checkLink(page, 'index.html', 'Home')

    await page.goto('/about.html');

    await checkLink(page, 'contact.html', 'Contact')
  });

  test('Меню навигации корректно работает со страницы Contact', async ({ page }) => {
    await page.goto('/contact.html');


    await checkLink(page, 'index.html', 'Home')

    await page.goto('/contact.html');

    await checkLink(page, 'about.html', 'About')
  });

});
