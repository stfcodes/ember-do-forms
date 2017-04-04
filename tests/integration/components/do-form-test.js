import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import registerTestComponent from '../../ember-test-component';
import configDefaults from 'ember-do-forms/utils/config-defaults';

const {
  get,
  Object,
  set,
  Service
} = Ember;

const ConfigStub = Service.extend(configDefaults({
  validationClasses: {
    fieldSuccess: ['field-success'],
    fieldError: ['field-error'],
    controlSuccess: ['control-success'],
    controlError: ['control-error']
  }
}));

moduleForComponent('do-form', 'Integration | Component | do form', {
  integration: true,
  beforeEach() {
    this.register('service:ember-do-forms/config', ConfigStub);
    this.inject.service('ember-do-forms/config', { as: 'config' });

    set(this, 'submitted', false);

    set(this, 'object', Object.create({
      name: 'Stefan',
      lastName: ''
    }));

    set(this, 'submitTask', () => {
      set(this, 'submitted', true);
    });
  }
});

test('it requires an object as context', function(assert) {
  assert.expect(1);
  assert.expectAssertion(() => {
    this.render(hbs`{{do-form}}`);
  }, /{{do-form}} requires an object/);
});

test('it requires a submit action', function(assert) {
  assert.expect(1);
  assert.expectAssertion(() => {
    this.render(hbs`{{do-form object}}`);
  }, /{{do-form}} requires a submit action/);
});

test('it has an object as the first positional param', function(assert) {
  assert.expect(1);
  this.render(hbs`{{do-form object submit=(action submitTask)}}`);
  assert.equal(this.$('form').length, 1);
});

test('it passes down its objectName to the context', function(assert) {
  assert.expect(1);
  this.render(hbs`
    {{#do-form object submit=(action submitTask) objectName='pizza' as |form|}}
      {{#form.do-field 'name' as |field|}}
        {{field.do-control 'text'}}
      {{/form.do-field}}
    {{/do-form}}
  `);

  assert.equal(this.$('input').attr('name'), 'pizza[name]', 'controls have objectName in their names');
});

test('if can submit', function(assert) {
  assert.expect(5);
  this.set('object.validations', {
    attrs: { lastName: { errors: [{ message: "can't be blank" }] } }
  });

  this.render(hbs`
    {{#do-form object submit=(action submitTask) as |form|}}
      {{#form.do-field 'name' as |field|}}
        {{field.do-control 'text'}}
      {{/form.do-field}}

      {{#form.do-field 'lastName' as |field|}}
        {{field.do-control 'text'}}
      {{/form.do-field}}

      <button type='submit'>Submit</button>
    {{/do-form}}
  `);

  this.$('form').submit();
  assert.equal(get(this, 'submitted'), true, 'submit action was called');

  assert.ok(this.$('div:first').hasClass('field-success'), "there's a field that's valid");
  assert.ok(this.$('div:first > input').hasClass('control-success'), "there's an input that's valid");

  assert.ok(this.$('div:last').hasClass('field-error'), "there's a field that's invalid");
  assert.ok(this.$('div:last > input').hasClass('control-error'), "there's an input that's invalid");
});

test('the field component can be changed to any component', function(assert) {
  assert.expect(1);
  registerTestComponent(this);
  this.render(hbs`
    {{#do-form object submit=(action submitTask) fieldComponent='test-component' as |form|}}
      {{form.do-field}}
    {{/do-form}}
  `);
  assert.equal(this.$('dummy').length, 1, 'custom component is used when specified');
});
