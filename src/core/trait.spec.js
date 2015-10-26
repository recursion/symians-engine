import {expect} from 'chai'
import Trait from './trait'

let health;
describe('Trait', ()=>{
  beforeEach(()=>{
    health = new Trait();
  });
  it('tracks a value that defaults to 0', ()=>{
    expect(health.value).to.equal(100);
  });
  it('is settable', ()=>{
    expect(health.value).to.equal(100);
    health.value = 50;
    expect(health.value).to.equal(50);
  });
});
