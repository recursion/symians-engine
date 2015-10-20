import sinon from 'sinon'
import {expect} from 'chai'
import Positionable from './positionable'

let positionable;
describe('positionable - any object that has a position', ()=> {
  beforeEach(()=>{
    positionable = new Positionable();
  });
  it('has an x coordinate', ()=>{
    expect(positionable).to.have.property('x');
  });
  it('has a y coordinate', ()=>{
    expect(positionable).to.have.property('y');
  });
});
