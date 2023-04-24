import BigNumber from 'bignumber.js';

const PI = new BigNumber(Math.PI);
const E = new BigNumber(Math.E);
const TWO = new BigNumber(2);
const ONE = new BigNumber(1);

/**
 *
 */
function stirlingApproximation(n: BigNumber) {
  if (n.isEqualTo(1)) {
    return ONE;
  }

  const left = n.times(PI).times(TWO).sqrt();
  const right = n.dividedBy(E).pow(n);
  const product = left.times(right);
  console.log(product);
  return product;
}

/**
 *
 */
function* factorial(n: BigNumber): Generator<BigNumber> {
  let result = ONE;
  for (let i = new BigNumber(2); i.lte(n); i = i.plus(1)) {
    result = result.times(i);
    yield result;
  }
  return result;
}

/**
 *
 */
function floor(n: BigNumber) {
  return n.integerValue(BigNumber.ROUND_FLOOR);
}

/**
 *
 */
export function getPermutations(n: number) {
  const N = new BigNumber(n);
  let factor;

  const factorialGenerator = factorial(N);
  factor = factorialGenerator.next();

  while (!factor.done) {
    factor = factorialGenerator.next();
  }

  const eTimesNFactorial = E.times(factor.value);
  const result = floor(eTimesNFactorial).minus(1);

  if (result.gte(Number.MAX_VALUE)) {
    return result.toExponential(3);
  } else {
    return result.toString();
  }
}
