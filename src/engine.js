//import Promise from 'bluebird'
import winston from 'winston'
import db from '../config/db'
import Zone from './zone'

db.connect();

let zone;
Zone.find({})
  .populate('locations')
  .exec((err, zones)=>{
    if(err){
      winston.debug(err);
    }
    if (zones.length){
      zone = zones[0];
      winston.log('Found existing zone', zone);
      start();
    } else {
      zone = new Zone({width: 256, height: 256});
      genMap();
    }
  });

function genMap(){
  zone.genMap()
    .then(()=> {
      winston.log('Generated map');
      start();
    });
}

function start(){
  winston.log('Starting!');
}
