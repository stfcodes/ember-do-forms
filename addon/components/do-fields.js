import Ember from 'ember';
import layout from '../templates/components/do-fields';

const {
  assert,
  Component,
  get,
  set,
  isPresent
} = Ember;

const DoFieldsComponent = Component.extend({
  layout,
  tagName: '',

  fieldComponent: 'do-field',

  init() {
    this._super(...arguments);

    assert('{{do-fields}} requires an object to be passed in.', isPresent(get(this, 'object')));
  },

  update(object, propertyName, value) {
    set(object, propertyName, value);
  }
});

DoFieldsComponent.reopenClass({
  positionalParams: ['object']
});

export default DoFieldsComponent;
