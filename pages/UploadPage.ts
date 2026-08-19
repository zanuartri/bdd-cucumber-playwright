import type { Page } from "playwright";

const URL = "https://the-internet.herokuapp.com/upload";

export class UploadPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto(URL);
  }

  async chooseFile(filePath: string): Promise<void> {
    await this.page.setInputFiles("#file-upload", filePath);
  }

  async submit(): Promise<void> {
    await this.page.click("#file-submit");
  }

  async getUploadedFileName(): Promise<string> {
    const text = await this.page.locator("#uploaded-files").innerText();
    return text.trim();
  }
}
