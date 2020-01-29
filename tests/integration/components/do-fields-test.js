import EmObject, { set } from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

module('Integration | Component | do fields', function(hooks) {
  setupRenderingTest(hooks);

  let onError;

  hooks.beforeEach(function() {
    onError = Ember.onerror;

    this.config = this.owner.lookup('service:ember-do-forms/config');

    set(this, 'object', EmObject.create({
      name: 'Stefan',
      profileVisible: true
    }));
  });

  hooks.afterEach(function() {
    Ember.onerror = onError;
  });

  test('it requires an object as context', async function(assert) {
    assert.expect(1);

    Ember.onerror = function(error) {
      assert.equal(error.message, 'Assertion Failed: {{do-fields}} requires an object to be passed in.');
    };

    await render(hbs`{{do-fields}}`);
  });

  test('it renders nothing by default', async function(assert) {
    assert.expect(1);
    await render(hbs`{{do-fields object=object}}`);
    assert.equal(this.element.childElementCount, 0, 'it is an empty node');
  });

  test('it has a do-field contextual component', async function(assert) {
    assert.expect(4);
    await render(hbs`
      {{#do-fields object=object objectName='rick' showAllValidations=true as |fields|}}
        {{#fields.do-field propertyName='name' as |field|}}
          {{field.do-control}}
          {{field.do-feedback message='oh noes' classNames='feedback'}}
        {{/fields.do-field}}
      {{/do-fields}}
    `);
    assert.ok(this.element.querySelectorAll('div').length, 'renders the do-field component');
    assert.equal(this.element.querySelector('input').value, 'Stefan', 'control has correct value');
    assert.equal(this.element.querySelector('input').getAttribute('name'), 'rick[name]', 'control has correct name');
    assert.dom(this.element.querySelector('.feedback')).hasText('oh noes', 'feedback is visible');
  });

  test('it has an input-field contextual component', async function(assert) {
    assert.expect(4);
    this.set('object.validations', {
      attrs: { name: { errors: [{ message: 'too cool' }] } }
    });
    await render(hbs`
      {{#do-fields object=object objectName='rick' showAllValidations=true as |fields|}}
        {{fields.input-field propertyName='name' feedbackClasses='feedback'}}
      {{/do-fields}}
    `);
    assert.ok(this.element.querySelectorAll('div').length, 'renders the input-field component');
    assert.equal(this.element.querySelector('input').value, 'Stefan', 'control has correct value');
    assert.equal(this.element.querySelector('input').getAttribute('name'), 'rick[name]', 'control has correct name');
    assert.dom(this.element.querySelector('.feedback')).hasText('too cool', 'feedback is visible');
  });

  test('it has an checkbox-field contextual component', async function(assert) {
    assert.expect(4);
    this.set('object.validations', {
      attrs: { profileVisible: { errors: [{ message: 'too cool' }] } }
    });
    await render(hbs`
      {{#do-fields object=object objectName='rick' showAllValidations=true as |fields|}}
        {{fields.checkbox-field propertyName='profileVisible' feedbackClasses='feedback'}}
      {{/do-fields}}
    `);
    assert.ok(this.element.querySelectorAll('div').length, 'renders the checkbox-field component');
    assert.ok(this.element.querySelector('input').checked, 'input is checked');
    assert.equal(this.element.querySelector('input').getAttribute('name'), 'rick[profileVisible]', 'control has correct name');
    assert.dom(this.element.querySelector('.feedback')).hasText('too cool', 'feedback is visible');
  });
});
