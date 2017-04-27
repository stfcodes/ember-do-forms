import Ember from 'ember';

const {
  merge
} = Ember;

export default function configDefaults(others) {
  let DEFAULTS = {
    // The path to be read on the object for an errors array
    errorsPath: 'validations.attrs.{PROPERTY_NAME}.errors',

    // Auto generate relevant data-test-* for components
    // Overridable per component
    autoDataTestSelectors: false,

    // CSS classes to be applied to components
    // Overridable per component
    defaultClasses: {
      form: [],
      field: [],
      label: [],
      control: [],
      feedback: [],
      hint: []
    },

    // CSS classes to be applied to do-field and do-control
    // components based on the validation state of the object
    validationClasses: {
      fieldSuccess: [],
      fieldError: [],
      controlSuccess: [],
      controlError: []
    }
  };

  return merge(DEFAULTS, others);
}
