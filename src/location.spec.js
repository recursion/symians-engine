import {expect} from 'chai'
import db from '../config/db'
import Location from './location'

let loc;
describe('Location', ()=> {
  before(()=>{
    db.connect();
  });
  beforeEach(()=> {
    loc = new Location({x: 10, y: 10});
  });
  after((done)=> {
    db.disconnect(done);
  });
  it('is a javascript object', ()=> {
    expect(loc).to.be.an('object');
  });
  it('takes a width property at creation', ()=> {
    expect(loc).to.have.property('x', 10);
  });
  it('takes a height property at creation', ()=> {
    expect(loc).to.have.property('y', 10);
  });
  it('has a type property that defaults to "grass"', ()=> {

    expect(loc.type).to.equal('grass');

  });
});

