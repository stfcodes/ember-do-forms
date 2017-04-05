import Ember from 'ember';
import layout from '../../templates/components/ember-do-forms/input-field';

const {
  assert,
  Component,
  get,
  isPresent
} = Ember;

const InputFieldComponent = Component.extend({
  layout,
  tagName: '',

  controlType: 'text',

  labelComponent: 'do-label',

  labelClasses: [],
  controlClasses: [],
  feedbackClasses: [],
  hintClasses: [],

  didReceiveAttrs() {
    this._super(...arguments);
    assert('{{ember-do-forms/input-field}} requires an object to be passed in', isPresent(get(this, 'object')));
    assert('{{ember-do-forms/input-field}} requires a propertyName to be passed in', isPresent(get(this, 'propertyName')));
  }
});

InputFieldComponent.reopenClass({
  positionalParams: ['propertyName']
});

export default InputFieldComponent;
