//import Promise from 'bluebird'
import winston from 'winston'
import EventEmitter from 'eventEmitter3'
import Store from './store'
import {loader} from 'symians-models'

// This will be the event emitter for all ingame objects
const emitter = new EventEmitter();

// pass the emitter to our storage component
Store(emitter);

let zone;
// load the zone or create a new one
loader.loadOrCreate(emitter)
  .then((z)=>{
    zone = z;
    start();
  });


function start(){
  winston.info('Starting engine');
  setInterval(()=>{
    emitter.emit('heartbeat');
  }, 100);

}
