# ember-do-forms

[![Build Status](https://travis-ci.org/shuriu/ember-do-forms.svg?branch=master)](https://travis-ci.org/shuriu/ember-do-forms)
[![npm version](https://badge.fury.io/js/ember-do-forms.svg)](https://badge.fury.io/js/ember-do-forms)
[![Ember Observer Score](https://emberobserver.com/badges/ember-do-forms.svg)](https://emberobserver.com/addons/ember-do-forms)

Yet another ember forms library that handles the icky parts of forms that you don't want to do.

Why? Because [features](#features). Also because it assumes very little about your form needs.

Get started with:

  `ember install ember-do-forms`

## Features

* [Extremely](#css-customizations) [easy](#inline-component-customizations) to [customize](#component-customizations), thanks to contextual components.
* Uses [`ember-one-way-controls`](https://github.com/DockYard/ember-one-way-controls) under the hood for controls. But easily extensible with any control type.
* Bare minimum HTML with no CSS by default. Use it with any frontend framework you like.
* Binds error and success classes on a field `focusOut` or just before `submit`. Works with [`ember-cp-validations`](https://github.com/offirgolan/ember-cp-validations) by default.

## Usage

#### Basic usage
`do-form` is just a component that wraps components
```hbs
{{#do-form object submit=(action 'saveTask') as |form|}}

  {{#form.do-field propertyName as |field|}}
    {{field.do-label labelText}}
    {{field.do-control controlType}}
    {{field.do-feedback}}
  {{/form.do-field}}

  <button type='submit'>Save</button>
{{/do-form}}
```
* `object` is the object the form binds to. It's the only positional param.
* `propertyName` is the property the field binds to on the object.
* `labelText` is the text to display for the label
* `controlType` is a one-way-control valid control. Just omit the `one-way`. For example `{{field.do-control 'checkbox'}}` will render a `{{one-way-checkbox}}` under the hood.
* `submit` pass in any action you want there. Works great with [`ember-concurrency`](https://github.com/machty/ember-concurrency)!
* `{{do-feedback}}` shows the validation error message if it exists. It is bound by default to `field.errorMessage`.
* use any type of button you want. Use a bare `<button type='Submit'>`, use it with [`ember-async-button`](https://github.com/DockYard/ember-async-button) or do it [with style](http://ember-concurrency.com/#/docs/examples/loading-ui).

#### CSS customizations
You can customize the rendered CSS by modifying the default [config](#configuration). But you can also customize classes by individual component.

```hbs
{{#do-form user submit=(action 'saveTask') as |form|}}

  {{#form.do-field 'fullName' classNames='my-custom-field-class' as |field|}}
    {{field.do-label 'fullName' classNames='my-custom-label-class'}}
    {{field.do-control 'text' classNames='my-custom-control-class'}}
    {{field.do-feedback classNames='my-feedback-class'}}
  {{/form.do-field}}

{{/do-form}}
```

#### Inline component customizations
You can modify the content of a field easily. Below there is a [Bootstrap 4 custom checkbox](https://v4-alpha.getbootstrap.com/components/forms/#checkboxes) for example.
```hbs
{{#do-form user submit=(action 'saveTask') as |form|}}

  {{#form.do-field 'profileVisible' classNames='form-group' as |field|}}
    {{#field.do-label classNames='custom-control custom-checkbox'}}
      {{field.do-control 'checkbox' classNames='custom-control custom-checkbox'}}
      <span class="custom-control-indicator"></span>
      <span class="custom-control-description">Profile visible?</span>
    {{/field.do-label}}
  {{/form.do-field}}

{{/do-form}}
```

You can also modify the content of the `{{do-control}}` component. Use whatever you like, the `context` has access to `id`, `value` and `validationClass`, so your custom control will *just work™*.
```hbs
{{#do-form user submit=(action 'saveTask') as |form|}}

  {{#form.do-field 'customValue' as |field|}}
    {{field.do-label 'Custom Field'}}
    {{#field.do-control as |context|}}
      <input value={{context.value}} id={{context.id}} class="{{context.validationClass}}">
    {{/field.do-control}}
    {{field.do-feedback}}
  {{/form.do-field}}

{{/do-form}}
```

The `{{do-feedback}}` component can be easily customized as well. Just pass a block and it will have access to the error `message`, and displays only if there is one. 
```hbs
{{#do-form user submit=(action 'saveTask') as |form|}}

  {{#form.do-field 'firstName' as |field|}}
    {{field.do-label 'First Name'}}
    {{field.do-control 'text'}}
    {{#field.do-feedback wrapperTagName='span' as |message|}}
      {{tooltip-on-component text=message}}
    {{/field.do-feedback}}
  {{/form.do-field}}

{{/do-form}}
```

#### Component customizations
If you have more complex components for controls for example, rest assured, you can use them. Even some context gets passed in to your custom components!
```hbs
{{#do-form user submit=(action 'saveTask') as |form|}}

  {{#form.do-field 'customValue'
    labelComponent='my-very-smart-i18n-label'
    controlComponent='my-fancy-datepicker'
    feedbackComponent='my-fancy-error-message' as |field|}}

    <!-- This is will now render 'my-very-smart-i18n-label' -->
    {{field.do-label}}

    <!-- This is will now render 'my-fancy-datepicker' -->
    {{field.do-control}}

    <!-- This is will now render 'my-fancy-error-message' -->
    {{field.do-feedback}}

  {{/form.do-field}}

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
        control: ['form-control'],
        feedback: ['form-control-feedback']
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

## TODO

* ~~Pass more options to the controls. Currently only the bare minimum is passed down~~
* ~~Improve README~~
* Add some default controls
* Add CHANGELOG
* Interactive example page

## Contributing
The usual flow: fork > feature / bugfix > PR > profit.

I will also give commit rights to anyone submitting quality PRs (code adheres to the project's philosophy, clean, tested).

## Credits

* [`ember-form-for`](https://github.com/martndemus/ember-form-for) for everything.
* [`ember-bootstrap`](https://github.com/kaliber5/ember-bootstrap) the forms part.

I'm extremely thankful for the contributors of these projects as they've been a huge inspiration for me. From being an absolute beginner and not knowing what contextual components are, I have learned a lot by looking at the code and just experimenting and asking questions.
