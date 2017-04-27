import Ember from 'ember';

const {
  isBlank,
  set
} = Ember;

// The idea is to pass down data-test-* attributes
// (for usage with ember-test-selector) to child components.
export default function setDataTestSelector(component, options = {}) {
  options.testSelectorProperty = options.testSelectorProperty || '_dataTestSelector';
  let isTagless     = isBlank(component.tagName);

  let property      = `data-test-${options.testSelector}`;
  let dataTestValue = component[property];
  let finalValue    = options.autoTestSelector ? (dataTestValue || options.testSelectorValue) : dataTestValue;

  // To suppress warnings from ember-test-selector for components
  // without a tagName, delete the actual property from the component.
  if (isTagless && component.hasOwnProperty(property)) {
    delete component[property];
  }

  if (finalValue) {
    if (isTagless) {
      set(component, options.testSelectorProperty, finalValue);
    } else {
      component[property] = finalValue;
    }
  }
}
