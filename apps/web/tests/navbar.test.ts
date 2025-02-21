import { expect, test } from '@playwright/test';
import { snapshotConfig } from './constants';
import { acceptOrCloseCookieBanner } from './utils/cookies';

test('Navbar', async ({ page }) => {
  await test.step('go to homepage', async () => {
    await page.goto('/');
    await acceptOrCloseCookieBanner(page);
  });

  await test.step('navbar screenshot', async () => {
    const navbar = page.getByTestId('navbar');
    await page.waitForTimeout(2000);
    expect(
      await navbar.screenshot({
        animations: 'disabled',
        timeout: 10_000,
        mask: [page.getByTestId('dots-animation')],
      }),
    ).toMatchSnapshot('navbar.png', snapshotConfig);
  });

  await test.step('assert navbar is properly displayed', async () => {
    const navbar = page.getByTestId('navbar');
    await expect(
      navbar.getByRole('link', { name: 'Navigate to the home page' }),
    ).toBeVisible();
    await expect(
      navbar.getByRole('link', { name: 'Get started' }),
    ).toBeVisible();
    await expect(navbar.getByRole('link', { name: 'Platform' })).toBeVisible();
    await expect(
      navbar.getByRole('link', { name: 'Developers' }),
    ).toBeVisible();
    await expect(navbar.getByRole('link', { name: 'Community' })).toBeVisible();
  });
});
