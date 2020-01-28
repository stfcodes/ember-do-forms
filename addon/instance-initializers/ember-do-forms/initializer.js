import { assign } from '@ember/polyfills';
import { set } from '@ember/object';
import config from 'ember-get-config';
import configDefaults from '../../utils/config-defaults';

export function initialize(appInstance) {
  const doFormConfig  = assign(configDefaults(), config['ember-do-forms']);
  const configService = appInstance.lookup('service:ember-do-forms/config');

  Object.keys(doFormConfig).forEach((key) => {
    set(configService, key, doFormConfig[key]);
  });
}

export default {
  name: 'ember-do-forms/initializer',
  initialize
};
