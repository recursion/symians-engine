import GObj from '../core/gobj'
//import winston from 'winston'
import Trait from '../core/trait'
import Growable from '../behaviors/growable'

const SIZE = Symbol('size');
const GROWABLE = Symbol('growable');

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
    this[SIZE] = new Trait(0);
    this[GROWABLE] = new Growable(this[SIZE]);
  }

  get size(){
    return this[SIZE];
  }

  update(time){

    this[GROWABLE].grow(time);

    if(time % 10 === 0){
      // try to reproduce?
    }
  }

}
