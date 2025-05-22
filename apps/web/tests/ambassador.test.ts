import { expect, test } from '@playwright/test';
import { screenshotConfig, snapshotConfig } from './constants';
import { acceptOrCloseCookieBanner } from './utils/cookies';

test('Ambassador Program', async ({ page }) => {
  await test.step('go to "Ambassador Program" page', async () => {
    await page.goto('/community/ambassador-program');
    await acceptOrCloseCookieBanner(page);
  });

  await test.step('assert title and header are properly displayed', async () => {
    await expect(page).toHaveTitle('Ambassador Program');
    const heading = page.locator('h1');
    await expect(heading).toHaveText('The Polkadot Ambassador Fellowship');
  });

  await test.step('assert "header" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-header');

    await expect(
      section.getByRole('heading', {
        name: 'Become a Polkadot Ambassador',
      }),
    ).toBeVisible();
    await expect(section.getByTestId('breadcrumb')).toBeVisible();
    await expect(section.getByText('Join the Polkadot Ambassador')).toHaveText(
      'Join the Polkadot Ambassador Program to help accelerate adoption and foster growth in our vibrant ecosystem. Whatever your skill set, your enthusiasm and ideas are welcome! More information is coming soon, so stay tuned for updates.',
    );
  });

  await test.step('"header" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-header');
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'header.png',
      snapshotConfig,
    );
  });

  await test.step('assert "champion" section is displayed properly', async () => {
    const section = page.getByTestId('cards-small-block').first();

    await expect(
      section.getByRole('heading', {
        name: 'Champion the movement for a',
      }),
    ).toBeVisible();
    await expect(section.getByText('Anyone with a passion for the')).toHaveText(
      'Anyone with a passion for the Polkadot ecosystem can become an ambassador. It’s not just for developers; anyone with enthusiasm and a willingness to help the community grow is welcome to apply.',
    );
    await expect(
      section.getByRole('heading', { name: 'Share knowledge and expertis' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Learn new skills' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Connect with like-minded' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Be the voice of the community' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Receive funding for hosting' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Attend Polkadot events' }),
    ).toBeVisible();
  });

  await test.step('"champion" section screenshot', async () => {
    const section = page.getByTestId('cards-small-block').first();
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'champion.png',
      snapshotConfig,
    );
  });

  await test.step('assert "get involved" section is displayed properly', async () => {
    const section = page.getByTestId('cards-small-block').nth(1);

    await expect(
      section.getByRole('heading', {
        name: 'Ways to get involved',
      }),
    ).toBeVisible();
    await expect(
      section.getByText(
        'The Polkadot Ambassador Program is a dynamic, evolving community that adapts to',
      ),
    ).toHaveText(
      'The Polkadot Ambassador Program is a dynamic, evolving community that adapts to the ever-changing needs of the ecosystem. This program thrives on diverse contributions from areas like translation, events, and education.',
    );
    await expect(
      section.getByRole('heading', { name: 'Speak at events' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Write blog posts' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Represent in your region' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Mentor and onboard' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Identify partnerships' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Participate in community' }),
    ).toBeVisible();
  });

  await test.step('"get involver" section screenshot', async () => {
    const section = page.getByTestId('cards-small-block').nth(1);
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'get-involved.png',
      snapshotConfig,
    );
  });

  await test.step('assert "ambassador" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-e3f39b1c7ff0');

    await expect(
      section.getByRole('heading', {
        name: 'Become an ambassador',
      }),
    ).toBeVisible();
    await expect(section.getByText('The details of the Polkadot')).toHaveText(
      "The details of the Polkadot Ambassador Program are being finalized. If you're interested in participating, stay tuned for application details. We're excited to meet you and welcome your enthusiasm for Polkadot!",
    );
    await expect(
      section.getByRole('heading', { name: 'Coming soon!' }),
    ).toBeVisible();
    await expect(section.locator('img')).toBeVisible();
  });

  await test.step('"ambassador" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-e3f39b1c7ff0');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'ambassador.png',
      snapshotConfig,
    );
  });
});
