import Application from '@ember/application';
import { get } from '@ember/object';
import { run } from '@ember/runloop';
import Service from '@ember/service';
import { initialize } from 'dummy/instance-initializers/ember-do-forms/initializer';
import { module, test } from 'qunit';
import destroyApp from '../../../helpers/destroy-app';
import configDefaults from 'ember-do-forms/utils/config-defaults';

const ConfigStub = Service.extend(configDefaults());

module('Unit | Instance Initializer | ember do forms/initializer', function(hooks) {
  hooks.beforeEach(function() {
    run(() => {
      this.application = Application.create();
      this.appInstance = this.application.buildInstance();
      this.appInstance.register('service:ember-do-forms/config', ConfigStub);
      this.appInstance.register('config:environment', {
        'ember-do-forms': {
          errorsPath: 'myNewPath'
        }
      });
    });
  });

  hooks.afterEach(function() {
    run(this.appInstance, 'destroy');
    destroyApp(this.application);
  });

  // Couldn't find a way to set the environment of the instance app programatically,
  // so just use the dummy app environment.js for overrides
  test('it sets defaults and overrides', function(assert) {
    assert.expect(2);
    let configService = this.appInstance.lookup('service:ember-do-forms/config');
    let defaults = configDefaults();

    assert.equal(get(configService, 'errorsPath'), defaults.errorsPath, 'defaults are set correctly');
    initialize(this.appInstance);
    assert.equal(get(configService, 'errorsPath'), 'myNewPath', 'defaults are set correctly');
  });
});
