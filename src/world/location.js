import GObj from '../core/gobj'

const privates = new WeakMap();

/**
 * A location is the smallest map unit. Locations are containers for all other objects in the game. A 'tile' if you will. A game object must always be within/at a location.
 *type=Location.types.GRASS, x=0, y=0, zone={}, emitter
 */
export default class Location extends GObj {
  constructor(type, ...rest){
    super(...rest);
    const priv = {
      blocked: false,
      type: type,
      contents: []
    };
    privates.set(this, priv);
  }

  /**
   * @returns {Boolean}
   * true if the location is blocked
   * false if the location is open
   */
  get isBlocked(){
    // check the object at the top of the
    // contents stack and see if it blocks
    const blocked = privates.get(this).blocked;
    return blocked;
  }

  /**
   * @returns {Array}
   * the list of items on/at this location
   */
  get contents(){
    const contents = privates.get(this).contents;
    return contents.slice();
  }

  get type(){
    return privates.get(this).type;
  }

  /**
   * move an item to this location
   * @param {GObj} obj - the object to move here
   * @returns {Boolean}
   */
  add(obj){
    if(obj.blocks){
      privates.get(this).blocked = true;
    }

    // validate this addition
      // return false if not valid

    privates.get(this).contents.push(obj);
    return true;
    // emit an event ?
  }

  /**
   * remove an item from this location
   * @return {GObj}
   */
  remove(obj){
    const idx = privates.get(this).contents.indexOf(obj);
    if (idx === -1){
      return null;
    }
    else {
      if(obj.blocks){
        privates.get(this).blocked = false;
      }
      return privates.get(this).contents.splice(idx, 1)[0];
    }
}

/**
 * returns an object ready to be json stringified
 */
  prettify(){
    let contents = [];
    this.contents.forEach((o)=>{
      if(o.prettify){
        contents.push(o.prettify());
      } else {
        console.log('found: ', o);
      }
    });

    return {
      x: this.position.x,
      y: this.position.y,
      type: privates.get(this).type,
      isBlocked: this.isBlocked,
      contents: contents
    };
  }

/**
 * returns a json string representing the object
 */
  toJSON(){
    return JSON.stringify(this.prettify());
  }

  /**
   * return an object with location type constants
   */
  static types(){
    return {
      GRASS: 'grass',
      AIR: 'air',
      DIRT: 'dirt',
      SAND: 'sand',
      ROCK: 'rock',
      WATER: 'water'
    };
  }
}
