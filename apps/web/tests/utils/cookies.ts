import type { Page } from '@playwright/test';

export async function acceptOrCloseCookieBanner(page: Page) {
  await page.waitForTimeout(2000);

  const cookieBanner = page.getByRole('dialog', {
    name: 'Cookie Consent Banner',
  });

  await cookieBanner.waitFor({ state: 'visible', timeout: 3000 });

  if (!(await cookieBanner.isVisible())) {
    return;
  }

  const closeButton = cookieBanner.getByRole('button', {
    name: 'Close this dialog',
  });
  const acceptButton = cookieBanner.getByRole('button', {
    name: 'Accept',
  });

  if (await closeButton.isVisible()) {
    await closeButton.click({ timeout: 10000 });
  } else {
    await acceptButton.click({ timeout: 10000 });
  }

  await page.waitForTimeout(3000);
}
