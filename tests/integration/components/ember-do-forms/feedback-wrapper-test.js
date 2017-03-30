import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-do-forms/feedback-wrapper', 'Integration | Component | ember do forms/feedback wrapper', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);
  this.render(hbs`{{ember-do-forms/feedback-wrapper}}`);
  assert.equal(this.$().text().trim(), '');
  this.render(hbs`
    {{#ember-do-forms/feedback-wrapper}}
      template block text
    {{/ember-do-forms/feedback-wrapper}}
  `);
  assert.equal(this.$().text().trim(), 'template block text');
});
