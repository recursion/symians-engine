import GObj from '../core/gobj'
import winston from 'winston'

const LSTMOV = Symbol('lstmov');
const DX = Symbol('dx');
const DY = Symbol('dy');

/**
 * basic mobile object
 */
export default class Mob extends GObj {
  /**
   * Mob constructor
   * @param {Number} x - x coordinate
   * @param {Number} y - y coordinate
   * @param {EventEmitter} emitter - the sim emitter instance
   * @param {Zone} zone - the zone this object exists in
   *x=0, y=0, emitter, zone
   */
  constructor(...args){
    super(...args);

    this[DX] = 0;
    this[DY] = 0;

    this[LSTMOV] = 0;
  }

  /* return the objects directional x vector */
  get dx(){
    return this[DX];
  }

  /* set the objects directional x vector */
  set dx(val){
    this[DX] = val;
  }

  /* return the objects directional y vector */
  get dy(){
    return this[DY];
  }

  /* set the objects directional y vector */
  set dy(val){
    this[DY] = val;
  }

  /**
   * called on engine heartbeats
   */
  update(){
    if(Date.now() - this[LSTMOV] > 1000){
      this.move();
      this[LSTMOV] = Date.now();
      this.emit('save', this);
    }
  }

  /**
   * move in a given direction
   */
  move(dir){
    const newX = this.x + this.dx;
    const newY = this.y + this.dy;
    if (newX > this.zone.width || newX <= 0){
      this[DX] = -this.dx;
    }
    if (newY > this.zone.height || newY < 0){
      this[DY] = -this.dy;
    }
    this.x += this.dx;
    this.x += this.dy;
  }
}

