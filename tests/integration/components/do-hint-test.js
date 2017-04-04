import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import configDefaults from 'ember-do-forms/utils/config-defaults';

const {
  get,
  set,
  Service
} = Ember;

const ConfigStub = Service.extend(configDefaults({
  defaultClasses: {
    hint: ['hint-element']
  }
}));

moduleForComponent('do-hint', 'Integration | Component | do hint', {
  integration: true,
  beforeEach() {
    this.register('service:ember-do-forms/config', ConfigStub);
    this.inject.service('ember-do-forms/config', { as: 'config' });

    set(this, 'hintText', 'Never gonna give you up');
  }
});

test('it renders', function(assert) {
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
  this.render(hbs`{{do-hint hintText}}`);
  assert.equal(this.$('small').hasClass('hint-element'), true, 'has default hintClasses');
});

test('configuration hintClasses can be overridden by own classNames', function(assert) {
  this.render(hbs`{{do-hint hintText classNames='my-custom-hint-class'}}`);
  assert.equal(this.$('small').hasClass('my-custom-hint-class'), true, 'hintClasses are overridden correctly');
  assert.equal(this.$('small').hasClass('hint-element'), false, 'no default hintClasses');
});
