import Ember from 'ember';
import TimestampUtils from '../utils/timestamp-utils';

/**
 * Helper wrapper for serializing Date objects to a string
 */
export default Ember.Helper.helper(function (inputs) {
  return TimestampUtils.create().createTimestamp(...inputs);
});
