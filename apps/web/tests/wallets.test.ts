import { expect, test } from '@playwright/test';
import { screenshotConfig, snapshotConfig } from './constants';
import { acceptOrCloseCookieBanner } from './utils/cookies';

test('Wallets', async ({ page }) => {
  await test.step('go to "wallets" page', async () => {
    await page.goto('/get-started/wallets');
    await acceptOrCloseCookieBanner(page);
  });

  await test.step('assert title and header are properly displayed', async () => {
    await expect(page).toHaveTitle('Polkadot Wallets');
    const heading = page.locator('h1');
    await expect(heading).toHaveText('Your passport to Polkadot');
  });

  await test.step('assert "header" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-header');

    await expect(
      section.getByRole('heading', {
        name: 'Your passport to Polkadot',
      }),
    ).toBeVisible();
    await expect(section.getByTestId('breadcrumb')).toBeVisible();
    await expect(section.getByText('Start exploring Polkadot with')).toHaveText(
      'Start exploring Polkadot with a secure and user-friendly wallet. Ready to turbocharge your Web3 journey?',
    );
    await expect(
      section.getByRole('img', { name: 'Young woman learning about' }),
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

  await test.step('assert "why" section is displayed properly', async () => {
    const section = page.getByTestId('cards-sticky-block');

    await expect(
      section.getByRole('heading', {
        name: 'Why you need a Polkadot wallet',
      }),
    ).toBeVisible();
    await expect(section.getByText('Polkadot wallets are your')).toHaveText(
      'Polkadot wallets are your solution for all things DOT (and other tokens) in the Polkadot ecosystem. Here’s why you’ll love using a Polkadot wallet:',
    );
    await expect(section.getByTestId('sticky-card').first()).toBeVisible();
    await expect(section.getByTestId('sticky-card').nth(1)).toBeVisible();
    await expect(section.getByTestId('sticky-card').nth(2)).toBeVisible();
  });

  await test.step('"why" section screenshot', async () => {
    const section = page.getByTestId('cards-sticky-block');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'why.png',
      snapshotConfig,
    );
  });

  await test.step('assert "find" section is displayed properly', async () => {
    const section = page.getByTestId('cards-block-142c29784e8f');

    await expect(
      section.getByRole('heading', {
        name: 'Find your Polkadot wallet',
      }),
    ).toBeVisible();
    await expect(section.getByText('Get a secure wallet for all')).toHaveText(
      'Get a secure wallet for all things DOT—hold, stake, contribute to crowdloans, participate in governance, and dive into dapps across the Polkadot ecosystem.',
    );

    const all = section.getByRole('button', { name: 'Filter by All' });
    const mobile = section.getByRole('button', { name: 'Mobile' });
    const browser = section.getByRole('button', { name: 'Browser' });

    const nova = section.getByRole('link', {
      name: 'Mobile Nova Wallet Get Nova',
    });
    const subwallet = section.getByRole('link', {
      name: 'Mobile Browser Subwallet Get',
    });
    const talisman = section.getByRole('link', {
      name: 'Browser Talisman Get Talisman',
    });
    const polka = section.getByRole('link', { name: 'Mobile PolkaWallet Get' });
    const fearless = section.getByRole('link', {
      name: 'Browser Mobile Fearless',
    });

    await expect(all).toBeVisible();
    await expect(mobile).toBeVisible();
    await expect(browser).toBeVisible();

    await expect(nova).toBeVisible();
    await expect(subwallet).toBeVisible();
    await expect(talisman).toBeVisible();
    await expect(polka).toBeVisible();
    await expect(fearless).toBeVisible();

    await mobile.click({ timeout: 2000 });

    await expect(nova).toBeVisible();
    await expect(subwallet).toBeVisible();
    await expect(polka).toBeVisible();
    await expect(fearless).toBeVisible();

    await browser.click({ timeout: 2000 });

    await expect(subwallet).toBeVisible();
    await expect(talisman).toBeVisible();
    await expect(fearless).toBeVisible();

    await all.click({ timeout: 2000 });

    await expect(nova).toBeVisible();
    await expect(subwallet).toBeVisible();
    await expect(talisman).toBeVisible();
    await expect(polka).toBeVisible();
    await expect(fearless).toBeVisible();
  });

  await test.step('"find" section screenshot', async () => {
    const section = page.getByTestId('cards-block-142c29784e8f');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'find.png',
      snapshotConfig,
    );
  });

  await test.step('assert "evm" section is displayed properly', async () => {
    const section = page.getByTestId('cards-small-block').first();

    await expect(
      section.getByRole('heading', {
        name: 'Polkadot on MetaMask and',
      }),
    ).toBeVisible();
    await expect(section.getByText('Polkadot uses its own address')).toHaveText(
      'Polkadot uses its own address system (sometimes called “Substrate accounts” or “Substrate wallets”), which means some Ethereum-style wallets aren’t directly compatible with the Relay Chain. But no worries, the Polkadot EVM chains are good to go with MetaMask and other Ethereum-based wallets. Game On.',
    );
    await expect(section.getByRole('link', { name: 'Astar' })).toBeVisible();
    await expect(section.getByRole('link', { name: 'Moonbeam' })).toBeVisible();
    await expect(section.getByRole('link', { name: 'Acala' })).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Centrifuge' }),
    ).toBeVisible();
    await expect(section.getByRole('link', { name: 'Peaq' })).toBeVisible();
  });

  await test.step('"evm" section screenshot', async () => {
    const section = page.getByTestId('cards-small-block').first();
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'evm.png',
      snapshotConfig,
    );
  });

  await test.step('assert "hardware" section is displayed properly', async () => {
    const section = page.getByTestId('cards-small-block').nth(1);

    await expect(
      section.getByRole('heading', {
        name: 'Hardware wallets for maximum',
      }),
    ).toBeVisible();
    await expect(section.getByText('Hardware or cold storage')).toHaveText(
      'Hardware or cold storage wallets are encrypted devices that store your assets offline, providing increased security against evolving malicious attacks and threats. Ideal for long-term storage of high-value balances.',
    );
    await expect(section.getByRole('link', { name: 'Ledger' })).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Polkadot Vault' }),
    ).toBeVisible();
  });

  await test.step('"hardware" section screenshot', async () => {
    const section = page.getByTestId('cards-small-block').nth(1);
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'hardware.png',
      snapshotConfig,
    );
  });

  await test.step('assert "staking" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-e0781e9c4199');

    await expect(
      section.getByRole('heading', {
        name: 'Staking DOT, simplified',
      }),
    ).toBeVisible();
    await expect(section.getByText('The easiest way to stake DOT')).toHaveText(
      'The easiest way to stake DOT is directly from your Polkadot wallet. Stake your DOT and earn rewards while maintaining your say in governance.',
    );
    await expect(
      section.getByRole('link', { name: 'Learn More' }),
    ).toBeVisible();

    await expect(section.locator('img')).toBeVisible();
  });

  await test.step('"staking" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-e0781e9c4199');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'staking.png',
      snapshotConfig,
    );
  });

  await test.step('assert "disclaimer" section is displayed properly', async () => {
    const section = page.getByTestId('content-block');

    await expect(
      section.getByRole('heading', {
        name: 'Disclaimer',
      }),
    ).toBeVisible();
    await expect(section.getByText('The list of wallets does not')).toHaveText(
      'The list of wallets does not constitute an endorsement and is not exhaustive of all wallet options available. Always do your own research before choosing a wallet. The list includes non-custodial Polkadot wallets with the Polkadot Staking Dashboard integration, supporting governance or crowdloans. If your wallet fits this criteria and isn’t listed, please request to be added via this form.',
    );
    await expect(
      section.getByRole('link', { name: 'request to be added via this' }),
    ).toBeVisible();
  });

  await test.step('"disclaimer" section screenshot', async () => {
    const section = page.getByTestId('content-block');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'disclaimer.png',
      snapshotConfig,
    );
  });
});
