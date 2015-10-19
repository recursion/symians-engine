const EVTMGR = Symbol('evtmgr');
const LSTMOV = Symbol('lstmov');
const ZONE = Symbol('zone');

export default class mob {
  constructor(x=0, y=0, emitter, zone){
    this.x = x;
    this.y = y;

    this.dx = 1;
    this.dy = 1;

    this[ZONE] = zone;
    this[LSTMOV] = 0;
    this[EVTMGR] = emitter;
    this[EVTMGR].on('heartbeat', this.update.bind(this));

    //TODO Fix this hardcoded value
    this[EVTMGR].emit('create', this, 'mob', 1);
  }
  update(){
    if(Date.now() - this[LSTMOV] > 1000){
      this.move();
      this[LSTMOV] = Date.now();
      this[EVTMGR].emit('save', this);
    }
  }
  move(){
    const newX = this.x + this.dx;
    const newY = this.y + this.dy;
    if (newX > this[ZONE].width || newX <= 0){
      this.dx = -this.dx;
    }
    if (newY > this[ZONE].height || newY < 0){
      this.dy = -this.dy;
    }
    console.log(this.x, this.dx);
    console.log(this.y, this.dy);
    this.x += this.dx;
    this.y += this.dy;
  }
}

