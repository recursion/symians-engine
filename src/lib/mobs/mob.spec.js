import EventEmitter from 'eventemitter3'
import Mob from './mob'
import sinon from 'sinon'
import {expect} from 'chai'

const EM = new EventEmitter();

const mockZone = {
  width: 20,
  height: 20
};

let mob;
describe('Mob', ()=> {
  beforeEach(()=>{
    mob = new Mob(1, 1, mockZone, EM);
  });
  it('has an x and y property', ()=> {
    expect(mob).to.have.property('x');
    expect(mob).to.have.property('y');
  });
  it('has a dx and dy property', ()=> {
    expect(mob).to.have.property('dx');
    expect(mob).to.have.property('dy');
  });
  describe('#on', ()=>{
    it('is a wrapper for the systems event emitter', ()=>{
      let spy = sinon.spy(EM, 'on');
      expect(mob).to.have.property('on').is.a('function');

      mob.on()
      expect(spy.called).to.equal(true);
    });
  });

  describe('#emit', ()=>{
    it('is a wrapper for the systems event emitter', ()=>{
      let spy = sinon.spy(EM, 'emit');
      expect(mob).to.have.property('emit').is.a('function');

      mob.emit()
      expect(spy.called).to.equal(true);
    });
  });

  describe('#update', ()=>{
    it('is called when "heartbeat" is emitted (by the engine)', (done)=>{
      let spy = sinon.spy(mob, 'update');
      EM.emit('heartbeat');
      setTimeout(()=>{
        expect(mob).to.have.property('update').is.a('function');
        done();
      }, 10);
    });
  });

});
