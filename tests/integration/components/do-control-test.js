import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import attrsFor from '../../helpers/control-attributes';

const {
  set,
  Service
} = Ember;

const ConfigStub = Service.extend();

moduleForComponent('do-control', 'Integration | Component | do control', {
  integration: true,
  beforeEach() {
    this.register('service:ember-do-forms/config', ConfigStub);
    this.inject.service('ember-do-forms/config', { as: 'config' });
  }
});

test('it has a default controlType of text', function(assert) {
  assert.expect(1);
  this.render(hbs`{{do-control}}`);
  assert.equal(this.$().children().attr('type'), 'text', 'default control type is text');
});

test('it needs a valid one-way-control controlType as the first argument', function(assert) {
  assert.expect(1);
  assert.expectAssertion(() => {
    this.render(hbs`{{do-control 'nonexistent'}}`);
  }, /Could not find component named "one-way-nonexistent"/);
});

test('it renders an input type=text with a text controlType', function(assert) {
  assert.expect(2);
  this.render(hbs`{{do-control 'text'}}`);
  assert.equal(this.$().children().length, 1);
  assert.equal(this.$().children().attr('type'), 'text');
});

test('it respects the id property passed in', function(assert) {
  assert.expect(1);
  this.render(hbs`{{do-control 'text' id='special-id'}}`);
  assert.equal(this.$('input').attr('id'), 'special-id');
});

test('it the input\'s value is bound to the value property', function(assert) {
  assert.expect(1);
  set(this, 'value', 'MyValue');
  this.render(hbs`{{do-control 'text' value id='special-id'}}`);
  assert.equal(this.$('input').val(), 'MyValue');
});

test('it can render with a block', function(assert) {
  assert.expect(3);
  set(this, 'value', 'MyValue');
  this.render(hbs`
    {{#do-control id='pizza' validationClass='pizza-validation' value=value as |c|}}
      <input value={{c.value}} id={{c.id}} class="{{c.validationClass}}">
    {{/do-control}}
  `);
  assert.equal(this.$('input').val(), 'MyValue', 'it binds to the correct value');
  assert.equal(this.$('input').attr('id'), 'pizza', 'it binds to the correct id');
  assert.equal(this.$('input').hasClass('pizza-validation'), true, 'it binds to the correct validationClass');
});

test('it has inputClasses applied from configuration', function(assert) {
  assert.expect(1);
  set(this, 'config.defaultClasses', {
    control: ['default-input-class']
  });
  this.render(hbs`{{do-control 'text'}}`);
  assert.equal(this.$('input').hasClass('default-input-class'), true, 'has default inputClasses');
});

test('configuration inputClasses can be overridden by own classNames', function(assert) {
  assert.expect(2);
  set(this, 'config.defaultClasses', {
    control: ['default-input-class']
  });
  this.render(hbs`{{do-control 'text' classNames='my-custom-input-class'}}`);
  assert.equal(this.$('input').hasClass('my-custom-input-class'), true, 'inputClasses are overridden correctly');
  assert.equal(this.$('input').hasClass('default-input-class'), false, 'no default inputClasses');
});

test('controls support a variety of HTML5 attributes', function(assert) {
  let inputAttrs = attrsFor('input');
  let textareaAttrs = attrsFor('textarea');
  this.setProperties(inputAttrs);

  this.render(hbs`{{do-control 'text'
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

  this.render(hbs`{{do-control 'number' min=min max=max step=step}}`);
  assert.equal(this.$('input').attr('max'), inputAttrs.max, 'it sets the max attribute');
  assert.equal(this.$('input').attr('min'), inputAttrs.min, 'it sets the min attribute');
  assert.equal(this.$('input').attr('step'), inputAttrs.step, 'it sets the step attribute');

  this.render(hbs`{{do-control 'checkbox' checked=checked}}`);
  assert.ok(this.$('input').is(':checked'), 'it sets the checked attribute');

  this.render(hbs`{{do-control 'email' multiple=multiple}}`);
  assert.equal(this.$('input').attr('multiple'), 'multiple', 'it sets the multiple attribute');

  this.setProperties(textareaAttrs);
  this.render(hbs`{{do-control 'textarea' rows=rows cols=cols wrap=wrap}}`);
  assert.equal(this.$('textarea').attr('rows'), textareaAttrs.rows, 'it sets the rows attribute');
  assert.equal(this.$('textarea').attr('cols'), textareaAttrs.cols, 'it sets the cols attribute');
  assert.equal(this.$('textarea').attr('wrap'), textareaAttrs.wrap, 'it sets the wrap attribute');
});

test('it supports one-way-select simple options', function(assert) {
  this.set('selectedOption', { value: 'pasta', label: 'Famous pasta' });
  this.set('selectOptions', [
    { value: 'pizza', label: 'The best pizza' },
    { value: 'pasta', label: 'Famous pasta' },
    { value: 'steak', label: 'Glorious steak' }
  ]);
  this.render(hbs`
    {{do-control 'select' value=selectedOption
      options=selectOptions
      prompt="Favourite food"
      promptIsSelectable=true
      optionLabelPath='label'
      optionValuePath='value'
    }}
  `);

  assert.ok(this.$('select').length, 'select control is rendered');
  assert.equal(this.$('option').length, 4, 'with 4 options (including blank)');
  assert.equal(this.$('option:selected').val(), 'pasta', 'has the correct selected option');
  assert.equal(this.$('option:selected').text().trim(), 'Famous pasta', 'has the correct selected option label');
});

test('it passes down data-test-do-control to the one-way-input', function(assert) {
  assert.expect(1);
  this.render(hbs`{{do-control data-test-do-control='first-name'}}`);
  assert.equal(this.$('input').attr('data-test-do-control'), 'first-name', 'has the data attribute');
});

test('data-test-do-control attribute is absent when config.autoDataTestSelectors is false', function(assert) {
  assert.expect(1);
  set(this, 'config.autoDataTestSelectors', false);
  this.render(hbs`{{do-control propertyName='firstName'}}`);
  assert.notOk(this.$('input').attr('data-test-do-control'), 'data attribute was not generated');
});

test('data-test-do-control attribute is set when config.autoDataTestSelectors is true', function(assert) {
  assert.expect(1);
  set(this, 'config.autoDataTestSelectors', true);
  this.render(hbs`{{do-control propertyName='firstName'}}`);
  assert.equal(this.$('input').attr('data-test-do-control'), 'firstName', 'has the data attribute');
});

test('data-test-do-control attribute is overridden when config.autoDataTestSelectors is true', function(assert) {
  assert.expect(1);
  set(this, 'config.autoDataTestSelectors', true);
  this.render(hbs`{{do-control propertyName='firstName' data-test-do-control='something-else'}}`);
  assert.equal(this.$('input').attr('data-test-do-control'), 'something-else', 'has the data attribute');
});
