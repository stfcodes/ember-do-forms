import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import configDefaults from 'ember-do-forms/utils/config-defaults';

const {
  set,
  Service
} = Ember;

const ConfigStub = Service.extend(configDefaults({
  defaultClasses: {
    control: ['default-input-class']
  }
}));

moduleForComponent('do-control', 'Integration | Component | do control', {
  integration: true,
  beforeEach() {
    this.register('service:ember-do-forms/config', ConfigStub);
    this.inject.service('ember-do-forms/config', { as: 'config' });
  }
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
  this.render(hbs`{{do-control 'text'}}`);
  assert.equal(this.$('input').hasClass('default-input-class'), true, 'has default inputClasses');
});

test('configuration inputClasses can be overridden by own classNames', function(assert) {
  assert.expect(1);
  this.render(hbs`{{do-control 'text' classNames='my-custom-input-class'}}`);
  assert.equal(this.$('input').hasClass('my-custom-input-class'), true, 'inputClasses are overridden correctly');
});
