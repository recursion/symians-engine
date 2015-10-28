import Promise from 'bluebird'
//import winston from 'winston'
import redis from 'redis'

const client = redis.createClient();
Promise.promisifyAll(redis.RedisClient.prototype);

export const dirNames = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];
export const directions = {
  n: [0, -1],
  ne: [1, -1],
  e: [1, 0],
  se: [1, 1],
  s: [0, 1],
  sw: [-1, 1],
  w: [-1, 0],
  nw: [-1, -1]
};

/**
 * register event handlers for system emitter
 * @param {EventEmitter3} emitter - the system event emitter
 */
export function registerHandlers(emitter, app){
  emitter.on('zoneCreated', publishZone);
  emitter.on('selectRandomNearbyLocation', selectRandomNearbyLocation);

  /**
   * select a random location within Range tiles from obj's current location
   * @param {Point} startLoc - the location to start from
   * @param {Number} range - the amount of tiles to go from center
   * @param {Function} callback - function to call once location is found
   */
  function selectRandomNearbyLocation(startLoc, range = 1, callback){

    let [x, y] = directions[dirNames[randy()]];

    x *= limitedRandy(range, 1);
    y *= limitedRandy(range, 1);

    x = startLoc.position.x + x;
    y = startLoc.position.y + y;

    const loc = app.zone.getLocation(x, y);
    callback(loc);
  }
}

/**
 * handler for the zoneCreated event
 * publishes the zone data to redis pub/sub
 * @param {Zone} - zone - a zone instance
 */
function publishZone(zone){
  client.publish('zoneCreated', JSON.stringify({
      width: zone.width,
      height: zone.height,
      locations: zone.jsonPrepLocations()
    })
  );
}

function limitedRandy(max, min){
  return Math.floor(Math.random() * (max - min) + min);
}

export function randy(){
  return Math.floor(Math.random() * dirNames.length);
}

