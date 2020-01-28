import { get } from '@ember/object';
import setDataTestSelector from './set-data-test-selector';

// The idea is to pass down data-test-* attributes
// (for usage with ember-test-selector) to child components.
export default function setTestSelectors(component) {
  setDataTestSelector(component, {
    testSelector: 'do-field',
    testSelectorProperty: '_dataTestSelectorField',
    autoTestSelector: get(component, 'config.autoDataTestSelectors'),
    testSelectorValue: get(component, 'propertyName')
  });

  setDataTestSelector(component, {
    testSelector: 'do-label',
    testSelectorProperty: '_dataTestSelectorLabel',
    autoTestSelector: get(component, 'config.autoDataTestSelectors'),
    testSelectorValue: get(component, 'propertyName')
  });

  setDataTestSelector(component, {
    testSelector: 'do-control',
    testSelectorProperty: '_dataTestSelectorControl',
    autoTestSelector: get(component, 'config.autoDataTestSelectors'),
    testSelectorValue: get(component, 'propertyName')
  });

  setDataTestSelector(component, {
    testSelector: 'do-feedback',
    testSelectorProperty: '_dataTestSelectorFeedback',
    autoTestSelector: get(component, 'config.autoDataTestSelectors'),
    testSelectorValue: get(component, 'propertyName')
  });

  setDataTestSelector(component, {
    testSelector: 'do-hint',
    testSelectorProperty: '_dataTestSelectorHint',
    autoTestSelector: get(component, 'config.autoDataTestSelectors'),
    testSelectorValue: get(component, 'propertyName')
  });
}
