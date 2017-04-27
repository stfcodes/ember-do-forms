import Ember from 'ember';
import layout from '../../templates/components/ember-do-forms/input-field';
import setDataTestSelector from '../../utils/set-data-test-selector';

const {
  assert,
  Component,
  get,
  isPresent,
  isEmpty,
  inject: { service },
  set
} = Ember;

const InputFieldComponent = Component.extend({
  layout,
  tagName: '',

  config: service('ember-do-forms/config'),

  controlType: 'text',

  labelComponent: 'do-label',

  labelClasses: [],
  controlClasses: [],
  feedbackClasses: [],
  hintClasses: [],

  init() {
    this._setTestSelectors();

    this._super(...arguments);

    assert('{{ember-do-forms/input-field}} requires an object to be passed in', isPresent(get(this, 'object')));
    assert('{{ember-do-forms/input-field}} requires a propertyName to be passed in', isPresent(get(this, 'propertyName')));

    this._setChildClasses();
  },

  _setTestSelectors() {
    // FIXME: data-test-input-field should be removed in next
    // major version as it adds an unnecessary data-test-* attribute
    setDataTestSelector(this, {
      testSelector: 'input-field',
      testSelectorProperty: '_dataTestSelectorInputField',
      autoTestSelector: get(this, 'config.autoDataTestSelectors'),
      testSelectorValue: get(this, 'propertyName')
    });

    setDataTestSelector(this, {
      testSelector: 'do-field',
      testSelectorProperty: '_dataTestSelectorField',
      autoTestSelector: get(this, 'config.autoDataTestSelectors'),
      testSelectorValue: get(this, 'propertyName')
    });

    setDataTestSelector(this, {
      testSelector: 'do-label',
      testSelectorProperty: '_dataTestSelectorLabel',
      autoTestSelector: get(this, 'config.autoDataTestSelectors'),
      testSelectorValue: get(this, 'propertyName')
    });

    setDataTestSelector(this, {
      testSelector: 'do-control',
      testSelectorProperty: '_dataTestSelectorControl',
      autoTestSelector: get(this, 'config.autoDataTestSelectors'),
      testSelectorValue: get(this, 'propertyName')
    });

    setDataTestSelector(this, {
      testSelector: 'do-feedback',
      testSelectorProperty: '_dataTestSelectorFeedback',
      autoTestSelector: get(this, 'config.autoDataTestSelectors'),
      testSelectorValue: get(this, 'propertyName')
    });

    setDataTestSelector(this, {
      testSelector: 'do-hint',
      testSelectorProperty: '_dataTestSelectorHint',
      autoTestSelector: get(this, 'config.autoDataTestSelectors'),
      testSelectorValue: get(this, 'propertyName')
    });
  },

  _setChildClasses() {
    let defaultClasses = get(this, 'config.defaultClasses');

    if (isEmpty(get(this, 'labelClasses'))) {
      set(this, 'labelClasses', defaultClasses.label);
    }

    if (isEmpty(get(this, 'controlClasses'))) {
      set(this, 'controlClasses', defaultClasses.control);
    }

    if (isEmpty(get(this, 'feedbackClasses'))) {
      set(this, 'feedbackClasses', defaultClasses.feedback);
    }

    if (isEmpty(get(this, 'hintClasses'))) {
      set(this, 'hintClasses', defaultClasses.hint);
    }
  }
});

InputFieldComponent.reopenClass({
  positionalParams: ['propertyName']
});

export default InputFieldComponent;
