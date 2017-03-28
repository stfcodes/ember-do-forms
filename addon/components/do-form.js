import Ember from 'ember';
import layout from '../templates/components/do-form';

const {
  assert,
  Component,
  get,
  isPresent,
  set
} = Ember;

const DoFormComponent = Component.extend({
  layout,
  tagName: 'form',

  showAllValidations: false,

  didReceiveAttrs() {
    this._super(...arguments);
    let submitAction = get(this, 'submit');

    assert('{{do-form}} requires an object to be passed in.', isPresent(get(this, 'object')));
    assert('{{do-form}} requires a submit action to be passed in.', isPresent(submitAction));

    set(this, 'submit', function(event) {
      event.preventDefault();
      set(this, 'showAllValidations', true);
      submitAction();
    });
  }
});

DoFormComponent.reopenClass({
  positionalParams: ['object']
});

export default DoFormComponent;
