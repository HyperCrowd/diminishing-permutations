import { test } from 'uvu'
import * as assert from 'uvu/assert'

test('True is true', async () => {
    assert.ok(true);
})

test.run()
