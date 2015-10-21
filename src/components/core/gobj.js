import winston from 'winston'
import EventEmitter from 'eventemitter3'

/**      PRIVATE CONSTANTS  **/
const EVTMGR = Symbol('evtmgr');
const ZONE = Symbol('zone');
const X = Symbol('xcoord');
const Y = Symbol('ycoord');

/**
 * base class for all other game items.
 */
export default class GObj {
  /**
   * @param {Number} x - the x coordinate
   * @param {Number} y - the y coordinate
   * @param {Zone} zone - a reference to the objects zone
   * @param {EventEmitter} the simulations event emitter
   */
  constructor(x=0, y=0, zone={}, emitter){
    if (!emitter || !emitter instanceof EventEmitter){
      throw new Error('emitter must be an instance of eventemitter3!');
    }

    this[X] = x;
    this[Y] = y;

    this[ZONE] = zone;
    this[EVTMGR] = emitter;

    this[EVTMGR].on('heartbeat', this.update.bind(this));

    /**
     * Emit a creation event
     * (except for locations)
     **/
    if(this.constructor.name !== 'location'){
      this[EVTMGR].emit('create', this.constructor.name, this);
    }

    // log it
    winston.info(`created object: ${this}`);
  }


  /* getter for zone */
  get zone(){
    return this[ZONE];
  }

  /* getter for zone */
  set zone(z){
    // TODO validate instance of zone
    this[ZONE] = z;
  }

  /* wrap event emitter on */
  on(...args){
    this[EVTMGR].on(...args);
  }

  /* wrap event emitter emit */
  emit(...args){
    this[EVTMGR].emit(...args);
  }

  /**
   * getter for the locations x coord
   * @return {Number} - the objects x location
   */
  get x(){
    return this[X];
  }

  /**
   * setter for the locations x coord
   * @param {Number} - the new x value
   * @return {Number} - the objects x location
   */
  set x(val){
    if (val >= 0 && val < this[ZONE].width){
      this[X] = val;
    }
  }

  /**
   * getter for the locations y coord
   * @return {Number} - the objects y location
   */
  get y(){
    return this[Y];
  }

  /**
   * setter for the locations y coord
   * @param {Number} - the new Y value
   * @return {Number} - the objects y location
   */
  set y(val){
    if (val >= 0 && val < this[ZONE].height){
      this[Y] = val;
    }
  }

  /**
   * called on engine heartbeat
   * @param {Number} - The simulation world time
   */
  update(time){
  }

  /**
   * toString override
   */
  toString(){
    return `${this.constructor.name} {x: ${this[X]}, y: ${this[Y]}}`;
  }
}

