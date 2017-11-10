import Ember from 'ember';

/**
 * Default route for the application
 */
export default Ember.Route.extend({
  beforeModel() {
    // Default to the search page
    this.replaceWith('search');
  }
});
