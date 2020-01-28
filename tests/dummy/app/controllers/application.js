import Controller from '@ember/controller';
import { run } from '@ember/runloop';
import { set } from '@ember/object';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  firstName: {
    validators: [
      validator('presence', true)
    ]
  },
  lastName: {
    validators: [
      validator('presence', true)
    ]
  }
});

export default Controller.extend(Validations, {
  firstName: 'Stefan',
  lastName: '',

  actions: {
    saveTask() {
      set(this, 'isSaving', true);
      run.later(() => {
        set(this, 'isSaving', false);
      }, 500);
    }
  }
});
