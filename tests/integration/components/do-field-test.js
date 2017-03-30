import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import registerTestComponent from '../../ember-test-component';
import configDefaults from 'ember-do-forms/utils/config-defaults';

const {
  get,
  Object,
  Service,
  set
} = Ember;

const ConfigStub = Service.extend(configDefaults({
  defaultClasses: {
    field: ['default-field-class'],
    feedback: ['feedback-class']
  },
  validationClasses: {
    fieldSuccess: ['field-success'],
    fieldError: ['field-error'],
    controlSuccess: ['control-success'],
    controlError: ['control-error']
  }
}));

moduleForComponent('do-field', 'Integration | Component | do form field', {
  integration: true,
  beforeEach() {
    this.register('service:ember-do-forms/config', ConfigStub);
    this.inject.service('ember-do-forms/config', { as: 'config' });
    set(this, 'object', Object.create({
      name: 'Stefan',
      lastName: ''
    }));
  }
});

test('it requires an object as context', function(assert) {
  assert.expect(1);
  assert.expectAssertion(() => {
    this.render(hbs`{{do-field}}`);
  }, /{{do-field}} requires an object/);
});

test('it requires a propertyName as context', function(assert) {
  assert.expect(1);
  assert.expectAssertion(() => {
    this.render(hbs`{{do-field object=object}}`);
  }, /{{do-field}} requires a propertyName/);
});

test('it renders a div by default', function(assert) {
  assert.expect(1);
  this.render(hbs`
    {{do-field 'name' object=object }}
  `);
  assert.equal(this.$('div').length, 1, "it's a div by default");
});

test('it can render a label with correct context', function(assert) {
  this.render(hbs`
    {{#do-field 'name' object=object controlId='myControl' as |field|}}
      {{field.do-label 'Name' }}
    {{/do-field}}
  `);

  assert.equal(this.$('label').length, 1);
  assert.equal(this.$('label').text().trim(), 'Name');
  assert.equal(this.$('label').attr('for'), 'myControl', 'label has the correct for attribute');
});

test('the label component can be changed to any component', function(assert) {
  assert.expect(1);
  registerTestComponent(this);
  this.render(hbs`
    {{#do-field 'name' object=object labelComponent='test-component' as |field|}}
      {{field.do-label}}
    {{/do-field}}
  `);
  assert.equal(this.$('dummy').length, 1, 'custom component is used for label');
});

test('it can render an input with correct context', function(assert) {
  assert.expect(3);
  this.render(hbs`
    {{#do-field 'name' object=object controlId='myControl' as |field|}}
      {{field.do-control 'text' }}
    {{/do-field}}
  `);
  assert.equal(this.$('input').length, 1);
  assert.equal(this.$('input').attr('id'), 'myControl', 'input has the correct id');
  assert.equal(this.$('input').val(), get(this, 'object.name'), "the input's value is bound to the object property");
});

test('the input component can be changed to any component', function(assert) {
  assert.expect(1);
  registerTestComponent(this);
  this.render(hbs`
    {{#do-field 'name' object=object controlComponent='test-component' as |field|}}
      {{field.do-control}}
    {{/do-field}}
  `);
  assert.equal(this.$('dummy').length, 1, 'custom component is used for input');
});

test("it changes the bound object's value on input", function(assert) {
  assert.expect(2);
  this.render(hbs`
    {{#do-field 'name' object=object controlId='myControl' as |field|}}
      {{field.do-control 'text' }}
    {{/do-field}}
  `);
  this.$('input').val('Dodo');
  this.$('input').change();
  this.$('input').trigger('input');

  assert.equal(this.$('input').val(), 'Dodo', "the input's value is updated");
  assert.equal(get(this, 'object.name'), 'Dodo', "the object's name is updated on input change");
});

test('it binds to any errorsPath for validations', function(assert) {
  assert.expect(1);
  this.set('config', {
    validationClasses: { fieldError: 'custom-error-prop' },
    errorsPath: 'feedbacks.{PROPERTY_NAME}.things'
  });
  this.set('object.feedbacks', { name: { things: ['error'] } });
  this.render(hbs`{{do-field 'name' object=object config=config showAllValidations=true}}`);
  assert.equal(this.$('div').hasClass('custom-error-prop'), true, 'errorsPath is read correctly');
});

