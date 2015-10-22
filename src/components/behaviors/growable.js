import Trait from '../core/trait'

//import winston from 'winston'
const SIZE = Symbol('size');
const GROWTHRATE = Symbol('growthrate');

/**
 * basic living/growing/edible grass
 */
export default class Growable {

  /**
   * @param {Number} size - the initial size of the plant
   * @param {Number} growthRate - the rate at which the plant will grow
   * - the higher the number the slower the growth.
   */
  constructor(size, growthRate=100){
    if(!(size instanceof Trait)){
      throw new Error('Growable requires parameter size to be instance of Trait');
    }

    this[SIZE] = size;
    this[GROWTHRATE] = growthRate;
  }

  /**
   * should be called from the objects update method
   * when time is evenly divisible by growthRate, we
   * increase the size property.
   * @param {Number} time - sim time
   */
  grow(time){
    if(time % this[GROWTHRATE] === 0){
      this[SIZE].value++;
    }
  }
}