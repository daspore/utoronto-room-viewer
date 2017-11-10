import DS from 'ember-data';

/**
 * Custom serializer for Room data.
 * Rooms use some attribute keys that do not conform
 * to JSON API standards. This serializer overrides the
 * dasherize process for these keys.
 */
export default DS.JSONAPISerializer.extend({
  /**
   * Override the default behavior for standardizing attribute keys.
   * @param {string} [key] The attribute key from the JSON data.
   * @returns {string} The formatted key, should match attributes in the Room model.
   */
  keyForAttribute: function(key) {
    // When retrieving room results, do not dasherize these attributes
    let hardCodedKeys = ["teaching_station", "teaching_station_junior"];
    if (hardCodedKeys.includes(key)) {
      return key;
    }
    return this._super(key);
  }
});
