import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import configDefaults from 'ember-do-forms/utils/config-defaults';
import attrsFor from '../../../helpers/control-attributes';

const {
  get,
  set,
  Service
} = Ember;

const ConfigStub = Service.extend(configDefaults({
  defaultClasses: {
    field: ['field'],
    label: ['label'],
    control: ['control'],
    feedback: ['feedback'],
    hint: ['hint']
  }
}));

moduleForComponent('ember-do-forms/input-field', 'Integration | Component | ember do forms/input field', {
  integration: true,
  beforeEach() {
    this.register('service:ember-do-forms/config', ConfigStub);
    this.inject.service('ember-do-forms/config', { as: 'config' });

    set(this, 'object', Object.create({
      name: 'Stefan'
    }));
  }
});

test('it requires an object as context', function(assert) {
  assert.expect(1);
  assert.expectAssertion(() => {
    this.render(hbs`{{ember-do-forms/input-field}}`);
  }, /{{ember-do-forms\/input-field}} requires an object/);
});

test('it requires a propertyName as context', function(assert) {
  assert.expect(1);
  assert.expectAssertion(() => {
    this.render(hbs`{{ember-do-forms/input-field object=object}}`);
  }, /{{ember-do-forms\/input-field}} requires a propertyName/);
});

test('it has a text control by default', function(assert) {
  assert.expect(3);
  this.render(hbs`{{ember-do-forms/input-field 'name' object=object}}`);
  assert.equal(this.$('input').length, 1, 'has an input');
  assert.equal(this.$('input').attr('type'), 'text', 'input is text by default');
  assert.equal(this.$('input').val(), 'Stefan', 'input has correct value');
});

test('input can be changed to something else via controlType', function(assert) {
  assert.expect(1);
  this.render(hbs`{{ember-do-forms/input-field 'email' object=object controlType='email'}}`);
  assert.equal(this.$('input').attr('type'), 'email', 'input is email');
});

test('renders an input and maybe a feedback element by default', function(assert) {
  assert.expect(2);
  this.set('object.validations', {
    attrs: { name: { errors: [{ message: 'too cool' }] } }
  });
  this.render(hbs`
    {{ember-do-forms/input-field 'name' object=object showAllValidations=true}}
  `);
  assert.equal(this.$('input').length, 1, 'has an input');
  assert.equal(this.$('.feedback').length, 1, 'has a feedback element');
});

test('label is shown only if present', function(assert) {
  assert.expect(2);
  this.render(hbs`
    {{ember-do-forms/input-field 'name' object=object }}
  `);
  assert.equal(this.$('label').length, 0, 'label is missing by default');
  this.render(hbs`
    {{ember-do-forms/input-field 'name' object=object label='dummy'}}
  `);
  assert.equal(this.$('label').length, 1, 'has a label element');
});

test('hint is shown only if present', function(assert) {
  assert.expect(2);
  this.render(hbs`
    {{ember-do-forms/input-field 'name' object=object }}
  `);
  assert.equal(this.$('small').length, 0, 'hint is missing by default');
  this.render(hbs`
    {{ember-do-forms/input-field 'name' object=object hint='dummy'}}
  `);
  assert.equal(this.$('small').length, 1, 'has a hint element');
});

