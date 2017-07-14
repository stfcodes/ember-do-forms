import Ember from 'ember';
import layout from '../../templates/components/ember-do-forms/input-field';
import setDataTestSelector from '../../utils/set-data-test-selector';
import ComplexFieldMixin from '../../mixins/complex-field';

const {
  assert,
  Component,
  get,
  set,
  isPresent
} = Ember;

const InputFieldComponent = Component.extend(ComplexFieldMixin, {
  layout,
  tagName: '',

  controlType: 'text',

  init() {
    this._setTestSelectors();

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

    this._setChildClasses();
  },

  update(object, propertyName, value) {
    set(object, propertyName, value);
  }
});

InputFieldComponent.reopenClass({
  positionalParams: ['propertyName']
});

export default InputFieldComponent;
