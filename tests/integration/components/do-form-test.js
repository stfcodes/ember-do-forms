import EmObject, { set, get } from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import Component from '@ember/component';

module('Integration | Component | do form', function(hooks) {
  setupRenderingTest(hooks);

  let onError;

  hooks.beforeEach(function() {
    onError = Ember.onerror;

    this.config = this.owner.lookup('service:ember-do-forms/config');

    set(this, 'submitted', false);

    set(this, 'object', EmObject.create({
      name: 'Stefan',
      lastName: '',
      profileVisible: true
    }));

    set(this, 'submitTask', () => {
      set(this, 'submitted', true);
    });

    const TestComponent = Component.extend({ tagName: 'dummy' });
    this.owner.register('component:test-component', TestComponent);
  });

  hooks.afterEach(function() {
    Ember.onerror = onError;
    this.owner.unregister('component:test-component');
  });

  test('it requires an object as context', async function(assert) {
    assert.expect(1);

    Ember.onerror = function(error) {
      assert.equal(error.message, 'Assertion Failed: {{do-form}} requires an object to be passed in.');
    };

    await render(hbs`{{do-form}}`);
  });

  test('it passes down its objectName to the context', async function(assert) {
    assert.expect(1);
    await render(hbs`
      {{#do-form object=object objectName='pizza' as |form|}}
        {{#form.do-field propertyName='name' as |field|}}
          {{field.do-control controlType='text'}}
        {{/form.do-field}}
      {{/do-form}}
    `);

    assert.equal(this.element.querySelector('input').getAttribute('name'), 'pizza[name]', 'controls have objectName in their names');
  });

  test('passes an input-field to the context', async function(assert) {
    await render(hbs`
      {{#do-form object=object as |form|}}
        {{form.input-field propertyName='name' label='Full name' hint='Never gonna give you up'}}
      {{/do-form}}
    `);
    assert.equal(this.element.querySelector('input').getAttribute('type'), 'text', 'has a text input');
    assert.equal(this.element.querySelector('input').value, get(this, 'object.name'), 'input has the correct value');
    assert.dom(this.element.querySelector('label')).hasText('Full name', 'has correct label');
    assert.dom(this.element.querySelector('small')).hasText('Never gonna give you up', 'has correct hint text');
  });

  test('passes a checkbox-field to the context', async function(assert) {
    await render(hbs`
      {{#do-form object=object as |form|}}
        {{form.checkbox-field propertyName='profileVisible' label='Visible profile'}}
      {{/do-form}}
    `);
    assert.equal(this.element.querySelector('input').getAttribute('type'), 'checkbox', 'has a checkbox input');
    assert.equal(this.element.querySelector('input').checked, get(this, 'object.profileVisible'), 'input has the correct value');
  });

  test('it can submit', async function(assert) {
    assert.expect(8);
    this.set('object.validations', {
      attrs: { lastName: { errors: [{ message: "can't be blank" }] } }
    });

    await render(hbs`
      {{#do-form object=object submit=(action submitTask) as |form|}}
        {{form.do-field propertyName='name'}}
        {{form.do-field propertyName='lastName'}}
        <button type='submit'>Submit</button>
      {{/do-form}}
    `);

    assert.equal(this.element.querySelectorAll('.field-error').length, 0, 'no error fields initially');
    assert.equal(this.element.querySelectorAll('.field-success').length, 0, 'no success fields initially');

    assert.notOk(get(this, 'submitted'), 'submitted is initially false');
    await triggerEvent('form', 'submit');
    // await click('button');
    assert.ok(get(this, 'submitted'), 'submit action was called');

    assert.equal(this.element.querySelectorAll('.field-error').length, 1, 'one field with error');
    assert.equal(this.element.querySelectorAll('.field-success').length, 1, 'one field with success');

    // Clear the validations
    this.set('object.validations', {
      attrs: { lastName: { errors: [] } }
    });

    assert.equal(this.element.querySelectorAll('.field-error').length, 0, 'no error fields now');
    assert.equal(this.element.querySelectorAll('.field-success').length, 2, 'all the fields are successful now');
  });

  test('it shows validations when submitting even without a submit action', async function(assert) {
    this.set('object.validations', {
      attrs: { lastName: { errors: [{ message: "can't be blank" }] } }
    });
    await render(hbs`
      {{#do-form object=object as |form|}}
        {{form.do-field propertyName='lastName'}}
        <button type='submit'>Submit</button>
      {{/do-form}}
    `);

    assert.equal(this.element.querySelectorAll('.field-error').length, 0, 'no error fields initially');
    await triggerEvent('form', 'submit');
    assert.equal(this.element.querySelectorAll('.field-error').length, 1, 'name lastName has error');
  });

  test('has a do-fields contextual component', async function(assert) {
    set(this, 'differentObject', EmObject.create({
      name: 'Rick',
      validations: {
        attrs: { name: { errors: [{ message: 'too cool' }] } }
      }
    }));
    await render(hbs`
      {{#do-form object=object submit=(action submitTask) as |form|}}
        {{form.input-field propertyName='name'}}

        {{#form.do-fields object=differentObject as |fields|}}
          {{fields.input-field propertyName='name'}}
        {{/form.do-fields}}

        <button type='submit'>Submit</button>
      {{/do-form}}
    `);

    assert.equal(this.element.querySelector('input').value, 'Stefan', 'first control has correct context');
    assert.equal(this.element.querySelector('form .field:last-of-type input').value, 'Rick', 'second control has correct context');

    assert.equal(this.element.querySelectorAll('.field-error').length, 0, 'no error fields initially');
    assert.equal(this.element.querySelectorAll('.field-success').length, 0, 'no success fields initially');

    await triggerEvent('form', 'submit');

    assert.equal(this.element.querySelectorAll('.field-error').length, 1, 'one field with error');
    assert.equal(this.element.querySelectorAll('.field-success').length, 1, 'one field with success');
  });

  test('the field component can be changed to any component', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{#do-form object=object fieldComponent='test-component' as |form|}}
        {{form.do-field}}
      {{/do-form}}
    `);
    assert.equal(this.element.querySelectorAll('dummy').length, 1, 'custom component is used when specified');
  });

  test('it has formClasses applied from configuration', async function(assert) {
    assert.expect(1);
    this.set('config.defaultClasses.form', ['default-form-class']);
    await render(hbs`{{do-form object=object}}`);
    assert.dom(this.element.querySelector('form')).hasClass('default-form-class', 'has default formClasses');
  });

  test('configuration formClasses can be overridden by own classNames', async function(assert) {
    assert.expect(2);
    this.set('config.defaultClasses.form', ['default-form-class']);
    await render(hbs`{{do-form object=object classNames='my-custom-form-class'}}`);
    assert.dom(this.element.querySelector('form')).hasClass('my-custom-form-class', 'formClasses are overridden correctly');
    assert.dom(this.element.querySelector('form')).hasNoClass('default-form-class', 'no default formClasses');
  });

  test('update function can be changed for do-field', async function(assert) {
    set(this, 'dummyFunc', () => {
      set(this, 'pizza', true);
    });

    await render(hbs`
      {{#do-form object=object update=(action dummyFunc) as |form|}}
        {{#form.do-field propertyName='name' as |field|}}
          {{field.do-control controlType='text'}}
        {{/form.do-field}}
      {{/do-form}}
    `);

    assert.notOk(get(this, 'pizza'), 'initial value is untouched');
    this.element.querySelector('input').value = 'something';
    await triggerEvent('input', 'change');
    assert.equal(get(this, 'pizza'), true, 'correctly used the update function');
    assert.equal(get(this, 'object.name'), 'Stefan', 'object has the initial value');
  });

  test('update function can be changed for input-field', async function(assert) {
    set(this, 'dummyFunc', () => {
      set(this, 'pizza', true);
    });

    await render(hbs`
      {{#do-form object=object update=(action dummyFunc) as |form|}}
        {{form.input-field propertyName='name'}}
      {{/do-form}}
    `);

    assert.notOk(get(this, 'pizza'), 'initial value is untouched');
    this.element.querySelector('input').value = 'something';
    await triggerEvent('input', 'change');
    assert.equal(get(this, 'pizza'), true, 'correctly used the update function');
    assert.equal(get(this, 'object.name'), 'Stefan', 'object has the initial value');
  });

  test('update function can be changed for checkbox-field', async function(assert) {
    set(this, 'dummyFunc', () => {
      set(this, 'pizza', true);
    });

    await render(hbs`
      {{#do-form object=object update=(action dummyFunc) as |form|}}
        {{form.checkbox-field propertyName='profileVisible' label='Visible profile'}}
      {{/do-form}}
    `);

    assert.notOk(get(this, 'pizza'), 'initial value is untouched');
    await click('input');
    assert.equal(get(this, 'pizza'), true, 'correctly used the update function');
    assert.equal(get(this, 'object.profileVisible'), true, 'object has the initial value');
  });

  test('update function can be changed for do-fields', async function(assert) {
    set(this, 'dummyFunc', () => {
      set(this, 'pizza', true);
    });

    set(this, 'differentObject', EmObject.create({ name: 'Rick' }));

    await render(hbs`
      {{#do-form object=object update=(action dummyFunc) as |form|}}
        {{#form.do-fields object=differentObject as |fields|}}
          {{fields.input-field propertyName='name'}}
        {{/form.do-fields}}
      {{/do-form}}
    `);

    this.element.querySelector('input').value = 'something';
    await triggerEvent('input', 'change');
    assert.equal(get(this, 'pizza'), true, 'correctly used the update function');
    assert.equal(get(this, 'differentObject.name'), 'Rick', 'differentObject has the initial value');
  });
});
