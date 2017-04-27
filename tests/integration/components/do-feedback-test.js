import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const {
  get,
  set,
  Service
} = Ember;

const ConfigStub = Service.extend();

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
  assert.notOk(this.$().children().length, 'no feedback element');
});

test("doesn't render if it has no message", function(assert) {
  assert.expect(1);
  this.render(hbs`{{do-feedback showFeedback=hasErrors}}`);
  assert.notOk(this.$().children().length, 'no feedback element');
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
  assert.ok(this.$('div').length, 'renders a div');
});

test('its tag can be changed', function(assert) {
  assert.expect(1);
  this.render(hbs`{{do-feedback message showFeedback=hasErrors wrapperTagName='span'}}`);
  assert.equal(this.$('span').length, 1);
});

test('it also has positionalParams', function(assert) {
  assert.expect(1);
  this.render(hbs`{{do-feedback message showFeedback=hasErrors}}`);
  assert.equal(this.$().text().trim(), get(this, 'message'));
});

test('it has feedbackClasses applied from configuration', function(assert) {
  assert.expect(1);
  this.set('config.defaultClasses', {
    feedback: ['feedback-element']
  });
  this.render(hbs`{{do-feedback message showFeedback=hasErrors}}`);
  assert.equal(this.$('div').hasClass('feedback-element'), true, 'has default feedbackClasses');
});

test('configuration feedbackClasses can be overridden by own classNames', function(assert) {
  assert.expect(2);
  this.set('config.defaultClasses', {
    feedback: ['feedback-element']
  });
  this.render(hbs`{{do-feedback message showFeedback=hasErrors classNames='my-custom-feedback-class'}}`);
  assert.equal(this.$('div').hasClass('my-custom-feedback-class'), true, 'feedbackClasses are overridden correctly');
  assert.equal(this.$('div').hasClass('feedback-element'), false, 'no default feedbackClasses');
});

test('it passes down data-test-do-feedback to the wrapper component', function(assert) {
  assert.expect(1);
  this.render(hbs`{{do-feedback showFeedback=hasErrors message=message data-test-do-feedback='feedback-element'}}`);
  assert.equal(this.$('div').attr('data-test-do-feedback'), 'feedback-element', 'has the data attribute');
});

test('data-test-do-feedback attribute is absent when config.autoDataTestSelectors is true', function(assert) {
  assert.expect(1);
  set(this, 'config.autoDataTestSelectors', false);
  this.render(hbs`{{do-feedback showFeedback=hasErrors message=message propertyName='firstName'}}`);
  assert.notOk(this.$('div').attr('data-test-do-feedback'), 'data attribute was not generated');
});

test('data-test-do-feedback attribute is set when config.autoDataTestSelectors is true', function(assert) {
  assert.expect(1);
  set(this, 'config.autoDataTestSelectors', true);
  this.render(hbs`{{do-feedback showFeedback=hasErrors message=message propertyName='firstName'}}`);
  assert.equal(this.$('div').attr('data-test-do-feedback'), 'firstName', 'has the data attribute');
});

test('data-test-do-feedback attribute is overridden when config.autoDataTestSelectors is true', function(assert) {
  assert.expect(1);
  set(this, 'config.autoDataTestSelectors', true);
  this.render(hbs`{{do-feedback showFeedback=hasErrors message=message propertyName='firstName' data-test-do-feedback='something-else'}}`);
  assert.equal(this.$('div').attr('data-test-do-feedback'), 'something-else', 'has the data attribute');
});
