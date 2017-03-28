import Ember from 'ember';

const {
  A,
  isArray
} = Ember;

// The classNames on a Component return [] after Ember 2.11,
// but before that it returns ['ember-view'].
export default function hasOnlyEmberView(classNames) {
  if (!isArray(classNames)) {
    return false;
  } else {
    return classNames.length === 1 && A(classNames).includes('ember-view');
  }
}
