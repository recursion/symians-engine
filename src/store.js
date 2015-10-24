import Promise from 'bluebird'
import winston from 'winston'
import redis from 'redis'

const client = redis.createClient();
Promise.promisifyAll(redis.RedisClient.prototype);

export default function(emitter){
  //emitter.on('create', create);
  //emitter.on('save', save);
  emitter.on('zoneCreated', zoneCreated);
}

/**
 * handler for the zoneCreated event
 * publishes the zone to redis
 * @param {Zone} - zone - a zone instance
 */
function zoneCreated(zone){

  /** isolate locations and game objects for publish */
  const locs = prepLocations(zone.locations);

  /**
   * publish the zone info
   */
  client.publish('zoneCreated', JSON.stringify({
      width: zone.width,
      height: zone.height,
      locations: locs
    })
  );
}

/**
 * Prepare zone locations for publish
 * by seperating nested objects out into a seperate object
 * @param {Array} locations - an array of zone locations
 * TODO create a method for extracting deeper levels of nesting
 */
function prepLocations(locations){
  let locs = [];
  locations.forEach((loc)=>{
    locs.push(loc.prettify());
  });
  return locs;
}

function create(obj, type='mob', zoneId){

  winston.info('Creating: ', type, obj);
  // construct the iterator
  const idKey = `zone:${zoneId}:${type}`;

  // iterate it and generate the id
  client.incrAsync(idKey)
    .then((objId)=>{
      // create the object key
      const objKey = `zone:${zoneId}:${type}s:${objId}`;

      // add the key to the object itself
      obj.key = objKey;

      // create an object in the db
      client.hmset(objKey, obj);

      // add it to the store list
      client.rpush(`zone:${zoneId}:${type}s`, `zone:${zoneId}:${type}s:${objId}`);

      client.publish('create', JSON.stringify(obj));
    });

}

function save(obj){

  /*
  console.log('Yo!', obj);
  // look the object up by its id
  client.hgetallAsync(obj._key)
    .then((object)=>{
      console.log(object);
      client.hmset(obj.key, obj);
    });
  */
  // set its new data
  client.hmset(obj.key, obj);
  client.publish('update', JSON.stringify(obj));
}
