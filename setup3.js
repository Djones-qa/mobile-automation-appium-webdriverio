const fs = require('fs');

fs.writeFileSync('tests/search.spec.ts', `import HomePage from '../pageobjects/HomePage';
import SearchPage from '../pageobjects/SearchPage';

describe('Wikipedia Search', () => {

  beforeEach(async () => {
    await HomePage.skipOnboarding();
  });

  it('should launch app and show home screen', async () => {
    await HomePage.searchContainer.waitForDisplayed({ timeout: 10000 });
    expect(await HomePage.searchContainer.isDisplayed()).toBe(true);
  });

  it('should tap search and show search input', async () => {
    await HomePage.tapSearch();
    expect(await SearchPage.searchInput.isDisplayed()).toBe(true);
  });

  it('should search for Playwright and return results', async () => {
    await HomePage.tapSearch();
    await SearchPage.searchFor('Playwright');
    const count = await SearchPage.getResultCount();
    expect(count).toBeGreaterThan(0);
  });

  it('should search for JavaScript and tap first result', async () => {
    await HomePage.tapSearch();
    await SearchPage.searchFor('JavaScript');
    await driver.pause(2000);
    await SearchPage.tapFirstResult();
    await driver.pause(3000);
    const title = await driver.getTitle();
    expect(title).toBeTruthy();
  });

  it('should search for TypeScript and return results', async () => {
    await HomePage.tapSearch();
    await SearchPage.searchFor('TypeScript');
    const count = await SearchPage.getResultCount();
    expect(count).toBeGreaterThan(0);
  });

});
`);

console.log('Tests written!');
