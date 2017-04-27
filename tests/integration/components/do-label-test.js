import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const {
  set,
  Service
} = Ember;

const ConfigStub = Service.extend();

moduleForComponent('do-label', 'Integration | Component | do form label', {
  integration: true,
  beforeEach() {
    this.register('service:ember-do-forms/config', ConfigStub);
    this.inject.service('ember-do-forms/config', { as: 'config' });
  }
});

test('it renders a label', function(assert) {
  assert.expect(1);
  this.render(hbs`{{do-label}}`);
  assert.equal(this.$('label').length, 1);
});

test('it renders with labelText positionalParam', function(assert) {
  assert.expect(1);
  this.render(hbs`{{do-label 'my Text'}}`);
  assert.equal(this.$().text().trim(), 'my Text');
});

test('it renders with a block', function(assert) {
  assert.expect(1);
  this.render(hbs`
    {{#do-label}}
      <small>Something</small>
    {{/do-label}}
  `);
  assert.equal(this.$('label').html().trim(), '<small>Something</small>');
});

test('it has labelClasses applied from configuration', function(assert) {
  assert.expect(1);
  this.set('config.defaultClasses', {
    label: ['default-label-class']
  });
  this.render(hbs`{{do-label 'text'}}`);
  assert.equal(this.$('label').hasClass('default-label-class'), true, 'has default labelClasses');
});

test('configuration labelClasses can be overridden by own classNames', function(assert) {
  assert.expect(2);
  this.set('config.defaultClasses', {
    label: ['default-label-class']
  });
  this.render(hbs`{{do-label 'text' classNames='my-custom-label-class'}}`);
  assert.equal(this.$('label').hasClass('my-custom-label-class'), true, 'labelClasses are overridden correctly');
  assert.equal(this.$('label').hasClass('default-label-class'), false, 'no default labelClasses');
});

test('data-test-do-label attribute is overridden when config.autoDataTestSelectors is true', function(assert) {
  assert.expect(1);
  set(this, 'config.autoDataTestSelectors', true);
  this.render(hbs`{{do-label propertyName='firstName'}}`);
  assert.equal(this.$('label').attr('data-test-do-label'), 'firstName', 'has the data attribute');
});

test('data-test-do-label attribute is overridden when config.autoDataTestSelectors is true', function(assert) {
  assert.expect(1);
  set(this, 'config.autoDataTestSelectors', true);
  this.render(hbs`{{do-label propertyName='firstName' data-test-do-label='something-else'}}`);
  assert.equal(this.$('label').attr('data-test-do-label'), 'something-else', 'has the data attribute');
});
