import { BasePage } from './BasePage';

class HomePage extends BasePage {
  get searchNavTab() {
    return $('android=new UiSelector().resourceId("org.wikipedia.alpha:id/nav_tab_search")');
  }
  get searchContainer() {
    return $('android=new UiSelector().resourceId("org.wikipedia.alpha:id/search_container")');
  }
  get searchInput() {
    return $('android=new UiSelector().resourceId("org.wikipedia.alpha:id/search_src_text")');
  }
  get searchCard() {
    return $('android=new UiSelector().resourceId("org.wikipedia.alpha:id/search_card")');
  }
  get searchTextView() {
    return $('android=new UiSelector().resourceId("org.wikipedia.alpha:id/search_text_view")');
  }

  // isDisplayed() uses findElement (singular) — works on this device.
  // isExisting() uses findElements (plural) — returns [] on this device, unreliable.
  private async isVisible(sel: string): Promise<boolean> {
    // Bypassing default implicit timeout to avoid long waits when checking multiple selectors
    await driver.setTimeout({ implicit: 0 });
    try {
      return await driver.$(sel).isDisplayed();
    } catch (e) {
      return false;
    } finally {
      // Restore implicit wait timeout
      await driver.setTimeout({ implicit: 10000 });
    }
  }

  // Dismiss system crash dialogs AND Wikipedia in-app dialogs.
  // Uses isDisplayed() (findElement) since findElements returns [] on this device.
  async dismissSystemDialogs(maxAttempts = 5) {
    const selectors = [
      'android=new UiSelector().resourceId("android:id/aerr_close")',
      'android=new UiSelector().resourceId("android:id/aerr_wait")',
      'android=new UiSelector().resourceId("android:id/button2")',
      'android=new UiSelector().resourceId("android:id/button1")',
      'android=new UiSelector().resourceId("org.wikipedia.alpha:id/closeButton")',
      'android=new UiSelector().resourceId("org.wikipedia.alpha:id/negativeButton")',
      'android=new UiSelector().resourceId("org.wikipedia.alpha:id/skip_button")',
    ];

    for (let i = 0; i < maxAttempts; i++) {
      let dismissed = false;
      for (const sel of selectors) {
        if (await this.isVisible(sel)) {
          try {
            await driver.$(sel).click();
            await driver.pause(600);
            dismissed = true;
            break;
          } catch (e) {}
        }
      }
      if (!dismissed) break;
    }
  }

  // Restart the app cleanly to the home screen
  async restartApp() {
    try {
      await driver.execute('mobile: terminateApp', { appId: 'org.wikipedia.alpha' });
      await driver.pause(300);
    } catch (e) {}
    
    // Give app more time to fully terminate
    await driver.pause(1000);
    
    await driver.execute('mobile: activateApp', { appId: 'org.wikipedia.alpha' });
    await driver.pause(2000);
    await this.dismissSystemDialogs();
    
    // Handle onboarding if present
    try {
      const skipSel = 'android=new UiSelector().resourceId("org.wikipedia.alpha:id/fragment_onboarding_skip_button")';
      if (await this.isVisible(skipSel)) {
        await driver.$(skipSel).click();
        await driver.pause(500);
      }
    } catch (e) {}
    await this.dismissSystemDialogs();
  }

  async tapSearch() {
    await this.dismissSystemDialogs();

    // If the search input is already visible, we are already on the search screen.
    if (await this.isVisible('android=new UiSelector().resourceId("org.wikipedia.alpha:id/search_src_text")')) {
      return;
    }

    // If the search container is present, tap it to focus the search.
    if (await this.isVisible('android=new UiSelector().resourceId("org.wikipedia.alpha:id/search_container")')) {
      await this.searchContainer.click();
      await driver.waitUntil(
        async () => this.isVisible('android=new UiSelector().resourceId("org.wikipedia.alpha:id/search_src_text")'),
        { timeout: 5000, timeoutMsg: 'Search input did not appear after tapping container' }
      );
      return;
    }

    // If the app uses a bottom navigation bar, tap the search tab.
    try {
      await driver.waitUntil(async () => {
        try { return await this.searchNavTab.isDisplayed(); } catch (e) { return false; }
      }, { timeout: 15000, interval: 500, timeoutMsg: 'search nav tab not found after 15s' });
      await this.searchNavTab.click();
      await this.dismissSystemDialogs();

      // If there is a search card, click it to open the search input.
      await driver.waitUntil(async () => {
        try { return await this.searchCard.isDisplayed(); } catch (e) { return false; }
      }, { timeout: 10000, interval: 500, timeoutMsg: 'search card not found after 10s' });
      await this.searchCard.click();

      await driver.waitUntil(
        async () => this.isVisible('android=new UiSelector().resourceId("org.wikipedia.alpha:id/search_src_text")'),
        { timeout: 5000, timeoutMsg: 'Search input did not appear after tapping card' }
      );
    } catch (e) {
      // If none of the expected UI elements are available, throw to make failures obvious.
      throw new Error('Could not navigate to search screen: ' + (e as Error).message);
    }
  }
}

export default new HomePage();
