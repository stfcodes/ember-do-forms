import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import configDefaults from 'ember-do-forms/utils/config-defaults';

const {
  Service
} = Ember;

const ConfigStub = Service.extend(configDefaults({
  defaultClasses: {
    label: ['default-label-class']
  }
}));

moduleForComponent('do-label', 'Integration | Component | do form label', {
  integration: true,
  beforeEach() {
    this.register('service:do-form/config', ConfigStub);
    this.inject.service('do-form/config', { as: 'config' });
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
  this.render(hbs`{{do-label 'text'}}`);
  assert.equal(this.$('label').hasClass('default-label-class'), true, 'has default labelClasses');
});

test('configuration labelClasses can be overridden by own classNames', function(assert) {
  this.render(hbs`{{do-label 'text' classNames='my-custom-label-class'}}`);
  assert.equal(this.$('label').hasClass('my-custom-label-class'), true, 'labelClasses are overridden correctly');
  assert.equal(this.$('label').hasClass('default-label-class'), false, 'no default labelClasses');
});
