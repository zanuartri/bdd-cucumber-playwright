import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world";
import { LoginPage } from "../../pages/LoginPage";

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

Then("the user should be able to log out", async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.logout();
  const flash = await loginPage.getFlashMessage();
  expect(flash).toContain("You logged out of the secure area!");
});

Then(
  "the user should see an error message containing {string}",
  async function (this: CustomWorld, message: string) {
    const loginPage = new LoginPage(this.page);
    const flash = await loginPage.getFlashMessage();
    expect(flash).toContain(message);
  }
);
