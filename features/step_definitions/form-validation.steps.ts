import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world";
import { CheckoutPage } from "../../pages/CheckoutPage";

Given("the user is logged in as a standard customer", async function (this: CustomWorld) {
  const checkoutPage = new CheckoutPage(this.page);
  await checkoutPage.loginAsStandardUser();
});

Given("the user has proceeded to the checkout information form", async function (this: CustomWorld) {
  const checkoutPage = new CheckoutPage(this.page);
  await checkoutPage.addFirstItemToCartAndGoToCheckout();
});

When("the user submits the checkout form without entering any details", async function (this: CustomWorld) {
  const checkoutPage = new CheckoutPage(this.page);
  await checkoutPage.continueCheckout();
});

When(
  "the user submits the checkout form with only a first name {string}",
  async function (this: CustomWorld, firstName: string) {
    const checkoutPage = new CheckoutPage(this.page);
    await checkoutPage.fillCheckoutForm(firstName, "", "");
    await checkoutPage.continueCheckout();
  }
);

When(
  "the user submits the checkout form with first name {string} and last name {string}",
  async function (this: CustomWorld, firstName: string, lastName: string) {
    const checkoutPage = new CheckoutPage(this.page);
    await checkoutPage.fillCheckoutForm(firstName, lastName, "");
    await checkoutPage.continueCheckout();
  }
);

When(
  "the user submits the checkout form with first name {string}, last name {string} and postal code {string}",
  async function (this: CustomWorld, firstName: string, lastName: string, postalCode: string) {
    const checkoutPage = new CheckoutPage(this.page);
    await checkoutPage.fillCheckoutForm(firstName, lastName, postalCode);
    await checkoutPage.continueCheckout();
  }
);

Then("the user should see the error message {string}", async function (this: CustomWorld, message: string) {
  const checkoutPage = new CheckoutPage(this.page);
  expect(await checkoutPage.getErrorMessage()).toBe(message);
});

Then("the user should proceed to the order overview", async function (this: CustomWorld) {
  const checkoutPage = new CheckoutPage(this.page);
  expect(await checkoutPage.isOrderOverviewVisible()).toBe(true);
});
