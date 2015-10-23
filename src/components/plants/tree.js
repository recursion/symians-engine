import GObj from '../core/gobj'
//import winston from 'winston'
import Trait from '../core/trait'
import Growable from '../behaviors/growable'

const privates = new WeakMap();
const size = new Trait(0);

/**
 * basic living/growing/edible grass
 */
export default class Tree extends GObj {
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

  get size(){
    return privates.get(this).size.value;
  }

  /**
   * returns an object ready to be json stringified
   */
  toJSONREADY(){
    return this.toJSON(false);
  }

  /**
   * returns a json string representing the object
   */
  toJSON(stringify=true){
    const obj = {
      type: this.constructor.name,
      x: this.position.x,
      y: this.position.y,
      size: this.size
    };

    if (stringify){
      return JSON.stringify(obj);
    } else {
      return obj;
    }
  }
  update(time){

    privates.get(this).growable.grow(time);

    if(time % 10 === 0){
      // try to reproduce?
    }
  }

}
