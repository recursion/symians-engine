const TRAIT = Symbol('trait');

/**
 * for defining any given trait
 * such as health/fatigue/strength etc
 */
export default class Trait {
  /**
   * @param {Number} trait - the starting value, defaults to 100
   */
  constructor(trait = 100){
    this[TRAIT] = trait;
  }
  get value(){
    return this[TRAIT];
  }
  set value(val){
    this[TRAIT] = val;
  }
}
