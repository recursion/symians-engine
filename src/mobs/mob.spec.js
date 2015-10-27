import EventEmitter from 'eventemitter3'
import Mob from './mob'
import sinon from 'sinon'
import {expect} from 'chai'

const EM = new EventEmitter();

let mob;
describe('Mob', ()=> {
  beforeEach(()=>{
    mob = new Mob(1, 1, EM);
  });
  it('has an x and y property', ()=> {
    expect(mob).to.have.property('position');
    expect(mob.position).to.have.property('x');
    expect(mob.position).to.have.property('y');
  });
  it('has a direction x and direction y property', ()=> {
    expect(mob).to.have.property('direction');
    expect(mob.direction).to.have.property('x');
    expect(mob.direction).to.have.property('y');
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

});
