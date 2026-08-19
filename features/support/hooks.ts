import { Before, After, BeforeAll, AfterAll, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, Browser, BrowserContext } from "playwright";
import { CustomWorld } from "./world";

let browser: Browser;
let context: BrowserContext;

setDefaultTimeout(20 * 1000);

BeforeAll(async function () {
  browser = await chromium.launch({ headless: process.env.HEADED !== "true" });
});

Before(async function (this: CustomWorld) {
  context = await browser.newContext();
  this.page = await context.newPage();
});

After(async function () {
  await context.close();
});

AfterAll(async function () {
  await browser.close();
});
