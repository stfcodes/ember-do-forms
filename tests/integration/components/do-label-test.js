import { set } from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | do form label', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.config = this.owner.lookup('service:ember-do-forms/config');
  });

  test('it renders a label', async function(assert) {
    assert.expect(1);
    await render(hbs`{{do-label}}`);
    assert.equal(this.element.querySelectorAll('label').length, 1);
  });

  test('it renders with a block', async function(assert) {
    assert.expect(1);
    await render(hbs`
      {{#do-label}}
        <small>Something</small>
      {{/do-label}}
    `);
    assert.equal(this.element.querySelector('label').innerHTML.trim(), '<small>Something</small>');
  });

  test('it has labelClasses applied from configuration', async function(assert) {
    assert.expect(1);
    this.set('config.defaultClasses', {
      label: ['default-label-class']
    });
    await render(hbs`{{do-label 'text'}}`);
    assert.equal(this.element.querySelector('label').classList.contains('default-label-class'), true, 'has default labelClasses');
  });

  test('configuration labelClasses can be overridden by own classNames', async function(assert) {
    assert.expect(2);
    this.set('config.defaultClasses', {
      label: ['default-label-class']
    });
    await render(hbs`{{do-label 'text' classNames='my-custom-label-class'}}`);
    assert.equal(this.element.querySelector('label').classList.contains('my-custom-label-class'), true, 'labelClasses are overridden correctly');
    assert.equal(this.element.querySelector('label').classList.contains('default-label-class'), false, 'no default labelClasses');
  });

  test('data-test-do-label attribute is absent when config.autoDataTestSelectors is false', async function(assert) {
    assert.expect(1);
    set(this, 'config.autoDataTestSelectors', false);
    await render(hbs`{{do-label propertyName='firstName'}}`);
    assert.notOk(this.element.querySelector('label').getAttribute('data-test-do-label'), 'data attribute was not generated');
  });

  test('data-test-do-label attribute is set when config.autoDataTestSelectors is true', async function(assert) {
    assert.expect(1);
    set(this, 'config.autoDataTestSelectors', true);
    await render(hbs`{{do-label propertyName='firstName'}}`);
    assert.equal(this.element.querySelector('label').getAttribute('data-test-do-label'), 'firstName', 'has the data attribute');
  });

  test('data-test-do-label attribute is overridden when config.autoDataTestSelectors is true', async function(assert) {
    assert.expect(1);
    set(this, 'config.autoDataTestSelectors', true);
    await render(hbs`{{do-label propertyName='firstName' data-test-do-label='something-else'}}`);
    assert.equal(this.element.querySelector('label').getAttribute('data-test-do-label'), 'something-else', 'has the data attribute');
  });
});
