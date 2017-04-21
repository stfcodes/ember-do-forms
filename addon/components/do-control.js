import Ember from 'ember';
import layout from '../templates/components/do-control';
import hasOnlyEmberView from '../utils/has-only-ember-view';

const {
  computed,
  Component,
  get,
  inject: { service },
  isEmpty
} = Ember;

const DoControlComponent = Component.extend({
  layout,
  tagName: '',

  config: service('ember-do-forms/config'),

  controlType: 'text',

  oneWayControl: computed('controlType', function() {
    return `one-way-${get(this, 'controlType')}`;
  }).readOnly(),

  init() {
    this._super(...arguments);
    let defaultClasses = get(this, 'config.defaultClasses.control');

    if (isEmpty(this.classNames) || hasOnlyEmberView(this.classNames)) {
      this.classNames = this.classNames.concat(defaultClasses);
    }
  }
});

DoControlComponent.reopenClass({
  positionalParams: ['controlType', 'value']
});

export default DoControlComponent;
