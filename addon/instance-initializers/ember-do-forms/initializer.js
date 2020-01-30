import { assign } from '@ember/polyfills';
import { set } from '@ember/object';
import configDefaults from '../../utils/config-defaults';

export function initialize(applicationInstance) {
  debugger;
  const config = applicationInstance.resolveRegistration('config:environment')['ember-do-forms'];
  if (config || applicationInstance.router) {
    let doFormConfig  = assign(configDefaults(), config);
    let configService = applicationInstance.lookup('service:ember-do-forms/config');

    Object.keys(doFormConfig).forEach((key) => {
      set(configService, key, doFormConfig[key]);
    });
  }
}

export default {
  name: 'ember-do-forms/initializer',
  initialize
};
