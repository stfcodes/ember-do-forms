import { assert } from '@ember/debug';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { set, get } from '@ember/object';
import { isPresent } from '@ember/utils';
import layout from '../../templates/components/ember-do-forms/checkbox-field';
import setTestSelectors from '../../utils/set-test-selectors';
import setChildClasses from '../../utils/set-child-classes';

const CheckboxFieldComponent = Component.extend({
  layout,
  tagName: '',

  config: service('ember-do-forms/config'),

  init() {
    setTestSelectors(this);
    this._super(...arguments);

    this.set('labelClasses', []);
    this.set('controlClasses', []);
    this.set('feedbackClasses', []);
    this.set('hintClasses', []);

    assert('{{ember-do-forms/checkbox-field}} requires an object to be passed in', isPresent(get(this, 'object')));
    assert('{{ember-do-forms/checkbox-field}} requires a propertyName to be passed in', isPresent(get(this, 'propertyName')));
    setChildClasses(this);
  },

  update(object, propertyName, value) {
    set(object, propertyName, value);
  }

});

export default CheckboxFieldComponent;
