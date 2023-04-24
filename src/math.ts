import BigNumber from 'bignumber.js';
BigNumber.set({ DECIMAL_PLACES: 10 });

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
  console.log('left');
  const left = n.times(PI).times(TWO).sqrt();
  console.log('right');
  const right = n.dividedBy(E).pow(n);
  console.log('product');
  const product = left.times(right);
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

  if (n > 10000) {
    console.log('stir', n);
    factor = {
      value: stirlingApproximation(N),
    };
  } else {
    console.log('iterate', n);
    const factorialGenerator = factorial(N);
    factor = factorialGenerator.next();

    while (!factor.done) {
      factor = factorialGenerator.next();
    }
  }
  console.log('here', n);
  const eTimesNFactorial = E.times(factor.value);
  const result = floor(eTimesNFactorial).minus(1);

  if (result.gte(Number.MAX_VALUE)) {
    return result.toExponential(3);
  } else {
    return result.toString();
  }
}
