import GObj from '../core/gobj'
//import winston from 'winston'
import Direction from './direction'
import Trait from '../core/trait'
import Growable from '../behaviors/growable'

const privateMembers = new WeakMap();

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
    const privs = {
      growable: new Growable(this.trait('size'))
    };
    privateMembers.set(this, privs);
  }

  update(time){
    if(privateMembers.get(this).growable.grow(time)){
      this.emit('grow', this);
    }
    // check health
    // check hunger
    // check fatigue
  }

}
