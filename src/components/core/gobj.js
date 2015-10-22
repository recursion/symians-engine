import winston from 'winston'
import Position from './position'
import EventEmitter from 'eventemitter3'

/**   PRIVATE CONSTANTS  **/
const EVTMGR = Symbol('evtmgr');
const POSITION = Symbol('position');
const AGE = Symbol('age');

/**
 * base class for all other game items.
 */
export default class GObj {
  /**
   * @param {Number} x - the x coordinate
   * @param {Number} y - the y coordinate
   * @param {EventEmitter} the simulations event emitter
   */
  constructor(x=0, y=0, emitter){
    if (!emitter || !emitter instanceof EventEmitter){
      throw new Error('emitter must be an instance of eventemitter3!');
    }

    // all gobjects have a position
    this[POSITION] = new Position(x, y);
    this[AGE] = 0;

    this[EVTMGR] = emitter;
    this[EVTMGR].on('heartbeat', this.update.bind(this));

    /**
     * Emit a creation event
     * (except for locations)
     **/
    if(this.constructor.name !== 'location'){
      this[EVTMGR].emit('create', this.constructor.name, this);
      //winston.info(`created object: ${this}`);
    }
  }

  /**
   * returns an object with the position.x and position.y property
   * @returns {Position}
   */
  get position(){
    return {x: this[POSITION].x, y: this[POSITION].y};
  }

  /* wrap event emitter on */
  on(...args){
    this[EVTMGR].on(...args);
  }

  /* wrap event emitter emit */
  emit(...args){
    this[EVTMGR].emit(...args);
  }


  get age(){
    return this[AGE];
  }

  /**
   * called on engine heartbeat
   * @param {Number} - The simulation world time
   */
  update(time){

    this[AGE]++;

    //winston.info(time);

  }

  /**
   * toString override
   */
  toString(){
    return `${this.constructor.name} {x: ${this[POSITION].x}, y: ${this[POSITION].y}}`;
  }
}

