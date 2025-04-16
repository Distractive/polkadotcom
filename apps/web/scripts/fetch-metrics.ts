// @ts-nocheck

import fs from 'node:fs';
import path from 'node:path';

async function fetchAllMetrics() {
  console.log('Fetching metrics for static build...');
  const metrics = {};

  try {
    const { metricFetchers } = await import(
      '../app/api/stats/parity/metrics/index.ts'
    );

    for (const [key, fetchFn] of Object.entries(metricFetchers)) {
      try {
        console.log(`Fetching ${key}...`);
        metrics[key] = await fetchFn();
        console.log(`  ✓ ${key}: ${metrics[key]}`);
      } catch (error) {
        console.error(`  ✗ Error fetching ${key}:`, error.message);
        metrics[key] = null;
      }
    }
  } catch (error) {
    console.error('Error importing metric functions:', error);
    console.error(error.stack);
  }

  const outputDir = path.join(__dirname, '../app/api/stats');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'static-metrics-store.ts');

  // Updated to use ES module exports syntax instead of CommonJS
  const fileContent = `// Auto-generated metrics from build process
// Generated on: ${new Date().toISOString()}
// DO NOT EDIT MANUALLY

// Flag to detect static export mode
export const isStaticExport = process.env.NEXT_PHASE === 'phase-export';

// Pre-fetched metrics
export const staticMetricsStore = ${JSON.stringify(metrics, null, 2)};
`;

  fs.writeFileSync(outputPath, fileContent);
  console.log(`Metrics saved to ${outputPath}`);
}

fetchAllMetrics().catch((error) => {
  console.error('Failed to fetch metrics:', error);
  process.exit(1);
});