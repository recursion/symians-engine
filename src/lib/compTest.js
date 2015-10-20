//import sinon from 'sinon'
import {expect} from 'chai'

import Positionable from './behaviors/positionable'
import Movable from './behaviors/movable'

let test;
describe('Compositing', ()=> {
  beforeEach(()=>{
    test = {
      position: new Positionable(1, 1),
      direction: new Movable()
    };
  });
  it('has a position', ()=>{
    expect(test).to.have.property('position');
    expect(test.position).to.have.property('x');
    expect(test.position).to.have.property('y');
  });
  it('can have its position changed', ()=>{
    test.position.x = 4;
    expect(test.position.x).to.equal(4);
    test.position.y = 4;
    expect(test.position.y).to.equal(4);
  });
  it('has a direction', ()=>{
    expect(test).to.have.property('direction');
    expect(test.direction).to.have.property('dx');
    expect(test.direction).to.have.property('dy');
  });
  it('can have its direction changed', ()=>{
    test.direction.dx = 4;
    expect(test.direction.dx).to.equal(4);
    test.direction.dy = 4;
    expect(test.direction.dy).to.equal(4);
  });
});


