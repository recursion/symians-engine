//import sinon from 'sinon'
import {expect} from 'chai'

import Position from './core/position'
import Direction from './mobs/direction'

let test;
describe('Compositing', ()=> {
  beforeEach(()=>{
    test = {
      position: new Position(1, 1),
      direction: new Direction()
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
    expect(test.direction).to.have.property('x');
    expect(test.direction).to.have.property('y');
  });
  it('can have its direction changed', ()=>{
    test.direction.x = 4;
    expect(test.direction.x).to.equal(4);
    test.direction.y = 4;
    expect(test.direction.y).to.equal(4);
  });
});


