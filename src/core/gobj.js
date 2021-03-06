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
  constructor(x=0, y=0, zone, emitter, size = 0, blocks = true){
    if (!emitter || !emitter instanceof EventEmitter){
      throw new Error('emitter must be an instance of eventemitter3!');
    }

    const privs = {
      id: gobjID++,
      parent: zone,
      position: new Position(x, y),
      size: new Trait(size),
      blocks: blocks,
      created: Date.now(),
      emitter: emitter
    };
    privateMembers.set(this, privs);

    emitter.on('heartbeat', this.update.bind(this));

  }

  get id(){
    return privateMembers.get(this).id;
  }

  /**
   * gametime this object was created on
   */
  get created(){
    return privateMembers.get(this).created;
  }

  get age(){
    return Math.floor((Date.now() - this.created) / 100);
  }

  get parent(){
    return privateMembers.get(this).parent;
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

  /**
   * returns an actual trait object so that subclasses can access it
   * @param {String} t - the name of the trait you want to access
   * @returns {Trait} - a trait object
   */
  trait(t){
    return privateMembers.get(this)[t];
  }

  /**
   * @returns {EventEmitter3} - the event emitter
   */
  get emitter(){
    return privateMembers.get(this).emitter;
  }

  /**
   * @returns {Number} the plants current size
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
      created: this.created,
      age: this.age,
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
