import fs from 'node:fs';
import path from 'node:path';

type MetricValue = string | number | null;

interface MetricsStore {
  [key: string]: MetricValue;
}

type MetricFetcher = () => Promise<MetricValue>;

interface MetricFetchers {
  [key: string]: MetricFetcher;
}

const linterFriendlyStringify = (obj: MetricsStore): string => {
  let jsonString = JSON.stringify(obj, null, 2);
  jsonString = jsonString.replace(/"([^"]+)":/g, '$1:');
  jsonString = jsonString.replace(/: "([^"]*)"/g, ": '$1'");
  jsonString = jsonString.replace(/\n}$/, ',\n}');
  return jsonString;
};

async function fetchAllMetrics() {
  console.log('Fetching metrics for static build...');
  const metrics: MetricsStore = {};

  try {
    const { metricFetchers } = (await import(
      '../app/api/stats/parity/metrics/index'
    )) as { metricFetchers: MetricFetchers };

    for (const [key, fetchFn] of Object.entries(metricFetchers)) {
      try {
        metrics[key] = await fetchFn();
      } catch (error) {
        if (error instanceof Error) {
          console.error(`  ✗ Error fetching ${key}:`, error?.message);
        }
        metrics[key] = null;
      }
    }
  } catch (error) {
    console.error('Error importing metric functions:', error);
    if (error instanceof Error) {
      console.error(error.stack);
    }
    process.exit(1);
  }

  const outputDir = path.join(__dirname, '../app/api/stats');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'static-metrics-store.ts');

  const fileContent = `// Auto-generated metrics from build process\n// Generated on: ${new Date().toISOString()}\n\nexport const staticMetricsStore = ${linterFriendlyStringify(metrics)};\n`;

  fs.writeFileSync(outputPath, fileContent);
  console.log(`Metrics saved to ${outputPath}`);
}

fetchAllMetrics().catch((error) => {
  console.error('Failed to fetch metrics:', error);
  process.exit(1);
});
