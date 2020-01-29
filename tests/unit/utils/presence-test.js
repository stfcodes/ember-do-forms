import presence from 'ember-do-forms/utils/presence';
import { module, test } from 'qunit';

module('Unit | Utility | presence', function() {
  test('it returns the original value or null', function(assert) {
    assert.ok(presence('me'));
    assert.ok(presence(['something']));
    assert.notOk(presence([]));
    assert.notOk(presence(''));
  });
});
