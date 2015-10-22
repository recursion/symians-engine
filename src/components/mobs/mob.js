import GObj from '../core/gobj'
//import winston from 'winston'
import Direction from './direction'

const privates = new WeakMap();

/**
 * basic mobile object
 */
export default class Mob extends GObj {
  /**
   * Mob constructor
   * @param {Number} x - x coordinate
   * @param {Number} y - y coordinate
   * @param {EventEmitter} emitter - the sim emitter instance
   *        x=0, y=0, emitter
   */
  constructor(...args){
    super(...args);
    const priv = {
      direction: new Direction()
    };

    privates.set(this, priv);

  }

  get direction(){
    const d = privates.get(this).direction;
    return [d.x, d.y];
  }

  toString(){
    let str = super.toString();
    str = str.slice(0, -1);
    str += `, Direction: x: ${this.direction[0]}, y: ${this.direction[0]}}`;
    return str;
  }
}

/*
function move(obj, dir){
  obj.direction.move(dir);
  obj.emit('move', obj);
}
*/
