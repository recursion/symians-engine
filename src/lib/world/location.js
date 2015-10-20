import GObj from '../core/gobj'

// private
const CONTENTS = Symbol('contents');
const BLOCKED = Symbol('blocked');
const TYPE = Symbol('type');



/**
 * A location is the smallest map unit. Locations are containers for all other objects in the game. A 'tile' if you will. A game object must always be within/at a location.
 *type=Location.types.GRASS, x=0, y=0, zone={}, emitter
 */
export default class Location extends GObj {
  constructor(type, ...rest){
    super(...rest);
    this[BLOCKED] = false;
    this[TYPE] = type;
    this[CONTENTS] = [];
  }

  /**
   * @returns {Boolean}
   * true if the location is blocked
   * false if the location is open
   */
  get isBlocked(){
    // check the object at the top of the
    // contents stack and see if it blocks
    return this[BLOCKED];
  }

  /**
   * @returns {Array}
   * the list of items on/at this location
   */
  get contents(){
    return this[CONTENTS].slice();
  }

  get type(){
    return this[TYPE];
  }

  /**
   * move an item to this location
   * @param {GObj} obj - the object to move here
   * @returns {Boolean}
   */
  add(obj){
    if(obj.blocks){
      this[BLOCKED] = true;
    }

    // validate this addition
      // return false if not valid

    this[CONTENTS].push(obj);
    return true;
    // emit an event ?
  }

  /**
   * remove an item from this location
   * @return {GObj}
   */
  remove(obj){
    const idx = this[CONTENTS].indexOf(obj);
    if (idx === -1){
      return null;
    }
    else {
      if(obj.blocks){
        this[BLOCKED] = false;
      }
      return this[CONTENTS].splice(idx, 1)[0];
    }
  }
  /**
   * return an object with location type constants
   */
  static types(){
    return {
      GRASS: 'grass',
      AIR: 'air',
      DIRT: 'dirt',
      WATER: 'water'
    };
  }
}
