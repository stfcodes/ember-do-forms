import Component from '@ember/component';
import { equal } from '@ember/object/computed';
import { get, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import layout from '../templates/components/do-control';
import hasOnlyEmberView from '../utils/has-only-ember-view';
import setDataTestSelector from '../utils/set-data-test-selector';
import { tryInvoke } from '@ember/utils';

const DoControlComponent = Component.extend({
  layout,
  tagName: '',

  config: service('ember-do-forms/config'),

  controlType: 'text',

  shouldRenderTextArea: equal('controlType', 'textarea'),

  shouldRenderSelect: equal('controlType', 'select'),

  shouldRenderCheckboxOrRadio: computed('controlType', function () {
    return ['checkbox', 'radio'].includes(this.controlType);
  }),

  // For one-way-select
  promptIsSelectable: false,

  controlClasses: computed('validationClass', 'classNames', function () {
    return `${this.validationClass || ''} ${this.classNames && this.classNames.join(' ')}`;
  }),

  init() {
    // it is not obvious to me why this is necessary but it seems to be
    this.set('shouldHaveReadonlyAttribute', this.readonly);

    setDataTestSelector(this, {
      testSelector: 'do-control',
      autoTestSelector: get(this, 'config.autoDataTestSelectors'),
      testSelectorValue: get(this, 'propertyName')
    });

    this._super(...arguments);
    let defaultClasses = get(this, 'config.defaultClasses.control');

    if (isEmpty(this.classNames) || hasOnlyEmberView(this.classNames)) {
      this.classNames = this.classNames.concat(defaultClasses);
    }
  },

  actions: {
    onUpdate (val) {
      tryInvoke(this, 'update', [val]);
    }
  }
});

export default DoControlComponent;
