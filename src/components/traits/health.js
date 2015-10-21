const HEALTH = Symbol('health');

export default class Health {
  constructor(health = 100){
    this[HEALTH] = health;
  }
  isAlive(){
    return this[HEALTH] > 0;
  }
  get(){
    return this[HEALTH];
  }
  set(val){
    this[HEALTH] = val;
  }
}
/*
 * the way id like the language to work.
function Health(h=100){
  let health = h;
  return (x)=>{
    if(x){
      health = x;
    } else {
      return health;
    }
  };
}
*/
