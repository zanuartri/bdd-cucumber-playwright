import path from "path";
import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world";
import { UploadPage } from "../../pages/UploadPage";

const FIXTURES_DIR = path.join(__dirname, "..", "support", "fixtures");

Given("the user is on the file upload page", async function (this: CustomWorld) {
  const uploadPage = new UploadPage(this.page);
  await uploadPage.open();
});

When("the user selects a file named {string} to upload", async function (this: CustomWorld, fileName: string) {
  const uploadPage = new UploadPage(this.page);
  await uploadPage.chooseFile(path.join(FIXTURES_DIR, fileName));
});

When("the user submits the upload", async function (this: CustomWorld) {
  const uploadPage = new UploadPage(this.page);
  await uploadPage.submit();
});

Then("the page should confirm the file {string} was uploaded", async function (this: CustomWorld, fileName: string) {
  const uploadPage = new UploadPage(this.page);
  expect(await uploadPage.getUploadedFileName()).toBe(fileName);
});
