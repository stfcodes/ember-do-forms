import Ember from 'ember';
import layout from '../templates/components/do-control';
import hasOnlyEmberView from '../utils/has-only-ember-view';

const {
  computed,
  Component,
  get,
  getWithDefault,
  inject: { service },
  isEmpty,
  set
} = Ember;

const DoControlComponent = Component.extend({
  layout,
  tagName: '',

  config: service('do-form/config'),

  oneWayControl: computed('controlType', function() {
    return `one-way-${get(this, 'controlType')}`;
  }).readOnly(),

  didReceiveAttrs() {
    this._super(...arguments);
    let classNames = get(this, 'classNames');
    let classes    = getWithDefault(this, 'config.defaultClasses', {});

    if (isEmpty(classNames) || hasOnlyEmberView(classNames)) {
      set(this, 'classNames', classNames.concat(classes.control));
    }
  }
});

DoControlComponent.reopenClass({
  positionalParams: ['controlType', 'value']
});

export default DoControlComponent;
