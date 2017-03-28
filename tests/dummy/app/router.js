import Ember from 'ember';
import config from './config/environment';

const {
  Router
} = Ember;

const ApplicationRouter = Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

ApplicationRouter.map(function() {
});

export default ApplicationRouter;