test('it binds validation classes to the field and input when focusing out', function(assert) {
  assert.expect(4);
  this.set('object.validations', {
    attrs: { lastName: { errors: [{ message: "can't be blank" }] } }
  });
  this.render(hbs`
    {{#do-field 'name' object=object as |field|}}
      {{field.do-control 'text' }}
    {{/do-field}}
  `);
  this.$('div').trigger('focusout');
  assert.equal(this.$('div').hasClass('field-success'), true, 'adds .field-success to the field if it has errors');
  assert.equal(this.$('input').hasClass('control-success'), true, 'adds .control-success to the input with error');

  this.render(hbs`
    {{#do-field 'lastName' object=object as |field|}}
      {{field.do-control 'text' }}
    {{/do-field}}
  `);
  this.$('div').trigger('focusout');
  assert.equal(this.$('div').hasClass('field-error'), true, 'adds .field-error to fields with errors');
  assert.equal(this.$('input').hasClass('control-error'), true, 'adds .control-error to the input with error');
});

test('it shows feedback when it has errors', function(assert) {
  assert.expect(3);
  this.set('object.validations', {
    attrs: { lastName: { errors: [{ message: "can't be blank" }] } }
  });

  this.render(hbs`
    {{#do-field 'lastName' object=object as |field|}}
      {{field.do-control 'text' }}
      {{field.do-feedback}}
    {{/do-field}}
  `);
  assert.equal(this.$('.feedback-class').length, 0, "there's no feedback element initially");
  this.$('div').trigger('focusout');
  assert.equal(this.$('.feedback-class').length, 1, 'a feedback element is present');
  assert.equal(this.$('.feedback-class').text().trim(), "can't be blank", 'has the correct feedback message');
});

test('the feedback can also read its message from the validation key', function(assert) {
  assert.expect(2);
  this.set('object.validations', {
    attrs: { lastName: { errors: [{ validation: 'changeset-validations' }] } }
  });

  this.render(hbs`
    {{#do-field 'lastName' object=object as |field|}}
      {{field.do-feedback showFeedback=true}}
    {{/do-field}}
  `);
  assert.equal(this.$('.feedback-class').length, 1, 'a feedback element is present');
  assert.equal(this.$('.feedback-class').text().trim(), 'changeset-validations', 'has the correct feedback message');
});

test('feedback changes as errors get fixed', function(assert) {
  assert.expect(2);
  this.set('object.validations', {
    attrs: { lastName: { errors: [
      { message: "can't be blank" },
      { message: 'Never gonna give you up' }
    ] } }
  });

  this.render(hbs`
    {{#do-field 'lastName' object=object as |field|}}
      {{field.do-control 'text' }}
      {{field.do-feedback}}
    {{/do-field}}
  `);
  this.$('div').trigger('focusout');
  assert.equal(this.$('.feedback-class').text().trim(), "can't be blank", 'only the first message is shown initially');

  this.set('object.validations', {
    attrs: { lastName: { errors: [{ message: 'Never gonna give you up' }] } }
  });
  assert.equal(this.$('.feedback-class').text().trim(), 'Never gonna give you up', 'feedback text changes as errors dissappear');
});

test('the feedback component can be changed to any component', function(assert) {
  assert.expect(1);
  registerTestComponent(this);
  this.render(hbs`
    {{#do-field 'name' object=object feedbackComponent='test-component' as |field|}}
      {{field.do-feedback}}
    {{/do-field}}
  `);
  assert.equal(this.$('dummy').length, 1, 'custom component is used for feedback');
});

test('it has fieldClasses applied from configuration', function(assert) {
  assert.expect(1);
  this.render(hbs`{{do-field 'name' object=object}}`);
  assert.equal(this.$('div').hasClass('default-field-class'), true, 'has default fieldClasses');
});

test('configuration fieldClasses can be overridden by own classNames', function(assert) {
  assert.expect(1);
  this.render(hbs`{{do-field 'name' object=object classNames='my-custom-field-class'}}`);
  assert.equal(this.$('div').hasClass('my-custom-field-class'), true, 'fieldClasses are overridden correctly');
});
