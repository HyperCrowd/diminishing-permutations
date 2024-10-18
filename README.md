# Diminshing Permutations

```math
n! \cdot e = e^{\sum_{k=1}^{n} \ln(k)}
```

Factorials blow out integers fast.  Approximately doubly true when applying Euler to calculate all possible permutations of state interactions. (Including when the number of states decrements).  We've found that raising Euler to the power of the summed logathirm of the number of states produces the same answer and is much more friendly for computation.

<p align="center">
<a href="https://docs.google.com/spreadsheets/d/1rBLwVjB6dwehYyHy3xBZOJ4XwVe46dqmzkIjNURyngU/edit?usp=sharing">See the breakdown of how it works on Google Sheets!</a><br/>
<img src="https://i.imgur.com/POhhPp4.png" width="100" height="100">
</p>

## Install

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/hypercrowd/diminishing-permutations)

```bash
git clone https://github.com/HyperCrowd/diminishing-permutations.git
cd diminshing-permutations
yarn test
```

# Insights

In various fields such as computer science, information theory, cryptography, and combinatorics, understanding the behavior and characteristics of systems that can exist in multiple states is crucial. For instance, when analyzing:

* **Cryptographic systems**: Understanding the number of possible keys or configurations is vital for security.
* **Data structures**: Analyzing permutations can help in optimizing algorithms.
* **Complex systems**: Understanding how different states interact can inform modeling and simulations.

## Example

```js
import { getPermutationAnalysis } from '@psysecgroup/diminishing-permutations';

const MAX_PLANK_TEMP = 1.416808 * Math.pow(10,32);
const THERMAL_STATES_PER_KELVIN =  13.806490000000002;
const maximumThermalStatesPossible  = getPermutationAnalysis(MAX_PLANK_TEMP * THERMAL_STATES_PER_KELVIN);
console.log(maximumThermalStatesPossible);
```

```json
{
  "numStates": 1.9561145483920006e+33,
  "latex": "e^{1.479923269055592 \\times 10^{+35}}",
  "exponent": 1.479923269055592e+35,
  "possiblePermutations": Infinity,
  "linearGrowthRate": 75.65626820127402,
  "dimensionalityReduction": 76.65626820127402,
  "compression": 0.9869547523840538,
  "cryptographyFriendly": {
    "128": true,
    "256": true,
    "512": true,
    "1024": true,
    "2048": true,
    "4096": true
  }
}
```

## Output

#### Dimensionality Reduction

The function calculates the logarithm of the number of states (`numStates`). This value helps to understand how the complexity of a system scales with the number of states. In high-dimensional spaces, operations can become computationally expensive, so reducing dimensionality can simplify analysis.

#### Exponent

Calculates an exponent based on the number of states. For smaller values (less than 5000), it uses a precise result derived from the logarithmic sum of integers. For larger values, it uses an Euler-Maclaurin approximation. This step is crucial because it provides a way to compute the complexity of permutations without directly calculating all possible arrangements, which can be infeasible for large inputs.

### Linear Growth Rate

The `linearGrowthRate` represents how the number of possible permutations grows relative to the number of states. This metric gives insight into how adding more states affects the overall complexity of the system.

### Stability

The function calculates a stability value, which is the ratio of the `linearGrowthRate` to the `dimensionalityReduction`. This indicates how efficiently the system can manage its complexity in relation to its size. A higher ratio suggests that the system's complexity grows more slowly than the increase in its dimensionality, which can be advantageous for optimization.  A slower growth rate suggests that the algorithm remains manageable even as it scales, which is crucial for maintaining performance in real-time applications.  A high stability means less scalar variance is possible.  A low stability means more scalar variance is possible.

### Cryptography Friendliness

The function evaluates whether the system can handle certain security standards based on the number of states. This is crucial for cryptographic applications where a certain level of entropy is required to ensure security. The function checks against standard bit sizes (128, 256, etc.), providing a quick assessment of whether the system meets those security requirements.

### LaTeX Representation

The function returns the latex representation of the calculated exponent. This is useful for documentation, presentations, or further mathematical analysis, allowing the results to be expressed in a formal mathematical format.