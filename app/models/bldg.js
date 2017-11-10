import DS from 'ember-data';

/**
 * Building model
 */
export default DS.Model.extend({
  name: DS.attr(),
  desc: DS.attr()
});
