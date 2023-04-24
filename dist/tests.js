var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// tests/index.ts
var import_uvu = require("uvu");
var assert = __toESM(require("uvu/assert"));

// src/math.ts
var import_bignumber = __toESM(require("bignumber.js"));
var PI = new import_bignumber.default(Math.PI);
var E = new import_bignumber.default(Math.E);
var TWO = new import_bignumber.default(2);
var ONE = new import_bignumber.default(1);
function* factorial(n) {
  let result = ONE;
  for (let i = new import_bignumber.default(2); i.lte(n); i = i.plus(1)) {
    result = result.times(i);
    yield result;
  }
  return result;
}
function floor(n) {
  return n.integerValue(import_bignumber.default.ROUND_FLOOR);
}
function getPermutations(n) {
  const N = new import_bignumber.default(n);
  let factor;
  const factorialGenerator = factorial(N);
  factor = factorialGenerator.next();
  while (!factor.done) {
    factor = factorialGenerator.next();
  }
  const eTimesNFactorial = E.times(factor.value);
  const result = floor(eTimesNFactorial).minus(1);
  if (n > 20) {
    return result.toExponential(3);
  } else {
    return result.toString();
  }
}

// tests/index.ts
(0, import_uvu.test)("True is true", async () => {
  assert.equal(getPermutations(1), "1");
  assert.equal(getPermutations(2), "4");
  assert.equal(getPermutations(3), "15");
  assert.equal(getPermutations(5), "325");
  assert.equal(getPermutations(7), "13699");
  assert.equal(getPermutations(11), "108505111");
  assert.equal(getPermutations(13), "16926797485");
  assert.equal(getPermutations(17), "966858672404688");
  assert.equal(getPermutations(19), "330665665962403970");
});
import_uvu.test.run();
//# sourceMappingURL=tests.js.map