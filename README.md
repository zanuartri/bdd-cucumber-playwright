# BDD Cucumber + Playwright

![CI](https://github.com/zanuartri/bdd-cucumber-playwright/actions/workflows/ci.yml/badge.svg)

Web UI test automation using **Cucumber** (Gherkin, test runner) driving **Playwright** (browser automation), written in TypeScript.

> This repo mirrors the login and form-validation scenarios from [`playwright-js`/`playwright-python`](../) — same sites, same assertions — but expressed in Gherkin so the intent is readable by non-technical stakeholders, not just engineers.

## Why BDD on top of Playwright?

A plain Page-Object-Model suite is precise but only readable by engineers. Cucumber adds a layer on top of the same Playwright automation:

- **Shared language** — `.feature` files are written in plain English (Given/When/Then), so a product owner or QA lead can read and review test scenarios without knowing TypeScript.
- **Living documentation** — the feature files describe expected behavior of the app and stay in sync with reality, because they *are* the tests. If a scenario stops matching the app, it fails.
- **Separation of intent from implementation** — step definitions translate business language into Page Object calls, so the "what" (feature file) and the "how" (step defs + page objects) can evolve independently.

## Structure

```
features/
  Login.feature
  FormValidation.feature
  FileUpload.feature
  DynamicContent.feature
  step_definitions/    # thin glue: Gherkin steps -> Page Object calls
  support/             # World (per-scenario state) + Hooks (browser lifecycle)
pages/                 # Page Object Model, reused by step definitions
scripts/
  transform-results.ts # Cucumber JSON -> results/results.json
results/
  results.json         # normalized run summary, uploaded as a CI artifact
```

## Example: feature file next to its step definitions

**`features/Login.feature`**
```gherkin
Background:
  Given the user is on the login page

Scenario: Successful login with valid credentials
  When the user logs in with username "tomsmith" and password "SuperSecretPassword!"
  Then the user should see a secure area welcome message
  And the user should be able to log out
```

**`features/step_definitions/login.steps.ts`**
```ts
Given("the user is on the login page", async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.open();
});

When(
  "the user logs in with username {string} and password {string}",
  async function (this: CustomWorld, username: string, password: string) {
    const loginPage = new LoginPage(this.page);
    await loginPage.login(username, password);
  }
);

Then("the user should see a secure area welcome message", async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  expect(await loginPage.isSecureAreaVisible()).toBe(true);
});
```

The step definition never touches a CSS selector directly — that lives in `pages/LoginPage.ts`. Swap the page object's internals and every scenario that uses it keeps working.

## Sites under test

- [the-internet.herokuapp.com](https://the-internet.herokuapp.com) — login, file upload, dynamic loading
- [saucedemo.com](https://www.saucedemo.com) — checkout form validation

## No hard sleeps

Waiting for async content (`DynamicContent.feature`) uses Playwright's built-in polling (`locator.waitFor({ state: "visible" })`), which retries until the element appears or a timeout is hit — never a fixed `sleep()`.

## Setup & run

```bash
npm install
npx playwright install --with-deps chromium
npm test              # runs all .feature files, writes results/cucumber-report.json
npm run report         # transforms it into results/results.json
```

Run headed (visible browser) for debugging:

```bash
HEADED=true npm test
```

## CI

`.github/workflows/ci.yml` installs dependencies, installs the Chromium browser, runs the suite, generates `results/results.json`, uploads it as a build artifact, and fails the build if any scenario fails.
