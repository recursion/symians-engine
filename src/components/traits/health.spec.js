import {expect} from 'chai'
import Health from './health'

let health;
describe('Health', ()=>{
  beforeEach(()=>{
    health = new Health();
  });
  it('tracks a value that defaults to 0', ()=>{
    expect(health.get()).to.equal(100);
  });
  it('is settable', ()=>{
    expect(health.get()).to.equal(100);
    health.set(50);
    expect(health.get()).to.equal(50);
  });
  describe('#isAlive', ()=>{
    it('reports whether the amount is above 0', ()=>{
      health.set(0);
      expect(health.isAlive()).to.equal(false);
    });
    it('composes right onto new objects', ()=>{
      let c = {
        _health: new Health(),
        health: ()=>{return c._health.get()}
      };
      expect(c.health()).to.equal(100);
    });
  });
});
