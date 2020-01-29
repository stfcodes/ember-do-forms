import { or, notEmpty } from '@ember/object/computed';
import { assert } from '@ember/debug';
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { isPresent, isEmpty } from '@ember/utils';
import { set, get, computed } from '@ember/object';
import Ember from 'ember';
import layout from '../templates/components/do-field';
import presence from '../utils/presence';
import hasOnlyEmberView from '../utils/has-only-ember-view';
import setDataTestSelector from '../utils/set-data-test-selector';

const {
  mixin
} = Ember;

const DoLabelComponent = Component.extend({
  layout,
  config: service('ember-do-forms/config'),
  tagName: 'div',

  controlType: 'text',

  labelComponent: 'do-label',
  controlComponent: 'do-control',
  feedbackComponent: 'do-feedback',
  hintComponent: 'do-hint',

  classNameBindings: ['validationClasses'],

  showValidation: or('showSelfValidation', 'showAllValidations'),
  hasErrors: notEmpty('errors').readOnly(),

  controlId: computed('propertyName', function() {
    return `${get(this, 'propertyName')}-${get(this, 'elementId')}`;
  }),

  // Should work with ember-buffered-proxy and ember-changeset as well
  controlName: computed('objectName', 'propertyName', function() {
    let prop = get(this, 'propertyName');
    let name = get(this, 'objectName')
      || get(this, 'object.constructor.modelName')
      || get(this, 'object.content.constructor.modelName')
      || get(this, 'object._content.constructor.modelName');

    return isPresent(name) ? `${name}[${prop}]` : prop;
  }).readOnly(),

  // Should work with cp-validations and changeset-validations as well
  errorMessage: computed('errors.[]', function() {
    let firstError = this.get('errors.0') || {};
    return firstError.message || firstError.validation;
  }),

  validationClasses: computed('showValidation', 'hasErrors', function() {
    let classes = get(this, 'config.validationClasses');
    let hasErrors = get(this, 'hasErrors');

    if (get(this, 'showValidation')) {
      return presence(hasErrors ? classes.fieldError : classes.fieldSuccess);
    }
  }).readOnly(),

  controlValidationClasses: computed('showValidation', 'hasErrors', function() {
    let classes = get(this, 'config.validationClasses');
    let hasErrors = get(this, 'hasErrors');

    if (get(this, 'showValidation')) {
      return presence(hasErrors ? classes.controlError : classes.controlSuccess);
    }
  }).readOnly(),

  init() {
    setDataTestSelector(this, {
      testSelector: 'do-field',
      autoTestSelector: get(this, 'config.autoDataTestSelectors'),
      testSelectorValue: get(this, 'propertyName')
    });

    this._super(...arguments);
    let propertyName    = get(this, 'propertyName');
    let errorsPath      = `object.${get(this, 'config.errorsPath')}`.replace(new RegExp('{PROPERTY_NAME}'), propertyName);
    let defaultClasses  = get(this, 'config.defaultClasses.field');

    assert('{{do-field}} requires an object to be passed in', isPresent(get(this, 'object')));
    assert('{{do-field}} requires a propertyName to be passed in', isPresent(propertyName));

    mixin(this, {
      errors: computed(errorsPath, function() {
        return get(this, errorsPath) || [];
      })
    });

    if (isEmpty(this.classNames) || hasOnlyEmberView(this.classNames)) {
      this.classNames = this.classNames.concat(defaultClasses);
    }
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

export default DoLabelComponent;
