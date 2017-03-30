import Ember from 'ember';
import layout from '../templates/components/do-feedback';
import hasOnlyEmberView from '../utils/has-only-ember-view';

const {
  Component,
  get,
  getWithDefault,
  inject: { service },
  isEmpty,
  set
} = Ember;

const DoFeedbackComponent = Component.extend({
  layout,
  config: service('ember-do-forms/config'),
  tagName: '',

  wrapperTagName: 'div',

  showFeedback: false,

  didReceiveAttrs() {
    this._super(...arguments);

    let classNames = get(this, 'classNames');
    let classes    = getWithDefault(this, 'config.defaultClasses', {});

    if (isEmpty(classNames) || hasOnlyEmberView(classNames)) {
      set(this, 'classNames', classNames.concat(classes.feedback));
    }
  }
});

DoFeedbackComponent.reopenClass({
  positionalParams: ['message']
});

export default DoFeedbackComponent;
