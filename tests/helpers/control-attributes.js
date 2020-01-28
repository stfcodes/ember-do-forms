import { assign } from '@ember/polyfills';

const ATTRIBUTES = {
  input: {
    // Generic
    autocomplete: 'name',
    autofocus: true,
    disabled: true,
    form: 'some-form-id',
    inputmode: 'verbatim',
    list: 'datalist-id',
    maxlength: 10,
    minlength: 1,
    pattern: /[a-z]/,
    placeholder: 'never gonna give you up',
    readonly: true,
    required: true,
    size: 6,
    spellcheck: true,
    tabindex: 2,
    title: 'never gonna let you down',

    // Checkbox specific
    checked: true,

    // Number specific
    max: 999,
    min: 0,
    step: 9,

    // Email Specific
    multiple: true
  },
  textarea: {
    rows: 3,
    cols: 5,
    wrap: 'soft'
  }
};

export default function(controlType, others = {}) {
  return assign(ATTRIBUTES[controlType], others);
}
