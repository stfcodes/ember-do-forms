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
    field: ['field'],
    label: ['label'],
    control: ['control'],
    feedback: ['feedback'],
    hint: ['hint']
  }
}));

moduleForComponent('ember-do-forms/checkbox-field', 'Integration | Component | ember do forms/checkbox field', {
  integration: true
});

moduleForComponent('ember-do-forms/checkbox-field', 'Integration | Component | ember do forms/checkbox field', {
  integration: true,
  beforeEach() {
    this.register('service:ember-do-forms/config', ConfigStub);
    this.inject.service('ember-do-forms/config', { as: 'config' });

    set(this, 'object', Object.create({
      profileVisible: true,
      allowPets: null
    }));
  }
});

test('it requires an object as context', function(assert) {
  assert.expect(1);
  assert.expectAssertion(() => {
    this.render(hbs`{{ember-do-forms/checkbox-field}}`);
  }, /{{ember-do-forms\/checkbox-field}} requires an object/);
});

test('it requires a propertyName as context', function(assert) {
  assert.expect(1);
  assert.expectAssertion(() => {
    this.render(hbs`{{ember-do-forms/checkbox-field object=object}}`);
  }, /{{ember-do-forms\/checkbox-field}} requires a propertyName/);
});

test('it renders a checkbox control', function(assert) {
  assert.expect(4);
  this.render(hbs`{{ember-do-forms/checkbox-field 'profileVisible' object=object}}`);
  assert.equal(this.$('input').length, 1, 'has an input');
  assert.equal(this.$('input').attr('type'), 'checkbox', 'input is checkbox by default');
  assert.equal(this.$('input').is(':checked'), true, 'input is checked');

  this.render(hbs`{{ember-do-forms/checkbox-field 'allowPets' object=object}}`);
  assert.equal(this.$('input').is(':checked'), false, 'input is not checked');
});

test('it actually works', function(assert) {
  assert.expect(3);
  this.render(hbs`{{ember-do-forms/checkbox-field 'profileVisible' object=object}}`);
  assert.equal(this.$('input').is(':checked'), true, 'input is checked');
  this.$('input').click();
  assert.equal(this.$('input').is(':checked'), false, 'input is now unchecked');
  assert.equal(get(this, 'object.profileVisible'), false, 'sets the value correctly');
});

test('data-test-* attributes are absent when config.autoDataTestSelectors is false', function(assert) {
  assert.expect(5);
  set(this, 'config.autoDataTestSelectors', false);
  this.set('object.validations', {
    attrs: { profileVisible: { errors: [{ message: 'message' }] } }
  });
  this.render(hbs`{{ember-do-forms/checkbox-field 'profileVisible' object=object showAllValidations=true label='Visible profile?' hint='Should profile be visible'}}`);

  assert.notOk(this.$('div').attr('data-test-do-field'), 'field data attribute was not generated');
  assert.notOk(this.$('.label').attr('data-test-do-label'), 'label data attribute was not generated');
  assert.notOk(this.$('.control').attr('data-test-do-control'), 'control data attribute was not generated');
  assert.notOk(this.$('.feedback').attr('data-test-do-feedback'), 'feedback data attribute was not generated');
  assert.notOk(this.$('.hint').attr('data-test-do-hint'), 'hint data attribute was not generated');
});

test('data-test-* attributes are correctly set when config.autoDataTestSelectors is true', function(assert) {
  assert.expect(5);
  set(this, 'config.autoDataTestSelectors', true);
  this.set('object.validations', {
    attrs: { profileVisible: { errors: [{ message: 'message' }] } }
  });
  this.render(hbs`{{ember-do-forms/checkbox-field 'profileVisible' object=object showAllValidations=true label='Visible profile?' hint='Should profile be visible'}}`);

  assert.equal(this.$('div').attr('data-test-do-field'), 'profileVisible', 'field has the data attribute');
  assert.equal(this.$('.label').attr('data-test-do-label'), 'profileVisible', 'label has the data attribute');
  assert.equal(this.$('.control').attr('data-test-do-control'), 'profileVisible', 'control has the data attribute');
  assert.equal(this.$('.feedback').attr('data-test-do-feedback'), 'profileVisible', 'feedback has the data attribute');
  assert.equal(this.$('.hint').attr('data-test-do-hint'), 'profileVisible', 'hint has the data attribute');
});

test('data-test-* attributes are overriden when config.autoDataTestSelectors is true', function(assert) {
  assert.expect(5);
  set(this, 'config.autoDataTestSelectors', true);
  this.set('object.validations', {
    attrs: { profileVisible: { errors: [{ message: 'message' }] } }
  });
  this.render(hbs`
    {{ember-do-forms/checkbox-field 'profileVisible' object=object showAllValidations=true label='Visible profile?' hint='Should profile be visible'
      data-test-do-field='never'
      data-test-do-label='gonna'
      data-test-do-control='give'
      data-test-do-feedback='you'
      data-test-do-hint='up'
    }}
  `);

  assert.equal(this.$('div').attr('data-test-do-field'), 'never', 'field has the data attribute');
  assert.equal(this.$('.label').attr('data-test-do-label'), 'gonna', 'label has the data attribute');
  assert.equal(this.$('.control').attr('data-test-do-control'), 'give', 'control has the data attribute');
  assert.equal(this.$('.feedback').attr('data-test-do-feedback'), 'you', 'feedback has the data attribute');
  assert.equal(this.$('.hint').attr('data-test-do-hint'), 'up', 'hint has the data attribute');
});
