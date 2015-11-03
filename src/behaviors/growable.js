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
  constructor(baseObject, growthRateRange=[2, 1], spawnRate = 100, maxSize=16){
    this[PARENT] = baseObject;
    this[STATE] = new GrowingState(this);
    this[GROWTHRATE] = genRandomGrowthRate(growthRateRange);
    this.spawnRate = spawnRate;
    this.maxSize = maxSize;
  }

  get growthRate(){
    return this[GROWTHRATE];
  }

  get parent(){
    return this[PARENT];
  }

  /**
   * should be called from the objects update method
   * when time is evenly divisible by growthRate, we
   * increase the size property.
   * @param {Number} time - sim time
   * @returns {Boolean} - whether or not we grew
   */
  update(time){
    return this[STATE].update(time);
  }

  get state(){
    return this[STATE].constructor.name;
  }

  set state(state){
    this[STATE] = state;
  }
}


/**
 * state for active growth
 */
class GrowingState {

  constructor(stateManager){
    this.stateManager = stateManager;
    this.lastGrew = 0;
  }

  update(time){
    const target = this.stateManager.parent;
    if(target.age > 10 && target.size > 4 &&  time % 10 === 0){
      this.stateManager.state = new SpawningState(this.stateManager);
      return true;
    }

    if(target.size === 115){
      this.stateManager.state = new DyingState(this.stateManager);
      return true;
    }

    if(time - this.lastGrew > this.stateManager.growthRate && target.size < this.stateManager.maxSize){
      target.trait('size').value++;
      this.lastGrew = time;
      return false;
    }
    return false;
  }
}

class SpawningState {
  constructor(stateManager){
    this.stateManager = stateManager;
    this.lastSpawn = 0;
  }

  update(time){
    const target = this.stateManager.parent;

    if (spawnFilter(this, time)){
      // pick a random nearby spot
      let loc = target.parent.selectRandomNearbyLocation(target, 2);

      if(loc && !loc.isBlocked){
        loc.add(
          new target.constructor(
            loc.position.x,
            loc.position.y,
            target.parent,
            target.emitter
        ));

        this.stateManager.state = new GrowingState(this.stateManager);
        this.lastSpawn = time;

        return true;
      }
    } else {
      this.stateManager.state = new GrowingState(this.stateManager);
      return false;
    }
  }
}

function spawnFilter(spawnable, time){
  return time - spawnable.lastSpawn > spawnable.stateManager.spawnRate;
}

class DyingState {
  constructor(stateManager){
    this.stateManager = stateManager;
  }

  update(time){
  }
}

/**
 * returns a number between range[0] and range[1]
 */
function genRandomGrowthRate(range){
  return Math.floor(Math.random() * (range[0] - range[1]) + range[1]);
}
