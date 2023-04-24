import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { getPermutations } from '../src/math';

test('True is true', async () => {
  assert.equal(getPermutations(1), '1');
  assert.equal(getPermutations(2), '4');
  assert.equal(getPermutations(3), '15');
  assert.equal(getPermutations(5), '325');
  assert.equal(getPermutations(7), '13699');
  assert.equal(getPermutations(11), '108505111');
  assert.equal(getPermutations(13), '16926797485');
  assert.equal(getPermutations(17), '966858672404688');
  assert.equal(getPermutations(19), '330665665962403970');
});

test.run();