test('passes down relevant attributes to the control', function(assert) {
  // assert.expect(16);
  let inputAttrs = attrsFor('input');
  this.setProperties(inputAttrs);

  this.render(hbs`
    {{ember-do-forms/input-field 'name' object=object
      autocomplete=autocomplete
      form=form
      autofocus=autofocus
      disabled=disabled
      inputmode=inputmode
      list=list
      maxlength=maxlength
      minlength=minlength
      pattern=pattern
      placeholder=placeholder
      readonly=readonly
      required=required
      size=size
      spellcheck=spellcheck
      tabindex=tabindex
      title=title
    }}
  `);

  assert.equal(this.$('input').attr('autocomplete'), inputAttrs.autocomplete, 'it sets the autocomplete attribute');
  assert.equal(this.$('input').attr('autofocus'), 'autofocus', 'it sets the autofocus attribute');
  assert.equal(this.$('input').attr('disabled'), 'disabled', 'it sets the disabled attribute');
  assert.equal(this.$('input').attr('form'), inputAttrs.form, 'it sets the form attribute');
  assert.equal(this.$('input').attr('inputmode'), inputAttrs.inputmode, 'it sets the inputmode attribute');
  assert.equal(this.$('input').attr('list'), inputAttrs.list, 'it sets the list attribute');
  assert.equal(this.$('input').attr('maxlength'), inputAttrs.maxlength, 'it sets the maxlength attribute');
  assert.equal(this.$('input').attr('minlength'), inputAttrs.minlength, 'it sets the minlength attribute');
  assert.equal(this.$('input').attr('pattern'), inputAttrs.pattern, 'it sets the pattern attribute');
  assert.equal(this.$('input').attr('placeholder'), inputAttrs.placeholder, 'it sets the placeholder attribute');
  assert.equal(this.$('input').attr('readonly'), 'readonly', 'it sets the readonly attribute');
  assert.equal(this.$('input').attr('required'), 'required', 'it sets the required attribute');
  assert.equal(this.$('input').attr('size'), inputAttrs.size, 'it sets the size attribute');
  assert.equal(this.$('input').attr('spellcheck'), 'true', 'it sets the spellcheck attribute');
  assert.equal(this.$('input').attr('tabindex'), inputAttrs.tabindex, 'it sets the tabindex attribute');
  assert.equal(this.$('input').attr('title'), inputAttrs.title, 'it sets the title attribute');
});

test('children classNames can be overridden', function(assert) {
  assert.expect(10);
  this.set('object.validations', {
    attrs: { name: { errors: [{ message: 'too cool' }] } }
  });
  this.render(hbs`
    {{ember-do-forms/input-field 'name' object=object showAllValidations=true
      label='name'
      hint='your name'
      classNames='field-class'
      labelClasses='label-class'
      controlClasses='control-class'
      feedbackClasses='feedback-class'
      hintClasses='hint-class'
    }}
  `);

  assert.equal(this.$('.field').length, 0, 'there is no default field class');
  assert.equal(this.$('.field-class').length, 1, 'field class is overridable');

  assert.equal(this.$('.label').length, 0, 'there is no default label class');
  assert.equal(this.$('.label-class').length, 1, 'label class is overridable');

  assert.equal(this.$('.control').length, 0, 'there is no default control class');
  assert.equal(this.$('.control-class').length, 1, 'control class is overridable');

  assert.equal(this.$('.feedback').length, 0, 'there is no default feedback class');
  assert.equal(this.$('.feedback-class').length, 1, 'feedback class is overridable');

  assert.equal(this.$('.hint').length, 0, 'there is no default hint class');
  assert.equal(this.$('.hint-class').length, 1, 'hint class is overridable');
});

test('it actually works', function(assert) {
  assert.expect(2);
  this.set('object.validations', {
    attrs: { name: { errors: [{ message: 'too cool' }] } }
  });
  this.render(hbs`{{ember-do-forms/input-field 'name' object=object showAllValidations=true label='Your Name' hint='First and last'}}`);
  this.$('input').val('Rick');
  this.$('input').change();

  assert.equal(this.$('input').val(), 'Rick', 'it actually sets the input value correctly');
  assert.equal(get(this, 'object.name'), 'Rick', 'it actually sets the object value correctly');
});

test('it passes down data-test-* attributes to its child components', function(assert) {
  this.set('object.validations', {
    attrs: { name: { errors: [{ message: 'too cool' }] } }
  });

  this.render(hbs`
    {{ember-do-forms/input-field 'name' object=object showAllValidations=true label='Your Name' hint='First and last'
      data-test-input-field='name'
      data-test-do-label='label'
      data-test-do-control='control'
      data-test-do-feedback='feedback'
      data-test-do-hint='hint'
    }}
  `);

  assert.equal(this.$('div').attr('data-test-input-field'), 'name', 'field has the data attribute');
  assert.equal(this.$('.label').attr('data-test-do-label'), 'label', 'label has the data attribute');
  assert.equal(this.$('.control').attr('data-test-do-control'), 'control', 'control has the data attribute');
  assert.equal(this.$('.feedback').attr('data-test-do-feedback'), 'feedback', 'feedback has the data attribute');
  assert.equal(this.$('.hint').attr('data-test-do-hint'), 'hint', 'hint has the data attribute');
});
