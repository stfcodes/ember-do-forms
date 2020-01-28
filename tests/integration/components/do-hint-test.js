import { set, get } from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | do hint', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.config = this.owner.lookup('service:ember-do-forms/config');

    set(this, 'hintText', 'Never gonna give you up');
  });

  test('it renders', async function(assert) {
    assert.expect(2);
    await render(hbs`{{do-hint}}`);
    assert.dom(this.element).hasText('', 'renders nothing by default');

    await render(hbs`
      {{#do-hint}}
        template block text
      {{/do-hint}}
    `);
    assert.dom(this.element).hasText('template block text', "renders what's passed in the block");
  });

  test('it renders with text', async function(assert) {
    assert.expect(2);
    await render(hbs`{{do-hint text=hintText}}`);
    assert.dom(this.element).hasText(get(this, 'hintText'), 'renders the text');

    await render(hbs`
      {{#do-hint text=hintText as |text|}}
        <p>{{text}}</p>
      {{/do-hint}}
    `);
    assert.dom(this.element.querySelector('p')).hasText(get(this, 'hintText'), 'also handles blocks');
  });

  test('its tag is a small by default', async function(assert) {
    assert.expect(1);
    await render(hbs`{{do-hint}}`);
    assert.equal(this.element.querySelectorAll('small').length, 1);
  });

  test('its tag can be changed', async function(assert) {
    assert.expect(1);
    await render(hbs`{{do-hint text=hintText tagName='div'}}`);
    assert.equal(this.element.querySelectorAll('div').length, 1);
  });

  test('it has hintClasses applied from configuration', async function(assert) {
    assert.expect(1);
    this.set('config.defaultClasses', {
      hint: ['hint-element']
    });
    await render(hbs`{{do-hint text=hintText}}`);
    assert.dom(this.element.querySelector('small')).hasClass('hint-element', 'has default hintClasses');
  });

  test('configuration hintClasses can be overridden by own classNames', async function(assert) {
    assert.expect(2);
    this.set('config.defaultClasses', {
      hint: ['hint-element']
    });
    await render(hbs`{{do-hint text=hintText classNames='my-custom-hint-class'}}`);
    assert.dom(this.element.querySelector('small')).hasClass('my-custom-hint-class', 'hintClasses are overridden correctly');
    assert.dom(this.element.querySelector('small')).hasNoClass('hint-element', 'no default hintClasses');
  });

  test('data-test-do-hint attribute is absent when config.autoDataTestSelectors is false', async function(assert) {
    assert.expect(1);
    set(this, 'config.autoDataTestSelectors', false);
    await render(hbs`{{do-hint propertyName='firstName'}}`);
    assert.notOk(this.element.querySelector('small').getAttribute('data-test-do-hint'), 'data attribute was not generated');
  });

  test('data-test-do-hint attribute is set when config.autoDataTestSelectors is true', async function(assert) {
    assert.expect(1);
    set(this, 'config.autoDataTestSelectors', true);
    await render(hbs`{{do-hint propertyName='firstName'}}`);
    assert.equal(this.element.querySelector('small').getAttribute('data-test-do-hint'), 'firstName', 'has the data attribute');
  });

  test('data-test-do-hint attribute is overridden when config.autoDataTestSelectors is true', async function(assert) {
    assert.expect(1);
    set(this, 'config.autoDataTestSelectors', true);
    await render(hbs`{{do-hint propertyName='firstName' data-test-do-hint='something-else'}}`);
    assert.equal(this.element.querySelector('small').getAttribute('data-test-do-hint'), 'something-else', 'has the data attribute');
  });
});
