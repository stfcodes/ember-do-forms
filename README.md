# ember-do-forms

[![Build Status](https://travis-ci.org/shuriu/ember-do-forms.svg?branch=master)](https://travis-ci.org/shuriu/ember-do-forms)
[![npm version](https://badge.fury.io/js/ember-do-forms.svg)](https://badge.fury.io/js/ember-do-forms)
[![Ember Observer Score](https://emberobserver.com/badges/ember-do-forms.svg)](https://emberobserver.com/addons/ember-do-forms)

An Ember forms library that handles the icky parts of forms that you don't want to do, but makes no other assumptions otherwise.

Get started with:

  `ember install ember-do-forms`

## Philosophy

My experience with my ambitious application has proven that other (maintained) form builder addons either **do too much**, or are **hard to customise**. So I created `ember-do-forms` because it assumes very little about my form needs.

The basic idea for `ember-do-forms` is simple: assume as little as possible about my HTML and CSS structure, while providing **some** syntactic sugar for the icky parts.

For example, should forms validate my inputs? I'd argue that forms are just UX glue for your data, so forms shouldn't do that. Still I'd like validation UX (CSS, text, etc) to be handled by the form builder because it's a big chunk of boilerplate.

Another icky part is customisation, which most other form builder addons fail short on in varying degrees.

## Features

* [Extremely](#css-customizations) [easy](#inline-component-customizations) to [customize](#component-customizations), thanks to contextual components.
* Bare minimum HTML with no CSS by default. Use it with any CSS framework you like. 
* Binds error and success classes (if found) on a field `focusOut` or just before `submit`. Works with [`ember-cp-validations`](https://github.com/offirgolan/ember-cp-validations) by default. [`ember-changeset-validations`](https://github.com/DockYard/ember-changeset-validations) works too with a small configuration tweak.
* Uses [`ember-one-way-controls`](https://github.com/DockYard/ember-one-way-controls) under the hood for controls. But easily extensible with any control type.

## Usage

#### Basic usage
```hbs
{{#do-form object submit=(action 'saveTask') as |form|}}

  {{#form.do-field propertyName as |field|}}
    {{field.do-label labelText}}
    {{field.do-control controlType}}
    {{field.do-feedback}}
    {{field.do-hint hintText}}
  {{/form.do-field}}

  <button type='submit'>Save</button>
{{/do-form}}
```
* `do-form` is just a component that wraps components
* `object` is the object the form binds to. It's the only positional param.
* `propertyName` is the property the field binds to on the object.
* `labelText` is the text to display for the label
* `controlType` is a one-way-control valid control. Just omit the `one-way`. For example `{{field.do-control 'checkbox'}}` will render a `{{one-way-checkbox}}` under the hood.
* `submit` pass in any action you want there. Works great with [`ember-concurrency`](https://github.com/machty/ember-concurrency)!
* `{{do-feedback}}` shows the validation error message if it exists. It is bound by default to `field.errorMessage`.
* `{{do-hint}}` shows any hint text you want via the `hintText` parameter.
* use any type of button you want. Use a bare `<button type='Submit'>`, use it with [`ember-async-button`](https://github.com/DockYard/ember-async-button) or do it [with style](http://ember-concurrency.com/#/docs/examples/loading-ui).

#### CSS customizations
You can customize the rendered CSS by modifying the default [config](#configuration). But you can also customize classes by individual component.

```hbs
{{#do-form user submit=(action 'saveTask') as |form|}}

  {{#form.do-field 'fullName' classNames='my-custom-field-class' as |field|}}
    {{field.do-label 'fullName' classNames='my-custom-label-class'}}
    {{field.do-control 'text' classNames='my-custom-control-class'}}
    {{field.do-feedback classNames='my-feedback-class'}}
    {{field.do-hint 'First name, followed by last name' classNames='my-hint-class'}}
  {{/form.do-field}}

{{/do-form}}
```

#### Inline component customizations
You can modify the content of a field easily. Below there is a [Bootstrap 4 custom checkbox](https://v4-alpha.getbootstrap.com/components/forms/#checkboxes) for example. The default `tagName` for a field is `<div>`.
```hbs
{{#do-form user submit=(action 'saveTask') as |form|}}

  {{#form.do-field 'profileVisible' classNames='form-group' as |field|}}
    {{#field.do-label classNames='custom-control custom-checkbox'}}
      {{field.do-control 'checkbox' classNames='custom-control-input'}}
      <span class="custom-control-indicator"></span>
      <span class="custom-control-description">Profile visible?</span>
    {{/field.do-label}}
    {{field.do-hint 'Check this to make your profile visible' classNames='form-text text-muted'}}
  {{/form.do-field}}

{{/do-form}}
```

You can also modify the content of the `{{do-control}}` component. Use whatever you like, the `context` has access to `id`, `value` and `validationClass`, so your custom control will *just work™*. The default `tagName` is `''`.
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

The `{{do-feedback}}` component can be easily customized as well. Just pass a block and it will have access to the error `message`, and displays only if there is one. **The caveat here** is that the component tag name should only be configured via `wrapperTagName`, and the reason is that this component should be hidden unless an error message is present. The default `wrapperTagName` is `<div>`.
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

The `{{do-hint}}` component is very easy to customise. Just pass a block and it will have access to `hintText`. The default `tagName` is `<small>`.
```hbs
{{#do-form user submit=(action 'saveTask') as |form|}}

  {{#form.do-field 'fullName' as |field|}}
    {{field.do-label 'fullName'}}
    {{field.do-control 'text'}}
    {{field.do-feedback}}
    {{#field.do-hint 'First name, followed by last name' as |hintText|}}
      {{tooltip-on-component text=hintText}}
    {{/field.do-hint}}
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
    feedbackComponent='my-fancy-error-message'
    hintComponent='my-hint' as |field|}}

    <!-- This is will now render 'my-very-smart-i18n-label' -->
    {{field.do-label}}

    <!-- This is will now render 'my-fancy-datepicker' -->
    {{field.do-control}}

    <!-- This is will now render 'my-fancy-error-message' -->
    {{field.do-feedback}}

    <!-- This is will now render 'my-hint' -->
    {{field.do-hint}}

  {{/form.do-field}}

{{/do-form}}
```

#### Input field
You can also use the `{{ember-do-forms/input-field}}` component to combine all of the goodness of the `{{do-field}}` component (and its contextual components) into a single line:

```hbs
{{#do-form object submit=(action 'saveTask') as |form|}}
  {{form.input-field 'lastName' label='Last Name' hint='First name followed by last name'}}

  <button type='submit'>Save</button>
{{/do-form}}
```

If you want to skip labels and hints, just omit the `label` and `hint` arguments.

Also the classNames of its rendered sub-components can be modified using `labelClasses`, `controlClasses`, `feedbackClasses` and `hintClasses`.

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
        feedback: ['form-control-feedback'],
        hint: ['form-text', 'text-muted'],
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

- [x] Pass more options to the controls. Currently only the bare minimum is passed down
- [x] Improve README
- [ ] Add CHANGELOG
- [ ] Add theming support
- [ ] Add some default controls
- [ ] Interactive example page

## Contributing

**Any contribution**, be it an issue, a feature or a bugfix is greatly appreciated :heart:

Also, if your feature or bugfix adheres to `ember-do-forms`'s [philosophy](#philosophy) and is tested, I will give you commit rights.

## Credits / Inspiration

* [`ember-form-for`](https://github.com/martndemus/ember-form-for)
* [`ember-bootstrap`](https://github.com/kaliber5/ember-bootstrap)
* [`ember-easy-form`](https://github.com/DockYard/ember-easy-form)

I'm extremely thankful for the contributors of these projects as they've been a huge inspiration for me. From being an absolute beginner and not knowing what contextual components are, I have learned a lot by looking at the code and just experimenting and asking questions.
