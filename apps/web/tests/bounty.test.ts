import { expect, test } from '@playwright/test';
import { acceptOrCloseCookieBanner } from './utils/cookies';

test('Bridges Bug Bounty', async ({ page }) => {
  await test.step('go to "SUITE" page', async () => {
    await page.goto('/bridges-bug-bounty');
    await acceptOrCloseCookieBanner(page);
  });

  await test.step('assert title and header are properly displayed', async () => {
    await expect(page).toHaveTitle('Bridges Bug Bounty');
    const heading = page.locator('h1');
    await expect(heading).toHaveText('Bridge bug bounty');
  });

  await test.step('assert "header" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-header');

    await expect(
      section.getByRole('heading', {
        name: 'Bridge bug bounty',
      }),
    ).toBeVisible();
    await expect(section.getByText('Blockchain bridges are')).toHaveText(
      'Blockchain bridges are crucial components connecting different blockchain systems. However, their significance and high transaction volume makes them prime targets for malicious attacks. Participate in our bug bounty program to help protect the vital connection between Polkadot and Kusama.',
    );
  });

  await test.step('assert "scope" section is displayed properly', async () => {
    const section = page.getByTestId('cards-small-block');

    await expect(
      section.getByRole('heading', {
        name: "What's in scope?",
      }),
    ).toBeVisible();
    await expect(section.getByText('Parity Bridges Common is a')).toHaveText(
      'Parity Bridges Common is a collection of components for building bridges. These include Substrate pallets for syncing headers and passing arbitrary messages, as well as libraries for building relayers to provide cross-chain communication capabilities.',
    );
    await expect(
      section.getByRole('link', { name: 'Bridges Common Parity Bridges' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Bridges common Polkadot SDK:' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'XCM & Bridgeshub Polkadot SDK' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'XCM & Bridgeshub Runtimes:' }),
    ).toBeVisible();
  });

  await test.step('assert "submission" section is displayed properly', async () => {
    const section = page.getByTestId('cards-sticky-block').first();

    await expect(
      section.getByRole('heading', {
        name: 'What makes a good submission?',
      }),
    ).toBeVisible();
    await expect(section.getByText('Ultimately, we’re after')).toHaveText(
      'Ultimately, we’re after findings that have a real impact. Purely theoretical findings are sometimes entertaining to investigate, so feel free to send us any. However, it will only be eligible if there is a way to break our systems in practice. Here’s what we’re looking for:',
    );
    await expect(
      section.getByRole('heading', { name: 'Proof-of-concept' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'pact vision' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Originality' }),
    ).toBeVisible();
  });

  await test.step('assert "get paid" section is displayed properly', async () => {
    const section = page.getByTestId('cards-block-2442ba4b9e22');

    await expect(
      section.getByRole('heading', {
        name: 'How you get paid',
      }),
    ).toBeVisible();
    await expect(section.getByText('Your hard work deserves')).toHaveText(
      'Your hard work deserves recognition and reward! This section details the steps to receive payment for your valuable contributions, if approved.',
    );
    await expect(
      section.getByRole('heading', { name: 'Complete KYC' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Sign reward letter' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'ide address' }),
    ).toBeVisible();
  });

  await test.step('assert "breakthrough" section is displayed properly', async () => {
    const section = page.getByTestId('content-block');

    await expect(
      section.getByRole('heading', {
        name: 'Got a breakthrough?',
      }),
    ).toBeVisible();
    await expect(section.getByText('Adhering to the guidelines')).toHaveText(
      'Adhering to the guidelines will increase the chances of your report being accepted. Send your findings to bridgesbugbounty@polkadot.network',
    );
    await expect(
      section.getByRole('link', { name: 'More info' }),
    ).toBeVisible();
  });

  await test.step('assert "rules" section is displayed properly', async () => {
    const section = page.getByTestId('cards-sticky-block').nth(1);

    await expect(
      section.getByRole('heading', {
        name: 'Rules of the road',
      }),
    ).toBeVisible();
    await expect(section.getByText('This section outlines the dos')).toHaveText(
      'This section outlines the dos and don’ts of submissions, helping you understand how to report critical flaws, manage duplicate submissions, and handle accidental access to sensitive data.',
    );
    await expect(
      section.getByRole('heading', { name: 'Submission timing' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Report critical flaws' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Duplicate submissions' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Accidental access' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Respect our infrastructure' }),
    ).toBeVisible();
  });

  await test.step('assert "eligibility" section is displayed properly', async () => {
    const section = page.getByTestId('cards-sticky-block').nth(2);

    await expect(
      section.getByRole('heading', {
        name: 'Reward eligibility',
      }),
    ).toBeVisible();
    await expect(section.getByText('A reward will be granted only')).toHaveText(
      'A reward will be granted only after the vulnerability patch has been released. Sharing any part of the security issue with third parties is prohibited without our written consent.',
    );
    await expect(
      section.getByRole('heading', { name: 'No involvement in buggy code' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Legal age and jurisdiction' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Sanctions compliance' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'No exploitation' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'One-time reward' }),
    ).toBeVisible();
  });

  await test.step('assert "rules of conduct" section is displayed properly', async () => {
    const section = page.getByTestId('cards-sticky-block').nth(3);

    await expect(
      section.getByRole('heading', {
        name: 'Rules of conduct',
      }),
    ).toBeVisible();
    await expect(section.getByText('Respect and integrity are')).toHaveText(
      'Respect and integrity are crucial for a collaborative and secure environment. Upholding ethical behavior ensures that everyone can participate positively and productively.',
    );
    await expect(
      section.getByRole('heading', { name: 'Zero tolerance' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Safe and supportive' }),
    ).toBeVisible();
  });

  await test.step('assert "rewards" section is displayed properly', async () => {
    const section = page.getByTestId('cards-sticky-block').nth(4);

    await expect(
      section.getByRole('heading', {
        name: 'Reward mechanism',
      }),
    ).toBeVisible();
    await expect(section.getByText('Rewards are determined by the')).toHaveText(
      'Rewards are determined by the severity of the findings. Top contributors may earn recognition in the Bounty Hall of Fame and be considered for the Polkadot Blockchain Academy.',
    );
    await expect(
      section.getByRole('heading', { name: 'Hall of fame' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Financial rewards' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Priority candidacy' }),
    ).toBeVisible();
  });

  await test.step('assert "faqs" section is displayed properly', async () => {
    const section = page.getByTestId('faqs');

    await expect(
      section.getByRole('heading', {
        name: 'Legal and privacy',
      }),
    ).toBeVisible();

    const awards = section.getByRole('button', {
      name: "Open answer to 'Discretionary",
    });
    const laws = section.getByRole('button', {
      name: "Open answer to 'Compliance",
    });
    const privacy = section.getByRole('button', {
      name: "Open answer to 'Privacy and",
    });
    const governing = section.getByRole('button', {
      name: "Open answer to 'Governing law",
    });
    const legal = section.getByRole('button', {
      name: "Open answer to 'Legal safe",
    });

    await expect(awards).toBeVisible();
    await expect(laws).toBeVisible();
    await expect(privacy).toBeVisible();
    await expect(governing).toBeVisible();
    await expect(legal).toBeVisible();

    await awards.click({ timeout: 2000 });
    await expect(
      section.getByText('The Bug Bounty Program is a'),
    ).toBeVisible();
  });
});
