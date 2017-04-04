/* eslint-env node */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'dummy',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV['ember-do-forms'] = {
      defaultClasses: {
        field: ['form-group'],
        label: ['col-form-label'],
        control: ['form-control'],
        feedback: ['form-control-feedback'],
        hint: ['form-text', 'text-muted']
      },

      validationClasses: {
        fieldSuccess: ['has-success'],
        fieldError: ['has-danger'],
        controlSuccess: ['form-control-success'],
        controlError: ['form-control-danger']
      }
    }
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';

    ENV['ember-do-forms'] = {
      errorsPath: 'myNewPath'
    };
  }

  if (environment === 'production') {

  }

  return ENV;
};
