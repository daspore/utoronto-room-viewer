import Ember from 'ember';

/**
 * Route to allow a user to select filter options
 */
export default Ember.Route.extend({
  model() {
    return {
      buildings: this.get('store').findAll('bldg'),
      rooms: this.get('store').findAll('room')
    };
  }
});
