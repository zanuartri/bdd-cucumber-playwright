import type { Page } from "playwright";

const URL = "https://the-internet.herokuapp.com/dynamic_loading";

export class DynamicLoadingPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto(URL);
  }

  async openExample(exampleNumber: 1 | 2): Promise<void> {
    await this.page.goto(`${URL}/${exampleNumber}`);
  }

  async startLoading(): Promise<void> {
    await this.page.click("#start button");
  }

  async waitForLoadedText(expectedText: string): Promise<string> {
    const finish = this.page.locator("#finish");
    await finish.waitFor({ state: "visible" });
    const text = await finish.innerText();
    if (!text.includes(expectedText)) {
      throw new Error(`Expected loaded text to contain "${expectedText}" but got "${text}"`);
    }
    return text.trim();
  }
}
