import Ember from 'ember';
import layout from '../templates/components/do-label';

const {
  Component,
  get,
  getWithDefault,
  inject: { service },
  isEmpty,
  set
} = Ember;

const DoLabelComponent = Component.extend({
  layout,
  config: service('do-form/config'),

  tagName: 'label',
  attributeBindings: ['for'],

  didReceiveAttrs() {
    this._super(...arguments);

    let classNames = get(this, 'classNames');
    let classes    = getWithDefault(this, 'config.defaultClasses', {});

    if (isEmpty(classNames)) {
      set(this, 'classNames', classNames.concat(classes.label));
    }
  }

});

DoLabelComponent.reopenClass({
  positionalParams: ['labelText']
});

export default DoLabelComponent;
