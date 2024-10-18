import assert from 'assert';
import {
  preciseResult,
  eulerMaclaurinLogSum,
  numberToLatex,
  getPermutationAnalysis
} from './math.js'

function testPreciseResult() {
  // Test case: standard input
  assert.strictEqual(preciseResult(5), 5.787491742782046);
  
  // Test case: edge case with zero
  assert.strictEqual(preciseResult(0), 1); // log(1) = 0, result = 0 + 1 
  
  // Test case: negative input
  assert.strictEqual(preciseResult(-1), 1);

  // Test case: large input
  const largeInput = 1000;
  const resultLarge = preciseResult(largeInput); 
  assert.ok(resultLarge > 0);
}

function testEulerMaclaurinLogSum() {
  // Test case: standard input
  assert.strictEqual(eulerMaclaurinLogSum(10), 13.833912713854167, "Expected approximation for N=10");
  
  // Test case: edge case with N=3
  assert.strictEqual(eulerMaclaurinLogSum(3), 1.6931471805599454, "Expected approximation for N=3");

  // Test case: edge case with N=2
  assert.strictEqual(eulerMaclaurinLogSum(2), 0.9602792291600821, "Expected approximation for N=2");

  // Test case: input less than 2
  assert.strictEqual(eulerMaclaurinLogSum(1), 0);
  assert.strictEqual(eulerMaclaurinLogSum(0), 0);

  // Test case: large input
  const largeInput = 100000;
  const resultLarge = eulerMaclaurinLogSum(largeInput);
  assert.ok(resultLarge > 0, "Expected positive result for large N");
}

function testNumberToLatex() {
  // Test case: positive integer
  assert.strictEqual(numberToLatex(123456), 'e^{1.23456 \\times 10^{+5}}', "Expected LaTeX representation for 123456");

  // Test case: small positive number
  assert.strictEqual(numberToLatex(0.000123), 'e^{1.23 \\times 10^{-4}}', "Expected LaTeX representation for 0.000123");

  // Test case: one
  assert.strictEqual(numberToLatex(1), 'e^{1}', "Expected LaTeX representation for 1");

  // Test case: zero
  assert.strictEqual(numberToLatex(0), 'e^{0}', "Expected LaTeX representation for 0");

  // Test case: negative number
  assert.strictEqual(numberToLatex(-456), 'e^{-4.56 \\times 10^{+2}}', "Expected LaTeX representation for -456");

  // Test case: very large number
  assert.strictEqual(numberToLatex(1e+20), 'e^{1 \\times 10^{+20}}', "Expected LaTeX representation for 1e+20");

  // Test case: very small negative number
  assert.strictEqual(numberToLatex(-0.0000456), 'e^{-4.56 \\times 10^{-5}}', "Expected LaTeX representation for -0.0000456");
}

function testGetAngle() {
  // Test case: midpoint of the range
  assert.strictEqual(getAngle(38.32813410063701), 45, "Expected angle for midpoint value");

  // Test case: maximum value
  assert.strictEqual(getAngle(76.65626820127402), 0, "Expected angle for max value");

  // Test case: minimum value
  assert.strictEqual(getAngle(0), 90, "Expected angle for min value");

  // Test case: above maximum value
  assert.strictEqual(getAngle(100), 0, "Expected angle for value above max");

  // Test case: below minimum value
  assert.strictEqual(getAngle(-10), 90, "Expected angle for value below min");

  // Test case: default maxValue
  assert.strictEqual(getAngle(76.65626820127402, 100), 0, "Expected angle for maxValue set to 100");

  // Test case: zero value for maxValue
  assert.strictEqual(getAngle(0, 0), 90, "Expected angle for zero maxValue");

  // Test case: negative maxValue
  assert.strictEqual(getAngle(0, -10), 90, "Expected angle for negative maxValue");
}

function testGetPermutationAnalysis() {
  // Test case: normal input
  const result1 = getPermutationAnalysis(1000);
  assert.strictEqual(result1.numStates, 1000, "Expected numStates to be 1000");
  assert.ok(result1.exponent > 0, "Expected exponent to be greater than 0");
  assert.strictEqual(result1.possiblePermutations, Math.pow(Math.E, result1.exponent), "Expected possiblePermutations to match calculation");
  assert.ok(result1.cryptographyFriendly[128], "Expected numStates to be cryptography friendly for 128 bits");
  assert.ok(!result1.cryptographyFriendly[4096], "Expected numStates to not be cryptography friendly for 4096 bits");

  // Test case: edge case with numStates = 0
  const result2 = getPermutationAnalysis(0);
  assert.strictEqual(result2.numStates, 0, "Expected numStates to be 0");
  assert.strictEqual(result2.exponent, 1, "Expected exponent to be NaN for 1 states");
  assert.strictEqual(result2.possiblePermutations, 2.718281828459045, "Expected possiblePermutations to be 1 for 0 states");
  
  // Test case: negative numStates
  try {
      getPermutationAnalysis(-1);
  } catch (e) {
      assert.strictEqual(e.message, "numStates must be a non-negative integer", "Expected error message for negative numStates");
  }

  // Test case: large number of states
  const result3 = getPermutationAnalysis(10000);
  assert.ok(result3.exponent > 0, "Expected exponent to be greater than 0 for large numStates");
  assert.ok(result3.cryptographyFriendly[4096], "Expected numStates to be cryptography friendly for 4096 bits");
}

function testPlanckTemperature () {
  const MAX_PLANK_TEMP = 1.416808 * Math.pow(10,32);
  const THERMAL_STATES_PER_KELVIN =  13.806490000000002;
  const maximumThermalStatesPossible  = getPermutationAnalysis(MAX_PLANK_TEMP * THERMAL_STATES_PER_KELVIN);

  assert.equal(maximumThermalStatesPossible.latex, 'e^{1.479923269055592 \\times 10^{+35}}');
  assert.equal(maximumThermalStatesPossible.numStates, 1.9561145483920006e+33);
  assert.equal(maximumThermalStatesPossible.exponent, 1.479923269055592e+35);
  assert.equal(maximumThermalStatesPossible.possiblePermutations, Infinity);
  assert.equal(maximumThermalStatesPossible.linearGrowthRate, 75.65626820127402);
  assert.equal(maximumThermalStatesPossible.dimensionalityReduction, 76.65626820127402);
  assert.equal(maximumThermalStatesPossible.stability, 0.9869547523840538);
}

// Run tests
testGetPermutationAnalysis();
testNumberToLatex();
testPreciseResult();
testEulerMaclaurinLogSum();
testPlanckTemperature();
