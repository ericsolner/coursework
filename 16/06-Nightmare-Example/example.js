var Nightmare = require("nightmare");

var nightmare = Nightmare({ show: true });

nightmare
  .goto("http://news.ycombinator.com")
  .click("a.storylink")
  .wait(500)
  .click("#searchmenu")
  .wait("input.headSearch.watermark")
  .type("input.headSearch.watermark", "wuhoooo")
  .click("input.headSubmitBtn")
  .end()
  .then(function(result) {
    console.log(result);
  })
  .catch(function(error) {
    console.error("Search failed:", error);
  });
