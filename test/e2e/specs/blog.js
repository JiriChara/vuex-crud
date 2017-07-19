module.exports = {
  blog(browser) {
    browser
      .url('http://localhost:8080/blog/')
      .waitForElementVisible('#vue-app', 1000)
      .assert.elementPresent('button.fetch-articles')
      .assert.elementPresent('button.create-article')

      // Fetch List Tests
      .click('button.fetch-articles')
      .waitForElementVisible('#articles', 1000)
      .assert.elementPresent('article.article-1')
      .assert.elementPresent('article.article-2')
      .assert.elementPresent('article.article-3')
      .assert.elementNotPresent('article.article-4')

      // Create Tests
      .click('button.create-article')
      .click('button.fetch-articles')
      .waitForElementVisible('article.article-4', 1000)
      .assert.elementPresent('article.article-1')
      .assert.elementPresent('article.article-2')
      .assert.elementPresent('article.article-3')
      .assert.elementPresent('article.article-4')

      // Update Tests
      .getText('article.article-1 h1', (result) => {
        browser.expect.element('article.article-1 h1').text.to.equal(
          result.value
        );
      })
      .getText('article.article-1 h1', (result) => {
        browser.click('article.article-1 .edit-article');
        browser.expect.element('article.article-1 h1').text.to.not.equal(
          result.value
        );
      })
      .getText('article.article-1 p.content', (result) => {
        browser.expect.element('article.article-1 p.content').text.to.equal(
          result.value
        );
      })
      .getText('article.article-1 p.content', (result) => {
        browser.click('article.article-1 .edit-article');
        browser.expect.element('article.article-1 p.content').text.to.not.equal(
          result.value
        );
      })

      // Replace Tests
      .getText('article.article-2 h1', (result) => {
        browser.expect.element('article.article-2 h1').text.to.equal(
          result.value
        );
      })
      .getText('article.article-2 h1', (result) => {
        browser.click('article.article-2 .replace-article');
        browser.expect.element('article.article-2 h1').text.to.not.equal(
          result.value
        );
      })
      .getText('article.article-2 p.content', (result) => {
        browser.expect.element('article.article-2 p.content').text.to.equal(
          result.value
        );
      })
      .getText('article.article-2 p.content', (result) => {
        browser.click('article.article-2 .replace-article');
        browser.expect.element('article.article-2 p.content').text.to.not.equal(
          result.value
        );
      })

      // Delete Test
      .click('article.article-4 .delete-article')
      .assert.elementNotPresent('article.article-4')

      // Navigate to single article
      .click('article.article-3 a')
      .waitForElementVisible('#article', 1000)

      .assert.elementNotPresent('article.article-1')
      .assert.elementNotPresent('article.article-2')
      .assert.elementPresent('article.article-3')
      .assert.elementNotPresent('article.article-4')

      // Update Single Tests
      .getText('article.article-3 h1', (result) => {
        browser.expect.element('article.article-3 h1').text.to.equal(
          result.value
        );
      })
      .getText('article.article-3 h1', (result) => {
        browser.click('article.article-3 .edit-article');
        browser.expect.element('article.article-3 h1').text.to.not.equal(
          result.value
        );
      })
      .getText('article.article-3 p.content', (result) => {
        browser.expect.element('article.article-3 p.content').text.to.equal(
          result.value
        );
      })
      .getText('article.article-3 p.content', (result) => {
        browser.click('article.article-3 .edit-article');
        browser.expect.element('article.article-3 p.content').text.to.not.equal(
          result.value
        );
      })

      // Replace Single Tests
      .getText('article.article-3 h1', (result) => {
        browser.expect.element('article.article-3 h1').text.to.equal(
          result.value
        );
      })
      .getText('article.article-3 h1', (result) => {
        browser.click('article.article-3 .replace-article');
        browser.expect.element('article.article-3 h1').text.to.not.equal(
          result.value
        );
      })
      .getText('article.article-3 p.content', (result) => {
        browser.expect.element('article.article-3 p.content').text.to.equal(
          result.value
        );
      })
      .getText('article.article-3 p.content', (result) => {
        browser.click('article.article-3 .replace-article');
        browser.expect.element('article.article-3 p.content').text.to.not.equal(
          result.value
        );
      })

      // Delete Single Test
      .click('article.article-3 .delete-article')
      .assert.elementNotPresent('article.article-3')
      .click('.back a')
      .waitForElementVisible('#articles', 1000)
      .assert.elementNotPresent('article.article-3')

      // Single fetch tests
      .url('http://localhost:8080/blog/#/articles/1')
      .refresh()
      .waitForElementVisible('#article', 1000)

      // Update Single Tests
      .getText('article.article-1 h1', (result) => {
        browser.expect.element('article.article-1 h1').text.to.equal(
          result.value
        );
      })
      .getText('article.article-1 h1', (result) => {
        browser.click('article.article-1 .edit-article');
        browser.expect.element('article.article-1 h1').text.to.not.equal(
          result.value
        );
      })
      .getText('article.article-1 p.content', (result) => {
        browser.expect.element('article.article-1 p.content').text.to.equal(
          result.value
        );
      })
      .getText('article.article-1 p.content', (result) => {
        browser.click('article.article-1 .edit-article');
        browser.expect.element('article.article-1 p.content').text.to.not.equal(
          result.value
        );
      })

      // Replace Single Tests
      .getText('article.article-1 h1', (result) => {
        browser.expect.element('article.article-1 h1').text.to.equal(
          result.value
        );
      })
      .getText('article.article-1 h1', (result) => {
        browser.click('article.article-1 .replace-article');
        browser.expect.element('article.article-1 h1').text.to.not.equal(
          result.value
        );
      })
      .getText('article.article-1 p.content', (result) => {
        browser.expect.element('article.article-1 p.content').text.to.equal(
          result.value
        );
      })
      .getText('article.article-1 p.content', (result) => {
        browser.click('article.article-1 .replace-article');
        browser.expect.element('article.article-1 p.content').text.to.not.equal(
          result.value
        );
      })

      // Delete Single Test
      .click('article.article-1 .delete-article')
      .assert.elementNotPresent('article.article-1')
      .click('.back a')
      .waitForElementVisible('#vue-app', 1000)
      .assert.elementNotPresent('#articles')
      .click('button.fetch-articles')
      .waitForElementVisible('#articles', 1000)
      .assert.elementNotPresent('article.article-1')
      .assert.elementPresent('article.article-2')
      .assert.elementNotPresent('article.article-3')
      .assert.elementNotPresent('article.article-4')

      .end();
  }
};
