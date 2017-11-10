import Ember from 'ember';

/**
 * Controller for the Calendar route
 */
export default Ember.Controller.extend({
  /** A list of accepted query parameters with the Calendar route */
  queryParams: ['buildings', 'rooms', 'minCapacity', 'maxCapacity', 'date'],
  /** Building names for filtering room list */
  buildings: "",
  /** Room names for filtering room list */
  rooms: "",
  /** Smallest room size */
  minCapacity: 0,
  /** Largest room size */
  maxCapacity: 0,
  /** Curent date displayed on the calendar */
  date: new Date(),
  
  /**
   * Computed property for rooms, filtered based on the input query parameters
   */
  filteredRooms: Ember.computed('buildings', 'rooms', 'minCapacity', 'maxCapacity', function() {
    // Get values of the query parameters
    let buildings = this.get('buildings');
    let rooms = this.get('rooms');
    let minCapacity = this.get('minCapacity');
    let maxCapacity = this.get('maxCapacity');
    
    // Use store to get filtered data
    return this.get('store').query('room', {
      buildings: buildings,
      rooms: rooms,
      minCapacity: minCapacity,
      maxCapacity: maxCapacity      
    });
  })
});
