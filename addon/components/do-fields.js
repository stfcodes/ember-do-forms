import { assert } from '@ember/debug';
import Component from '@ember/component';
import { set, get } from '@ember/object';
import { isPresent } from '@ember/utils';
import layout from '../templates/components/do-fields';

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

export default DoFieldsComponent;
