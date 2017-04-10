import Ember from 'ember';
import layout from '../templates/components/do-hint';
import hasOnlyEmberView from '../utils/has-only-ember-view';

const {
  Component,
  get,
  getWithDefault,
  inject: { service },
  isEmpty,
  set
} = Ember;

const DoHintComponent = Component.extend({
  layout,
  config: service('ember-do-forms/config'),

  tagName: 'small',
  text: '',

  init() {
    this._super(...arguments);
    let classNames = get(this, 'classNames');
    let classes    = getWithDefault(this, 'config.defaultClasses', {});

    if (isEmpty(classNames) || hasOnlyEmberView(classNames)) {
      set(this, 'classNames', classNames.concat(classes.hint));
    }
  }

});

DoHintComponent.reopenClass({
  positionalParams: ['text']
});

export default DoHintComponent;
