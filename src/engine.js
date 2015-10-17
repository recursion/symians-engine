//import Promise from 'bluebird'
//import EventEmitter from 'eventEmitter3'
//import Store from './store'
import {loader} from 'symians-models'

// This will be the event emitter for all ingame objects
//const emitter = new EventEmitter();

// setup our store - this will listen for
// update/change/save events and send them
// to our long term storage.
//const store = new Store(emitter);

// load the zone or create a new one
//let zone;
loader.loadOrCreate()
  .then((zone)=>{
    //console.log(zone);
  });
