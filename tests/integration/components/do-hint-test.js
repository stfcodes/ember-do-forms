import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const {
  get,
  set,
  Service
} = Ember;

const ConfigStub = Service.extend();

moduleForComponent('do-hint', 'Integration | Component | do hint', {
  integration: true,
  beforeEach() {
    this.register('service:ember-do-forms/config', ConfigStub);
    this.inject.service('ember-do-forms/config', { as: 'config' });

    set(this, 'hintText', 'Never gonna give you up');
  }
});

test('it renders', function(assert) {
  assert.expect(2);
  this.render(hbs`{{do-hint}}`);
  assert.equal(this.$().text().trim(), '', 'renders nothing by default');

  this.render(hbs`
    {{#do-hint}}
      template block text
    {{/do-hint}}
  `);
  assert.equal(this.$().text().trim(), 'template block text', "renders what's passed in the block");
});

test('it has a text positionalParam', function(assert) {
  assert.expect(2);
  this.render(hbs`{{do-hint hintText}}`);
  assert.equal(this.$().text().trim(), get(this, 'hintText'), 'renders the text');

  this.render(hbs`
    {{#do-hint hintText as |text|}}
      <p>{{text}}</p>
    {{/do-hint}}
  `);
  assert.equal(this.$('p').text().trim(), get(this, 'hintText'), 'also handles blocks');
});

test('its tag is a small by default', function(assert) {
  assert.expect(1);
  this.render(hbs`{{do-hint}}`);
  assert.equal(this.$('small').length, 1);
});

test('its tag can be changed', function(assert) {
  assert.expect(1);
  this.render(hbs`{{do-hint hintText tagName='div'}}`);
  assert.equal(this.$('div').length, 1);
});

test('it has hintClasses applied from configuration', function(assert) {
  assert.expect(1);
  this.set('config.defaultClasses', {
    hint: ['hint-element']
  });
  this.render(hbs`{{do-hint hintText}}`);
  assert.equal(this.$('small').hasClass('hint-element'), true, 'has default hintClasses');
});

test('configuration hintClasses can be overridden by own classNames', function(assert) {
  assert.expect(2);
  this.set('config.defaultClasses', {
    hint: ['hint-element']
  });
  this.render(hbs`{{do-hint hintText classNames='my-custom-hint-class'}}`);
  assert.equal(this.$('small').hasClass('my-custom-hint-class'), true, 'hintClasses are overridden correctly');
  assert.equal(this.$('small').hasClass('hint-element'), false, 'no default hintClasses');
});

test('data-test-do-hint attribute is overridden when config.autoDataTestSelectors is true', function(assert) {
  assert.expect(1);
  set(this, 'config.autoDataTestSelectors', true);
  this.render(hbs`{{do-hint propertyName='firstName'}}`);
  assert.equal(this.$('small').attr('data-test-do-hint'), 'firstName', 'has the data attribute');
});

test('data-test-do-hint attribute is overridden when config.autoDataTestSelectors is true', function(assert) {
  assert.expect(1);
  set(this, 'config.autoDataTestSelectors', true);
  this.render(hbs`{{do-hint propertyName='firstName' data-test-do-hint='something-else'}}`);
  assert.equal(this.$('small').attr('data-test-do-hint'), 'something-else', 'has the data attribute');
});
