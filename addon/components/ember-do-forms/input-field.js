import { assert } from '@ember/debug';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { set, get } from '@ember/object';
import { isPresent } from '@ember/utils';
import layout from '../../templates/components/ember-do-forms/input-field';
import setDataTestSelector from '../../utils/set-data-test-selector';
import setTestSelectors from '../../utils/set-test-selectors';
import setChildClasses from '../../utils/set-child-classes';

const InputFieldComponent = Component.extend({
  layout,
  tagName: '',

  config: service('ember-do-forms/config'),

  controlType: 'text',

  init() {
    setTestSelectors(this);

    // FIXME: data-test-input-field should be removed in next
    // major version as it adds an unnecessary data-test-* attribute
    setDataTestSelector(this, {
      testSelector: 'input-field',
      testSelectorProperty: '_dataTestSelectorInputField',
      autoTestSelector: get(this, 'config.autoDataTestSelectors'),
      testSelectorValue: get(this, 'propertyName')
    });

    this._super(...arguments);

    assert('{{ember-do-forms/input-field}} requires an object to be passed in', isPresent(get(this, 'object')));
    assert('{{ember-do-forms/input-field}} requires a propertyName to be passed in', isPresent(get(this, 'propertyName')));

    setChildClasses(this);
  },

  update(object, propertyName, value) {
    set(object, propertyName, value);
  }
});

export default InputFieldComponent;
