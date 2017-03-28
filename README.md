# ember-do-forms

Yet another ember forms library that handles the icky parts of forms that you don't want to do. Why? Because [features](#features).

Get started with:

  `ember install ember-do-forms`

## Features
* Built with contextual components.
* Uses [`ember-one-way-controls`](https://github.com/DockYard/ember-one-way-controls) under the hood for controls. But easily extensible with any control type.
* Bare minimum HTML with no classes by default.
* Binds error and success classes on a field `focusOut` or just before `submit`. Works with [`ember-cp-validations`](https://github.com/offirgolan/ember-cp-validations) by default.

## Example

```hbs
{{!-- Use any ember object as the first argument of #do-form --}}
{{#do-form model submit=(action 'saveTask') as |form|}}
  {{!-- Use a model's propertyName as the first argument for #form.do-field --}}
  {{!-- This field (and subfields) uses classes defined in config --}}
  {{#form.do-field 'firstName' as |field|}}
    {{field.do-label 'First name'}}
    {{field.do-control 'text'}}
  {{/form.do-field}}

  {{!-- This field uses it's own classes --}}
  {{!-- But the validations are still bound --}}
  {{#form.do-field 'lastName' classNames='my-custom-field-class' as |field|}}
    {{field.do-label 'Last name' classNames='my-custom-label-class'}}
    {{field.do-control 'text' classNames='my-custom-control-class'}}
  {{/form.do-field}}

  {{!-- Bootstrap 4 checkbox example --}}
  {{#form.do-field 'profileVisible' classNames='form-group' as |field|}}
    {{#field.do-label classNames='custom-control custom-checkbox'}}
      {{field.do-control 'checkbox' classNames='custom-control custom-checkbox'}}
      <span class="custom-control-indicator"></span>
      <span class="custom-control-description">Profile visible?</span>
    {{/field.do-label}}
  {{/form.do-field}}

  {{!-- Custom field / control example --}}
  {{#form.do-field 'customValue' tagName='span' classNames='my-custom-field' as |field|}}
    {{field.do-label 'Custom Field'}}
    {{!-- Fields can be invoked in block form, and the yielded context contains: --}}
    {{!-- id, value, class (the validation class applied to the control) --}}
    {{#field.do-control as |c|}}
      <input value={{c.value}} id={{c.id}} class="{{c.validationClass}}">
    {{/field.do-control}}
  {{/form.do-field}}
  <br>

  {{!-- Use any type of button you want --}}
  <button type='submit'>{{if isSaving 'Saving...' 'Save'}}</button>
{{/do-form}}
```

## Configuration

The default configuration only tells `ember-do-forms` where to find the errors property.
```js
module.exports = function(environment) {
  var ENV = {
    'ember-do-forms': {
      errorsPath: 'validations.attrs.{PROPERTY_NAME}.errors'
    }
  };
};
```

You can easily extend this configuration with more classes. For example Bootstrap 4 classes:
```js
module.exports = function(environment) {
  var ENV = {
    'ember-do-forms': {
      defaultClasses: {
        field: ['form-group'],
        label: ['col-form-label'],
        control: ['form-control']
      },
      validationClasses: {
        fieldSuccess: ['has-success'],
        fieldError: ['has-danger'],
        controlSuccess: ['form-control-success'],
        controlError: ['form-control-danger']
      }
    }
  };
};
```

## Credits

* [`ember-form-for`](https://github.com/martndemus/ember-form-for) for everything.
* [`ember-bootstrap`](https://github.com/kaliber5/ember-bootstrap) the forms part.

I'm extremely thankful for the contributors of these projects as they've been a huge inspiration for me. I have learned a lot by looking at the code and just experimenting and asking questions.
