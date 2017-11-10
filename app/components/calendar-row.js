import Ember from 'ember';
import TimestampUtils from '../utils/timestamp-utils';

/**
 * Component to display a single Room in a calendar format
 */
export default Ember.Component.extend({
  store: Ember.inject.service(),
  
  /** Component initialization */
  init: function() {
    this._super(arguments);
    // Setup the TimestampUtils object for later use
    if (!this.get('timestampUtils')) {
      this.set('timestampUtils', TimestampUtils.create());
    }
  },
  
  /** Code to run once the data model is injected */
  didReceiveAttrs: function() {
    this._super(...arguments);
    
    // Query for related Bookings data
    let room = this.get('room');
    let date = this.get('date');
    let timestamp = this.get('timestampUtils').createTimestamp(date, "12AM");
    this.set('bookings', this.get('store').query('booking', {
      bldg: room.get('bldg'),
      room: room.get('room'),
      date: timestamp.substring(0,8) // Queries seem to work better without time portion
    }));
  }
});
