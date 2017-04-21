import Ember from 'ember';

const {
  set
} = Ember;

// The idea is to pass down data-test-* attributes
// (for usage with ember-test-selector) to child components.
export default function setDataTestSelector(component, testSelector, testSelectorProperty = '_dataTestSelector') {
  let property      = `data-test-${testSelector}`;
  let dataTestValue = component[property];

  // To suppress warnings from ember-test-selector for components
  // without a tagName, delete the actual property from the component.
  if (component.hasOwnProperty(property)) {
    delete component[property];
  }

  if (dataTestValue) {
    set(component, testSelectorProperty, dataTestValue);
  }
}
