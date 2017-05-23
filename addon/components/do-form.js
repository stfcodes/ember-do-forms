import Ember from 'ember';
import layout from '../templates/components/do-form';
import hasOnlyEmberView from '../utils/has-only-ember-view';

const {
  assert,
  Component,
  get,
  isEmpty,
  isPresent,
  inject: { service },
  set
} = Ember;

const DoFormComponent = Component.extend({
  layout,
  config: service('ember-do-forms/config'),
  tagName: 'form',

  fieldComponent: 'do-field',

  showAllValidations: false,

  init() {
    this._super(...arguments);
    let submitAction   = get(this, 'submit');
    let defaultClasses = get(this, 'config.defaultClasses.form');

    assert('{{do-form}} requires an object to be passed in.', isPresent(get(this, 'object')));

    set(this, 'submit', function(event) {
      event.preventDefault();
      set(this, 'showAllValidations', true);

      if (isPresent(submitAction)) {
        submitAction();
      }
    });

    if (isEmpty(this.classNames) || hasOnlyEmberView(this.classNames)) {
      this.classNames = this.classNames.concat(defaultClasses);
    }
  }
});

DoFormComponent.reopenClass({
  positionalParams: ['object']
});

export default DoFormComponent;
