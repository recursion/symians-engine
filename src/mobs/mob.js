import GObj from '../core/gobj'
//import winston from 'winston'
import Direction from './direction'

const privateMembers = new WeakMap();

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

    privateMembers.set(this, priv);

  }

  /**
   * @returns {Point} - an object with the dx and dy variable
   */
  get direction(){
    const d = privateMembers.get(this).direction;
    return {x: d.x, y: d.y};
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
      dx: this.direction.x,
      dy: this.direction.y,
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
   * @returns {String} - string representation of the object
   */
  toString(){
    let str = super.toString();
    str = str.slice(0, -1);
    str += `, Direction: x: ${this.direction[0]}, y: ${this.direction[0]}}`;
    return str;
  }
}

/*
 * this should be called automatically on heartbeat
 * and apply direction to position per this.speed?
 * type of thing
function move(obj, dir){
  obj.direction.move(dir);
  obj.emit('move', obj);
}
*/
