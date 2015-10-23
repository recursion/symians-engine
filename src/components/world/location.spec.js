import EventEmitter from 'eventemitter3'
import Location from './location'
import {expect} from 'chai'

const EM = new EventEmitter();

let location;
describe('Location', ()=> {
  beforeEach(()=>{
    location = new Location('grass', 1, 1, EM);
  });
  it('creates an object with reasonable defaults', ()=> {
    expect(location).to.have.property('type', 'grass');
    expect(location).to.have.property('isBlocked', false);
    expect(location).to.have.property('contents');
    expect(location).to.have.property('position');
    expect(location.position).to.have.property('x');
  });

  describe('#toJSON', ()=>{
    it('returns a JSON parsable string', ()=>{
      let o = JSON.parse(location.toJSON());
      expect(o).to.have.property('x');
    });
  });

  describe('.contents', ()=>{
    it('is not directly writable', ()=>{
      const og = location.contents;
      try {
        location.contents = [1];
      } catch(e){}
      expect(location.contents).to.deep.equal(og);
    });
    it('returns an array of items at the location', ()=>{
      location.add('test');
      location.add('test2');
      location.add('test3');
      expect(location.contents.length).to.equal(3);
    });
  });
  describe('.isBlocked', ()=>{
    it('gets set to true when an object with the .blocks property moves to it', ()=>{
      expect(location.isBlocked).to.equal(false);
      const testObj = {blocks: true};
      location.add(testObj);
      expect(location.isBlocked).to.equal(true);
    });
    it('gets set to false when an object with the blocks property moves from it', ()=>{
      const testObj = {blocks: true};
      location.add(testObj);
      location.remove(testObj);
      expect(location.isBlocked).to.equal(false);
    });
  });
  describe('#add', ()=>{

    it('adds an item into the locations contents', () =>{
      location.add('test');
      expect(location.contents[0]).to.equal('test');
    });

  });
  describe('#remove', ()=>{

    it('removes an item from the locations contents', () =>{
      location.add('test');
      location.remove('test');
      expect(location.contents.length).to.equal(0);
    });

    it('returns the item being removed', () =>{
      location.add('test');
      const test = location.remove('test');
      expect(test).to.equal('test');
    });

    it('returns null when the item doesnt exist', () =>{
      const test = location.remove('test');
      expect(test).to.equal(null);
    });
  });
  describe('::types', ()=> {
    it('returns an object with location type constants', ()=>{
      expect(Location.types()).to.be.an('object');
      expect(Location.types()).to.have.property('GRASS');
      expect(Location.types()).to.have.property('WATER');
      expect(Location.types()).to.have.property('DIRT');
    });
  });
});

