//import Promise from 'bluebird'
import winston from 'winston'
import EventEmitter from 'eventEmitter3'
import Store from './store'
//import {loader} from 'symians-models'
import {Zone} from './lib/zone'

const DEFAULT_ZONE_WIDTH = 256;
const DEFAULT_ZONE_HEIGHT = 256;

/*
 * zone engine
 * this drives all action inside of a zone
 * and emits changes/updates to state
 */
export default class Engine{
  constructor(id=0){
    this.emitter = new EventEmitter();
    this.zone = null;
    this.loop = null;
    this.speed = 100;
    // pass the emitter to our storage component
    Store(this.emitter);
    this.init(id);
  }

  /**
   * start the engine
   */
  start(){
    winston.info('Starting engine');
    this.loop = setInterval(()=>{
      this.emitter.emit('heartbeat');
    }, this.speed);
  }

  /**
   * if given a valid zone id, load it
   * otherwise create a new one
   * @param {Number} - id
   */
  init(id=0){
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
  create(width=DEFAULT_ZONE_WIDTH, height=DEFAULT_ZONE_HEIGHT, cb){
    winston.info('Creating zone.');
    this.zone = new Zone(width, height, this.emitter);

    if(cb) cb();

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
