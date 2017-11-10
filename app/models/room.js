import DS from 'ember-data';

/**
 * Room model
 */
export default DS.Model.extend({
  bldg: DS.attr(),
  room: DS.attr(),
  desc: DS.attr(),
  photo: DS.attr(),
  capacity: DS.attr('number'),
  teaching_station: DS.attr('boolean'),
  teaching_station_junior: DS.attr('boolean')
});
