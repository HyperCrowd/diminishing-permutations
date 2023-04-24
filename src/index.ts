import { getPermutations } from './math';

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
  10: getPermutations(100000),
});

export { getPermutations };
