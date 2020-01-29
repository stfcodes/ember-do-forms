import { isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';
import { set, get } from '@ember/object';
import Mixin from '@ember/object/mixin';
import setDataTestSelector from '../utils/set-data-test-selector';

export default Mixin.create({
  config: service('ember-do-forms/config'),

  labelClasses: [],
  controlClasses: [],
  feedbackClasses: [],
  hintClasses: [],

  _setTestSelectors() {
    setDataTestSelector(this, {
      testSelector: 'do-field',
      testSelectorProperty: '_dataTestSelectorField',
      autoTestSelector: get(this, 'config.autoDataTestSelectors'),
      testSelectorValue: get(this, 'propertyName')
    });

    setDataTestSelector(this, {
      testSelector: 'do-label',
      testSelectorProperty: '_dataTestSelectorLabel',
      autoTestSelector: get(this, 'config.autoDataTestSelectors'),
      testSelectorValue: get(this, 'propertyName')
    });

    setDataTestSelector(this, {
      testSelector: 'do-control',
      testSelectorProperty: '_dataTestSelectorControl',
      autoTestSelector: get(this, 'config.autoDataTestSelectors'),
      testSelectorValue: get(this, 'propertyName')
    });

    setDataTestSelector(this, {
      testSelector: 'do-feedback',
      testSelectorProperty: '_dataTestSelectorFeedback',
      autoTestSelector: get(this, 'config.autoDataTestSelectors'),
      testSelectorValue: get(this, 'propertyName')
    });

    setDataTestSelector(this, {
      testSelector: 'do-hint',
      testSelectorProperty: '_dataTestSelectorHint',
      autoTestSelector: get(this, 'config.autoDataTestSelectors'),
      testSelectorValue: get(this, 'propertyName')
    });
  },

  _setChildClasses() {
    let defaultClasses = get(this, 'config.defaultClasses');

    if (isEmpty(get(this, 'labelClasses'))) {
      set(this, 'labelClasses', defaultClasses.label);
    }

    if (isEmpty(get(this, 'controlClasses'))) {
      set(this, 'controlClasses', defaultClasses.control);
    }

    if (isEmpty(get(this, 'feedbackClasses'))) {
      set(this, 'feedbackClasses', defaultClasses.feedback);
    }

    if (isEmpty(get(this, 'hintClasses'))) {
      set(this, 'hintClasses', defaultClasses.hint);
    }
  }
});
