//import Promise from 'bluebird'
import winston from 'winston'
import EventEmitter from 'eventEmitter3'

import * as EventHandlers from './handlers'
import * as Store from './store'

//import {loader} from 'symians-models'
import Squirrel from './mobs/squirrel'
import Grass from './plants/grass'
import Tree from './plants/tree'
import Zone from './world/zone'

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
   * @param {Number} width - the width of the zone (if creating on)
   * @param {Number} height - the width of the zone (if creating on)
   */
  constructor(id=0, width=DEFAULT_ZONE_WIDTH, height=DEFAULT_ZONE_HEIGHT, populate=true){
    this.emitter = new EventEmitter();
    this.tick = 0;

    this.populate = populate;

    // seed width and height data abou the zone
    // incase we are creating one.
    this.zone = {
      width: width,
      height: height
    };

    Store.registerHandlers(this.emitter, this);
    EventHandlers.registerHandlers(this.emitter, this);

    // keep a reference to the game loop
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
      this.emitter.emit('heartbeat', this.tick);
      this.tick++;
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
    //this.zone.populateMap();
    const options = [{
      item: Tree,
      clusters: {
        amount: 53,
        size: 35
      }
    },{
      item: Grass,
      clusters: {
        amount: 68,
        size: 60
      }
    },{
      item: Squirrel,
      clusters: {
        amount: 6,
        size: 6
      }
    }];

    if(this.populate){
      this.zone.populateMap(options);
    }

    this.emitter.emit('zoneCreated', this.zone);
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
