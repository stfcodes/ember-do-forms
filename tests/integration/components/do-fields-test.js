import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import configDefaults from 'ember-do-forms/utils/config-defaults';

const {
  Object: EmObject,
  set,
  Service
} = Ember;

const ConfigStub = Service.extend(configDefaults());

moduleForComponent('do-fields', 'Integration | Component | do fields', {
  integration: true,
  beforeEach() {
    this.register('service:ember-do-forms/config', ConfigStub);
    this.inject.service('ember-do-forms/config', { as: 'config' });

    set(this, 'object', EmObject.create({
      name: 'Stefan',
      profileVisible: true
    }));
  }
});

test('it requires an object as context', function(assert) {
  assert.expect(1);
  assert.expectAssertion(() => {
    this.render(hbs`{{do-fields}}`);
  }, /{{do-fields}} requires an object/);
});

test('it has an object as the first positionalParam', function(assert) {
  assert.expect(1);
  this.render(hbs`{{do-fields object}}`);
  assert.ok(this.$().html(), 'sets the object positionalParam');
});

test('it renders nothing by default', function(assert) {
  assert.expect(1);
  this.render(hbs`{{do-fields object=object}}`);
  assert.notOk(this.$().children().length, 'it is an empty node');
});

test('it has a do-field contextual component', function(assert) {
  assert.expect(4);
  this.render(hbs`
    {{#do-fields object objectName='rick' showAllValidations=true as |fields|}}
      {{#fields.do-field 'name' as |field|}}
        {{field.do-control}}
        {{field.do-feedback 'oh noes' classNames='feedback'}}
      {{/fields.do-field}}
    {{/do-fields}}
  `);
  assert.ok(this.$('div').length, 'renders the do-field component');
  assert.equal(this.$('input').val(), 'Stefan', 'control has correct value');
  assert.equal(this.$('input').attr('name'), 'rick[name]', 'control has correct name');
  assert.equal(this.$('.feedback').text().trim(), 'oh noes', 'feedback is visible');
});

test('it has an input-field contextual component', function(assert) {
  assert.expect(4);
  this.set('object.validations', {
    attrs: { name: { errors: [{ message: 'too cool' }] } }
  });
  this.render(hbs`
    {{#do-fields object objectName='rick' showAllValidations=true as |fields|}}
      {{fields.input-field 'name' feedbackClasses='feedback'}}
    {{/do-fields}}
  `);
  assert.ok(this.$('div').length, 'renders the input-field component');
  assert.equal(this.$('input').val(), 'Stefan', 'control has correct value');
  assert.equal(this.$('input').attr('name'), 'rick[name]', 'control has correct name');
  assert.equal(this.$('.feedback').text().trim(), 'too cool', 'feedback is visible');
});

test('it has an checkbox-field contextual component', function(assert) {
  assert.expect(4);
  this.set('object.validations', {
    attrs: { profileVisible: { errors: [{ message: 'too cool' }] } }
  });
  this.render(hbs`
    {{#do-fields object objectName='rick' showAllValidations=true as |fields|}}
      {{fields.checkbox-field 'profileVisible' feedbackClasses='feedback'}}
    {{/do-fields}}
  `);
  assert.ok(this.$('div').length, 'renders the checkbox-field component');
  assert.equal(this.$('input').is(':checked'), true, 'input is checked');
  assert.equal(this.$('input').attr('name'), 'rick[profileVisible]', 'control has correct name');
  assert.equal(this.$('.feedback').text().trim(), 'too cool', 'feedback is visible');
});
