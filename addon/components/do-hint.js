import Ember from 'ember';
import layout from '../templates/components/do-hint';
import hasOnlyEmberView from '../utils/has-only-ember-view';

const {
  Component,
  get,
  inject: { service },
  isEmpty
} = Ember;

const DoHintComponent = Component.extend({
  layout,
  config: service('ember-do-forms/config'),

  tagName: 'small',
  text: '',

  init() {
    this._super(...arguments);
    let defaultClasses = get(this, 'config.defaultClasses.hint');

    if (isEmpty(this.classNames) || hasOnlyEmberView(this.classNames)) {
      this.classNames = this.classNames.concat(defaultClasses);
    }
  }

});

DoHintComponent.reopenClass({
  positionalParams: ['text']
});

export default DoHintComponent;
