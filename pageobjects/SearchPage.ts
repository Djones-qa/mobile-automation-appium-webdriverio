import { BasePage } from './BasePage';

class SearchPage extends BasePage {
  get searchInput() {
    return $('android=new UiSelector().resourceId("org.wikipedia.alpha:id/search_src_text")');
  }

  async searchFor(text: string) {
    await this.searchInput.waitForDisplayed({ timeout: 5000 });
    await this.searchInput.setValue(text);
  }
}

export default new SearchPage();