import winston from 'winston'
import Position from './position'
import EventEmitter from 'eventemitter3'
import Trait from '../core/trait'

const privateMembers = new WeakMap();

/** used to give game objects unique ids 8**/
let gobjID = 0;

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
      id: gobjID++,
      position: new Position(x, y),
      age: 0,
      size: new Trait(0),
      blocks: true,
      emitter: emitter
    };
    privateMembers.set(this, privs);

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

  get id(){
    return privateMembers.get(this).id;
  }

  /**
   * returns an object with the position.x and position.y property
   * @returns {Position}
   */
  get position(){
    let position = privateMembers.get(this).position;
    return {x: position.x, y: position.y};
  }

  get blocks(){
    return privateMembers.get(this).blocks;
  }

  trait(t){
    return privateMembers.get(this)[t];
  }

  /**
   * returns the plants current size
   */
  get size(){
    return privateMembers.get(this).size.value;
  }

  /* wrap event emitter on */
  on(...args){
    let emitter = privateMembers.get(this).emitter;
    emitter.on(...args);
  }

  /* wrap event emitter emit */
  emit(...args){
    let emitter = privateMembers.get(this).emitter;
    emitter.emit(...args);
  }

  get age(){
    const age = privateMembers.get(this).age;
    return age;
  }

  /**
   * called on engine heartbeat
   * @param {Number} - The simulation world time
   */
  update(time){
    privateMembers.get(this).age++
  }

  /**
   * returns an object ready to be json stringified
   */
  prettify(){
    return {
      id: this.id,
      type: this.constructor.name,
      x: this.position.x,
      y: this.position.y,
      size: this.size
    };
  }

  /**
   * returns a json string representing the object
   */
  toJSON(){
    return JSON.stringify(this.prettify());
  }
  /**
   * toString override
   */
  toString(){
    return `${this.constructor.name} {x: ${this.position.x}, y: ${this.position.y}, age: ${this.age}}`;
  }
}

