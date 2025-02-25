import { expect, test } from '@playwright/test';
import { screenshotConfig, snapshotConfig } from './constants';
import { acceptOrCloseCookieBanner } from './utils/cookies';

test('DePIN', async ({ page }) => {
  await test.step('go to "DePIN" page', async () => {
    await page.goto('/use-cases/depin');
    await acceptOrCloseCookieBanner(page);
  });

  await test.step('assert title and header are properly displayed', async () => {
    await expect(page).toHaveTitle('DePIN');
    const heading = page.locator('h1');
    await expect(heading).toHaveText(
      'Decentralizing the future of physical infrastructure ',
    );
  });

  await test.step('assert "header" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-header');

    await expect(
      section.getByRole('heading', {
        name: 'Decentralizing the future of',
      }),
    ).toBeVisible();
    await expect(section.getByTestId('breadcrumb')).toBeVisible();
    await expect(section.getByText('Polkadot is the backbone for')).toHaveText(
      'Polkadot is the backbone for truly scalable, secure, and interoperable Decentralized Physical iInfrastructure Networks (DePIN). From internet of things (IoT) to energy, healthcare, and storage, build solutions that bridge the physical and digital worlds for real-world impact.',
    );
    await expect(
      section.getByRole('link', { name: 'Learn more' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Get funding' }),
    ).toBeVisible();
    await expect(section.locator('img')).toBeVisible();
  });

  await test.step('"header" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-header');
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'header.png',
      snapshotConfig,
    );
  });

  await test.step('assert "unlock" section is displayed properly', async () => {
    const section = page.getByTestId('cards-sticky-block').first();

    await expect(
      section.getByRole('heading', {
        name: 'Build smarter, more connected',
      }),
    ).toBeVisible();
    await expect(section.getByText('Polkadot unlocks new DePIN')).toHaveText(
      'Polkadot unlocks new DePIN possibilities. From decentralized marketplaces to scalable logistics, explore how Polkadot can power the next generation of innovation.',
    );
    await expect(
      section.getByRole('heading', { name: 'Decentralized marketplaces' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Trustless networks for global' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Interoperability for' }),
    ).toBeVisible();
  });

  await test.step('"unlock" section screenshot', async () => {
    const section = page.getByTestId('cards-sticky-block').first();
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'unlock.png',
      snapshotConfig,
    );
  });

  await test.step('assert "explore dapps" section is displayed properly', async () => {
    const section = page.getByTestId('cards-block-3c532ef8d8f7');

    await expect(
      section.getByRole('heading', {
        name: 'Explore DePIN dapps on',
      }),
    ).toBeVisible();
    await expect(section.getByText('Experience the power of')).toHaveText(
      'Experience the power of Physical Infrastructure Networks on Polkadot. These dapps make it easy to access innovative solutions for energy solutions, IoT, AI, and more.',
    );
    await expect(
      section.getByRole('heading', { name: 'Acurast' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'EWX Marketplace' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Silencio' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'MapMetrics' }),
    ).toBeVisible();
  });

  await test.step('"explore dapps" section screenshot', async () => {
    const section = page.getByTestId('cards-block-3c532ef8d8f7');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'explore-dapps.png',
      snapshotConfig,
    );
  });

  await test.step('assert "why" section is displayed properly', async () => {
    const section = page.getByTestId('cards-sticky-block').nth(1);

    await expect(
      section.getByRole('heading', {
        name: 'Why Polkadot is built for',
      }),
    ).toBeVisible();
    await expect(section.getByText('Polkadot delivers the')).toHaveText(
      'Polkadot delivers the performance, flexibility, and security your DePIN solutions need to thrive in a connected world. Discover what makes Polkadot the ideal foundation for bringing digital and physical resource networks onchain.',
    );
    await expect(
      section.getByRole('heading', { name: 'Go global without breaking' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Secure DePIN infrastructure' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Customizable solutions for' }),
    ).toBeVisible();
  });

  await test.step('"why" section screenshot', async () => {
    const section = page.getByTestId('cards-sticky-block').nth(1);
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'why.png',
      snapshotConfig,
    );
  });

  await test.step('assert "impact" section is displayed properly', async () => {
    const section = page.getByTestId('cards-block-675ea328fbfe');

    await expect(
      section.getByRole('heading', {
        name: 'DePIN in action: real-world',
      }),
    ).toBeVisible();
    await expect(section.getByText('Discover how Polkadot powers')).toHaveText(
      'Discover how Polkadot powers the future of DePIN with innovative solutions in cloud computing, AI, and beyond.',
    );
    await expect(
      section.getByRole('link', { name: 'Acurast is building the' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Energy Web drives the clean' }),
    ).toBeVisible();
  });

  await test.step('"impact" section screenshot', async () => {
    const section = page.getByTestId('cards-block-675ea328fbfe');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'impact.png',
      snapshotConfig,
    );
  });

  await test.step('assert "quote" section is displayed properly', async () => {
    const section = page.getByTestId('quote-block');

    await expect(
      section.getByRole('heading', {
        name: '“Choosing Polkadot was',
      }),
    ).toBeVisible();
  });

  await test.step('"quote" section screenshot', async () => {
    const section = page.getByTestId('quote-block');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'quote.png',
      snapshotConfig,
    );
  });

  await test.step('assert "future" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-8c052d265a4a');

    await expect(
      section.getByRole('heading', {
        name: 'Shape the future with Web3',
      }),
    ).toBeVisible();
    await expect(section.getByText('Be part of the movement')).toHaveText(
      'Be part of the movement connecting the physical and digital worlds. Explore career opportunities in Polkadot’s ecosystem, where innovators are building user-focused solutions in cloud computing, IoT, AI, and beyond.',
    );
    await expect(
      section.getByRole('link', { name: 'Explore jobs' }),
    ).toBeVisible();
    await expect(section.locator('img')).toBeVisible();
  });

  await test.step('"future" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-8c052d265a4a');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'future.png',
      snapshotConfig,
    );
  });

  await test.step('assert "faqs" section is displayed properly', async () => {
    const section = page.getByTestId('faqs');

    await expect(
      section.getByRole('heading', {
        name: 'DePIN FAQs: your questions answered',
      }),
    ).toBeVisible();
  });
});
