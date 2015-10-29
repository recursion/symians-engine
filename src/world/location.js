import Position from '../core/position'
import EventEmitter from 'eventemitter3'

const privateMembers = new WeakMap();

/**
 * A location is the smallest map unit. Locations are containers for all other objects in the game. A 'tile' if you will. A game object must always be within/at a location.
 *type=Location.types.GRASS, x=0, y=0, zone={}, emitter
 */
export default class Location {
  constructor(type, x, y, zone, emitter){
    const priv = {
      blocked: false,
      type: type,
      parent: zone,
      position: new Position(x, y),
      emitter: emitter,
      contents: []
    };
    privateMembers.set(this, priv);
    emitter.on('heartbeat', this.update.bind(this));
  }

  get parent(){
    return privateMembers.get(this).parent;
  }

  get emitter(){
    return privateMembers.get(this).emitter;
  }

  /**
   * returns an object with the position.x and position.y property
   * @returns {Position}
   */
  get position(){
    let position = privateMembers.get(this).position;
    return {x: position.x, y: position.y};
  }
  /**
   * override and do nothing
   */
  update(){}

  /* wrap event emitter on */
  on(...args){
    let emitter = privateMembers.get(this).emitter;
    emitter.on(...args);
  }

  /* wrap event emitter emit */
  emit(...args){
    let emitter = privateMembers.get(this).emitter;
    emitter.emit(...args);
  }

  /**
   * @returns {Boolean}
   * true if the location is blocked
   * false if the location is open
   */
  get isBlocked(){
    // check the object at the top of the
    // contents stack and see if it blocks
    const blocked = privateMembers.get(this).blocked;
    return blocked;
  }

  /**
   * @returns {Array}
   * the list of items on/at this location
   */
  get contents(){
    return privateMembers.get(this).contents.slice();
  }

  /**
   * @returns {String} - the type of location
   */
  get type(){
    return privateMembers.get(this).type;
  }

  /**
   * move an item to this location
   * @param {GObj} obj - the object to move here
   * @returns {Boolean}
   */
  add(obj){
    if(this.isBlocked){
      return false;
    }

    if(obj.blocks){
      privateMembers.get(this).blocked = true;
    }

    privateMembers.get(this).contents.push(obj);
    return true;
  }

  /**
   * remove an item from this location
   * @return {GObj}
   */
  remove(obj){
    const idx = privateMembers.get(this).contents.indexOf(obj);
    if (idx === -1){
      return null;
    }
    else {
      if(obj.blocks){
        privateMembers.get(this).blocked = false;
      }
      return privateMembers.get(this).contents.splice(idx, 1)[0];
    }
  }

  /**
   * returns an object ready to be json stringified
   */
  prettify(){
    const contents = this.contents.map((o)=>{
      return o.prettify();
    });

    return {
      x: this.position.x,
      y: this.position.y,
      type: privateMembers.get(this).type,
      isBlocked: this.isBlocked,
      contents: contents
    };
  }

  /**
   * returns a prettified string representing the object
   */
  toString(){
    return this.prettify().toString();
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
