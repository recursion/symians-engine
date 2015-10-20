const X = Symbol('xcoord');
const Y = Symbol('ycoord');

export default class Positionable {
  constructor(x=0, y=0){
    this[X] = x;
    this[Y] = y;
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
   * @return {Number} - the objects x location
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
}
