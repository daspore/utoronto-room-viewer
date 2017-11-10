import Ember from 'ember';

/**
 * Route to display Booking data for filtered Rooms
 */
export default Ember.Route.extend({
  model() {
    return {
      hours: [
        /*"6AM",
        "7AM",
        "8AM",*/
        "9AM",
        "10AM",
        "11AM",
        "12PM",
        "1PM",
        "2PM",
        "3PM",
        "4PM",
        "5PM",
        "6PM",
        "7PM",
        "8PM"/*,
        "9PM",
        "10PM",
        "11PM"*/
      ]
    };
  }
});
