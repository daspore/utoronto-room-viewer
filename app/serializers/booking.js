import DS from 'ember-data';

/**
 * Custom serializer for Booking data. Booking data is retrieved from
 * a custom .php script, which returns data in JSON format.
 * However, the results do not conform to JSON API standards.
 */
export default DS.JSONSerializer.extend({
  /**
   * Parse raw Booking data into a format that matches JSON API standard,
   * so Ember can automate creation of Booking model objects.
   * @param {DS.Store} [store]
   * @param {DS.Model} [primaryModelClass]
   * @param {Object} [payload] The raw data returned from the adapter query.
   * @param {string|number} [id]
   * @param {string} [requestType]
   * @returns {Object} JSON API document
   */
  normalizeResponse: function(store, primaryModelClass, payload, id, requestType) {
    let newPayload = payload;
    
    // Assuming the data is returned in a 'bookings' tag.
    // JSON API prefers a generic 'data' root tag,
    // with each data item marked with a 'type' attribute instead.
    if (!payload.data && payload.bookings) {
      newPayload = payload.bookings;
      newPayload.setEach('type', 'booking');
    }
    
    // Normalize the input data to a JSON API format
    // (includes addition of the 'data' root tag).
    return this._super(store, primaryModelClass, newPayload, id, requestType);
  }
});
