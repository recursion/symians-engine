const DX = Symbol('dx');
const DY = Symbol('dy');
const TARGET = Symbol('target');

export default class Movable {
  constructor(obj){
    this[DX] = 0;
    this[DY] = 0;
    this[TARGET] = obj;
  }

  /**
   * getter for the locations x coord
   * @return {Number} - the objects x location
   */
  get dx(){
    return this[DX];
  }

  /**
   * setter for the locations x coord
   * @param {Number} - the new x value
   * @return {Number} - thebounds objects x location
   */
  set dx(val){
    this[DX] = val;
  }

  /**
   * getter for the locations y coord
   * @return {Number} - the objects y location
   */
  get dy(){
    return this[DY];
  }

  /**
   * setter for the locations y coord
   * @param {Number} - the new Y value
   * @return {Number} - the objects y location
   */
  set dy(val){
    this[DY] = val;
  }
}
