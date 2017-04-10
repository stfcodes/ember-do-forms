import Ember from 'ember';
import layout from '../templates/components/do-feedback';
import hasOnlyEmberView from '../utils/has-only-ember-view';

const {
  Component,
  get,
  inject: { service },
  isEmpty
} = Ember;

const DoFeedbackComponent = Component.extend({
  layout,
  config: service('ember-do-forms/config'),
  tagName: '',

  wrapperTagName: 'div',

  showFeedback: false,

  // TODO: Not sure why this needs to be on didReceiveAttrs to work correctly.
  didReceiveAttrs() {
    this._super(...arguments);
    let defaultClasses = get(this, 'config.defaultClasses.feedback');

    if (isEmpty(this.classNames) || hasOnlyEmberView(this.classNames)) {
      this.classNames = this.classNames.concat(defaultClasses);
    }
  }
});

DoFeedbackComponent.reopenClass({
  positionalParams: ['message']
});

export default DoFeedbackComponent;
