import winston from 'winston'

/**      PRIVATE CONSTANTS  **/
const EVTMGR = Symbol('evtmgr');
const ZONE = Symbol('zone');
const STATE = Symbol('state');
const TYPE = Symbol('type');
//const PARENT = Symbol('parent');
const X = Symbol('x');
const Y = Symbol('y');

/**
 * base class for all other game items.
 */
export default class GObj {
  /**
   * @param {String} type - the type of object
   * @param {Number} x - the x coordinate
   * @param {Number} y - the y coordinate
   * @param {Zone} zone - a reference to the objects zone
   * @param {EventEmitter} the simulations event emitter
   */
  constructor(type='none', x=0, y=0, zone={}, emitter){
    if (!emitter){
      throw new Error('Must have an emitter!');
    }
    this[X] = x;
    this[Y] = y;

    this[TYPE] = type;
    this[STATE] = null;
    this[ZONE] = zone;
    this[EVTMGR] = emitter;
    this[EVTMGR].on('heartbeat', this.update.bind(this));

    //TODO Fix this hardcoded value
    this[EVTMGR].emit('create', type, this);

    // log it
    winston.info(`created object: ${this}`);
  }

  /**
   * getter for the locations x coord
   * @return {Number} - the objects x location
   */
  get x(){
    return this[X];
  }

  /**
   * getter for the locations y coord
   * @return {Number} - the objects y location
   */
  get y(){
    return this[Y];
  }

  /**
   * called on engine heartbeat
   * @param {Number} - The simulation world time
   */
  update(time){
  }
}

