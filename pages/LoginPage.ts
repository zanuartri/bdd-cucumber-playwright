import type { Page } from "playwright";

const URL = "https://the-internet.herokuapp.com/login";

export class LoginPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto(URL);
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.fill("#username", username);
    await this.page.fill("#password", password);
    await this.page.click("button[type='submit']");
  }

  async getFlashMessage(): Promise<string> {
    const text = await this.page.locator("#flash").innerText();
    return text.trim();
  }

  async logout(): Promise<void> {
    await this.page.click("a.button.secondary");
  }

  isSecureAreaVisible(): Promise<boolean> {
    return this.page.locator("h2", { hasText: "Secure Area" }).isVisible();
  }
}
