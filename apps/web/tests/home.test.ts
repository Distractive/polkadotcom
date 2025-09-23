import { expect, test } from '@playwright/test';
import { snapshotConfig } from './constants';
import { acceptOrCloseCookieBanner } from './utils/cookies';

test('Homepage', async ({ page }) => {
  const ecosystemIds = [
    '6a0752e5901e',
    '2c4394a44c26',
    'afda3000310d',
    '95ac39dd9b4d',
    '5c8923c74226',
    'e05ed05ddb24',
  ];

  await test.step('go to homepage', async () => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await acceptOrCloseCookieBanner(page);
  });

  await test.step('assert title and header are properly displayed', async () => {
    await expect(page).toHaveTitle('Polkadot | Freedom to build at Web3 scale');
    const heading = page.locator('h1');
    await expect(heading).toHaveText('Built for the billions');
  });

  await test.step('assert "hero" section is displayed properly', async () => {
    const section = page.getByTestId('hero-pile');

    await expect(
      section.getByRole('heading', { name: 'Built for the billions' }),
    ).toBeVisible();
    await expect(section.getByText('Polkadot is the most')).toHaveText(
      'Polkadot is the most scalable, secure, and resilient blockchain platform—designed for builders pushing boundaries and users who demand true ownership. Engineered for mass adoption, Polkadot brings Web3 to the world.',
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

  await test.step('assert "network" section displayed properly', async () => {
    const section = page.getByTestId('network-cards');
    await section.scrollIntoViewIfNeeded();

    await expect(
      section.getByRole('heading', { name: 'Power without permission' }),
    ).toHaveText('Power without permission');
    await expect(section.getByText('Polkadot gives you')).toHaveText(
      "Polkadot gives you everything you need to build, participate, or lead in Web3. The tools are ready. The community is here. What's your next move?",
    );

    await expect(
      section.getByRole('link', { name: /DOT token basics/ }),
    ).toHaveText(
      'DOT token basicsWhat’s in a DOT? Dive into the utility token that powers the Polkadot ecosystem.',
    );
    await expect(
      section.getByRole('link', { name: 'Build on Polkadot' }),
    ).toHaveText(
      'Build on PolkadotSpin up a custom blockchain in minutes, or build the app of your dreams.',
    );

    await expect(
      section.getByRole('link', { name: 'Join the Community' }),
    ).toHaveText(
      'Join the communityJoin a chat, create content, or help champion in your local region.',
    );
  });

  await test.step('"network" section screenshot', async () => {
    await page.waitForTimeout(2000);
    const section = page.getByTestId('network-cards');
    await page.waitForTimeout(2000);
    expect(await section.screenshot({ timeout: 7000 })).toMatchSnapshot(
      'network.png',
      snapshotConfig,
    );
  });

  await test.step('assert "building" section is displayed properly', async () => {
    const section = page.getByTestId('build-cards');
    await section.scrollIntoViewIfNeeded();

    await expect(
      section.getByRole('heading', {
        name: "Ready to shape what's next?",
      }),
    ).toBeVisible();
    await expect(section.getByText('Join a global')).toHaveText(
      "Join a global community of builders, creators, and visionaries pushing boundaries. If you're bold enough to build it, Polkadot is here for it.",
    );
    await expect(
      section.getByText('Get Started', { exact: true }),
    ).toBeVisible();
    await expect(
      section.getByText('Start Building', { exact: true }),
    ).toBeVisible();
    await expect(
      section.getByText('Explore Funding', { exact: true }),
    ).toBeVisible();
  });

  await test.step('"building" section screenshot', async () => {
    await page.waitForTimeout(2000);
    const section = page.getByTestId('build-cards');
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
        name: 'Get the insider scoop',
      }),
    ).toBeVisible();
    await expect(
      newsletterWrapper.getByRole('button', { name: 'Subscribe' }),
    ).toBeVisible();
  });

  await test.step('newsletter section screenshot', async () => {
    await page.waitForTimeout(2000);
    const newsletterWrapper = page.getByTestId('newsletter');
    await newsletterWrapper.scrollIntoViewIfNeeded();

    await page.waitForTimeout(2000);
    expect(
      await newsletterWrapper.screenshot({ timeout: 7000 }),
    ).toMatchSnapshot('newsletter.png', snapshotConfig);
  });

  await test.step('assert "ecosystem" section is displayed properly', async () => {
    const section = page.getByTestId('ecosystem-pile');
    await section.scrollIntoViewIfNeeded();

    await expect(
      section.getByRole('heading', {
        name: 'Where breakthrough ideas become reality',
      }),
    ).toBeVisible();
    await expect(section.getByText('Polkadot gives builders')).toHaveText(
      'Polkadot gives builders the tools and community to turn bold ideas into real-world impact—powering everything from next-gen games to AI.',
    );
    await expect(
      section.getByRole('link', {
        name: 'FIFA Rivals',
      }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', {
        name: 'Hydration',
      }),
    ).toBeVisible();
    await expect(section.getByRole('link', { name: 'Acurast' })).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'NFL Rivals' }),
    ).toBeVisible();
    await expect(section.getByRole('link', { name: 'BiFrost' })).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Hyperbridge' }),
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

  await test.step('assert "recent happenings" section is displayed properly', async () => {
    const section = page.getByTestId('cards-block-5d955696c731');
    await section.scrollIntoViewIfNeeded();

    await expect(
      section.getByRole('heading', {
        name: 'Ecosystem happenings',
      }),
    ).toBeVisible();
    await expect(section.getByText('The latest news, notes')).toHaveText(
      'The latest news, notes, and notions from across the Polkadot ecosystem',
    );
  });

  await test.step('"recent happenings" section screenshot', async () => {
    await page.waitForTimeout(2000);
    const section = page.getByTestId('cards-block-5d955696c731');
    await page.waitForTimeout(2000);
    expect(
      await section.screenshot({
        timeout: 7000,
        animations: 'disabled',
      }),
    ).toMatchSnapshot('recent-happenings.png', snapshotConfig);
  });
});
