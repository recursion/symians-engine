import GObj from '../core/gobj'
//import winston from 'winston'
import Growable from '../behaviors/growable'

const privateMembers = new WeakMap();

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
      growable: new Growable(this.trait('size'))
    };
    privateMembers.set(this, privs);
  }

  /**
   * called on sim heartbeat.
   */
  update(time){
    if(privateMembers.get(this).growable.grow(time)){
      this.emit('grow', this);
    }
    if(time % 10 === 0){
      // try to reproduce?
    }
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


  /*
  toString(){
    let str = super.toString();
    str = str.slice(0, -1);
    str += `, Size: ${this.size}}`;
    return str;
  }
  */

}
