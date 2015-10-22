import GObj from '../core/gobj'
//import winston from 'winston'

const SIZE = Symbol('size');

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
    this[SIZE] = 1;
  }

  cut(){

  }

  update(time){
    if(time % 5 === 0){
      this[SIZE]++;
    }
    if(time % 10 === 0){
      // try to reproduce?
    }
  }

  //update
    // state
    // state.act()
}
