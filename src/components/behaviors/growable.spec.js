import {expect} from 'chai'
import Trait from '../core/trait'
import Growable from './growable'

describe('Growable', ()=>{
  it('requires a trait instance be passed at creation', ()=>{
    let err = null;

    try {
      new Growable();
    } catch(e) {
      err = e;
    }

    expect(err).to.exist;

  });
  describe('#grow', ()=>{
    it('updates the size property when time is evenly divisible by growthRate', ()=>{
      let size = new Trait(1);
      let test = new Growable(size, 5);
      test.grow(15);
      test.grow(15);
      expect(size.value).to.equal(3);
    });
  });
});
