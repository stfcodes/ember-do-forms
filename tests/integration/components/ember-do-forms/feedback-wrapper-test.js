import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ember do forms/feedback wrapper', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(2);
    await render(hbs`{{ember-do-forms/feedback-wrapper}}`);
    assert.dom(this.element).hasText('');
    await render(hbs`
      {{#ember-do-forms/feedback-wrapper}}
        template block text
      {{/ember-do-forms/feedback-wrapper}}
    `);
    assert.dom(this.element).hasText('template block text');
  });
});
