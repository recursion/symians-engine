//import Trait from '../core/trait'

//import winston from 'winston'
//const SIZE = Symbol('size');
const GROWTHRATE = Symbol('growthrate');
const STATE = Symbol('state');
const PARENT = Symbol('parent');

/**
 * basic living/growing/edible grass
 */
export default class Growable {

  /**
   * @param {Number} size - the initial size of the plant
   * @param {Number} growthRate - the rate at which the plant will grow
   * - the higher the number the slower the growth.
   */
  constructor(baseObject, growthRateRange=[2, 1]){
    this[PARENT] = baseObject;
    this[STATE] = new GrowingState(this);
    this[GROWTHRATE] = genRandomGrowthRate(growthRateRange);

  }

  /**
   * should be called from the objects update method
   * when time is evenly divisible by growthRate, we
   * increase the size property.
   * @param {Number} time - sim time
   * @returns {Boolean} - whether or not we grew
   */
  grow(time){
    return this[STATE].grow(time);
  }

  get parent(){
    return this[PARENT];
  }

  get state(){
    return this[STATE].constructor.name;
  }

  set state(state){
    this[STATE] = state;
  }
}

/**
 * returns a number between range[0] and range[1]
 */
function genRandomGrowthRate(range){
  return Math.floor(Math.random() * (range[0] - range[1]) + range[1]);
}

/**
 * state for active growth
 */
class GrowingState {

  constructor(stateManager){
    this.stateManager = stateManager;
  }

  grow(time){
    if(this.stateManager.parent.age > 100 && this.stateManager.parent.size > 8 &&  time % 100 === 0){
      this.stateManager.state = new SpawningState(this.stateManager);
      return true;
    }

    if(this.stateManager[PARENT].size === 15){
      this.stateManager.state = new DyingState(this.stateManager);
      return true;
    }

    if(time % this.stateManager[GROWTHRATE] === 0 && this.stateManager.parent.size < 16){
      this.stateManager.parent.trait('size').value++;
      return true;
    }
    return false;
  }
}

class SpawningState {
  constructor(stateManager){
    this.stateManager = stateManager;
  }

  grow(time){
    // pick a random nearby spot
    this.stateManager.parent.emit('selectRandomNearbyLocation', this, 2, (loc)=>{
      if(loc && !loc.isBlocked){
        loc.add(new Grass(loc.position.x, loc.position.y, this.emitter));
        this.stateManager[STATE] = new GrowingState(this.stateManager);
      }
    });
  }
}

class DyingState {
  constructor(stateManager){
    this.stateManager = stateManager;
  }

  grow(time){
    // if older than 1000 ticks and ..
    if(this.stateManager.parent.age > 100 && this.stateManager.parent.size > 8 &&  time % 100 === 0){
      // pick a random nearby spot
      this.stateManager.parent.emit('selectRandomNearbyLocation', this, 2, (loc)=>{
        if(loc && !loc.isBlocked){
          loc.add(new Grass(loc.position.x, loc.position.y, this.emitter));
        }
      });
    }
  }
}
