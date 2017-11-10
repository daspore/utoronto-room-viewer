import DS from 'ember-data';

/**
 * Room Booking model
 */
export default DS.Model.extend({
  time: DS.attr(),
  desc: DS.attr()
});
