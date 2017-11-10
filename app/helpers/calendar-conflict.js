import Ember from 'ember';

/**
 * Helper to find a Booking object that matches a particular timestamp
 */
export function calendarConflict(params) {
  var [bookings,time] = params;
  if (!bookings || !time) { return null; }
  
  var matchingBooking = bookings.findBy('time', time);
  return matchingBooking;
}

export default Ember.Helper.helper(calendarConflict);
