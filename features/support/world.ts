import { setWorldConstructor, World, IWorldOptions } from "@cucumber/cucumber";
import type { Page } from "playwright";
import type { DynamicLoadingPage } from "../../pages/DynamicLoadingPage";

export class CustomWorld extends World {
  public page!: Page;
  public dynamicLoadingPage?: DynamicLoadingPage;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
