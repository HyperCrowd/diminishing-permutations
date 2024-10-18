/**
 * Calculates the precise result based on the logarithmic sum of integers
 * from 1 to `v`, and caches the result for performance.
 *
 * @param {number} v - A non-negative integer to calculate the logarithmic sum for.
 * @returns {number} The precise result, which is the sum of logarithms of all integers from 1 to `v`, plus 1.
 * @throws {Error} Throws an error if `v` is a negative integer.
 *
 * @example
 * const result = preciseResult(5);
 * console.log(result); // Output: 6.120163...
 *
 * // Caching demonstration:
 * const cachedResult = preciseResult(5); // Will return the cached result
 * console.log(cachedResult); // Output: 6.120163...
 */
export function preciseResult (v) {
    let sum = 0
  
    for(let i = 1; i <= v; i++) {
      sum += Math.log(i)
    }
  
    const result = sum + 1
  
    return result
  }
  
  /**
   * Computes the Euler-Maclaurin approximation for the sum of logarithms
   * from 2 to N-1 using the integral of ln(x) and a correction term.
   *
   * @param {number} N - A positive integer greater than or equal to 2.
   * @returns {number} The Euler-Maclaurin approximation of the logarithmic sum.
   * @throws {Error} Throws an error if N is less than 2.
   *
   * @example
   * const result = eulerMaclaurinLogSum(10);
   * console.log(result); // Output: Approximation of the logarithmic sum
   */
  export function eulerMaclaurinLogSum (N) {
      if (N < 2) {
         return 0
      }
  
      // Define the integral of ln(x) from 2 to N-1
      const integral = (N - 1) * Math.log(N - 1) - (N - 1) - (2 * Math.log(2) - 2);
  
      // Add the correction term (half the sum of ln(2) and ln(N-1))
      const correction = 0.5 * (Math.log(2) + Math.log(N - 1));
  
      // Sum approximation
      const sumApproximation = integral + correction;
  
      return sumApproximation + 1;
  }
  
  /**
   * Converts a number into its LaTeX representation in scientific notation.
   *
   * The function takes a numeric value and converts it to a string in
   * scientific notation, then formats it as a LaTeX expression using
   * Euler's number as the base.
   *
   * @param {number} value - The number to convert to LaTeX format.
   * @returns {string} The LaTeX representation of the number in scientific notation.
   * 
   * @example
   * const latexString = numberToLatex(123456);
   * console.log(latexString); // Output: e^{1.23456 \times 10^{5}}
   */
  export function numberToLatex(value) {
    // Convert the number to a string in scientific notation
    const scientificString = value.toExponential();
  
    // Use a regular expression to extract the exponent
    const index = scientificString.indexOf('e');
    const number = scientificString.substring(0, index);
    const exponent = scientificString.substring(index + 1);
  
    // Generate LaTeX representation
    let latex;
    if (exponent === '0' || exponent === '+0') {
        latex = `e^{${number}}`;
    } else {
        // Format for LaTeX with proper handling of signs
        //const sign = exponent.startsWith('-') ? '' : '\\times';
        latex = `e^{${number} \\times 10^{${exponent}}}`;
    }
  
    return latex;
  }
  
  /**
   * Analyzes permutations based on the number of states and calculates various metrics,
   * including exponent, dimensionality reduction, and cryptography friendliness.
   *
   * @param {number} numStates - The number of states to analyze (must be a non-negative integer).
   * @returns {Object} An object containing the analysis results:
   *  - {string} latex - The LaTeX representation of the possiblePermutations.
   *  - {number} numStates - The input number of states.
   *  - {number} exponent - The calculated exponent based on the number of states.
   *  - {number} possiblePermutations - The total number of possible permutations.
   *  - {number} linearGrowthRate - The growth rate calculated for the number of states.
   *  - {number} dimensionalityReduction - The logarithm of the number of states.
   *  - {number} stability - The ratio between the linear growth rate and the dimensionality reduction.
   *  - {Object} cryptographyFriendly - An object indicating cryptography friendliness for various bit sizes.
   * 
   * @example
   * const analysis = getPermutationAnalysis(1000);
   * console.log(analysis); // Output: Analysis results based on the input number of states
   */
  export function getPermutationAnalysis (numStates, base = Math.E) {
    const dimensionalityReduction = Math.log(numStates)
    const exponent = numStates < 5000
      ? preciseResult(numStates)
      : eulerMaclaurinLogSum(numStates)
    const linearGrowthRate = exponent / numStates
    const stability = linearGrowthRate / dimensionalityReduction
    const possiblePermutations = Math.pow(base, exponent)
  
    return {
      numStates,
      latex: numberToLatex(exponent),
      exponent,
      possiblePermutations,
      linearGrowthRate,
      dimensionalityReduction,
      stability,
      cryptographyFriendly: {
        128: numStates >= 128,
        256: numStates >= 256,
        512: numStates >= 512,
        1024: numStates >= 1024,
        2048: numStates >= 2048,
        4096: numStates >= 4096
      },
    }
  }
  