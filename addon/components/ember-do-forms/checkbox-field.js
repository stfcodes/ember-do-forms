import Ember from 'ember';
import layout from '../../templates/components/ember-do-forms/checkbox-field';
import ComplexFieldMixin from '../../mixins/complex-field';

const {
  assert,
  Component,
  get,
  isPresent
} = Ember;

const CheckboxFieldComponent = Component.extend(ComplexFieldMixin, {
  layout,
  tagName: '',

  labelClasses: [],
  controlClasses: [],
  feedbackClasses: [],
  hintClasses: [],

  init() {
    this._setTestSelectors();
    this._super(...arguments);

    assert('{{ember-do-forms/checkbox-field}} requires an object to be passed in', isPresent(get(this, 'object')));
    assert('{{ember-do-forms/checkbox-field}} requires a propertyName to be passed in', isPresent(get(this, 'propertyName')));
    this._setChildClasses();
  }

});

CheckboxFieldComponent.reopenClass({
  positionalParams: ['propertyName']
});

export default CheckboxFieldComponent;
