import Ember from 'ember';

const {
  Controller,
  run,
  set
} = Ember;

export default Controller.extend({
  actions: {
    saveTask() {
      set(this, 'isSaving', true);
      run.later(() => {
        set(this, 'isSaving', false);
      }, 500);
    }
  }
});
