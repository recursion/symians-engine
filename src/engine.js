import Promise from 'bluebird'
import db from '../config/db'
import Zone from './zone'

db.connect();

let zone;
Zone.find({})
  .populate('locations')
  .exec((err, zones)=>{
    if(err){
      console.error(err);
    }
    if (zones.length){
      zone = zones[0];
      console.log('Found existing zone', zone);
      start();
    } else {
      zone = new Zone({width: 256, height: 256});
      genMap();
    }
  });

function genMap(){
  zone.genMap()
    .then(()=> {
      console.log('Generated map');
      start();
    });
}

function start(){
  console.log('Starting!');
}
