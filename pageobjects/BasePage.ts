export class BasePage {
  async waitForDisplayed(selector: string) {
    await $(selector).waitForDisplayed({ timeout: 10000 });
  }

  async tap(selector: string) {
    await $(selector).click();
  }

  async getText(selector: string): Promise<string> {
    return $(selector).getText();
  }

  async setValue(selector: string, value: string) {
    await $(selector).setValue(value);
  }
}
