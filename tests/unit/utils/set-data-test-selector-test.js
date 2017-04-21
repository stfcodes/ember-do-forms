import Ember from 'ember';
import setDataTestSelector from 'ember-do-forms/utils/set-data-test-selector';
import { module, test } from 'qunit';

const {
  Object: EmObject
} = Ember;

module('Unit | Utility | set data test selector');

test('it works using default testSelectorProperty', function(assert) {
  let component = EmObject.create({ 'data-test-something': 'my-test-selector' });
  setDataTestSelector(component, 'something');

  assert.notOk(component['data-test-something'], 'deletes the original data-test-* property');
  assert.equal(component.get('_dataTestSelector'), 'my-test-selector', 'sets the _dataTestSelector property on the component');
});

test('it works using custom testSelectorProperty', function(assert) {
  let component = EmObject.create({ 'data-test-something': 'my-test-selector' });
  setDataTestSelector(component, 'something', '_myCustomProp');

  assert.notOk(component['data-test-something'], 'deletes the original data-test-* property');
  assert.equal(component.get('_myCustomProp'), 'my-test-selector', 'sets the _myCustomProp property on the component');
});
