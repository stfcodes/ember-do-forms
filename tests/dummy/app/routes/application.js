import Ember from 'ember';

const {
  Object,
  Route
} = Ember;

export default Route.extend({
  model() {
    return Object.create({
      firstName: 'Stefan',
      lastName: '',
      validations: { attrs: { lastName: { errors: ["can't be blank"] } } }
    });
  }
});
