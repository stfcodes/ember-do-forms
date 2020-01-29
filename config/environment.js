'use strict';

module.exports = function(/* environment, appConfig */) {
  return {
    'ember-do-forms': {
      defaultClasses: {
        field: ['field'],
        label: ['label'],
        control: ['control'],
        feedback: ['feedback'],
        hint: ['hint']
      },
      validationClasses: {
        fieldSuccess: ['field-success'],
        fieldError: ['field-error'],
        controlSuccess: ['control-success'],
        controlError: ['control-error']
      }
    }
  };
};
