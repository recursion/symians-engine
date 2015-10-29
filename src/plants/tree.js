import GObj from '../core/gobj'
//import winston from 'winston'
//import Trait from '../core/trait'
import Growable from '../behaviors/growable'

const privateMembers = new WeakMap();

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
    const privs = {
      blocks: true,
      growable: new Growable(this, [200, 100])
    };
    privateMembers.set(this, privs);
  }

  /**
   * called on sim heartbeat.
   */
  update(time){
    super.update(time);

    let changed = false;
    if(privateMembers.get(this).growable.grow(time)){
      changed = true;
    }

    if(changed){
      this.emit('change', this);
    }
  }

}
