import DS from 'ember-data';
import config from '../config/environment';

/**
 * An adapter for retrieving a room's Booking data.
 * The booking results are retrieved via a .php script,
 * which is non-standard for the JSON API Adapter.
 */
export default DS.RESTAdapter.extend({
  host: config.APP.BookingHost,
  namespace: config.APP.BookingNamespace,
  bookingEndpoint: config.APP.BookingEndpoint,
  
  /**
   * This overrides the default behavior for configuring the search endpoint.
   * Configure a 'BookingEndpoint' as an environment variable
   * that points to the .php script for accessing Booking data.
   * @param {string} [modelName] The data model we are trying to query, should be 'booking'.
   */
  pathForType: function(modelName) {
    // Confirm we are searching for Booking data.
    // This should be the case anyways,
    // since we are in the booking.js adapter.
    if (modelName === "booking") {
      return this.bookingEndpoint;
    }
    // If we somehow arrive here otherwise,
    // use the default method for determining the API query path.
    return this._super(modelName);
  }
});
