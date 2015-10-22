const X = Symbol('dx');
const Y = Symbol('dy');
const POSITION = Symbol('position');

export default class Direction {
  constructor(pos){
    this[X] = 0;
    this[Y] = 0;
    this[POSITION] = pos;
  }

  /**
   * getter for the locations x coord
   * @return {Number} - the objects x location
   */
  get x(){
    return this[X];
  }

  /**
   * setter for the locations x coord
   * @param {Number} - the new x value
   * @return {Number} - thebounds objects x location
   */
  set x(val){
    this[X] = val;
  }

  /**
   * getter for the locations y coord
   * @return {Number} - the objects y location
   */
  get y(){
    return this[Y];
  }

  /**
   * setter for the locations y coord
   * @param {Number} - the new Y value
   * @return {Number} - the objects y location
   */
  set y(val){
    this[Y] = val;
  }
  move(){
    this[POSITION].x += this[X];
    this[POSITION].y += this[Y];
  }
}
