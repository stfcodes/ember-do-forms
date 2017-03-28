import Ember from 'ember';
import layout from '../templates/components/do-field';
import presence from '../utils/presence';
import hasOnlyEmberView from '../utils/has-only-ember-view';

const {
  assert,
  computed,
  Component,
  get,
  getWithDefault,
  inject: { service },
  isEmpty,
  isPresent,
  mixin,
  set
} = Ember;

const DoLabelComponent = Component.extend({
  layout,
  config: service('do-form/config'),

  classNameBindings: ['validationClasses'],

  showValidation: computed.or('showSelfValidation', 'showAllValidations').readOnly(),

  controlId: computed('propertyName', function() {
    return `${get(this, 'propertyName')}-${get(this, 'elementId')}`;
  }),

  validationClasses: computed('showValidation', 'errors', function() {
    let classes = get(this, 'config.validationClasses');
    let hasErrors = isPresent(get(this, 'errors'));

    if (get(this, 'showValidation')) {
      return presence(hasErrors ? classes.fieldError : classes.fieldSuccess);
    }
  }).readOnly(),

  controlValidationClasses: computed('showValidation', 'errors', function() {
    let classes = get(this, 'config.validationClasses');
    let hasErrors = isPresent(get(this, 'errors'));

    if (get(this, 'showValidation')) {
      return presence(hasErrors ? classes.controlError : classes.controlSuccess);
    }
  }).readOnly(),

  didReceiveAttrs() {
    this._super(...arguments);
    let classNames    = get(this, 'classNames');
    let propertyName  = get(this, 'propertyName');
    let errorsPath    = `object.${get(this, 'config.errorsPath')}`.replace(new RegExp('{PROPERTY_NAME}'), propertyName);
    let classes       = getWithDefault(this, 'config.defaultClasses', {});

    assert('{{do-field}} requires an object to be passed in', isPresent(get(this, 'object')));
    assert('{{do-field}} requires a propertyName to be passed in', isPresent(propertyName));

    if (isEmpty(classNames) || hasOnlyEmberView(classNames)) {
      set(this, 'classNames', classNames.concat(classes.field));
    }

    mixin(this, {
      errors: computed(errorsPath, function() {
        return get(this, errorsPath) || [];
      })
    });
  },

  update(object, propertyName, value) {
    set(object, propertyName, value);
  },

  focusOut() {
    this._super(...arguments);
    set(this, 'showSelfValidation', true);
  },

  actions: {
    onUpdate(object, propertyName, value) {
      get(this, 'update')(object, propertyName, value);
    }
  }
});

DoLabelComponent.reopenClass({
  positionalParams: ['propertyName']
});

export default DoLabelComponent;
