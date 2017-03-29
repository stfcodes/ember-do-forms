import Ember from 'ember';
import config from 'ember-get-config';
import configDefaults from '../../utils/config-defaults';

const {
  merge,
  set
} = Ember;

export function initialize(application) {
  let doFormConfig  = merge(configDefaults(), config['ember-do-forms']);
  let configService = application.lookup('service:do-form/config');

  Object.keys(doFormConfig).forEach((key) => {
    set(configService, key, doFormConfig[key]);
  });
}

export default {
  name: 'do-form/initializer',
  initialize
};

