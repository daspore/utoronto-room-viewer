import Ember from 'ember';

/**
 * A set of utility functions for working with UToronto timestamp data.
 * Timestamps in this application will look like "20170923070000".
 * This translates to the date 2017-09-23 07:00:00.
 */
export default Ember.Object.extend({
  /**
   * Create a timestamp string from a date.
   * @param {string} [date] The desired date. Should be a compliant stringified Date. Default value is today's date.
   * @param (string) [hour] The desired hour. Should be in 12-hour notation (e.g. "8AM" or 12PM"). Default value is midnight "12AM".
   * @returns {string} The timestamp, in "yyyyMMddhhmmss" format.
   */
  createTimestamp: function(date = new Date(), hour = "12AM") {
    // Convert date input to timestamp format
    var d=new Date(date);
    var datePortion = `${d.getUTCFullYear()}${(d.getUTCMonth()+1 < 10 ? "0":"") + (d.getUTCMonth()+1)}${(d.getUTCDate() < 10 ? "0":"") + d.getUTCDate()}`;
    
    // Convert hour input to timestamp format
    var hourNum = +hour.substring(0, hour.length - 2);
    var isMidnight = hour === "12AM";
    var isNoon = hour === "12PM";
    var isAfternoon = hour.indexOf("PM") >= 0 && !isNoon;
    var timePortion = `${isMidnight ? "00" : isAfternoon ? hourNum + 12 : (hourNum < 10 ? "0": "") + hourNum}0000`;

    return `${datePortion}${timePortion}`;
  },
  
  /**
   * Convert a timestamp string into a Date object.
   * @param {string} [timestamp] The input timestamp, in "yyyyMMddhhmmss" format.
   * @returns {Date} The converted Date value.
   */
  timestampToDate: function(timestamp) {
    // Don't allow bogus timestamps
    if (!timestamp || timestamp.length != 14) { return null; }
    
    return new Date(
      timestamp.slice(0,4),
      timestamp.slice(4,6)-1, // Month is zero-indexed in Javascript...
      timestamp.slice(6,8),
      timestamp.slice(8,10),
      timestamp.slice(10,12),
      timestamp.slice(12,14)
      );
  }
})