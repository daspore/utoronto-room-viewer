import DS from 'ember-data';

/**
 * A default adapter, for collecting data against an '/api' namespace.
 * Currently, /api requests are sent to Mirage with hard-coded mock data.
 */
export default DS.JSONAPIAdapter.extend({
  namespace: 'api'
});