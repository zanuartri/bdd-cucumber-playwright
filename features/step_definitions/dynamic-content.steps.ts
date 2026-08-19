import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world";
import { DynamicLoadingPage } from "../../pages/DynamicLoadingPage";

Given("the user is on the dynamic loading page", async function (this: CustomWorld) {
  this.dynamicLoadingPage = new DynamicLoadingPage(this.page);
  await this.dynamicLoadingPage.open();
});

When("the user starts an element that loads without changing visibility", async function (this: CustomWorld) {
  await this.dynamicLoadingPage!.openExample(1);
  await this.dynamicLoadingPage!.startLoading();
});

When("the user starts an element that renders only after loading", async function (this: CustomWorld) {
  await this.dynamicLoadingPage!.openExample(2);
  await this.dynamicLoadingPage!.startLoading();
});

Then("the loaded content {string} should eventually be displayed", async function (this: CustomWorld, expectedText: string) {
  await this.dynamicLoadingPage!.waitForLoadedText(expectedText);
});
