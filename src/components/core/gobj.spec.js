import sinon from 'sinon'
import Gobj from './gobj'
import {expect} from 'chai'
import EventEmitter from 'eventEmitter3'

const EM = new EventEmitter();

const mockZone = {
  width: 10,
  height: 10
};

let gobj;
describe('GObj - The base class - all "in world" objects derive from this object', ()=> {
  beforeEach(()=>{
    gobj = new Gobj(1, 1, mockZone, EM);
  });

  it('throws an error if a valid event emitter is not passed in at instantiation', ()=> {
    let err = null;
    try{
      let x = new Gobj('fail', 1, 1, mockZone, 'failcake');
    }catch(e){
      err = e;
    }
    expect(err).to.exist;
  });

  describe('#on', ()=>{
    it('is a wrapper for the systems event emitter', ()=>{
      let spy = sinon.spy(EM, 'on');
      expect(gobj).to.have.property('on').is.a('function');

      gobj.on()
      expect(spy.called).to.equal(true);
    });
  });

  describe('#emit', ()=>{
    it('is a wrapper for the systems event emitter', ()=>{
      let spy = sinon.spy(EM, 'emit');
      expect(gobj).to.have.property('emit').is.a('function');

      gobj.emit()
      expect(spy.called).to.equal(true);
    });
  });

  describe('#update', ()=>{
    it('is called when "heartbeat" is emitted (by the engine)', (done)=>{
      let spy = sinon.spy(gobj, 'update');
      EM.emit('heartbeat');
      setTimeout(()=>{
        expect(gobj).to.have.property('update').is.a('function');
        done();
      }, 10);
    });
  });

  describe('x and y coordinates', ()=>{
    it('Cannot set coords out of zone bounds', ()=>{
      const xg = gobj.x;
      gobj.x = 123;
      expect(gobj.x).to.equal(xg);
      const yg = gobj.y;
      gobj.y = 123;
      expect(gobj.y).to.equal(yg);
    });
  });
});

