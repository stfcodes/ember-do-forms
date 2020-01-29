import { isEmpty } from '@ember/utils';
import { set, get } from '@ember/object';

export default function setChildClasses(component) {
  let defaultClasses = get(component, 'config.defaultClasses');

  if (isEmpty(get(component, 'labelClasses'))) {
    set(component, 'labelClasses', defaultClasses.label);
  }

  if (isEmpty(get(component, 'controlClasses'))) {
    set(component, 'controlClasses', defaultClasses.control);
  }

  if (isEmpty(get(component, 'feedbackClasses'))) {
    set(component, 'feedbackClasses', defaultClasses.feedback);
  }

  if (isEmpty(get(component, 'hintClasses'))) {
    set(component, 'hintClasses', defaultClasses.hint);
  }
}
