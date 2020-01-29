import { set } from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import attrsFor from '../../helpers/control-attributes';
import Ember from 'ember';

module('Integration | Component | do control', function(hooks) {
  setupRenderingTest(hooks);

  let onError;

  hooks.beforeEach(function() {
    onError = Ember.onerror;
    this.config = this.owner.lookup('service:ember-do-forms/config');
  });

  hooks.afterEach(function() {
    Ember.onerror = onError;
  });

  test('it has a default controlType of text', async function(assert) {
    assert.expect(1);
    await render(hbs`{{do-control}}`);
    assert.equal(this.element.querySelector('input').getAttribute('type'), 'text', 'default control type is text');
  });

  test('it needs a valid one-way-control controlType as the first argument', async function(assert) {
    assert.expect(1);

    Ember.onerror = function(error) {
      assert.equal(error.message, 'Assertion Failed: Could not find component named "one-way-nonexistent" (no component or template with that name was found)');
    };

    await render(hbs`{{do-control controlType='nonexistent'}}`);
  });

  test('it renders an input type=text with a text controlType', async function(assert) {
    assert.expect(2);
    await render(hbs`{{do-control controlType='text'}}`);
    assert.equal(this.element.childElementCount, 1);
    assert.equal(this.element.querySelector('input').getAttribute('type'), 'text');
  });

  test('it respects the id property passed in', async function(assert) {
    assert.expect(1);
    await render(hbs`{{do-control controlType='text' id='special-id'}}`);
    assert.equal(this.element.querySelector('input').id, 'special-id');
  });

  test('it the input\'s value is bound to the value property', async function(assert) {
    assert.expect(1);
    set(this, 'value', 'MyValue');
    await render(hbs`{{do-control controlType='text' value=value id='special-id'}}`);
    assert.equal(this.element.querySelector('input').value, 'MyValue');
  });

  test('it can render with a block', async function(assert) {
    assert.expect(3);
    set(this, 'value', 'MyValue');
    await render(hbs`
      {{#do-control id='pizza' validationClass='pizza-validation' value=value as |c|}}
        <input value={{c.value}} id={{c.id}} class="{{c.validationClass}}">
      {{/do-control}}
    `);
    assert.equal(this.element.querySelector('input').value, 'MyValue', 'it binds to the correct value');
    assert.equal(this.element.querySelector('input').id, 'pizza', 'it binds to the correct id');
    assert.equal(this.element.querySelector('input').classList.contains('pizza-validation'), true, 'it binds to the correct validationClass');
  });

  test('it has inputClasses applied from configuration', async function(assert) {
    assert.expect(1);
    set(this, 'config.defaultClasses', {
      control: ['default-input-class']
    });
    await render(hbs`{{do-control controlType='text'}}`);
    assert.equal(this.element.querySelector('input').classList.contains('default-input-class'), true, 'has default inputClasses');
  });

  test('configuration inputClasses can be overridden by own classNames', async function(assert) {
    assert.expect(2);
    set(this, 'config.defaultClasses', {
      control: ['default-input-class']
    });
    await render(hbs`{{do-control controlType='text' classNames='my-custom-input-class'}}`);
    assert.equal(this.element.querySelector('input').classList.contains('my-custom-input-class'), true, 'inputClasses are overridden correctly');
    assert.equal(this.element.querySelector('input').classList.contains('default-input-class'), false, 'no default inputClasses');
  });

  test('controls support a variety of HTML5 attributes', async function(assert) {
    let inputAttrs = attrsFor('input');
    let textareaAttrs = attrsFor('textarea');
    this.setProperties(inputAttrs);

    await render(hbs`{{do-control controlType='text'
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
      rows=rows
      size=size
      spellcheck=spellcheck
      tabindex=tabindex
      title=title
    }}`);

    let inputEl = this.element.querySelector('input');
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

    await render(hbs`{{do-control controlType='number' min=min max=max step=step}}`);
    inputEl = this.element.querySelector('input');
    assert.equal(inputEl.getAttribute('max'), inputAttrs.max, 'it sets the max attribute');
    assert.equal(inputEl.getAttribute('min'), inputAttrs.min, 'it sets the min attribute');
    assert.equal(inputEl.getAttribute('step'), inputAttrs.step, 'it sets the step attribute');

    await render(hbs`{{do-control controlType='checkbox' checked=checked}}`);
    assert.ok(this.$('input').is(':checked'), 'it sets the checked attribute');

    await render(hbs`{{do-control controlType='email' multiple=multiple}}`);
    inputEl = this.element.querySelector('input');
    assert.ok(inputEl.hasAttribute('multiple'), 'it sets the multiple attribute');

    this.setProperties(textareaAttrs);
    await render(hbs`{{do-control controlType='textarea' rows=rows cols=cols wrap=wrap}}`);
    assert.equal(this.element.querySelector('textarea').getAttribute('rows'), textareaAttrs.rows, 'it sets the rows attribute');
    assert.equal(this.element.querySelector('textarea').getAttribute('cols'), textareaAttrs.cols, 'it sets the cols attribute');
    assert.equal(this.element.querySelector('textarea').getAttribute('wrap'), textareaAttrs.wrap, 'it sets the wrap attribute');
  });

  test('it supports one-way-select simple options', async function(assert) {
    this.set('selectedOption', { value: 'pasta', label: 'Famous pasta' });
    this.set('selectOptions', [
      { value: 'pizza', label: 'The best pizza' },
      { value: 'pasta', label: 'Famous pasta' },
      { value: 'steak', label: 'Glorious steak' }
    ]);
    await render(hbs`
      {{do-control controlType='select' value=selectedOption
        options=selectOptions
        prompt="Favourite food"
        promptIsSelectable=true
        optionLabelPath='label'
        optionValuePath='value'
      }}
    `);

    assert.ok(this.element.querySelectorAll('select').length, 'select control is rendered');
    assert.equal(this.element.querySelectorAll('option').length, 4, 'with 4 options (including blank)');
    assert.equal(this.element.querySelector('option:checked').value, 'pasta', 'has the correct selected option');
    assert.equal(this.element.querySelector('option:checked').textContent.trim(), 'Famous pasta', 'has the correct selected option label');
  });

  test('it passes down data-test-do-control to the one-way-input', async function(assert) {
    assert.expect(1);
    await render(hbs`{{do-control data-test-do-control='first-name'}}`);
    assert.equal(this.element.querySelector('input').getAttribute('data-test-do-control'), 'first-name', 'has the data attribute');
  });

  test('data-test-do-control attribute is absent when config.autoDataTestSelectors is false', async function(assert) {
    assert.expect(1);
    set(this, 'config.autoDataTestSelectors', false);
    await render(hbs`{{do-control propertyName='firstName'}}`);
    assert.notOk(this.element.querySelector('input').getAttribute('data-test-do-control'), 'data attribute was not generated');
  });

  test('data-test-do-control attribute is set when config.autoDataTestSelectors is true', async function(assert) {
    assert.expect(1);
    set(this, 'config.autoDataTestSelectors', true);
    await render(hbs`{{do-control propertyName='firstName'}}`);
    assert.equal(this.element.querySelector('input').getAttribute('data-test-do-control'), 'firstName', 'has the data attribute');
  });

  test('data-test-do-control attribute is overridden when config.autoDataTestSelectors is true', async function(assert) {
    assert.expect(1);
    set(this, 'config.autoDataTestSelectors', true);
    await render(hbs`{{do-control propertyName='firstName' data-test-do-control='something-else'}}`);
    assert.equal(this.element.querySelector('input').getAttribute('data-test-do-control'), 'something-else', 'has the data attribute');
  });
});
