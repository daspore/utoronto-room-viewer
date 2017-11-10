import Ember from 'ember';

/**
 * Component to let users select Room filter options
 */
export default Ember.Component.extend({
  /** Selected date for showing room Bookings data */
  date: new Date(),
  /** Select date, formatted for easy display as a URL query parameter*/
  dateFormatted: Ember.computed('date', function() {
    let d = this.get('date');
    
    if (!d) { return null; }
    return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
  }),
  
  /** Minimum allowed capacity */
  capacitySliderMinValue: 1,
  /** Maximum allowed capacity */
  capacitySliderMaxValue: 1000,
  /** Minimum selected capacity */
  minCapacity: 1,
  /** Minimum selected capacity */
  maxCapacity: 500,
  
  /** Complete list of Building items */
  allBuildings: [],
  /** Selected list of Building items */
  selectedBuildings: [],
  /** Selected Building items, formatted for easy display as a URL query parameter */
  selectedBuildingsFormatted: Ember.computed('selectedBuildings', function() {
    let buildings = this.get('selectedBuildings');
    
    if (!buildings) { return null; }
    return buildings.mapBy('name').join(',');
  }),
  
  /** Complete list of Room items */
  filteredRooms: [],
  /** Selected list of Room items */
  selectedRooms: [],
  /** Selected Room items, formatted for easy display as a URL query parameter */
  selectedRoomsFormatted: Ember.computed('selectedRooms', function() {
    let rooms = this.get('selectedRooms');
    
    if (!rooms) { return null; }
    return rooms.mapBy('room').join(',');
  }),
  
  /** Code to run once the data model is injected */
  didReceiveAttrs() {
    this._super(...arguments);
    // Filter initial data to unique building names only
    this.set('allBuildings', this.get('buildings'));
  },
  
  /** Actions available to the component */
  actions: {
    selectBuilding(buildings) {
      this.set('selectedBuildings', buildings);
      // Only show rooms in selected buildings
      this.set('filteredRooms', this.get('rooms').filter(room => {
        return buildings.mapBy('name').includes(room.get('bldg'));
      }));
    },
    updateMinCapacity(val) {
      this.set('minCapacity', val);
    },
    updateMaxCapacity(val) {
      this.set('maxCapacity', val);
    },
    selectRoom(room) {
      this.set('selectedRooms', room);
    },
    dateSelected(d) {
      this.set('date', d);
    }
  }
});
