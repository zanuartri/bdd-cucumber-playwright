import type { Page } from "playwright";

const LOGIN_URL = "https://www.saucedemo.com/";
const STANDARD_USER = "standard_user";
const PASSWORD = "secret_sauce";

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  async loginAsStandardUser(): Promise<void> {
    await this.page.goto(LOGIN_URL);
    await this.page.fill("#user-name", STANDARD_USER);
    await this.page.fill("#password", PASSWORD);
    await this.page.click("#login-button");
  }

  async addFirstItemToCartAndGoToCheckout(): Promise<void> {
    await this.page.locator(".inventory_item button", { hasText: "Add to cart" }).first().click();
    await this.page.click(".shopping_cart_link");
    await this.page.click("#checkout");
  }

  async fillCheckoutForm(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.page.fill("#first-name", firstName);
    await this.page.fill("#last-name", lastName);
    await this.page.fill("#postal-code", postalCode);
  }

  async continueCheckout(): Promise<void> {
    await this.page.click("#continue");
  }

  async getErrorMessage(): Promise<string> {
    const text = await this.page.locator("[data-test='error']").innerText();
    return text.trim();
  }

  isOrderOverviewVisible(): Promise<boolean> {
    return this.page.locator(".title", { hasText: "Checkout: Overview" }).isVisible();
  }
}
