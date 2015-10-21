//import sinon from 'sinon'
import {expect} from 'chai'
import Position from './position'

let position;
describe('Position - any object that has a position', ()=> {
  beforeEach(()=>{
    position = new Position();
  });
  it('has an x coordinate', ()=>{
    expect(position).to.have.property('x');
  });
  it('has a y coordinate', ()=>{
    expect(position).to.have.property('y');
  });
});
