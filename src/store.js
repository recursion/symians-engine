import Promise from 'bluebird'
import winston from 'winston'
import redis from 'redis'

const client = redis.createClient();
Promise.promisifyAll(redis.RedisClient.prototype);

let growCache = [];

/**
 * register event handlers for system emitter
 * @param {EventEmitter3} emitter - the system event emitter
 */
export default function(emitter){
  //emitter.on('create', create);
  //emitter.on('save', save);
  emitter.on('zoneCreated', publishZone);
  emitter.on('grow', grow);
}

/**
 * publish an objects changes
 */
function grow(obj){
  growCache.push({size: obj.size, id: obj.id});
  if (growCache.length > 99){
    client.publish('grow', JSON.stringify(growCache));
    growCache = [];
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

/**
 * publish and save new object
 */
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

/**
 * saves an object to redis store
 */
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
