import { expect, test } from '@playwright/test';
import { snapshotConfig } from './constants';
import { acceptOrCloseCookieBanner } from './utils/cookies';

test('Homepage', async ({ page }) => {
  const ecosystemIds = [
    '3b6847866f76',
    '878be89f9898d0ab5e266e4fc49614c2',
    'b006a029787b991dcdea6a3338249e84',
    '1041062bfe436968c080cdeee5496b1b',
    '3479ce3e3534297a92fd5f2a5ec98880',
    'ed5a6361d98e64e2029dae1052a67228',
  ];

  await test.step('go to homepage', async () => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await acceptOrCloseCookieBanner(page);
  });

  await test.step('assert title and header are properly displayed', async () => {
    await expect(page).toHaveTitle(
      'Polkadot | The secure, powerful core of Web3',
    );
    const heading = page.locator('h1');
    await expect(heading).toHaveText("Defy what's possible");
  });

  await test.step('assert "hero" section is displayed properly', async () => {
    const section = page.getByTestId('hero-pile');

    await expect(
      section.getByRole('heading', { name: "Defy what's possible" }),
    ).toBeVisible();
    await expect(section.getByText("Polkadot unites the world's")).toHaveText(
      "Polkadot unites the world's innovators and changemakers, building and using the most transformative apps and blockchains.",
    );
    await expect(
      section.getByRole('link', {
        name: 'Join the community',
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Start Building', exact: true }),
    ).toBeVisible();
  });

  await test.step('"hero" section screenshot', async () => {
    const heroLandingFrame = page.getByTestId('hero-pile');
    await page.waitForTimeout(2000);
    expect(
      await heroLandingFrame.screenshot({
        animations: 'disabled',
        timeout: 12_000,
        mask: [page.getByTestId('dots-animation')],
      }),
    ).toMatchSnapshot('hero.png', snapshotConfig);
  });

  await test.step('assert "video" section is displayed properly', async () => {
    const section = page.getByTestId('video-pile-content');

    await expect(
      section.getByRole('heading', { name: 'A future led by you' }),
    ).toBeVisible();
    await expect(section.getByTestId('video-block')).toBeVisible();
  });

  await test.step('"video" section screenshot', async () => {
    await page.waitForTimeout(2000);
    const section = page.getByTestId('video-pile-content');
    await page.waitForTimeout(2000);
    expect(await section.screenshot({ timeout: 7000 })).toMatchSnapshot(
      'video.png',
      snapshotConfig,
    );
  });

  await test.step('assert "network" section displayed properly', async () => {
    const section = page.getByTestId('network-pile');

    await expect(
      section.getByRole('heading', { name: 'A network governed by a' }),
    ).toHaveText('A network governed by a rebelliously innovative community');
    await expect(section.getByText('Polkadot is a blockchain')).toHaveText(
      'Polkadot is a blockchain network of networks designed to challenge our assumptions, directed and governed by those who hold the DOT token. By holding DOT, you are part of the largest and most decentralized decision-making group in the world.',
    );
    await expect(
      section.getByRole('link', {
        name: 'DOT token basics What’s in a',
      }),
    ).toHaveText(
      'DOT token basicsWhat’s in a DOT? Dive into the utility token that powers the Polkadot ecosystem.',
    );
    await expect(
      section.getByRole('link', { name: 'Build on Polkadot Spin up a' }),
    ).toHaveText(
      'Build on PolkadotSpin up a custom blockchain in minutes, or build the app of your dreams.',
    );
    await expect(
      section.getByRole('link', { name: 'Join the community Join a' }),
    ).toHaveText(
      'Join the communityJoin a chat, create content, or help champion Polkadot.',
    );
  });

  await test.step('"network" section screenshot', async () => {
    await page.waitForTimeout(2000);
    const section = page.getByTestId('network-pile-content');
    await page.waitForTimeout(2000);
    expect(await section.screenshot({ timeout: 7000 })).toMatchSnapshot(
      'network.png',
      snapshotConfig,
    );
  });

  await test.step('assert "building" section is displayed properly', async () => {
    const section = page.getByTestId('building-pile');

    await expect(
      section.getByRole('heading', {
        name: 'What are you waiting for?',
      }),
    ).toBeVisible();
    await expect(section.getByText('We’re the most open,')).toHaveText(
      'We’re the most open, collaborative, passionate group of free thinkers, boundary pushers, creators, builders, innovators, and misfits. Share your ideas, projects, and vision for an open web. We can’t wait to meet you.',
    );
    await expect(
      section
        .locator('[id="build\\.content"]')
        .getByRole('link', { name: 'Get started' }),
    ).toBeVisible();
    await expect(
      section.getByText('Start building', { exact: true }),
    ).toBeVisible();
    await expect(
      section.getByText('Explore funding', { exact: true }),
    ).toBeVisible();
  });

  await test.step('"building" section screenshot', async () => {
    await page.waitForTimeout(2000);
    const section = page.getByTestId('building-pile');
    await page.waitForTimeout(2000);
    expect(
      await section.screenshot({
        timeout: 7000,
        animations: 'disabled',
      }),
    ).toMatchSnapshot('building.png', snapshotConfig);
  });

  await test.step('assert "newsletter" block is displayed properly', async () => {
    const newsletterWrapper = page.getByTestId('newsletter');

    await expect(
      newsletterWrapper.getByRole('heading', {
        name: 'Polkadot’s latest news,',
      }),
    ).toBeVisible();
    await expect(
      newsletterWrapper.getByText('Get your monthly fix of'),
    ).toBeVisible();
    await expect(
      newsletterWrapper.getByRole('button', { name: 'Subscribe' }),
    ).toBeVisible();
  });

  await test.step('newsletter section screenshot', async () => {
    await page.waitForTimeout(2000);
    const newsletterWrapper = page.getByTestId('newsletter');
    await page.waitForTimeout(2000);
    expect(
      await newsletterWrapper.screenshot({ timeout: 7000 }),
    ).toMatchSnapshot('newsletter.png', snapshotConfig);
  });

  await test.step('assert "ecosystem" section is displayed properly', async () => {
    const section = page.getByTestId('ecosystem-pile');

    await expect(
      section.getByRole('heading', {
        name: 'Home to the bold and visionary',
      }),
    ).toBeVisible();
    await expect(section.getByText('Polkadot combines unbeatable')).toHaveText(
      'Polkadot combines unbeatable technology and a strong community to bring inspiring projects to life.',
    );
    await expect(
      section.getByRole('link', { name: 'NFL Rivals Digital' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', {
        name: 'Hydration Omnipool DEX for',
      }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Acurast Provide compute &' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', {
        name: 'ChatDKG Launchpad for trusted',
      }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Exiled Racers Racing and' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Energy Web X Enterprise' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Explore Dapps' }),
    ).toBeVisible();
  });

  await test.step('"ecosystem" section screenshot', async () => {
    await page.waitForTimeout(2000);
    for (const id of ecosystemIds) {
      const ecosystemImage = page.getByTestId(`ecosystem-content-${id}`);
      await page.waitForTimeout(2000);
      expect(
        await ecosystemImage.screenshot({
          animations: 'disabled',
          timeout: 7000,
        }),
      ).toMatchSnapshot(`ecosystem-${id}.png`, snapshotConfig);
    }
  });
});
