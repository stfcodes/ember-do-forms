import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import { set, getWithDefault, get } from '@ember/object';
import layout from '../templates/components/do-label';
import hasOnlyEmberView from '../utils/has-only-ember-view';
import setDataTestSelector from '../utils/set-data-test-selector';

const DoLabelComponent = Component.extend({
  layout,
  config: service('ember-do-forms/config'),

  tagName: 'label',
  attributeBindings: ['for'],

  init() {
    setDataTestSelector(this, {
      testSelector: 'do-label',
      autoTestSelector: get(this, 'config.autoDataTestSelectors'),
      testSelectorValue: get(this, 'propertyName')
    });

    this._super(...arguments);

    let classNames = get(this, 'classNames');
    let classes    = getWithDefault(this, 'config.defaultClasses', {});

    if (isEmpty(classNames) || hasOnlyEmberView(classNames)) {
      set(this, 'classNames', classNames.concat(classes.label));
    }
  }

});

export default DoLabelComponent;
