import { URL } from 'node:url';

const { DEPLOYMENT_URL } = process.env;

if (!DEPLOYMENT_URL) {
  throw new Error('DEPLOYMENT_URL env variable is required');
}

console.log(await scan({ url: DEPLOYMENT_URL }));

async function scan({ url }: { url: string }): Promise<string> {
  await fetch(url).catch((error) => {
    console.error('Error fetching deployment URL:', error);
    process.exit(1);
  });

  const hostname = new URL(url).hostname;
  const response = await fetch(
    `https://observatory-api.mdn.mozilla.net/api/v2/scan?host=${hostname}`,
    {
      method: 'POST',
    },
  );
  const json: MozillaScanResponse = await response.json();

  if (json.error) {
    throw new Error(`${json.error} ${json.message}`);
  }
  
  emitGitHubAnnotations(json);
  
  return observatoryResponseToMarkdown(json);
}

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

function emitGitHubAnnotations(response: MozillaScanResponse) {
  const {
    grade,
    score,
    tests_failed,
    tests_passed,
    tests_quantity,
    id,
    details_url,
    algorithm_version,
    scanned_at,
    status_code,
  } = response;

  console.log(`::notice::Scan ID: ${id}`);
  console.log(`::notice::Details: ${details_url}`);
  console.log(`::notice::Algorithm Version: ${algorithm_version}`);
  console.log(`::notice::Scanned At: ${new Date(scanned_at).toLocaleString()}`);
  console.log(`::notice::Status Code: ${status_code}`);
  console.log(`::notice::Grade: ${grade}`);
  console.log(`::notice::Score: ${score} / 100`);
  console.log(`::notice::Total Tests: ${tests_quantity}`);
  console.log(`::notice::Tests Passed: ${tests_passed}`);
  console.log(`::notice::Tests Failed: ${tests_failed}`);

  if (tests_failed > 0) {
    console.log(`::warning::There are ${tests_failed} failed tests`);
  }

  if (grade === 'F' || score < 50) {
    console.log(
      `::error::Security scan score is low: Grade ${grade}, Score ${score}/100`,
    );
  }
}

function observatoryResponseToMarkdown(response: MozillaScanResponse) {
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
