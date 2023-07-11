var expect = require("chai").expect;

function xo(str) {
  var x = str.toLowerCase().match(/x/gi);
  var o = str.toLowerCase().match(/o/gi);

  return x.length === o.length;
}
describe("XO Tests", function () {
  it("should return true for the input 'xo'", function () {
    expect(xo('xo')).to.equal(true);
  });
  it("should return true for 'XO'", function () {
    expect(xo('XO')).to.equal(true);
    expect(xo('XO1')).to.equal(true);
    expect(xo('X1O')).to.equal(true);
    expect(xo('Xx    Oo')).to.equal(true);
    expect(xo(' ^  xO    ')).to.equal(true);
  })
});