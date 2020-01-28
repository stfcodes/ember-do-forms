import { set, get } from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';


module('Integration | Component | do feedback', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.config = this.owner.lookup('service:ember-do-forms/config');

    set(this, 'hasErrors', true);
    set(this, 'message', 'Oh noes!');
  });

  test('renders nothing by default (even with message)', async function(assert) {
    assert.expect(1);
    await render(hbs`{{do-feedback message=message}}`);
    assert.notOk(this.element.childElementCount, 'no feedback element');
  });

  test("doesn't render if it has no message", async function(assert) {
    assert.expect(1);
    await render(hbs`{{do-feedback showFeedback=hasErrors}}`);
    assert.notOk(this.element.childElementCount, 'no feedback element');
  });

  test('it renders some feedback', async function(assert) {
    assert.expect(3);
    await render(hbs`{{do-feedback showFeedback=hasErrors message=message}}`);
    assert.dom(this.element).hasText(get(this, 'message'));

    await render(hbs`
      {{#do-feedback showFeedback=hasErrors message=message as |msg|}}
        <span>{{msg}}</span>
      {{/do-feedback}}
    `);
    assert.equal(this.element.querySelectorAll('span').length, 1, 'it renders custom HTML');
    assert.dom(this.element.querySelector('span')).hasText(get(this, 'message'), 'correctly yields the feedback message');
  });

  test('its tag is a div by default', async function(assert) {
    assert.expect(1);
    await render(hbs`{{do-feedback message=message showFeedback=hasErrors}}`);
    assert.ok(this.element.querySelectorAll('div').length, 'renders a div');
  });

  test('its tag can be changed', async function(assert) {
    assert.expect(1);
    await render(hbs`{{do-feedback message=message showFeedback=hasErrors wrapperTagName='span'}}`);
    assert.equal(this.element.querySelectorAll('span').length, 1);
  });

  test('it has feedbackClasses applied from configuration', async function(assert) {
    assert.expect(1);
    this.set('config.defaultClasses', {
      feedback: ['feedback-element']
    });
    await render(hbs`{{do-feedback message=message showFeedback=hasErrors}}`);
    assert.dom(this.element.querySelector('div')).hasClass('feedback-element', 'has default feedbackClasses');
  });

  test('configuration feedbackClasses can be overridden by own classNames', async function(assert) {
    assert.expect(2);
    this.set('config.defaultClasses', {
      feedback: ['feedback-element']
    });
    await render(hbs`{{do-feedback message=message showFeedback=hasErrors classNames='my-custom-feedback-class'}}`);
    assert.dom(this.element.querySelector('div')).hasClass('my-custom-feedback-class', 'feedbackClasses are overridden correctly');
    assert.dom(this.element.querySelector('div')).hasNoClass('feedback-element', 'no default feedbackClasses');
  });

  test('it passes down data-test-do-feedback to the wrapper component', async function(assert) {
    assert.expect(1);
    await render(hbs`{{do-feedback showFeedback=hasErrors message=message data-test-do-feedback='feedback-element'}}`);
    assert.equal(this.element.querySelector('div').getAttribute('data-test-do-feedback'), 'feedback-element', 'has the data attribute');
  });

  test('data-test-do-feedback attribute is absent when config.autoDataTestSelectors is true', async function(assert) {
    assert.expect(1);
    set(this, 'config.autoDataTestSelectors', false);
    await render(hbs`{{do-feedback showFeedback=hasErrors message=message propertyName='firstName'}}`);
    assert.notOk(this.element.querySelector('div').getAttribute('data-test-do-feedback'), 'data attribute was not generated');
  });

  test('data-test-do-feedback attribute is set when config.autoDataTestSelectors is true', async function(assert) {
    assert.expect(1);
    set(this, 'config.autoDataTestSelectors', true);
    await render(hbs`{{do-feedback showFeedback=hasErrors message=message propertyName='firstName'}}`);
    assert.equal(this.element.querySelector('div').getAttribute('data-test-do-feedback'), 'firstName', 'has the data attribute');
  });

  test('data-test-do-feedback attribute is overridden when config.autoDataTestSelectors is true', async function(assert) {
    assert.expect(1);
    set(this, 'config.autoDataTestSelectors', true);
    await render(
      hbs`{{do-feedback showFeedback=hasErrors message=message propertyName='firstName' data-test-do-feedback='something-else'}}`
    );
    assert.equal(this.element.querySelector('div').getAttribute('data-test-do-feedback'), 'something-else', 'has the data attribute');
  });
});
