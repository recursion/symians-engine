import sinon from 'sinon'
import {expect} from 'chai'
import Engine from './engine'

let engine;
describe('Engine', ()=>{
  beforeEach(()=>{
    engine = new Engine();
  });
  it('exists', ()=>{
    expect(engine).to.exist;
  });
  it('creates a new zone if one is not specified at creation', ()=>{
    const spy = sinon.spy(engine, 'create');
    engine.init();
    expect(spy.called).to.be.true;
  });
  it('attempts to load a zone if one is specified', ()=>{
    const spy = sinon.spy(engine, 'load');
    engine.init(2);
    expect(spy.called).to.be.true;
  });
  describe('#start', ()=>{
    it('starts the engine loop', ()=>{
      expect(engine.loop).to.not.exist;
      engine.start();
      expect(engine.loop).to.exist;
    });
    it('starts an interval that emits hearbeats', (done)=>{
      const spy = sinon.spy(engine.emitter, 'emit');
      expect(spy.called).to.equal(false);
      engine.start();
      setTimeout(()=>{
        expect(spy.called).to.equal(true);
        done();
      }, 200);
    });
  });
  describe('#stop', ()=>{
    it('stops the engine loop', ()=>{
      engine.start();
      expect(engine.loop).to.exist;
      engine.stop();
      expect(engine.loop).to.not.exist;
    });
    it('stops heartbeats from being emitted', (done)=>{
      const spy = sinon.spy(engine.emitter, 'emit');
      engine.start();
      setTimeout(()=>{
        engine.stop();
        const called = spy.callCount;
        setTimeout(()=>{
          expect(spy.callCount).to.equal(called);
          done();
        }, 10);
      }, 10);
    });
  });
  describe('#create', ()=>{
    it('creates a new zone', (done)=>{
      engine.create(5, 5, ()=>{
        expect(engine.zone).to.exist;
        done();
      });
    });
  });
});

