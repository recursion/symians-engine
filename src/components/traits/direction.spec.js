import Direction from './direction'
import {expect} from 'chai'

const position = {x: 1, y: 1};

let direction, bounds;
describe('Movable', ()=> {
  beforeEach(()=>{
    direction = new Direction(position);
  });

  it('requires a position component', ()=>{
    expect(position.x).to.equal(1);
    expect(position.y).to.equal(1);
  });

  it('has a direction x coordinate', ()=> {
    expect(direction).to.have.property('x');
  });

  it('has a direction y coordinate', ()=> {
    expect(direction).to.have.property('y');
  });

  describe('#move', ()=>{
    it('changes its position by its directional vectors (DX, DY)', ()=>{
      expect(direction);
    });
  });
});
