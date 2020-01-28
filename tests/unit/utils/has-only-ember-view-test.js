import hasOnlyEmberView from 'ember-do-forms/utils/has-only-ember-view';
import { module, test } from 'qunit';

module('Unit | Utility | has only ember view', function() {
  test('it works', function(assert) {
    assert.notOk(hasOnlyEmberView());
    assert.notOk(hasOnlyEmberView([]));
    assert.notOk(hasOnlyEmberView(['ember-view', 'nope']));
    assert.ok(hasOnlyEmberView(['ember-view']));
  });
});
