import winston from 'winston'
import Position from './position'
import EventEmitter from 'eventemitter3'

const privates = new WeakMap();

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

    const privs = {
      position: new Position(x, y),
      age: 0,
      emitter: emitter
    };

    // all gobjects have a position
    privates.set(this, privs);
    privates.set(this, privs);
    privates.set(this, privs);
    emitter.on('heartbeat', this.update.bind(this));

    /**
     * Emit a creation event
     * (except for locations)
     **/
    if(this.constructor.name !== 'location'){
      emitter.emit('create', this.constructor.name, this);
      //winston.info(`created object: ${this}`);
    }
  }

  /**
   * returns an object with the position.x and position.y property
   * @returns {Position}
   */
  get position(){
    let position = privates.get(this).position;
    return {x: position.x, y: position.y};
  }

  /* wrap event emitter on */
  on(...args){
    let emitter = privates.get(this).emitter;
    emitter.on(...args);
  }

  /* wrap event emitter emit */
  emit(...args){
    let emitter = privates.get(this).emitter;
    emitter.emit(...args);
  }

  get age(){
    const age = privates.get(this).age;
    return age;
  }

  /**
   * called on engine heartbeat
   * @param {Number} - The simulation world time
   */
  update(time){
    privates.get(this).age++
  }

  /**
   * toString override
   */
  toString(){
    return `${this.constructor.name} {x: ${this.position.x}, y: ${this.position.y}, age: ${this.age}}`;
  }
}

