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

test('full flow: create profile, select pokemon, save team', async ({ page }) => {
  await page.goto('/');

  // Wait for page to load
  await expect(page.locator('select')).toBeVisible();

  // Create a new profile
  const profileName = `e2e-${Date.now()}`;
  await page.getByPlaceholder('New profile name').fill(profileName);
  await page.getByRole('button', { name: 'Create' }).click();

  // Wait for Save Team button — means profile was created and team UI is visible
  await expect(page.getByRole('button', { name: 'Save Team' })).toBeVisible({ timeout: 10000 });

  // Wait for pokemon grid to load
  await expect(page.getByAltText('bulbasaur')).toBeVisible({ timeout: 10000 });

  // Select 3 pokemon
  await page.getByAltText('bulbasaur').click();
  await page.getByAltText('ivysaur').click();
  await page.getByAltText('venusaur').click();

  // Save team
  await page.getByRole('button', { name: 'Save Team' }).click();
  await expect(page.getByRole('button', { name: 'Save Team' })).toBeEnabled({ timeout: 10000 });
});
