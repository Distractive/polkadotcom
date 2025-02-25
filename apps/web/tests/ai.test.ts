import { expect, test } from '@playwright/test';
import { screenshotConfig, snapshotConfig } from './constants';
import { acceptOrCloseCookieBanner } from './utils/cookies';

test('AI', async ({ page }) => {
  await test.step('go to "AI" page', async () => {
    await page.goto('/use-cases/ai');
    await acceptOrCloseCookieBanner(page);
  });

  await test.step('assert title and header are properly displayed', async () => {
    await expect(page).toHaveTitle('AI');
    const heading = page.locator('h1');
    await expect(heading).toHaveText(
      'Empowering the evolution of AI and crypto',
    );
  });

  await test.step('assert "header" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-header');

    await expect(
      section.getByRole('heading', {
        name: 'Empowering the evolution of',
      }),
    ).toBeVisible();
    await expect(section.getByTestId('breadcrumb')).toBeVisible();
    await expect(section.getByText('Polkadot enables a new era of')).toHaveText(
      'Polkadot enables a new era of decentralized artificial intelligence (AI) innovation, offering the infrastructure to build transparent, scalable, and secure systems. By bridging AI and blockchain, developers can tackle real-world challenges with smarter, more efficient solutions that prioritize security, trust, and collaboration.',
    );
    await expect(
      section.getByRole('link', { name: 'get funding' }),
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

  await test.step('assert "redefining" section is displayed properly', async () => {
    const section = page.getByTestId('cards-block-917b7207b005');

    await expect(
      section.getByRole('heading', {
        name: 'Redefining AI through',
      }),
    ).toBeVisible();
    await expect(section.getByText('Polkadot’s modular blockchain')).toHaveText(
      'Polkadot’s modular blockchain architecture enables a future where AI systems are not limited by silos or centralized control. The possibilities are endless when AI meets flexible decentralized infrastructure.',
    );
    await expect(
      section.getByRole('heading', { name: 'Decentralized data economies' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Trustworthy AI decision-making' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'AI-powered autonomous' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Cross-chain collaboration for' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Scalable, energy-efficient AI' }),
    ).toBeVisible();
  });

  await test.step('"redefining" section screenshot', async () => {
    const section = page.getByTestId('cards-block-917b7207b005');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'redefining.png',
      snapshotConfig,
    );
  });

  await test.step('assert "infrastructure" section is displayed properly', async () => {
    const section = page.getByTestId('cards-sticky-block');

    await expect(
      section.getByRole('heading', {
        name: 'The infrastructure AI needs',
      }),
    ).toBeVisible();
    await expect(section.getByText('Polkadot provides the tools')).toHaveText(
      'Polkadot provides the tools and infrastructure to elevate AI development, ensuring trust, efficiency, and scalability at every stage.',
    );
    await expect(
      section.getByRole('heading', { name: "Security designed for AI's" }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Scalable for massive AI' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Decentralized AI governance' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Cross-chain connectivity' }),
    ).toBeVisible();
  });

  await test.step('"infrastructure" section screenshot', async () => {
    const section = page.getByTestId('cards-sticky-block');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'infrastructure.png',
      snapshotConfig,
    );
  });

  await test.step('assert "case" section is displayed properly', async () => {
    const section = page.getByTestId('cards-block-4607f67ffdf3');

    await expect(
      section.getByRole('heading', {
        name: 'Case Studies: Pioneering AI',
      }),
    ).toBeVisible();
    await expect(section.getByText('Explore how forward-thinking')).toHaveText(
      'Explore how forward-thinking projects are leveraging Polkadot to push the boundaries of what AI can achieve.',
    );
    await expect(
      section.getByRole('link', { name: 'Acurast is building the' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Transforming trust in the age' }),
    ).toBeVisible();
  });

  await test.step('assert "quote" section is displayed properly', async () => {
    const section = page.getByTestId('quote-block');

    await expect(
      section.getByRole('heading', {
        name: 'Polkadot’s fast, reliable, and cost-effective',
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

  await test.step('assert "revolution" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-427e46c63e20');

    await expect(
      section.getByRole('heading', {
        name: 'oin the AI Revolution o',
      }),
    ).toBeVisible();
    await expect(section.getByText('AI is transforming industries')).toHaveText(
      'AI is transforming industries, and the demand for skilled professionals to drive innovation is growing rapidly. From data scientists to AI governance specialists, the opportunities in AI are as dynamic as the technology itself. Explore careers that shape the future of intelligent systems on Polkadot.',
    );
    await expect(
      section.getByRole('link', { name: 'Explore jobs' }),
    ).toBeVisible();
    await expect(section.locator('img')).toBeVisible();
  });

  await test.step('"revolution" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-427e46c63e20');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'revolution.png',
      snapshotConfig,
    );
  });

  await test.step('assert "faqs" section is displayed properly', async () => {
    const section = page.getByTestId('faqs');

    await expect(
      section.getByRole('heading', {
        name: 'FAQs about AI',
      }),
    ).toBeVisible();
  });
});
