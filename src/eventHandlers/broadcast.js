import Promise from 'bluebird'
import winston from 'winston'
import redis from 'redis'

const broadcastInterval = 250;

const client = redis.createClient();
Promise.promisifyAll(redis.RedisClient.prototype);

let updates = [];
let lastBroadcast = 0;

/**
 * register event handlers for system emitter
 * @param {EventEmitter3} emitter - the system event emitter
 */
export function registerHandlers(emitter){
  emitter.on('create', create);
  emitter.on('change', change);
}

/**
 * publish events queue
 * @param {String} type - type of event
 * TODO Depracate obj
 * @param {GObj} obj - the object experiencing the event
 * TODO implement Event object (instead of object)
 * @param {Event} event - all the data the client needs about the event
 */
function broadcast(type, obj){

  updates.push({type: type, object: obj.prettify()});

  if (lastBroadcast === 0 || Date.now() - lastBroadcast >= broadcastInterval){
    client.publish('update', JSON.stringify(updates));
    updates = [];
    lastBroadcast = Date.now();
  }
}

/**
 * object changes handler
 */
function change(obj){
  broadcast('change', obj);
}

/**
 * object creation handler
 */
function create(type, obj){

  broadcast('create', obj);
}
