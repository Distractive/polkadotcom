import { URL } from 'node:url';

interface MozillaScanResponse {
  id: number;
  details_url: string;
  algorithm_version: number;
  scanned_at: string;
  error: null | string;
  grade: string;
  score: number;
  status_code: number;
  tests_failed: number;
  tests_passed: number;
  tests_quantity: number;
  message?: string;
}

function observatoryResponseToMarkdown(response: MozillaScanResponse): string {
  const {
    id,
    details_url,
    algorithm_version,
    scanned_at,
    grade,
    score,
    status_code,
    tests_failed,
    tests_passed,
    tests_quantity,
  } = response;

  return `## Observatory Scan Results

- **Scan ID**: ${id}
- **Details**: [View full report](${details_url})
- **Algorithm Version**: ${algorithm_version}
- **Scanned At**: ${new Date(scanned_at).toLocaleString()}
- **Status Code**: ${status_code}
- **Grade**: ${grade}
- **Score**: ${score} / 100

### Test Summary
- **Total Tests**: ${tests_quantity}
- **Tests Passed**: ${tests_passed}
- **Tests Failed**: ${tests_failed}`;
}

type ScanResult = {
  markdown: string;
  json: MozillaScanResponse;
};

export async function scan({ url }: { url: string }): Promise<ScanResult> {
  if (!url) {
    throw new Error('DEPLOYMENT_URL env variable is required');
  }

  await fetch(url).catch(console.error);

  const hostname = new URL(url).hostname;

  console.log('Running Observatory scan for:', hostname);

  const response = await fetch(
    `https://observatory-api.mdn.mozilla.net/api/v2/scan?host=${hostname}`,
    {
      method: 'POST',
    },
  );

  const json: MozillaScanResponse = await response.json();

  console.log('Observatory response:', json);

  if (json.error) {
    throw new Error(`${json.error} ${json.message}`);
  }

  const markdown = observatoryResponseToMarkdown(json);

  console.log('Observatory scan complete.');

  return { markdown, json };
}

if (require.main === module) {
  const DEPLOYMENT_URL = process.env.DEPLOYMENT_URL;

  scan({ url: DEPLOYMENT_URL! })
    .then(({ markdown }) => {
      console.log(markdown);
    })
    .catch((err) => {
      console.error('Scan failed:', err.message || err);
      process.exit(1);
    });
}
