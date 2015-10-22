import GObj from '../core/gobj'
//import winston from 'winston'
import Direction from './direction'

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
    this.direction = new Direction();
  }

  //update
    // state
    // state.act()
}

/*
function move(obj, dir){
  obj.direction.move(dir);
  obj.emit('move', obj);
}
*/
