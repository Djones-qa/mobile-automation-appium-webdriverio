import { expect as chaiExpect } from 'chai';
import HomePage from '../pageobjects/HomePage';
import SearchPage from '../pageobjects/SearchPage';

describe('Wikipedia Search', () => {

  before(function () {
    // Allow CI or sandbox runs to skip device-dependent tests cleanly.
    if (process.env.SKIP_DEVICE_TESTS === '1') {
      this.skip();
    }
  });

  it('should launch app and show search screen', async () => {
    await HomePage.restartApp();

    // Ensure we have navigated to the search screen before asserting the search input.
    await HomePage.tapSearch();

    // The tapSearch method should ensure the next screen is ready.
    // We wait for the search input to be displayed before interacting with it.
    await SearchPage.searchInput.waitForDisplayed({ timeout: 15000 });
    await expect(SearchPage.searchInput).toBeDisplayed();
  });

  it('should perform a search (typing into the input)', async () => {
    await HomePage.tapSearch();

    // Type into the search input to verify the app accepts keyboard input.
    await SearchPage.searchFor('Appium');

    const input = SearchPage.searchInput;
    const value = await input.getText();
    chaiExpect(value.toLowerCase()).to.contain('appium');
  });

});
