import * as fs from "fs";
import * as path from "path";

interface CucumberStep {
  result?: { status: string; duration?: number };
}

interface CucumberScenario {
  keyword: string;
  name: string;
  steps: CucumberStep[];
}

interface CucumberFeature {
  elements: CucumberScenario[];
}

interface ResultTest {
  name: string;
  status: "passed" | "failed" | "skipped";
  duration: number;
}

const REPORT_PATH = path.join(__dirname, "..", "results", "cucumber-report.json");
const OUTPUT_PATH = path.join(__dirname, "..", "results", "results.json");

function stepDurationSeconds(step: CucumberStep): number {
  return (step.result?.duration ?? 0) / 1e9;
}

function scenarioStatus(scenario: CucumberScenario): ResultTest["status"] {
  const statuses = scenario.steps.map((step) => step.result?.status ?? "skipped");
  if (statuses.includes("failed")) return "failed";
  if (statuses.every((status) => status === "skipped")) return "skipped";
  return "passed";
}

const raw = fs.readFileSync(REPORT_PATH, "utf-8");
const features: CucumberFeature[] = JSON.parse(raw);

const tests: ResultTest[] = features.flatMap((feature) =>
  feature.elements
    .filter((element) => element.keyword === "Scenario" || element.keyword === "Scenario Outline")
    .map((scenario) => ({
      name: scenario.name,
      status: scenarioStatus(scenario),
      duration: Number(scenario.steps.reduce((sum, step) => sum + stepDurationSeconds(step), 0).toFixed(3)),
    }))
);

const passed = tests.filter((t) => t.status === "passed").length;
const failed = tests.filter((t) => t.status === "failed").length;
const skipped = tests.filter((t) => t.status === "skipped").length;
const durationSeconds = Number(tests.reduce((sum, t) => sum + t.duration, 0).toFixed(3));

const output = {
  stack: "bdd-cucumber-playwright",
  platform: "web",
  run_at: new Date().toISOString(),
  total: tests.length,
  passed,
  failed,
  skipped,
  duration_seconds: durationSeconds,
  tests,
};

fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
console.log(`Wrote ${OUTPUT_PATH} (${tests.length} tests: ${passed} passed, ${failed} failed, ${skipped} skipped)`);
