import Promise from 'bluebird'
import {expect} from 'chai'
import db from '../config/db'
import Zone from './zone'

let zone;
describe('Zone', ()=> {
  before(()=>{
    db.connect();
  });
  beforeEach((done)=> {
    zone = new Zone({width: 10, height: 10});
    zone.genMap()
      .then(done);
  });
  after((done)=> {
    db.disconnect(done);
  });
  it('is a javascript object', ()=> {
    expect(zone).to.be.an('object');
  });
  it('takes a width property at creation', ()=> {
    expect(zone).to.have.property('width', 10);
  });
  it('takes a height property at creation', ()=> {
    expect(zone).to.have.property('height', 10);
  });
  describe('#genMap', ()=> {
    it('returns a promise', ()=>{
      expect(zone.genMap()).to.be.instanceof(Promise);
    });
    it('is thenable', (done)=>{
      zone.genMap()
        .then(function(){
          expect(zone.width).to.equal(10);
        })
        .catch(function(e){
          expect(e).to.not.exist;
        })
        .finally(done);
    });
    it('creates an array of locations on the zone instance with a length equal to zone.height * zone.width', (done)=> {
      setTimeout(function() {
        expect(zone.locations.length).to.equal(zone.width*zone.height);
        done();
      }, 500);
    });

    it('creates and array of locations with itself as their parent zone', (done)=> {
      setTimeout(()=> {
        Zone.findOne({_id: zone.id})
          .populate('locations')
          .exec(function(err, results){
            expect(results.locations[0]).to.have.property('x')
            expect(results.locations[0]).to.have.property('y')
            done();
          });
      }, 100);
    });
  });
  describe('#getLocation', ()=> {
    it('returns a valid zone location when given valid coordinates', (done)=> {
      setTimeout(()=>{
        zone.getLocation(1, 1)
          .then((loc)=>{
            expect(loc).to.be.an('object');
            expect(loc).to.exist;
            done();
          });
      }, 100);
    });
  });
});
