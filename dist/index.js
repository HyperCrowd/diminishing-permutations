var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  getPermutations: () => getPermutations
});
module.exports = __toCommonJS(src_exports);

// src/math.ts
var import_bignumber = __toESM(require("bignumber.js"));
var PI = new import_bignumber.default(Math.PI);
var E = new import_bignumber.default(Math.E);
var TWO = new import_bignumber.default(2);
var ONE = new import_bignumber.default(1);
function stirlingApproximation(n) {
  if (n.isEqualTo(1)) {
    return ONE;
  }
  console.log("left");
  const left = n.times(PI).times(TWO).sqrt();
  console.log("right");
  const right = n.dividedBy(E);
  console.log("product");
  const product = left.times(power(right, n));
  console.log(product);
  return product;
}
function power(base, exponent) {
  let result = new import_bignumber.default(1);
  let multiplier = base;
  let remainder = exponent;
  while (remainder.gt(0)) {
    console.log(remainder.gt(0));
    if (remainder.modulo(2).eq(1)) {
      result = result.times(multiplier);
    }
    console.log("mult");
    multiplier = multiplier.times(multiplier);
    console.log("div");
    remainder = remainder.dividedBy(2);
  }
  console.log("done");
  return result;
}
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
  if (n > 1e4) {
    console.log("stir", n);
    factor = {
      value: stirlingApproximation(N)
    };
  } else {
    console.log("iterate", n);
    const factorialGenerator = factorial(N);
    factor = factorialGenerator.next();
    while (!factor.done) {
      factor = factorialGenerator.next();
    }
  }
  console.log("here", n);
  const eTimesNFactorial = E.times(factor.value);
  const result = floor(eTimesNFactorial).minus(1);
  if (result.gte(Number.MAX_VALUE)) {
    return result.toExponential(3);
  } else {
    return result.toString();
  }
}

// src/index.ts
console.log({
  1: getPermutations(1),
  2: getPermutations(2),
  3: getPermutations(3),
  4: getPermutations(4),
  5: getPermutations(5),
  6: getPermutations(6),
  7: getPermutations(7),
  8: getPermutations(8),
  9: getPermutations(9),
  10: getPermutations(1e5)
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getPermutations
});
//# sourceMappingURL=index.js.map