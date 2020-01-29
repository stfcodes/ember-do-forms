import { assert } from '@ember/debug';
import Component from '@ember/component';
import { set, get } from '@ember/object';
import { isPresent } from '@ember/utils';
import layout from '../../templates/components/ember-do-forms/checkbox-field';
import ComplexFieldMixin from '../../mixins/complex-field';

const CheckboxFieldComponent = Component.extend(ComplexFieldMixin, {
  layout,
  tagName: '',

  init() {
    this._setTestSelectors();
    this._super(...arguments);

    this.set('labelClasses', []);
    this.set('controlClasses', []);
    this.set('feedbackClasses', []);
    this.set('hintClasses', []);

    assert('{{ember-do-forms/checkbox-field}} requires an object to be passed in', isPresent(get(this, 'object')));
    assert('{{ember-do-forms/checkbox-field}} requires a propertyName to be passed in', isPresent(get(this, 'propertyName')));
    this._setChildClasses();
  },

  update(object, propertyName, value) {
    set(object, propertyName, value);
  }

});

export default CheckboxFieldComponent;
