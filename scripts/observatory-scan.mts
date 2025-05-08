import { URL } from 'node:url';

const { DEPLOYMENT_URL } = process.env;

if (!DEPLOYMENT_URL) {
  throw new Error('DEPLOYMENT_URL env variable is required');
}

const scanResult = await scan({ url: DEPLOYMENT_URL });

console.log(scanResult.text);
console.log(`::set-output name=result::${escapeForOutput(scanResult.text)}`);
console.log(
  `::set-output name=slack_blocks::${escapeForOutput(scanResult.slackBlocks)}`,
);

async function scan({
  url,
}: { url: string }): Promise<{ text: string; slackBlocks: string }> {
  await fetch(url).catch((error) => {
    console.error('Error fetching deployment URL:', error);
    process.exit(1);
  });

  const hostname = new URL(url).hostname;
  const response = await fetch(
    `https://observatory-api.mdn.mozilla.net/api/v2/scan?host=${hostname}`,
    { method: 'POST' },
  );

  const json: MozillaScanResponse = await response.json();

  if (json.error) {
    throw new Error(`${json.error} ${json.message}`);
  }

  return {
    text: observatoryResponseToText(json),
    slackBlocks: observatoryResponseToSlackBlocks(json),
  };
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

function observatoryResponseToText(response: MozillaScanResponse): string {
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

  return [
    'Mozilla Observatory Scan Results',
    '--------------------------------',
    `Scan ID         : ${id}`,
    `Details         : ${details_url}`,
    `Algorithm Ver.  : ${algorithm_version}`,
    `Scanned At      : ${new Date(scanned_at).toLocaleString()}`,
    `HTTP Status     : ${status_code}`,
    `Grade           : ${grade}`,
    `Score           : ${score} / 100`,
    '',
    'Test Summary',
    '------------',
    `Total Tests     : ${tests_quantity}`,
    `Tests Passed    : ${tests_passed}`,
    `Tests Failed    : ${tests_failed}`,
  ].join('\n');
}

function observatoryResponseToSlackBlocks(
  response: MozillaScanResponse,
): string {
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

  return [
    '- type: "header"',
    '  text:',
    '    type: "plain_text"',
    '    text: "🛡 Mozilla Observatory Scan"',
    '- type: "section"',
    '  text:',
    '    type: "mrkdwn"',
    `    text: "*Grade:* ${grade}  •  *Score:* ${score} / 100  •  *Status Code:* ${status_code}"`,
    '- type: "section"',
    '  text:',
    '    type: "mrkdwn"',
    `    text: "*Scan Details:*\\n• ID: ${id}\\n• Algorithm Version: ${algorithm_version}\\n• Scanned At: ${new Date(scanned_at).toLocaleString()}"`,
    '- type: "section"',
    '  text:',
    '    type: "mrkdwn"',
    `    text: "*Test Summary:*\\n• Total: ${tests_quantity}\\n• Passed: ${tests_passed}\\n• Failed: ${tests_failed}"`,
    '- type: "section"',
    '  text:',
    '    type: "mrkdwn"',
    `    text: "<${details_url}|View full scan details>"`,
  ].join('\n');
}


function escapeForOutput(input: string): string {
  return input
    .replaceAll('%', '%25')
    .replaceAll('\n', '%0A')
    .replaceAll('\r', '%0D');
}
