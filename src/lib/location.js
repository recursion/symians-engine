import GObj from './gobj'

// private
const CONTENTS = Symbol('contents');
const BLOCKED = Symbol('blocked');
const ZONE = Symbol('zone');
const TYPE = Symbol('type');
const X = Symbol('x');
const Y = Symbol('y');


/**
 * A location is the smallest map unit. Locations are containers for all other objects in the game. A 'tile' if you will. A game object must always be within/at a location.
 */
export default class Location extends GObj {
  constructor(type='grass', x=0, y=0, zone={}, emitter){
    super('location', x, y, zone, emitter);
    this[TYPE] = type;
    this[ZONE] = zone;
    this[BLOCKED] = false;
    this[X] = x;
    this[Y] = y;
    this[CONTENTS] = [];
  }

  /**
   * getter for the locations type
   */
  get type(){
    return this[TYPE];
  }
  /**
   * getter for the locations x coord
   */
  get x(){
    return this[X];
  }

  /**
   * getter for the locations y coord
   */
  get y(){

    return this[Y];
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
}
