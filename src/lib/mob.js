import winston from 'winston'

const EVTMGR = Symbol('evtmgr');
const LSTMOV = Symbol('lstmov');
const ZONE = Symbol('zone');
const X = Symbol('x');
const Y = Symbol('y');
const DX = Symbol('dx');
const DY = Symbol('dy');

/**
 * basic mobile object
 */
export default class Mob {
  /**
   * Mob constructor
   * @param {Number} x - x coordinate
   * @param {Number} y - y coordinate
   * @param {EventEmitter} emitter - the sim emitter instance
   * @param {Zone} zone - the zone this object exists in
   */
  constructor(x=0, y=0, emitter, zone){

    this[X] = x;
    this[Y] = y;

    this[DX] = x;
    this[DY] = y;

    this[ZONE] = zone;
    this[LSTMOV] = 0;
    this[EVTMGR] = emitter;

    this[EVTMGR].on('heartbeat', this.update.bind(this));

    //TODO Fix this hardcoded value
    this[EVTMGR].emit('create', this, 'mob', 1);
    winston.info(`Created: ${this}`);

  }

  /* return the objects x coordinate */
  get x(){
    return this[X];
  }

  /* return the objects y coordinate */
  get y(){
    return this[Y];
  }

  /* return the objects directional x vector */
  get dx(){
    return this[DX];
  }

  /* return the objects directional y vector */
  get dy(){
    return this[DY];
  }

  /**
   * called on engine heartbeats
   */
  update(){
    if(Date.now() - this[LSTMOV] > 1000){
      this.move();
      this[LSTMOV] = Date.now();
      this[EVTMGR].emit('save', this);
    }
  }

  /**
   * move in a given direction
   */
  move(dir){
    const newX = this.x + this.dx;
    const newY = this.y + this.dy;
    if (newX > this[ZONE].width || newX <= 0){
      this[DX] = -this.dx;
    }
    if (newY > this[ZONE].height || newY < 0){
      this[DY] = -this.dy;
    }
    this[X] += this.dx;
    this[Y] += this.dy;
  }
}

