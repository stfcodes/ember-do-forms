import Ember from 'ember';
import setDataTestSelector from 'ember-do-forms/utils/set-data-test-selector';
import { module, test } from 'qunit';

const {
  Object: EmObject
} = Ember;

module('Unit | Utility | set data test selector', {
  beforeEach() {
    // Tagless component
    this.fragment = EmObject.create({ tagName: '' });
    // Component with tag
    this.element = EmObject.create({ tagName: 'div' });
  }
});

test('it works using default testSelectorProperty', function(assert) {
  this.fragment.set('data-test-something', 'my-test-selector');
  setDataTestSelector(this.fragment, { testSelector: 'something' });
  assert.notOk(this.fragment['data-test-something'], 'deletes the original data-test-* property from the tagless component');
  assert.equal(this.fragment.get('_dataTestSelector'), 'my-test-selector', 'sets the _dataTestSelector property on the tagless component');

  this.element.set('data-test-something', 'my-test-selector');
  setDataTestSelector(this.element, { testSelector: 'something' });
  assert.ok(this.element['data-test-something'], 'the original data-test-* property is present on the component');
  assert.notOk(this.element.get('_dataTestSelector'), '_dataTestSelector property is absent from the component');
});

test('it works using custom testSelectorProperty', function(assert) {
  this.fragment.set('data-test-something', 'my-test-selector');
  setDataTestSelector(this.fragment, { testSelector: 'something', testSelectorProperty: '_myCustomProp' });
  assert.notOk(this.fragment['data-test-something'], 'deletes the original data-test-* property from the tagless component');
  assert.equal(this.fragment.get('_myCustomProp'), 'my-test-selector', 'sets the _myCustomProp property on the tagless component');

  this.element.set('data-test-something', 'my-test-selector');
  setDataTestSelector(this.element, { testSelector: 'something' });
  assert.ok(this.element['data-test-something'], 'the original data-test-* property is present on the component');
  assert.notOk(this.element.get('_myCustomProp'), '_myCustomProp property is absent from the component');
});

test('it uses testSelectorValue when autoTestSelector is true', function(assert) {
  setDataTestSelector(this.fragment, {
    testSelector: 'rick-roll',
    autoTestSelector: true,
    testSelectorValue: 'never-gonna-give-you-up'
  });
  assert.equal(this.fragment.get('_dataTestSelector'), 'never-gonna-give-you-up', 'sets the _dataTestSelector property on the tagless component');

  setDataTestSelector(this.element, {
    testSelector: 'rick-roll',
    autoTestSelector: true,
    testSelectorValue: 'never-gonna-give-you-up'
  });
  assert.equal(this.element['data-test-rick-roll'], 'never-gonna-give-you-up', 'sets the data-test-* attribute on the component');
});

test('it uses the original data-test-* attribute even if autoTestSelector and testSelectorValue are present', function(assert) {
  this.fragment.set('data-test-rick-roll', 'never-gonna-give-you-up');
  setDataTestSelector(this.fragment, {
    testSelector: 'rick-roll',
    autoTestSelector: true,
    testSelectorValue: 'never-gonna-let-you-down'
  });
  assert.equal(this.fragment.get('_dataTestSelector'), 'never-gonna-give-you-up', 'sets the _dataTestSelector property on the tagless component');

  this.element.set('data-test-rick-roll', 'never-gonna-give-you-up');
  setDataTestSelector(this.element, {
    testSelector: 'rick-roll',
    autoTestSelector: true,
    testSelectorValue: 'never-gonna-let-you-down'
  });
  assert.equal(this.element['data-test-rick-roll'], 'never-gonna-give-you-up', 'sets the data-test-* attribute on the component');
});
