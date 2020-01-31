import EmObject, { set, get } from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Component from '@ember/component';

module('Integration | Component | do field', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.config = this.owner.lookup('service:ember-do-forms/config');

    set(this, 'object', EmObject.create({
      name: 'Stefan',
      lastName: ''
    }));

    const TestComponent = Component.extend({ tagName: 'dummy' });
    this.owner.register('component:test-component', TestComponent);
  });

  hooks.afterEach(function() {
    this.owner.unregister('component:test-component');
  });

  test('it renders a div by default', async function(assert) {
    assert.expect(1);
    await render(hbs`
      {{do-field propertyName='name' object=object }}
    `);

    assert.equal(this.element.querySelectorAll('div').length, 1, "it's a div by default");
  });

  test('it can render a label with correct context', async function(assert) {
    assert.expect(3);
    await render(hbs`
      {{#do-field propertyName='name' object=object controlId='myControl' as |field|}}
        {{field.do-label labelText='Name' }}
      {{/do-field}}
    `);

    assert.equal(this.element.querySelectorAll('label').length, 1);
    assert.dom(this.element.querySelector('label')).hasText('Name');
    assert.equal(this.element.querySelector('label').getAttribute('for'), 'myControl', 'label has the correct for attribute');
  });

  test('the label component can be changed to any component', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{#do-field propertyName='name' object=object labelComponent='test-component' as |field|}}
        {{field.do-label}}
      {{/do-field}}
    `);
    assert.equal(this.element.querySelectorAll('dummy').length, 1, 'custom component is used for label');
  });

  test('it renders a text input by default as a control', async function(assert) {
    assert.expect(1);
    await render(hbs`
      {{#do-field propertyName='name' object=object as |field|}}
        {{field.do-control}}
      {{/do-field}}
    `);
    assert.equal(this.element.querySelector('input').getAttribute('type'), 'text', 'input has the correct type');
  });

  test('it renders a different input type as a control when specifying controlType', async function(assert) {
    assert.expect(1);
    await render(hbs`
      {{#do-field propertyName='email' object=object controlType='email' as |field|}}
        {{field.do-control }}
      {{/do-field}}
    `);
    assert.equal(this.element.querySelector('input').getAttribute('type'), 'email', 'input has the correct type');
  });

  test('it renders an input with correct context', async function(assert) {
    assert.expect(3);
    await render(hbs`
      {{#do-field propertyName='name' object=object controlId='myControl' as |field|}}
        {{field.do-control 'text' }}
      {{/do-field}}
    `);
    assert.equal(this.element.querySelectorAll('input').length, 1);
    assert.equal(this.element.querySelector('input').id, 'myControl', 'input has the correct id');
    assert.equal(this.element.querySelector('input').value, get(this, 'object.name'), "the input's value is bound to the object property");
  });

  test('uses its objectName for the name of the control by default', async function(assert) {
    assert.expect(2);
    await render(hbs`
      {{#do-field propertyName='name' object=object objectName='pizza' as |field|}}
        {{field.do-control controlType='text'}}
      {{/do-field}}
    `);
    assert.equal(this.element.querySelector('input').getAttribute('name'), 'pizza[name]', 'input has the correct name');

    this.set('object.constructor.modelName', 'bigger-pizza');
    await render(hbs`
      {{#do-field propertyName='name' object=object objectName='pizza' as |field|}}
        {{field.do-control controlType='text'}}
      {{/do-field}}
    `);
    assert.equal(this.element.querySelector('input').getAttribute('name'), 'pizza[name]', 'objectName takes precedence over computed modelName');
    this.set('object.constructor.modelName', undefined);
  });

  test('it uses propertyName as the name of the control when objectName is missing', async function(assert) {
    assert.expect(1);
    await render(hbs`
      {{#do-field propertyName='firstName' object=object as |field|}}
        {{field.do-control controlType='text'}}
      {{/do-field}}
    `);
    assert.equal(this.element.querySelector('input').getAttribute('name'), 'firstName', 'input has the correct name');
  });

  test('it uses the constructor.modelName of the object for its name, when objectName is missing', async function(assert) {
    assert.expect(1);
    this.set('object.constructor.modelName', 'pizza');
    await render(hbs`
      {{#do-field propertyName='name' object=object as |field|}}
        {{field.do-control controlType='text'}}
      {{/do-field}}
    `);
    assert.equal(this.element.querySelector('input').getAttribute('name'), 'pizza[name]', 'input has the correct name');
    this.set('object.constructor.modelName', undefined);
  });

  test('it uses the content from ember-changeset when objectName is missing', async function(assert) {
    assert.expect(1);
    this.set('object._content', { constructor: { modelName: 'changeset' } });
    await render(hbs`
      {{#do-field propertyName='name' object=object as |field|}}
        {{field.do-control controlType='text'}}
      {{/do-field}}
    `);
    assert.equal(this.element.querySelector('input').getAttribute('name'), 'changeset[name]', 'input has the changeset name');
    this.set('object._content', undefined);
  });

  test('it uses the content from buffered-proxy when objectName is missing', async function(assert) {
    assert.expect(1);
    this.set('object.content', { constructor: { modelName: 'bufferered-proxy' } });
    await render(hbs`
      {{#do-field propertyName='name' object=object as |field|}}
        {{field.do-control controlType='text'}}
      {{/do-field}}
    `);
    assert.equal(this.element.querySelector('input').getAttribute('name'), 'bufferered-proxy[name]', 'input has the buffered-proxy name');
    this.set('object.content', undefined);
  });

  test('the input component can be changed to any component', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{#do-field propertyName='name' object=object controlComponent='test-component' as |field|}}
        {{field.do-control}}
      {{/do-field}}
    `);
    assert.equal(this.element.querySelectorAll('dummy').length, 1, 'custom component is used for input');
  });

  test("it changes the bound object's value on input", async function(assert) {
    assert.expect(2);
    await render(hbs`
      {{#do-field propertyName='name' object=object controlId='myControl' as |field|}}
        {{field.do-control controlType='text'}}
      {{/do-field}}
    `);
    await fillIn('input', 'Dodo');
    await triggerEvent('input', 'change');
    await triggerEvent('input', 'input');

    assert.equal(this.element.querySelector('input').value, 'Dodo', "the input's value is updated");
    assert.equal(get(this, 'object.name'), 'Dodo', "the object's name is updated on input change");
  });

  test('it binds to any errorsPath for validations', async function(assert) {
    assert.expect(1);
    this.set('config', {
      validationClasses: { fieldError: 'custom-error-prop' },
      errorsPath: 'feedbacks.{PROPERTY_NAME}.things'
    });
    this.set('object.feedbacks', { name: { things: ['error'] } });
    await render(hbs`{{do-field propertyName='name' object=object config=config showAllValidations=true}}`);
    assert.dom(this.element.querySelector('div')).hasClass('custom-error-prop', 'errorsPath is read correctly');
  });

  test('it binds validation classes to the field and input when focusing out', async function(assert) {
    assert.expect(8);
    this.set('object.validations', {
      attrs: { lastName: { errors: [{ message: "can't be blank" }] } }
    });

    await render(hbs`
      {{#do-field propertyName='name' object=object as |field|}}
        {{field.do-control controlType='text'}}
      {{/do-field}}
    `);
    await triggerEvent('.field', 'focusout');

    assert.dom(this.element.querySelector('div')).hasClass('field-success', 'adds .field-success to the field if it has errors');
    assert.dom(this.element.querySelector('input')).hasClass('control-success', 'adds .control-success to the input with error');
    assert.dom(this.element.querySelector('div')).hasNoClass('field-error', 'no .field-error class initially');
    assert.dom(this.element.querySelector('input')).hasNoClass('control-error', 'no .control-error class initially');

    await render(hbs`
      {{#do-field propertyName='lastName' object=object as |field|}}
        {{field.do-control controlType='text'}}
      {{/do-field}}
    `);
    await triggerEvent('.field', 'focusout');

    assert.dom(this.element.querySelector('div')).hasClass('field-error', 'adds .field-error to fields with errors');
    assert.dom(this.element.querySelector('input')).hasClass('control-error', 'adds .control-error to the input with error');
    assert.dom(this.element.querySelector('div')).hasNoClass('field-success', 'no .field-success class');
    assert.dom(this.element.querySelector('input')).hasNoClass('control-success', 'no .control-success class');
  });

  test('it shows feedback when it has errors', async function(assert) {
    assert.expect(3);
    this.set('object.validations', {
      attrs: { lastName: { errors: [{ message: "can't be blank" }] } }
    });

    await render(hbs`
      {{#do-field propertyName='lastName' object=object as |field|}}
        {{field.do-control controlType='text' }}
        {{field.do-feedback}}
      {{/do-field}}
    `);

    assert.equal(this.element.querySelectorAll('.feedback').length, 0, "there's no feedback element initially");
    await triggerEvent('.field', 'focusout');
    assert.equal(this.element.querySelectorAll('.feedback').length, 1, 'a feedback element is present');
    assert.dom(this.element.querySelector('.feedback')).hasText('can\'t be blank', 'has the correct feedback message');
  });

  test('the feedback can also read its message from the validation key', async function(assert) {
    assert.expect(2);
    this.set('object.validations', {
      attrs: { lastName: { errors: [{ validation: 'changeset-validations' }] } }
    });

    await render(hbs`
      {{#do-field propertyName='lastName' object=object as |field|}}
        {{field.do-feedback showFeedback=true}}
      {{/do-field}}
    `);
    assert.equal(this.element.querySelectorAll('.feedback').length, 1, 'a feedback element is present');
    assert.dom(this.element.querySelector('.feedback')).hasText('changeset-validations', 'has the correct feedback message');
  });

  test('feedback changes as errors get fixed', async function(assert) {
    assert.expect(3);
    this.set('object.validations', {
      attrs: { lastName: { errors: [
        { message: "can't be blank" },
        { message: 'Never gonna give you up' }
      ] } }
    });

    await render(hbs`
      {{#do-field propertyName='lastName' object=object as |field|}}
        {{field.do-control controlType='text'}}
        {{field.do-feedback}}
      {{/do-field}}
    `);
    await triggerEvent('.field', 'focusout');
    assert.dom(this.element.querySelector('.feedback')).hasText('can\'t be blank', 'only the first message is shown initially');

    this.set('object.validations', {
      attrs: { lastName: { errors: [{ message: 'Never gonna give you up' }] } }
    });
    assert.dom(this.element.querySelector('.feedback')).hasText('Never gonna give you up', 'feedback text changes as errors dissappear');

    this.set('object.validations', {
      attrs: { lastName: { errors: [] } }
    });
    assert.equal(this.element.querySelectorAll('.feedback').length, 0, 'feedback is no longer visible');
  });

  test('the feedback component can be changed to any component', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{#do-field propertyName='name' object=object feedbackComponent='test-component' as |field|}}
        {{field.do-feedback}}
      {{/do-field}}
    `);
    assert.equal(this.element.querySelectorAll('dummy').length, 1, 'custom component is used for feedback');
  });

  test('it has a hint contextual component', async function(assert) {
    assert.expect(1);
    await render(hbs`
      {{#do-field propertyName='name' object=object as |field|}}
        {{field.do-hint text='hint-text'}}
      {{/do-field}}
    `);
    assert.dom(this.element.querySelector('*')).hasText('hint-text', 'renders the hint component');
  });

  test('the hint component can be changed to any component', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{#do-field propertyName='name' object=object hintComponent='test-component' as |field|}}
        {{field.do-hint}}
      {{/do-field}}
    `);
    assert.equal(this.element.querySelectorAll('dummy').length, 1, 'custom component is used for hint');
  });

  // FIXME: Very hacky, but works.. Some things can be dumped in data-attributes
  // for the others just render them as strings.
  test('it sets a rich context for the yielded hash', async function(assert) {
    this.set('object.validations', {
      attrs: { name: { errors: [{ message: 'too cool' }] } }
    });

    await render(hbs`
      {{#do-field propertyName='name' object=object objectName='user' showValidation=true as |field|}}
        <div id='context'
          data-object={{field.object}}
          data-propertyName={{field.propertyName}}
          data-controlName={{field.controlName}}
          data-controlid={{field.controlId}}
          data-controlValidationClasses={{field.controlValidationClasses}}
          data-errorMessage={{field.errorMessage}}
        ></div>

        <div id='showValidation'>{{field.showValidation}}</div>
        <div id='value'>{{field.value}}</div>
      {{/do-field}}
    `);

    let context = this.element.querySelector('#context').dataset;
    assert.equal(/Ember.Object/.test(context.object), true, 'context has the object');
    assert.equal(context.propertyname, 'name', 'context has propertyName');
    assert.equal(context.controlname, 'user[name]', 'context has controlName');
    assert.equal(context.controlid, `name-${this.element.querySelector('.field').id}`, 'context has controlId');
    assert.equal(context.controlvalidationclasses, 'control-error', 'context has controlValidationClasses');
    assert.equal(context.errormessage, 'too cool', 'context has errorMessage');
    assert.dom(this.element.querySelector('#value')).hasText('Stefan', 'context has value');
    assert.dom(this.element.querySelector('#showValidation')).hasText('true', 'context has showValidation');
  });

  test('it has fieldClasses applied from configuration', async function(assert) {
    assert.expect(1);
    await render(hbs`{{do-field propertyName='name' object=object}}`);
    assert.dom(this.element.querySelector('div')).hasClass('field', 'has default fieldClasses');
  });

  test('configuration fieldClasses can be overridden by own classNames', async function(assert) {
    assert.expect(2);
    await render(hbs`{{do-field propertyName='name' object=object classNames='my-custom-field-class'}}`);
    assert.dom(this.element.querySelector('div')).hasClass('my-custom-field-class', 'fieldClasses are overridden correctly');
    assert.dom(this.element.querySelector('div')).hasNoClass('default-field-class', 'no default fieldClasses');
  });

  test('data-test-* attributes are absent when config.autoDataTestSelectors is false', async function(assert) {
    assert.expect(5);
    set(this, 'config.autoDataTestSelectors', false);
    await render(hbs`
      {{#do-field propertyName='lastName' object=object as |field|}}
        {{field.do-label labelText='Last name'}}
        {{field.do-control controlType='text'}}
        {{field.do-feedback message="Can't be blank" showFeedback=true wrapperTagName='p'}}
        {{field.do-hint text='What your teacher calls you' }}
      {{/do-field}}
    `);

    assert.notOk(this.element.querySelector('div').getAttribute('data-test-do-field'), 'do-field data attribute was not generated');
    assert.notOk(this.element.querySelector('label').getAttribute('data-test-do-label'), 'do-label data attribute was not generated');
    assert.notOk(this.element.querySelector('input').getAttribute('data-test-do-control'), 'do-control data attribute was not generated');
    assert.notOk(this.element.querySelector('p').getAttribute('data-test-do-feedback'), 'do-feedback data attribute was not generated');
    assert.notOk(this.element.querySelector('small').getAttribute('data-test-do-hint'), 'do-hint data attribute was not generated');
  });

  test('data-test-* attributes are correctly set when config.autoDataTestSelectors is true', async function(assert) {
    assert.expect(5);
    set(this, 'config.autoDataTestSelectors', true);
    await render(hbs`
      {{#do-field propertyName='lastName' object=object as |field|}}
        {{field.do-label labelText='Last name'}}
        {{field.do-control controlType='text'}}
        {{field.do-feedback message="Can't be blank" showFeedback=true wrapperTagName='p'}}
        {{field.do-hint text='What your teacher calls you' }}
      {{/do-field}}
    `);

    assert.equal(this.element.querySelector('div').getAttribute('data-test-do-field'), 'lastName', 'do-field has the data attribute');
    assert.equal(this.element.querySelector('label').getAttribute('data-test-do-label'), 'lastName', 'do-label has the data attribute');
    assert.equal(this.element.querySelector('input').getAttribute('data-test-do-control'), 'lastName', 'do-control has the data attribute');
    assert.equal(this.element.querySelector('p').getAttribute('data-test-do-feedback'), 'lastName', 'do-feedback has the data attribute');
    assert.equal(this.element.querySelector('small').getAttribute('data-test-do-hint'), 'lastName', 'do-hint has the data attribute');
  });

  test('data-test-* attributes are overriden when config.autoDataTestSelectors is true', async function(assert) {
    assert.expect(5);
    set(this, 'config.autoDataTestSelectors', true);
    await render(hbs`
      {{#do-field propertyName='lastName' object=object data-test-do-field='never' as |field|}}
        {{field.do-label labelText='Last name' data-test-do-label='gonna'}}
        {{field.do-control controlType='text' data-test-do-control='give'}}
        {{field.do-feedback message="Can't be blank" showFeedback=true wrapperTagName='p' data-test-do-feedback='you'}}
        {{field.do-hint text='What your teacher calls you' data-test-do-hint='up'}}
      {{/do-field}}
    `);

    assert.equal(this.element.querySelector('div').getAttribute('data-test-do-field'), 'never', 'do-field has the data attribute');
    assert.equal(this.element.querySelector('label').getAttribute('data-test-do-label'), 'gonna', 'do-label has the data attribute');
    assert.equal(this.element.querySelector('input').getAttribute('data-test-do-control'), 'give', 'do-control has the data attribute');
    assert.equal(this.element.querySelector('p').getAttribute('data-test-do-feedback'), 'you', 'do-feedback has the data attribute');
    assert.equal(this.element.querySelector('small').getAttribute('data-test-do-hint'), 'up', 'do-hint has the data attribute');
  });
});
