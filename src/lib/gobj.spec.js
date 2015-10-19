import sinon from 'sinon'
import Gobj from './gobj'
import {expect} from 'chai'
import EventEmitter from 'eventEmitter3'

const EM = new EventEmitter();

let gobj;
describe('Gobj - The base class - all objects derive from this object', ()=> {
  beforeEach(()=>{
    gobj = new Gobj('test', 1, 1, {}, EM);
  });
  describe('it has x and y coordinates', ()=>{
    it('coordinates are not writable', ()=>{
      const xg = gobj.x;
      try{
        gobj.x = 123;
      } catch(e){}
      expect(gobj.x).to.equal(xg);
      const yg = gobj.y;
      try{
        gobj.y = 123;
      } catch(e){}
      expect(gobj.y).to.equal(yg);
    });
    it('coordinates are readable', ()=>{
      const xg = gobj.x;
      try{
        gobj.x = 123;
      } catch(e){}
      expect(gobj.x).to.equal(xg);
      const yg = gobj.y;
      try{
        gobj.y = 123;
      } catch(e){}
      expect(gobj.y).to.equal(yg);
    });
  });
});

