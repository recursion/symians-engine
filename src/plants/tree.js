import GObj from '../core/gobj'
//import winston from 'winston'
//import Trait from '../core/trait'
import Growable from '../behaviors/growable'

const privateMembers = new WeakMap();

const SPAWNRATE = 500;
const GROWTHRATE = [20, 10];

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
      growable: new Growable(this, GROWTHRATE, SPAWNRATE)
    };
    privateMembers.set(this, privs);
    this.emit('create', this.constructor.name, this);
  }

  /**
   * called on sim heartbeat.
   */
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
    o.growthRate = privateMembers.get(this).growable.growthRate;
    return o;
  }
}
