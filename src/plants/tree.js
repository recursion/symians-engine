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
      growable: new Growable(this.trait('size'), genGrowthRate())
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

    // if older than 1000 ticks and ..
    if(this.age > 100 && time % 100 === 0){
      // pick a random nearby spot
      this.emit('selectRandomNearbyLocation', this, 2, (loc)=>{
        if(loc && !loc.isBlocked){
          loc.add(new Tree(loc.position.x, loc.position.y, this.emitter));
        }
      });
    }

    if(changed){
      this.emit('change', this);
    }
  }

}

/**
 * returns a random number between 99 an 20
 */
function genGrowthRate(){
  return Math.floor(Math.random() * (100 - 20) + 20);
}
