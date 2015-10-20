import Movable from './movable'
import {expect} from 'chai'

let movable, bounds;
describe('Movable', ()=> {
  beforeEach(()=>{
    bounds = {upper: 0, lower: 10, left: 0, right: 10 };
    movable = new Movable(1, 1, bounds);
  });
  it('has a dx coordinate', ()=> {
    expect(movable).to.have.property('dx');
  });
  it('has a dy coordinate', ()=> {
    expect(movable).to.have.property('dy');
  });
});

