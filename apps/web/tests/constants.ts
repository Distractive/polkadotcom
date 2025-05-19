import type { LocatorScreenshotOptions } from '@playwright/test';

export const snapshotConfig = {
  maxDiffPixelRatio: 0.2,
  threshold: 0.2,
};

export const screenshotConfig: LocatorScreenshotOptions = {
  animations: 'disabled',
  timeout: 3000,
};
