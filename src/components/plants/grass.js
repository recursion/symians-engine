import GObj from '../core/gobj'
//import winston from 'winston'
import Trait from '../core/trait'
import Growable from '../behaviors/growable'

const privates = new WeakMap();
const size = new Trait(0);

/**
 * basic living/growing/edible grass
 */
export default class Grass extends GObj {
  /**
   * Mob constructor
   * @param {Number} x - x coordinate
   * @param {Number} y - y coordinate
   * @param {EventEmitter} emitter - the sim emitter instance
   *        x=0, y=0, emitter
   */
  constructor(...args){
    super(...args);
    const privs = {
      size: size,
      blocks: true,
      growable: new Growable(size)
    };
    privates.set(this, privs);
  }

  get blocks(){
    return privates.get(this).blocks;
  }

  /**
   * returns the plants current size
   */
  get size(){
    return privates.get(this).size.value;
  }

  /**
   * called on sim heartbeat.
   */
  update(time){
    privates.get(this).growable.grow(time);
    if(time % 10 === 0){
      // try to reproduce?
    }
  }

  /**
   * returns an object ready to be json stringified
   */
  prettify(){
    return {
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

  toString(){
    let str = super.toString();
    str = str.slice(0, -1);
    str += `, Size: ${this.size}}`;
    return str;
  }

}
