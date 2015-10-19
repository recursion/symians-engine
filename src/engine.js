//import Promise from 'bluebird'
import winston from 'winston'
import EventEmitter from 'eventEmitter3'
//import Store from './store'
//import {loader} from 'symians-models'
import Zone from './lib/zone'

const DEFAULT_ZONE_WIDTH = 256;
const DEFAULT_ZONE_HEIGHT = 256;

// configure the logger
const options = {
  timestamp: true,
  colorize: true
};
const fileOptions = {
  timestamp: true,
  filename: './engine.log',
  colorize: true
};
winston.remove(winston.transports.Console);
try{
  winston.remove(winston.transports.File);
}catch(e){}
winston.add(winston.transports.Console, options);
winston.add(winston.transports.File, fileOptions);


/**
 * zone engine
 * this drives all action inside of a zone
 * and emits changes/updates to state
 */
export default class Engine{
  /**
   * the engine constructor
   * @param {Number} id - the id of an existing zone
   */
  constructor(id=0, width=DEFAULT_ZONE_WIDTH, height=DEFAULT_ZONE_HEIGHT){
    this.emitter = new EventEmitter();
    this.tick = 0;
    this.zone = {
      width: width,
      height: height
    };
    this.loop = null;
    this.speed = 100;
    // pass the emitter to our storage component
    // Store(this.emitter);
    this.loadOrCreate(id);
  }

  /**
   * start the engine
   * initializes an interval that emits a 'heartbeat'
   * which includes a single number representing the number
   * of heartbeats that have been emitted.
   */
  start(){
    winston.info('Starting engine');
    this.loop = setInterval(()=>{
      this.emitter.emit('heartbeat', this.tick++);
    }, this.speed);
  }

  /**
   * if given a valid zone id, load it
   * otherwise create a new one
   * @param {Number} - id
   */
  loadOrCreate(id=0){
    // if we were passed a zoneId, load it
    if(id){
      this.load(id);
    // otherwise create a new zone
    } else {
      this.create();
    }
  }

  /**
   * stop the engine
   */
  stop(){
    winston.info('Stopping engine');
    clearInterval(this.loop);
    this.loop = null;
  }

  /**
   * create a new zone
   */
  create(){
    winston.info('Creating zone.', this.zone);
    this.zone = new Zone(this.emitter, this.zone.width, this.zone.height);
    this.zone.createMap();
  }

  /**
   * load a zone from storage
   */
  load(){
    /*
    // load the zone or create a new one
    loader.loadOrCreate(emitter)
      .then((z)=>{
        this.zone = z;
        start();
      });
    */
  }
}
