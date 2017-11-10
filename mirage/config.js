import config from '../config/environment';
import { buildings } from './data/buildings';
import { rooms } from './data/rooms';

export default function() {
  // Ignore Bookings requests
this.passthrough(`${config.APP.BookingHost}/${config.APP.BookingNamespace}/${config.APP.BookingEndpoint}`);
  
  // Get other requests via data below
  this.namespace = '/api';
  
  this.get('/bldgs', function() {
    return buildings;
  });

  this.get('/rooms', function (schema, request) {
    let filteredRooms = rooms.data;
    
    let queryParams = request.queryParams;
    let buildingIds = queryParams.buildings;
    let roomIds = queryParams.rooms;
    let minCapacity = +queryParams.minCapacity;
    let maxCapacity = +queryParams.maxCapacity;
    
    if (buildingIds) {
      filteredRooms = filteredRooms
        .filter(item => { return buildingIds.indexOf(item.attributes.bldg) >= 0; });
    }
    if (roomIds) {
      filteredRooms = filteredRooms
        .filter(item => { return roomIds.indexOf(item.attributes.room) >= 0; });
    }
    if (minCapacity) {
      filteredRooms = filteredRooms
        .filter(item => { return item.attributes.capacity >= minCapacity; });
    }
    if (maxCapacity) {
      filteredRooms = filteredRooms
        .filter(item => { return item.attributes.capacity <= maxCapacity; });
    }
    
    return { data: filteredRooms };
  });
}
