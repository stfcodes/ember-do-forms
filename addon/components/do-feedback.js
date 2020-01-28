import Component from '@ember/component';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import layout from '../templates/components/do-feedback';
import hasOnlyEmberView from '../utils/has-only-ember-view';
import setDataTestSelector from '../utils/set-data-test-selector';

const DoFeedbackComponent = Component.extend({
  layout,
  config: service('ember-do-forms/config'),
  tagName: '',

  wrapperTagName: 'div',

  showFeedback: false,

  init() {
    setDataTestSelector(this, {
      testSelector: 'do-feedback',
      autoTestSelector: get(this, 'config.autoDataTestSelectors'),
      testSelectorValue: get(this, 'propertyName')
    });

    this._super(...arguments);
    let defaultClasses = get(this, 'config.defaultClasses.feedback');

    if (isEmpty(this.classNames) || hasOnlyEmberView(this.classNames)) {
      this.classNames = this.classNames.concat(defaultClasses);
    }
  }
});

export default DoFeedbackComponent;
