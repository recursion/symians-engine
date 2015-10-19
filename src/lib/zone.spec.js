import EventEmitter from 'eventEmitter3'
import Zone from './zone'
import {expect} from 'chai'

const EM = new EventEmitter();

let z;
describe('Zone', ()=> {
  beforeEach(()=>{
    z = new Zone(EM, 10, 10);
    z.createMap();
  });
  it('has a width property', ()=> {
    expect(z).to.have.property('width');
  });
  it('has a height property', ()=> {
    expect(z).to.have.property('height');
  });
  it('has a locations property', ()=> {
    expect(z).to.have.property('locations');
  });

  describe('#getLocation', ()=> {
    it('returns null when given invalid coordinates', ()=> {
      let l = z.getLocation(11, 11);
      expect(l).to.be.null;
    });
    it('returns a map location when given valid inputs', ()=> {
      let l = z.getLocation(1, 1);
      expect(l).to.equal(z.locations[11]);
    });
  });

  describe('#populateMap', ()=>{

    it('seeds the map with clusters of specified items', ()=>{

      let count = countItems(z);

      expect(count).to.equal(0);

      const options = [{
        item: 'tree',
        clusters: {
          amount: 3,
          size: 8
        }
      }];

      z.populateMap(options);

      count = countItems(z);
      expect(count).to.equal(3*8);


    });

    it('can take multiple items configs to populate map with', ()=>{

      const options = [{
        item: 'tree',
        clusters: {
          amount: 3,
          size: 8
        }
      }, {
        item: 'rock',
        clusters: {
          amount: 5,
          size: 2
        }
      }];

      z.populateMap(options);

      const count = countItems(z);
      expect(count).to.equal(3*8 + 5*2);
    });
  });

  describe('createMap', ()=> {
    it('creates an empty locations array when given no arguments', ()=> {
      expect(Array.isArray(z.locations)).to.equal(true);
    });
    it('creates a locations array of length height*width', ()=> {
      expect(z.locations.length).to.equal(10*10);
    });
  });

  describe('createCluster - creates a cluster of items within the zone', ()=> {

    it('creates a number of items even to the size argument', ()=> {
      const startPoint = {x: 5, y: 5};
      let counter = countItems(z);
      expect(counter).to.equal(0);
      z.createCluster('tree', startPoint, 5);
      counter = countItems(z);
      expect(counter).to.equal(5);
    });
    it('creates items at the next nearest location when finding an invalid location', ()=> {
      const startPoint = {x: 1, y: 1};
      let counter = countItems(z);
      expect(counter).to.equal(0);
      z.createCluster('tree', startPoint, 5);
      counter = countItems(z);
      expect(counter).to.equal(5);
    });
  });

});

/**
 * count the number of items in a zone
 * this is any ingame object
 *
 ***/
function countItems(zone){
  let counter = 0;
  z.locations.forEach((loc)=>{
    loc.contents.forEach((item)=>{
      counter++;
    });
  });
  return counter;
}
