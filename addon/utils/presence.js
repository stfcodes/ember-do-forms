import Ember from 'ember';
const { isPresent } = Ember;

export default function presence(value) {
  return isPresent(value) ? value : null;
}
