import Ember from 'ember';
import TimestampUtils from '../utils/timestamp-utils';

/**
 * Helper wrapper for parsing timestamps to Date objects
 */
export default Ember.Helper.helper(function (inputs) {
  return TimestampUtils.create().timestampToDate(...inputs);
});
