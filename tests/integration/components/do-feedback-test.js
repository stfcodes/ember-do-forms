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
    feedback: ['feedback-element']
  }
}));

moduleForComponent('do-feedback', 'Integration | Component | do feedback', {
  integration: true,
  beforeEach() {
    this.register('service:ember-do-forms/config', ConfigStub);
    this.inject.service('ember-do-forms/config', { as: 'config' });

    set(this, 'hasErrors', true);
    set(this, 'message', 'Oh noes!');
  }
});

test('renders nothing by default (even with message)', function(assert) {
  assert.expect(1);
  this.render(hbs`{{do-feedback message=message}}`);
  assert.equal(this.$('.feedback-element').length, 0);
});

test("doesn't render if it has no message", function(assert) {
  assert.expect(1);
  this.render(hbs`{{do-feedback showFeedback=hasErrors}}`);
  assert.equal(this.$('.feedback-element').length, 0);
});

test('it renders some feedback', function(assert) {
  assert.expect(3);
  this.render(hbs`{{do-feedback showFeedback=hasErrors message=message}}`);
  assert.equal(this.$().text().trim(), get(this, 'message'));

  this.render(hbs`
    {{#do-feedback showFeedback=hasErrors message=message as |msg|}}
      <span>{{msg}}</span>
    {{/do-feedback}}
  `);
  assert.equal(this.$('span').length, 1, 'it renders custom HTML');
  assert.equal(this.$('span').text().trim(), get(this, 'message'), 'correctly yields the feedback message');
});

test('its tag is a div by default', function(assert) {
  assert.expect(1);
  this.render(hbs`{{do-feedback message showFeedback=hasErrors}}`);
  assert.equal(this.$('div.feedback-element').length, 1);
});

test('its tag can be changed', function(assert) {
  assert.expect(1);
  this.render(hbs`{{do-feedback message showFeedback=hasErrors wrapperTagName='span'}}`);
  assert.equal(this.$('span.feedback-element').length, 1);
});

test('it also has positionalParams', function(assert) {
  assert.expect(1);
  this.render(hbs`{{do-feedback message showFeedback=hasErrors}}`);
  assert.equal(this.$().text().trim(), get(this, 'message'));
});

test('it has feedbackClasses applied from configuration', function(assert) {
  this.render(hbs`{{do-feedback message showFeedback=hasErrors}}`);
  assert.equal(this.$('div').hasClass('feedback-element'), true, 'has default feedbackClasses');
});

test('configuration feedbackClasses can be overridden by own classNames', function(assert) {
  this.render(hbs`{{do-feedback message showFeedback=hasErrors classNames='my-custom-feedback-class'}}`);
  assert.equal(this.$('div').hasClass('my-custom-feedback-class'), true, 'feedbackClasses are overridden correctly');
  assert.equal(this.$('div').hasClass('feedback-element'), false, 'no default feedbackClasses');
});

test('it passes down data-test-do-feedback to the wrapper component', function(assert) {
  assert.expect(1);
  this.render(hbs`{{do-feedback showFeedback=hasErrors message=message data-test-do-feedback='feedback-element'}}`);
  assert.equal(this.$('div').attr('data-test-do-feedback'), 'feedback-element', 'has the data attribute');
});
