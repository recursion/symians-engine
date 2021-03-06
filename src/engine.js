//import Promise from 'bluebird'
import winston from 'winston'
import EventEmitter from 'eventEmitter3'

import * as ZoneEventHandlers from './eventHandlers/zoneHandlers'
import * as Broadcast from './eventHandlers/broadcast'

import Squirrel from './mobs/squirrel'
import Grass from './plants/grass'
import Tree from './plants/tree'
import Zone from './world/zone'

const DEFAULT_ZONE_WIDTH = 256;
const DEFAULT_ZONE_HEIGHT = 256;

// configure the logger
const consoleOptions = {
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
winston.add(winston.transports.Console, consoleOptions);
winston.add(winston.transports.File, fileOptions);


const worldGenOptions = [{
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

    Broadcast.registerHandlers(this.emitter, this);
    ZoneEventHandlers.registerHandlers(this.emitter, this);

    // keep a reference to the game loop
    this.loop = null;
    this.speed = 10;
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

    /*
    const startTime = Date.now();
    let lastTickTime;
    */

    winston.info('Starting engine');

    this.loop = setInterval(()=>{

      this.emitter.emit('heartbeat', this.tick);
      this.tick++;

      if(this.tick === 20){
        winston.info('Populating map!');
        this.zone.populateMap(worldGenOptions);
      }
      this.zone.time = this.tick;

      /*
      if(this.tick % 100 === 0){
        console.log(Date.now() - lastTickTime, this.tick);
      }
      lastTickTime = Date.now();
      */

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
