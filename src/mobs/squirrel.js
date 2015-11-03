import GObj from '../core/gobj'
//import winston from 'winston'
import Growable from '../behaviors/growable'

const privateMembers = new WeakMap();

/**
 * basic mobile object
 */
export default class Squirrel extends GObj {
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
      growable: new Growable(this, [100, 50])
    };
    privateMembers.set(this, privs);
    this.emit('create', this.constructor.name, this);
  }

  update(time){
    super.update(time);

    let changed = false;
    if(privateMembers.get(this).growable.update(time)){
      changed = true;
    }

    if(changed){
      this.emit('change', this);
    }
  }

  prettify(){
    let o = super.prettify();
    o.state = privateMembers.get(this).growable.state;
    return o;
  }
}
