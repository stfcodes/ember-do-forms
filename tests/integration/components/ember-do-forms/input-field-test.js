import { set, get } from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import attrsFor from '../../../helpers/control-attributes';

module('Integration | Component | ember do forms/input field', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.config = this.owner.lookup('service:ember-do-forms/config');

    set(this, 'object', Object.create({
      name: 'Stefan'
    }));
  });

  test('it has a text control by default', async function(assert) {
    assert.expect(3);
    await render(hbs`{{ember-do-forms/input-field propertyName='name' object=object}}`);
    assert.equal(this.element.querySelectorAll('input').length, 1, 'has an input');
    assert.equal(this.element.querySelector('input').getAttribute('type'), 'text', 'input is text by default');
    assert.equal(this.element.querySelector('input').value, 'Stefan', 'input has correct value');
  });

  test('input can be changed to something else via controlType', async function(assert) {
    assert.expect(1);
    await render(hbs`{{ember-do-forms/input-field propertyName='email' object=object controlType='email'}}`);
    assert.equal(this.element.querySelector('input').getAttribute('type'), 'email', 'input is email');
  });

  test('renders an input and maybe a feedback element by default', async function(assert) {
    assert.expect(2);
    this.set('object.validations', {
      attrs: { name: { errors: [{ message: 'too cool' }] } }
    });
    await render(hbs`
      {{ember-do-forms/input-field propertyName='name' object=object showAllValidations=true}}
    `);
    assert.equal(this.element.querySelectorAll('input').length, 1, 'has an input');
    assert.equal(this.element.querySelectorAll('.feedback').length, 1, 'has a feedback element');
  });

  test('label is shown only if present', async function(assert) {
    assert.expect(2);
    await render(hbs`
      {{ember-do-forms/input-field propertyName='name' object=object }}
    `);
    assert.equal(this.element.querySelectorAll('label').length, 0, 'label is missing by default');
    await render(hbs`
      {{ember-do-forms/input-field propertyName='name' object=object label='dummy'}}
    `);
    assert.equal(this.element.querySelectorAll('label').length, 1, 'has a label element');
  });

  test('hint is shown only if present', async function(assert) {
    assert.expect(2);
    await render(hbs`
      {{ember-do-forms/input-field propertyName='name' object=object }}
    `);
    assert.equal(this.element.querySelectorAll('small').length, 0, 'hint is missing by default');
    await render(hbs`
      {{ember-do-forms/input-field propertyName='name' object=object hint='dummy'}}
    `);
    assert.equal(this.element.querySelectorAll('small').length, 1, 'has a hint element');
  });

  test('passes down relevant attributes to the control', async function(assert) {
    // assert.expect(16);
    let inputAttrs = attrsFor('input');
    this.setProperties(inputAttrs);

    await render(hbs`
      {{ember-do-forms/input-field propertyName='name' object=object
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

    const inputEl = this.element.querySelector('input');
    assert.equal(inputEl.getAttribute('autocomplete'), inputAttrs.autocomplete, 'it sets the autocomplete attribute');
    assert.ok(inputEl.hasAttribute('autofocus'), 'it sets the autofocus attribute');
    assert.ok(inputEl.hasAttribute('disabled'), 'it sets the disabled attribute');
    assert.equal(inputEl.getAttribute('form'), inputAttrs.form, 'it sets the form attribute');
    assert.equal(inputEl.getAttribute('inputmode'), inputAttrs.inputmode, 'it sets the inputmode attribute');
    assert.equal(inputEl.getAttribute('list'), inputAttrs.list, 'it sets the list attribute');
    assert.equal(inputEl.getAttribute('maxlength'), inputAttrs.maxlength, 'it sets the maxlength attribute');
    assert.equal(inputEl.getAttribute('minlength'), inputAttrs.minlength, 'it sets the minlength attribute');
    assert.equal(inputEl.getAttribute('pattern'), inputAttrs.pattern, 'it sets the pattern attribute');
    assert.equal(inputEl.getAttribute('placeholder'), inputAttrs.placeholder, 'it sets the placeholder attribute');
    assert.ok(inputEl.hasAttribute('readonly'), 'it sets the readonly attribute');
    assert.ok(inputEl.hasAttribute('required'), 'it sets the required attribute');
    assert.equal(inputEl.getAttribute('size'), inputAttrs.size, 'it sets the size attribute');
    assert.equal(inputEl.getAttribute('spellcheck'), 'true', 'it sets the spellcheck attribute');
    assert.equal(inputEl.getAttribute('tabindex'), inputAttrs.tabindex, 'it sets the tabindex attribute');
    assert.equal(inputEl.getAttribute('title'), inputAttrs.title, 'it sets the title attribute');
  });

  test('children classNames can be overridden', async function(assert) {
    assert.expect(10);
    this.set('object.validations', {
      attrs: { name: { errors: [{ message: 'too cool' }] } }
    });
    await render(hbs`
      {{ember-do-forms/input-field propertyName='name' object=object showAllValidations=true
        label='name'
        hint='your name'
        classNames='field-class'
        labelClasses='label-class'
        controlClasses='control-class'
        feedbackClasses='feedback-class'
        hintClasses='hint-class'
      }}
    `);

    assert.equal(this.element.querySelectorAll('.field').length, 0, 'there is no default field class');
    assert.equal(this.element.querySelectorAll('.field-class').length, 1, 'field class is overridable');

    assert.equal(this.element.querySelectorAll('.label').length, 0, 'there is no default label class');
    assert.equal(this.element.querySelectorAll('.label-class').length, 1, 'label class is overridable');

    assert.equal(this.element.querySelectorAll('.control').length, 0, 'there is no default control class');
    assert.equal(this.element.querySelectorAll('.control-class').length, 1, 'control class is overridable');

    assert.equal(this.element.querySelectorAll('.feedback').length, 0, 'there is no default feedback class');
    assert.equal(this.element.querySelectorAll('.feedback-class').length, 1, 'feedback class is overridable');

    assert.equal(this.element.querySelectorAll('.hint').length, 0, 'there is no default hint class');
    assert.equal(this.element.querySelectorAll('.hint-class').length, 1, 'hint class is overridable');
  });

  test('it actually works', async function(assert) {
    assert.expect(2);
    this.set('object.validations', {
      attrs: { name: { errors: [{ message: 'too cool' }] } }
    });
    await render(
      hbs`{{ember-do-forms/input-field propertyName='name' object=object showAllValidations=true label='Your Name' hint='First and last'}}`
    );
    await fillIn('input', 'Rick');
    await triggerEvent('input', 'change');

    assert.equal(this.element.querySelector('input').value, 'Rick', 'it actually sets the input value correctly');
    assert.equal(get(this, 'object.name'), 'Rick', 'it actually sets the object value correctly');
  });

  test('it passes down data-test-* attributes to its child components', async function(assert) {
    this.set('object.validations', {
      attrs: { name: { errors: [{ message: 'too cool' }] } }
    });

    await render(hbs`
      {{ember-do-forms/input-field propertyName='name' object=object showAllValidations=true label='Your Name' hint='First and last'
        data-test-input-field='name'
        data-test-do-label='label'
        data-test-do-control='control'
        data-test-do-feedback='feedback'
        data-test-do-hint='hint'
      }}
    `);

    assert.equal(this.element.querySelector('div').getAttribute('data-test-input-field'), 'name', 'field has the data attribute');
    assert.equal(this.element.querySelector('.label').getAttribute('data-test-do-label'), 'label', 'label has the data attribute');
    assert.equal(this.element.querySelector('.control').getAttribute('data-test-do-control'), 'control', 'control has the data attribute');
    assert.equal(this.element.querySelector('.feedback').getAttribute('data-test-do-feedback'), 'feedback', 'feedback has the data attribute');
    assert.equal(this.element.querySelector('.hint').getAttribute('data-test-do-hint'), 'hint', 'hint has the data attribute');
  });

  test('data-test-* attributes are absent when config.autoDataTestSelectors is false', async function(assert) {
    assert.expect(6);
    set(this, 'config.autoDataTestSelectors', false);
    this.set('object.validations', {
      attrs: { name: { errors: [{ message: 'too cool' }] } }
    });
    await render(
      hbs`{{ember-do-forms/input-field propertyName='name' object=object showAllValidations=true label='Your Name' hint='First and last'}}`
    );

    assert.notOk(this.element.querySelector('div').getAttribute('data-test-input-field'), 'input field data attribute was not generated');
    assert.notOk(this.element.querySelector('div').getAttribute('data-test-do-field'), 'field data attribute was not generated');
    assert.notOk(this.element.querySelector('.label').getAttribute('data-test-do-label'), 'label data attribute was not generated');
    assert.notOk(this.element.querySelector('.control').getAttribute('data-test-do-control'), 'control data attribute was not generated');
    assert.notOk(this.element.querySelector('.feedback').getAttribute('data-test-do-feedback'), 'feedback data attribute was not generated');
    assert.notOk(this.element.querySelector('.hint').getAttribute('data-test-do-hint'), 'hint data attribute was not generated');
  });

  test('data-test-* attributes are correctly set when config.autoDataTestSelectors is true', async function(assert) {
    assert.expect(6);
    set(this, 'config.autoDataTestSelectors', true);
    this.set('object.validations', {
      attrs: { name: { errors: [{ message: 'too cool' }] } }
    });
    await render(
      hbs`{{ember-do-forms/input-field propertyName='name' object=object showAllValidations=true label='Your Name' hint='First and last'}}`
    );

    assert.equal(this.element.querySelector('div').getAttribute('data-test-input-field'), 'name', 'input field has the data attribute');
    assert.equal(this.element.querySelector('div').getAttribute('data-test-do-field'), 'name', 'field has the data attribute');
    assert.equal(this.element.querySelector('.label').getAttribute('data-test-do-label'), 'name', 'label has the data attribute');
    assert.equal(this.element.querySelector('.control').getAttribute('data-test-do-control'), 'name', 'control has the data attribute');
    assert.equal(this.element.querySelector('.feedback').getAttribute('data-test-do-feedback'), 'name', 'feedback has the data attribute');
    assert.equal(this.element.querySelector('.hint').getAttribute('data-test-do-hint'), 'name', 'hint has the data attribute');
  });

  test('data-test-* attributes are overriden when config.autoDataTestSelectors is true', async function(assert) {
    assert.expect(6);
    set(this, 'config.autoDataTestSelectors', true);
    this.set('object.validations', {
      attrs: { name: { errors: [{ message: 'too cool' }] } }
    });
    await render(hbs`
      {{ember-do-forms/input-field propertyName='name' object=object showAllValidations=true label='Your Name' hint='First and last'
        data-test-input-field='never'
        data-test-do-field='ever'
        data-test-do-label='gonna'
        data-test-do-control='give'
        data-test-do-feedback='you'
        data-test-do-hint='up'
      }}
    `);

    assert.equal(this.element.querySelector('div').getAttribute('data-test-input-field'), 'never', 'input field has the data attribute');
    assert.equal(this.element.querySelector('div').getAttribute('data-test-do-field'), 'ever', 'field has the data attribute');
    assert.equal(this.element.querySelector('.label').getAttribute('data-test-do-label'), 'gonna', 'label has the data attribute');
    assert.equal(this.element.querySelector('.control').getAttribute('data-test-do-control'), 'give', 'control has the data attribute');
    assert.equal(this.element.querySelector('.feedback').getAttribute('data-test-do-feedback'), 'you', 'feedback has the data attribute');
    assert.equal(this.element.querySelector('.hint').getAttribute('data-test-do-hint'), 'up', 'hint has the data attribute');
  });
});
