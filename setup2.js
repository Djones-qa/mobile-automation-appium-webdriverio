const fs = require('fs');

fs.writeFileSync('pageobjects/BasePage.ts', `export class BasePage {
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
`);

fs.writeFileSync('pageobjects/HomePage.ts', `import { BasePage } from './BasePage';

class HomePage extends BasePage {
  get searchContainer() { return $('~Search Wikipedia'); }
  get mainMenu() { return $('~More options'); }
  get onboardingSkip() { return $('~Skip'); }

  async skipOnboarding() {
    try {
      await this.onboardingSkip.waitForDisplayed({ timeout: 5000 });
      await this.onboardingSkip.click();
    } catch (e) {}
  }

  async tapSearch() {
    await this.waitForDisplayed('~Search Wikipedia');
    await this.searchContainer.click();
  }
}

export default new HomePage();
`);

fs.writeFileSync('pageobjects/SearchPage.ts', `import { BasePage } from './BasePage';

class SearchPage extends BasePage {
  get searchInput() { return $('~Search Wikipedia'); }
  get searchResults() { return $$('~org.wikipedia.alpha:id/page_list_item_title'); }
  get firstResult() { return $('~org.wikipedia.alpha:id/page_list_item_title'); }

  async searchFor(term: string) {
    await this.searchInput.waitForDisplayed({ timeout: 10000 });
    await this.searchInput.setValue(term);
  }

  async getResultCount(): Promise<number> {
    await driver.pause(2000);
    return this.searchResults.length;
  }

  async tapFirstResult() {
    await this.firstResult.waitForDisplayed({ timeout: 10000 });
    await this.firstResult.click();
  }
}

export default new SearchPage();
`);

console.log('Page objects written!');
