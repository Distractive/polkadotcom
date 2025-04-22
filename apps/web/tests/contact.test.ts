import { expect, test } from '@playwright/test';
import { screenshotConfig, snapshotConfig } from './constants';
import { acceptOrCloseCookieBanner } from './utils/cookies';

test('Contact', async ({ page }) => {
  await test.step('go to "Contact" page', async () => {
    await page.goto('/community/contact');
    await acceptOrCloseCookieBanner(page);
  });

  await test.step('assert title and header are properly displayed', async () => {
    await expect(page).toHaveTitle('Contact');
    const heading = page.locator('h1');
    await expect(heading).toHaveText('Contact Us');
  });

  await test.step('assert "header" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-header');

    await expect(
      section.getByRole('heading', {
        name: 'Contact Us',
      }),
    ).toBeVisible();
    await expect(section.getByTestId('breadcrumb')).toBeVisible();
    await expect(section.getByText('Got questions, feedback, or')).toHaveText(
      'Got questions, feedback, or just want to say hi? The community is waiting for you.',
    );
  });

  await test.step('"header" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-header');
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'header.png',
      snapshotConfig,
    );
  });

  await test.step('assert "questions" section is displayed properly', async () => {
    const section = page.getByTestId('cards-small-block');

    await expect(
      section.getByRole('heading', {
        name: 'Questions and support',
      }),
    ).toBeVisible();
    await expect(section.getByText('If you want to get in touch')).toHaveText(
      'If you want to get in touch with someone, fill out a form below to be connected to the appropriate team.',
    );
    await expect(section.getByRole('link', { name: 'General' })).toBeVisible();
    await expect(section.getByRole('link', { name: 'Builders' })).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Press Inquiries' }),
    ).toBeVisible();
  });

  await test.step('"questions" section screenshot', async () => {
    const section = page.getByTestId('cards-small-block');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'questions.png',
      snapshotConfig,
    );
  });

  await test.step('assert "resources" section is displayed properly', async () => {
    const section = page.getByTestId('cta-box');

    await expect(
      section.getByRole('heading', {
        name: 'Dive into our resources',
      }),
    ).toBeVisible();
    await expect(section.getByText('Not sure where to start? Dive')).toHaveText(
      'Not sure where to start? Dive into documentation or support center for more resources.',
    );
    await expect(
      section.getByRole('link', { name: 'Documentation' }),
    ).toBeVisible();
    await expect(section.getByRole('link', { name: 'Support' })).toBeVisible();
  });

  await test.step('"resources" section screenshot', async () => {
    const section = page.getByTestId('cta-box');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'resources.png',
      snapshotConfig,
    );
  });
});
