import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  expect(await page.locator('h1').innerText()).toContain(
    'Pokemon Team Builder'
  );
});

test('shows profile selector', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('select')).toBeVisible();
  await expect(page.getByPlaceholder('New profile name')).toBeVisible();
});
