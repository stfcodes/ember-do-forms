import { set, get } from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ember do forms/checkbox field', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.config = this.owner.lookup('service:ember-do-forms/config');

    set(this, 'object', Object.create({
      profileVisible: true,
      allowPets: null
    }));
  });

  test('it renders a checkbox control', async function(assert) {
    assert.expect(4);
    await render(hbs`{{ember-do-forms/checkbox-field propertyName='profileVisible' object=object}}`);
    assert.equal(this.element.querySelectorAll('input').length, 1, 'has an input');
    assert.equal(this.element.querySelector('input').getAttribute('type'), 'checkbox', 'input is checkbox by default');
    assert.ok(this.element.querySelector('input').checked, 'input is checked');

    await render(hbs`{{ember-do-forms/checkbox-field propertyName='allowPets' object=object}}`);
    assert.notOk(this.element.querySelector('input').checked, 'input is not checked');
  });

  test('it actually works', async function(assert) {
    assert.expect(3);
    await render(hbs`{{ember-do-forms/checkbox-field propertyName='profileVisible' object=object}}`);
    assert.ok(this.element.querySelector('input').checked, 'input is checked');
    await click('input');
    assert.notOk(this.element.querySelector('input').checked, false, 'input is now unchecked');
    assert.equal(get(this, 'object.profileVisible'), false, 'sets the value correctly');
  });

  test('data-test-* attributes are absent when config.autoDataTestSelectors is false', async function(assert) {
    assert.expect(5);
    set(this, 'config.autoDataTestSelectors', false);
    this.set('object.validations', {
      attrs: { profileVisible: { errors: [{ message: 'message' }] } }
    });
    await render(
      hbs`{{ember-do-forms/checkbox-field propertyName='profileVisible' object=object showAllValidations=true label='Visible profile?' hint='Should profile be visible'}}`
    );

    assert.notOk(this.element.querySelector('div').getAttribute('data-test-do-field'), 'field data attribute was not generated');
    assert.notOk(this.element.querySelector('.label').getAttribute('data-test-do-label'), 'label data attribute was not generated');
    assert.notOk(this.element.querySelector('.control').getAttribute('data-test-do-control'), 'control data attribute was not generated');
    assert.notOk(this.element.querySelector('.feedback').getAttribute('data-test-do-feedback'), 'feedback data attribute was not generated');
    assert.notOk(this.element.querySelector('.hint').getAttribute('data-test-do-hint'), 'hint data attribute was not generated');
  });

  test('data-test-* attributes are correctly set when config.autoDataTestSelectors is true', async function(assert) {
    assert.expect(5);
    set(this, 'config.autoDataTestSelectors', true);
    this.set('object.validations', {
      attrs: { profileVisible: { errors: [{ message: 'message' }], isValid: false } }
    });
    await render(
      hbs`{{ember-do-forms/checkbox-field propertyName='profileVisible' object=object showAllValidations=true label='Visible profile?' hint='Should profile be visible'}}`
    );

    assert.equal(this.element.querySelector('div').getAttribute('data-test-do-field'), 'profileVisible', 'field has the data attribute');
    assert.equal(this.element.querySelector('.label').getAttribute('data-test-do-label'), 'profileVisible', 'label has the data attribute');
    assert.equal(this.element.querySelector('.control').getAttribute('data-test-do-control'), 'profileVisible', 'control has the data attribute');
    assert.equal(this.element.querySelector('.feedback').getAttribute('data-test-do-feedback'), 'profileVisible', 'feedback has the data attribute');
    assert.equal(this.element.querySelector('.hint').getAttribute('data-test-do-hint'), 'profileVisible', 'hint has the data attribute');
  });

  test('data-test-* attributes are overriden when config.autoDataTestSelectors is true', async function(assert) {
    assert.expect(5);
    set(this, 'config.autoDataTestSelectors', true);
    this.set('object.validations', {
      attrs: { profileVisible: { errors: [{ message: 'message' }] } }
    });
    await render(hbs`
      {{ember-do-forms/checkbox-field propertyName='profileVisible' object=object showAllValidations=true label='Visible profile?' hint='Should profile be visible'
        data-test-do-field='never'
        data-test-do-label='gonna'
        data-test-do-control='give'
        data-test-do-feedback='you'
        data-test-do-hint='up'
      }}
    `);

    assert.equal(this.element.querySelector('div').getAttribute('data-test-do-field'), 'never', 'field has the data attribute');
    assert.equal(this.element.querySelector('.label').getAttribute('data-test-do-label'), 'gonna', 'label has the data attribute');
    assert.equal(this.element.querySelector('.control').getAttribute('data-test-do-control'), 'give', 'control has the data attribute');
    assert.equal(this.element.querySelector('.feedback').getAttribute('data-test-do-feedback'), 'you', 'feedback has the data attribute');
    assert.equal(this.element.querySelector('.hint').getAttribute('data-test-do-hint'), 'up', 'hint has the data attribute');
  });
});
