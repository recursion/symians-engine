import sinon from 'sinon'
import Gobj from './gobj'
import {expect} from 'chai'
import EventEmitter from 'eventEmitter3'

const EM = new EventEmitter();

let gobj;
describe('GObj - The base class - all "in world" objects derive from this object', ()=> {
  beforeEach(()=>{
    gobj = new Gobj(1, 1, EM);
  });

  it('throws an error if a valid event emitter is not passed in at instantiation', ()=> {
    let err = null;
    try{
      new Gobj('fail', 1, 1, 'failcake');
    }catch(e){
      err = e;
    }
    expect(err).to.exist;
  });

  it('has an autoincrementing id', ()=> {
    expect(gobj.id).to.exist;

    const id1 = gobj.id;
    const obj2 = new Gobj(1, 1, EM);
    const id2 = obj2.id;
    expect(id1).to.not.equal(id2);

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

  describe('position', ()=>{
    it('an object with an x and y property', ()=>{
      expect(gobj).to.have.property('position');
      expect(gobj.position).to.have.property('x');
      expect(gobj.position).to.have.property('y');
    });
  });

  describe('#update', ()=>{
    it('is called when "heartbeat" is emitted (by the engine)', (done)=>{
      EM.emit('heartbeat', Date.now());
      setTimeout(()=>{
        expect(gobj.age).to.be.above(0);
        done();
      }, 100);
    });
  });
});

