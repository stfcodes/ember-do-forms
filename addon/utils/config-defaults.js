import Ember from 'ember';

const {
  merge
} = Ember;

export default function configDefaults(others) {
  let DEFAULTS = {
    errorsPath: 'validations.attrs.{PROPERTY_NAME}.errors',

    defaultClasses: {
      field: [],
      label: [],
      control: []
    },

    validationClasses: {
      fieldSuccess: [],
      fieldError: [],
      controlSuccess: [],
      controlError: []
    }
  };

  return merge(DEFAULTS, others);
}
