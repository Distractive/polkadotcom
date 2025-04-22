# Polkadot.com Contribution Guide

First off — thank you for your interest in contributing!

This website serves as a gateway for users, developers, investors, and the community to explore Polkadot's technology and vision. While it's primarily maintained by the [Distractive marketing team](https://www.distractive.xyz/), we welcome and encourage community contributions that help improve performance, accessibility, content clarity, and technical accuracy.

This guide will walk you through the types of contributions we accept, our development process, and how to submit issues or pull requests. Whether you're fixing a bug, improving documentation, or suggesting a small tweak, your input helps us make the Polkadot ecosystem even better.

Please take a few minutes to read through the following guidelines before getting started. They help ensure a smooth review process and maintain a high standard of quality across the site.

## Table of Contents
* [Contributions We Accept](#contributions-we-accept)
* [Contributions We Don't Accept](#contributions-we-dont-accept)
* [How to Contribute](#how-to-contribute)
  * [Dev Environment Setup](#dev-environment-setup)
  * [Gitflow](#gitflow)
  * [Tech Stack Overview](#tech-stack-overview)
  * [Issue Creation and Management](#issue-creation-and-management)
  * [Pull Request Process](#pull-request-process)
  * [Playwright Testing](#playwright-testing)
  * [Pull Request Review Process](#pull-request-review-process)

## Contributions We Accept

**Performance Improvements:** We welcome contributions that enhance the technical foundation of our website including performance improvements.

**Bug fixes:** We also accept bug fixes addressing functional issues, cross-browser compatibility, mobile responsiveness, and accessibility concerns.

**Copy and Content Suggestions:** We encourage contributions focusing on technical accuracy or clarity. We are open to opinions and suggestions on messaging but cannot guarantee they will be accepted. The website content is managed through Sanity, a headless CMS. Since content is stored within the Sanity CMS and is not visible from within this repo; we ask that you submit an Issue using the "Content Suggestion" template.

**Security Optimizations:** We accept vulnerability patches and security-focused contributions. Please note that if you discover a security vulnerability, we ask that you report it privately to the maintainers of this repo at digital [at] distractive [dot] xyz.

## Contributions We Don't Accept

**Design Suggestions:** To preserve the Polkadot brand integrity and ensure consistent user experience, we do not accept modifications to brand elements such as logos, color schemes, typography, or visual identity. If you find an issue with our components like a broken responsive layout, this would be considered a bug fix and is an acceptable contribution.

**Changes to Core Frameworks or Packages:** We do not accept changes to our fundamental configuration and packages including Next.js app structure, React component library architecture, ESLint configurations, TypeScript configurations, and Tailwind setup.

Any PRs that violate these guidelines will be automatically rejected.

## How to Contribute

### Dev Environment Setup

#### Fork the Repo

* Visit the repository URL: https://github.com/Distractive/polkadotcom
* Click the "Fork" button in the top-right corner of the page
* Select your GitHub account as the destination for the fork

#### Clone your fork
```bash
git clone git@github.com:[your_github_handle]/polkadotcom.git
```

#### Enter the project directory
```bash
cd polkadotcom
```

#### Install dependencies
```bash
pnpm install
```

#### Create a .env file with the following variables
```
BUILD_FLAG=development
NEXT_PUBLIC_GA_ID=G-ZSKWB953ZL
NEXT_PUBLIC_SANITY_API_VERSION=2023-03-01
NEXT_PUBLIC_SANITY_DATASET=dev
NEXT_PUBLIC_SANITY_PROJECT_ID=qf32zgfm
VERCEL_ENV=development
NEXT_TELEMETRY_DISABLED=1
NEXT_PUBLIC_DEPLOYMENT=staging
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=8f4db5e05791dcbe78707e98bdbb580a
NEXT_PUBLIC_ALGOLIA_APP_ID=QRFH5X5F32
NEXT_PUBLIC_ALGOLIA_BLOG_INDEX_NAME=blog
NEXT_PUBLIC_ALGOLIA_INDEX_NAME=page
```

#### Add the upstream repository
```bash
git remote add upstream https://github.com/Distractive/polkadotcom.git
```

#### Verify the new remote
```bash
git remote -v
```

#### Create a new feature branch off of the develop branch for your changes
```bash
git checkout develop
git checkout -b feature/your-feature-name
```

#### Run the dev server
```bash
pnpm dev
```

### Gitflow

We work on feature branches named `feat/<short-title-of-feature>` (or bugfix branches named `fix/<bug-name>`).
When the feature is done, we merge it into `develop` with a PR.
When `develop` is stable, we merge it into `staging`.
We merge into `main` only when we are ready to release a new version.
We can use other branches naming where needed i.e. `/chore` if the branch is for maintenance or configuration.

### Tech Stack Overview

This project uses Next.js, React, TypeScript, Tailwind CSS, Sanity CMS, Playwright, and PNPM.

#### Structure

This turborepo uses pnpm as a package manager. It includes the following packages/apps:

**Apps and Packages**
- `web`: Next.js 14 app inc storybook
- `shadcn`: React component library for UI components
- `ts-config`: tsconfig.jsons used throughout the monorepo
- `tailwind-config`: tsconfig.jsons used throughout the monorepo

#### Sanity CMS

We use Sanity as our headless content management system. It powers the dynamic content across the website, allowing non-technical team members to manage and update content easily.

The content from Sanity studio is fetched at build time. Community contributors typically do not need to interact with Sanity unless their changes involve content schema updates, but if you need to propose changes to the structure or add new fields in Sanity, please contact us at digital@distractive.xyz first to coordinate.

If you simply want to submit suggested copy changes, please create an issue using the "Content Suggestions" template.

### Issue Creation and Management

Please follow these steps exactly. We cannot guarantee your submission will be accepted if you start working on an issue before receiving approval.

**a. Issue Search:** Begin by conducting a thorough review of all existing issues, checking closed issues for previous discussions, and examining any related pull requests to avoid duplicate efforts.

**b. Issue Creation:** Create your issue using our provided templates, including a detailed description of the proposed changes or bug. Add all relevant labels, link to related issues or pull requests, and provide clear reproduction steps if reporting a bug.

**c. Assignment Process:** If you're interested in personally working on the issue, making a comment expressing your interest in working on it. If the proposed submission is approved, we will assign it to you to work on or another team member available.

### Pull Request Process

All pull requests must follow this process to be accepted:

1. Create an issue before starting any work. If it follows our rules of accepted contributions, we will approve it and allow you to begin work. Issues that don't receive prior approval may not be accepted.
2. Create a branch from develop using our naming conventions (feat/, fix/, chore/).
3. Keep changes focused and atomic — one feature/fix per PR.
4. Follow our code style and linting rules (we use Biome to ensure code consistency).

Before submitting your pull request, please make sure you:
- Merge in the latest develop commit.
- Test with Playwright locally (see below for steps). Make sure the latest commit from the develop branch is merged as tests may have updated recently.
- If tests are failing, address the issue or update the tests if necessary.
- Once your tests have passed locally, trigger the CI tests in GitHub by adding `[ci e2e]` to the commit message in your latest commit. Use the `–allow-empty` flag to retrigger the tests with additional commits.
- Include a clear PR description with:
  - The problem being solved
  - Solution approach
  - Testing steps
  - Screenshots (for UI updates)

Once all tests have passed on Github, you can submit your pull request with a clear description of the problem being solved, a rundown of your proposed solution, and screenshots if there are any UI updates.

### Playwright Testing

Please be sure to test with Playwright locally before submitting your PR.

To run the test, use:
```bash
pnpm run playwright:test
```

Or run with parallel workers (note that running with too many workers may cause the tests to fail since the UI might not render in time):
```bash
pnpm run playwright:test -- --workers=2
```

Once all of your tests are passing, add `[ci e2e]` to your commit message to trigger the tests on Github.

### Pull Request Review Process

Reviews typically result in one of three outcomes: approval for immediate merge, requests for specific modifications, or closure if the PR doesn't align with project goals. In the case of requested changes, we ask contributors to address feedback within two weeks to keep the review process active. PRs that remain inactive for more than two weeks may be closed to maintain a clean project board.