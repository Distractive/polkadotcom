import { expect, test } from '@playwright/test';
import { screenshotConfig, snapshotConfig } from './constants';
import { acceptOrCloseCookieBanner } from './utils/cookies';

test('DOT Token', async ({ page }) => {
  await test.step('go to "DOT Token" page', async () => {
    await page.goto('/get-started/dot-token');
    await acceptOrCloseCookieBanner(page);
  });

  await test.step('assert title and header are properly displayed', async () => {
    await expect(page).toHaveTitle('DOT Token');
    const heading = page.locator('h1');
    await expect(heading).toHaveText('DOT token');
  });

  await test.step('assert "header" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-header');

    await expect(
      section.getByRole('heading', {
        name: 'DOT token',
      }),
    ).toBeVisible();
    await expect(section.getByTestId('breadcrumb')).toBeVisible();
    await expect(section.getByText('Learn about the DOT token,')).toHaveText(
      'Learn about the DOT token, and how this unlocks possibilities for you in the Polkadot ecosystem and beyond.',
    );
    await expect(section.getByRole('link', { name: 'Get DOT' })).toBeVisible();
    await expect(
      section.getByRole('img', { name: 'Someone researching on their' }),
    ).toBeVisible();
  });

  await test.step('"header" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-header');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'header.png',
      snapshotConfig,
    );
  });

  await test.step('assert "whats" section is displayed properly', async () => {
    const section = page.getByTestId('cards-sticky-block');

    await expect(
      section.getByRole('heading', {
        name: 'What’s in a DOT?',
      }),
    ).toBeVisible();
    await expect(section.getByText('DOT is the native token of')).toHaveText(
      'DOT is the native token of the Polkadot network, serving three key functions: governance, staking, and bonding.',
    );
    await expect(
      section.getByRole('link', { name: 'Governance DOT holders run' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Staking Stake your DOT to' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Accessing blockspace' }),
    ).toBeVisible();
  });

  await test.step('"whats" section screenshot', async () => {
    const section = page.getByTestId('cards-sticky-block');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'whats.png',
      snapshotConfig,
    );
  });

  await test.step('assert "dao" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-0911d952910a');

    await expect(
      section.getByRole('heading', {
        name: 'Your ticket to the Polkadot',
      }),
    ).toBeVisible();
    await expect(section.getByText('Join over 1.3 million DOT')).toHaveText(
      'Join over 1.3 million DOT holders in the world’s largest decentralized autonomous organization (DAO).',
    );
    await expect(section.getByText('Hold DOT? Vote on initiatives')).toHaveText(
      'Hold DOT? Vote on initiatives and fund projects through Polkadot’s built-in governance system, OpenGov.',
    );
    await expect(
      section.getByRole('link', { name: 'Polkadot DAO' }),
    ).toBeVisible();
    await expect(
      section.getByRole('img', { name: 'A visual of the Polkadot logo' }),
    ).toBeVisible();
  });

  await test.step('"dao" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-0911d952910a');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'dao.png',
      snapshotConfig,
    );
  });

  await test.step('assert "get" section is displayed properly', async () => {
    const section = page.getByTestId('cards-small-block');

    await expect(
      section.getByRole('heading', {
        name: 'Get a Polkadot wallet',
      }),
    ).toBeVisible();
    await expect(section.getByText('Wallets are essential for')).toHaveText(
      /Wallets are essential for holding and managing DOT, making it easier to use apps, participate in governance, staking, and other network activities.\s*/,
    );
    await expect(
      section.getByRole('link', { name: 'Hold your DOT Securely store' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Stake your tokens Stake your' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Participate in governance Use' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Explore dapps Discover all' }),
    ).toBeVisible();
  });

  await test.step('"get" section screenshot', async () => {
    const section = page.getByTestId('cards-small-block');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'get.png',
      snapshotConfig,
    );
  });

  await test.step('assert "button" section is displayed properly', async () => {
    const section = page.getByTestId('button-block');
    await expect(
      section.getByRole('link', { name: 'Get a wallet' }),
    ).toBeVisible();
  });

  await test.step('"button" section screenshot', async () => {
    const section = page.getByTestId('button-block');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'button.png',
      snapshotConfig,
    );
  });

  await test.step('assert "faqs" section is displayed properly', async () => {
    const section = page.getByTestId('faqs');

    await expect(
      section.getByRole('heading', {
        name: 'Frequently Asked Questions',
      }),
    ).toBeVisible();

    const get = section.getByRole('button', {
      name: "Open answer to 'Where can you",
    });
    const rights = section.getByRole('button', {
      name: "Open answer to 'What rights",
    });
    const stake = section.getByRole('button', {
      name: "Open answer to 'Where can I",
    });
    const erc = section.getByRole('button', {
      name: "Open answer to 'Is DOT an",
    });
    const functions = section.getByRole('button', {
      name: "Open answer to 'What are the",
    });
    const tokenomics = section.getByRole('button', {
      name: "Open answer to 'What are DOT’",
    });

    await expect(get).toBeVisible();
    await expect(rights).toBeVisible();
    await expect(stake).toBeVisible();
    await expect(erc).toBeVisible();
    await expect(functions).toBeVisible();
    await expect(tokenomics).toBeVisible();

    await get.click({ timeout: 2000 });
    await expect(
      section.getByText('You can get DOT tokens at a'),
    ).toBeVisible();
    await rights.click({ timeout: 2000 });
    await expect(section.getByText('DOT holders can:Act as a')).toBeVisible();
    await stake.click({ timeout: 2000 });
    await expect(section.getByText('Stake DOT natively on')).toBeVisible();
    await erc.click({ timeout: 2000 });
    await expect(
      section.getByText('No, DOT is not an ERC20 token'),
    ).toBeVisible();
    await functions.click({ timeout: 2000 });
    await expect(section.getByText('DOT serves three key')).toBeVisible();
    await tokenomics.click({ timeout: 2000 });
    await expect(section.getByText('Supply: Polkadot has an')).toBeVisible();
  });

  await test.step('"faqs" section screenshot', async () => {
    const section = page.getByTestId('faqs');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'faqs.png',
      snapshotConfig,
    );
  });
});
