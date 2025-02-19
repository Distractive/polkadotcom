import { expect, test } from '@playwright/test';
import { snapshotConfig } from './tests.constants';

test('Get started', async ({ page }) => {
  await test.step('go to get started page', async () => {
    await page.goto('/get-started');
  });

  await test.step('assert title and header are properly displayed', async () => {
    await expect(page).toHaveTitle('Get Started');
    const heading = page.locator('h1');
    await expect(heading).toHaveText('Get started on Polkadot');
  });

  await test.step('assert cookie banner is properly displayed', async () => {
    const cookieBanner = page.getByRole('dialog', {
      name: 'Cookie Consent Banner',
    });

    expect(cookieBanner.getByText('This website utilizes')).toHaveText(
      'This website utilizes technologies such as cookies to enable essential site functionality, as well as for analytics, personalization, and targeted advertising. You may change your settings at any time or accept the default settings. You may close this banner to continue with only essential cookies.',
    );

    await expect(
      cookieBanner.getByRole('link', { name: 'Privacy Policy' }),
    ).toBeVisible();
    await expect(
      cookieBanner.getByRole('link', { name: 'Storage Preferences' }),
    ).toBeVisible();
    await expect(
      cookieBanner.getByText('Storage Preferences', { exact: true }),
    ).toBeVisible();
    await expect(
      cookieBanner.getByText('Storage Preferences', { exact: true }),
    ).toBeVisible();
    await expect(
      cookieBanner.getByText('Storage Preferences', { exact: true }),
    ).toBeVisible();
    expect(cookieBanner.getByRole('button', { name: 'Save' })).toBeVisible();
    expect(
      cookieBanner.getByRole('button', { name: 'Accept All' }),
    ).toBeVisible();
    expect(
      cookieBanner.getByRole('button', { name: 'Reject All' }),
    ).toBeVisible();
  });

  await test.step('cookies banner screenshot', async () => {
    // @Note: wait to avoid blur effect
    await page.waitForTimeout(6000);
    const cookieBanner = page.getByRole('dialog', {
      name: 'Cookie Consent Banner',
    });
    expect(await cookieBanner.screenshot()).toMatchSnapshot(
      'cookies.png',
      snapshotConfig,
    );

    await cookieBanner
      .getByRole('button', { name: 'Close this dialog' })
      .click();

    await expect(cookieBanner).toBeHidden();
  });

  await test.step("assert 'what the #' section is displayed properly", async () => {
    const whatTheSection = page.getByTestId('side-by-side-2b43f0ea2de8');

    await expect(
      whatTheSection.getByRole('heading', {
        name: 'What the @!#* is Polkadot?',
      }),
    ).toBeVisible();
    await expect(whatTheSection.getByText('Created by many of the')).toHaveText(
      'Created by many of the brightest minds in blockchain, Polkadot is the powerful, secure heart of Web3, putting power back where it belongs—with you. It lets Web3’s biggest trailblazers launch ideas at warp speed, with flexible start-up costs and a hyper-flexible builder environment.',
    );
    await expect(
      whatTheSection.getByText('Apps on Polkadot are built on'),
    ).toHaveText(
      "Apps on Polkadot are built on top of a secure, resilient platform where decisions are driven by a lively community of DOT holders. With Polkadot, you're not just along for the ride, you're a co-creator helping to shape the future of our digital world.",
    );
    await expect(whatTheSection.getByText('By making blockchain')).toHaveText(
      'By making blockchain technology more secure, cost-effective, and collaborative, Polkadot is powering the movement for a better web.',
    );
    await expect(
      whatTheSection.getByRole('link', { name: 'Learn more' }),
    ).toBeVisible();
  });

  await test.step('what the # section screenshot', async () => {
    const whatTheSection = page.getByTestId('side-by-side-2b43f0ea2de8');
    expect(await whatTheSection.screenshot()).toMatchSnapshot(
      'what-the.png',
      snapshotConfig,
    );
  });

  await test.step("assert 'nothing' section is displayed properly", async () => {
    const nothingSection = page.getByTestId('side-by-side-631ad4f8ab11');

    await expect(
      nothingSection.getByRole('heading', {
        name: 'There’s almost nothing you can’t do on Polkadot',
      }),
    ).toBeVisible();
    await expect(
      nothingSection.getByText('Polkadot simplifies the'),
    ).toHaveText(
      'Polkadot simplifies the creation of transformative blockchain projects and decentralized applications (dapps), all playing nicely together on a shared foundation.',
    );
    await expect(
      nothingSection.getByText('Why is it a game changer?'),
    ).toHaveText(
      'Why is it a game changer? Most blockchains are like awkward kids on a playground who can’t talk to each other. Polkadot is the friendly maverick who brings everyone together, making sure no blockchain is left out—even if they are incredibly… unique. So go ahead, build that next big thing.',
    );
    await expect(
      nothingSection.getByRole('link', { name: 'Start building' }),
    ).toBeVisible();
  });

  await test.step('nothing section screenshot', async () => {
    const nothingSection = page.getByTestId('side-by-side-631ad4f8ab11');
    expect(await nothingSection.screenshot()).toMatchSnapshot(
      'nothing.png',
      snapshotConfig,
    );
  });

  await test.step("assert 'non coders' section is displayed properly", async () => {
    const nonCoders = page.getByTestId('side-by-side-48025e541257');

    await expect(
      nonCoders.getByRole('heading', { name: 'Non-coders welcome' }),
    ).toBeVisible();
    await expect(
      nonCoders.getByText('Don’t speak Rust? No problem'),
    ).toHaveText(
      'Don’t speak Rust? No problem! Polkadot is designed for doers and dreamers of all stripes. No need to be a tech whiz to make your mark on Polkadot. Dive into our community-driven DAO and help shape the future. Got a brilliant idea? Propose it! Our community votes on proposals, so your voice matters.',
    );
    await expect(
      nonCoders.getByRole('link', { name: 'Explore the DAO' }),
    ).toBeVisible();
  });

  await test.step('non coders section screenshot', async () => {
    const nonCoders = page.getByTestId('side-by-side-48025e541257');
    expect(await nonCoders.screenshot()).toMatchSnapshot(
      'non-coders.png',
      snapshotConfig,
    );
  });

  await test.step("assert 'read on' section is displayed properly", async () => {
    const cardsSmallBlock = page.getByTestId('cards-small-block');

    await expect(
      cardsSmallBlock.getByRole('heading', { name: 'Read on' }),
    ).toBeVisible();
    await expect(
      cardsSmallBlock.getByRole('link', {
        name: 'Glossary Learn key terms and',
      }),
    ).toBeVisible();
    await expect(
      cardsSmallBlock.getByRole('link', { name: 'Blog Dive deeper with info' }),
    ).toBeVisible();
  });

  await test.step('read on section screenshot', async () => {
    const cardsSmall = page.getByTestId('cards-small-block');
    expect(await cardsSmall.screenshot()).toMatchSnapshot(
      'cards-small.png',
      snapshotConfig,
    );
  });

  await test.step("assert 'ready to join' section is displayed properly", async () => {
    const cardsStickyBlock = page.getByTestId('cards-sticky-block');

    await expect(
      cardsStickyBlock.getByText('Joining Polkadot means more'),
    ).toBeVisible();
    await expect(
      cardsStickyBlock.getByText('Joining Polkadot means more'),
    ).toHaveText(
      'Joining Polkadot means more than just owning a token—it’s about being part of a buzzing community where your voice is heard.',
    );
    await expect(
      cardsStickyBlock.getByRole('link', {
        name: 'DOT token Discover what you',
      }),
    ).toBeVisible();
    await expect(
      cardsStickyBlock.getByRole('link', {
        name: 'Polkadot wallets Get to know',
      }),
    ).toBeVisible();
    await expect(
      cardsStickyBlock.getByRole('link', {
        name: 'Staking Level up and learn',
      }),
    ).toBeVisible();
    await expect(
      cardsStickyBlock.getByRole('link', {
        name: 'Polkadot dapps Get up close',
      }),
    ).toBeVisible();
  });

  await test.step('ready to join section screenshot', async () => {
    const cardsSmall = page.getByTestId('cards-sticky-block');
    expect(await cardsSmall.screenshot()).toMatchSnapshot(
      'cards-sticky.png',
      snapshotConfig,
    );
  });

  await test.step("assert 'newsletter' block is displayed properly", async () => {
    const newsletterWrapper = page.getByTestId('form-modal');

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
    const newsletterWrapper = page.getByTestId('form-modal');
    expect(await newsletterWrapper.screenshot()).toMatchSnapshot(
      'newsletter.png',
      snapshotConfig,
    );
  });
});
