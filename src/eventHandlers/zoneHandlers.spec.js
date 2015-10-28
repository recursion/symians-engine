import sinon from 'sinon'
import {expect} from 'chai'
import winston from 'winston'
import * as EHM from './zoneHandlers'
import eventEmitter from 'eventemitter3'

const app = {
  zone: {
    getLocation: ()=>{
      return [5, 5];
    }
  }
};
const EM = new eventEmitter();
const testLoc = {
  position: {
    x: 1,
    Y: 1
  }
};

let handlers;
describe('Event Handlers', ()=>{
  beforeEach(()=>{
    EHM.registerHandlers(EM, app);
  });
  describe('randy', ()=>{
    it('returns a random number between 0 and 8', ()=>{
      expect(EHM.randy()).within(0, 8);
      expect(EHM.randy()).within(0, 8);
      expect(EHM.randy()).within(0, 8);
      expect(EHM.randy()).within(0, 8);
      expect(EHM.randy()).within(0, 8);
      expect(EHM.randy()).within(0, 8);
      expect(EHM.randy()).within(0, 8);
      expect(EHM.randy()).within(0, 8);
      expect(EHM.randy()).within(0, 8);
    });
  });
  describe('directions dictionary', ()=>{
    it('returns a tuple for proper direction keys', ()=>{
      expect(EHM.directions.n).to.deep.equal([0, -1]);
      expect(EHM.directions.s).to.deep.equal([0, 1]);
      expect(EHM.directions.e).to.deep.equal([1, 0]);
      expect(EHM.directions.w).to.deep.equal([-1, 0]);
    });
  });
  describe('pulling random directions', ()=>{
    it('returns proper direction names', ()=>{
      expect(EHM.dirNames).to.contain(EHM.dirNames[EHM.randy()]);
      expect(EHM.dirNames).to.contain(EHM.dirNames[EHM.randy()]);
      expect(EHM.dirNames).to.contain(EHM.dirNames[EHM.randy()]);
      expect(EHM.dirNames).to.contain(EHM.dirNames[EHM.randy()]);
    });
  });
  describe('combining dictionary with key', ()=>{
    it('returns an array', ()=>{
      expect(Array.isArray(EHM.directions[EHM.dirNames[EHM.randy()]])).to.equal(true);
    });
  });
  it('creates an event handlers for selectRandomNearbyLocation', ()=>{
    EM.emit('selectRandomNearbyLocation', testLoc, 1, (loc)=>{
      expect(loc).to.exist;
    });
  });
});
