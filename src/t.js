import db from '../config/db'
import Zone from './zone'


const zone = new Zone({width: 3, height: 3});

console.log(zone);

zone.genMap()
  .then(()=>{
    console.log('For real bird');
    console.log(zone.locations.length);
  })
  .catch((e)=>{
    console.log(e);
  })
  .finally(()=>{
    console.log('wuuut');
  });



console.log(zone);
