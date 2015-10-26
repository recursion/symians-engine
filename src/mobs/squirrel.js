import GObj from '../core/gobj'
//import winston from 'winston'
import Direction from './direction'
import Trait from '../core/trait'

/**
 * basic mobile object
 */
export default class Squirrel extends GObj {
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
    this.health = new Trait();
    this.hunger = new Trait();
    this.fatigue = new Trait();
  }

  update(time){
    // check health
    // check hunger
    // check fatigue
  }
}
