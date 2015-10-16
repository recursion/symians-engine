import Promise from 'bluebird'
import Location from './location'
import mongoose from 'mongoose'
let Schema = mongoose.Schema;

let zoneSchema = new Schema({
  width: Number,
  height: Number,
  locations: [{type: Schema.Types.ObjectId, ref: 'Location'}]
});

/**
 * Generates and saves a map and its locations
 * using the width/height properties of the instance.
 */
zoneSchema.methods.genMap = function(){
  const self = this;
  return new Promise(function(resolve, reject){

    for(let col = 0; col < self.width; col++){
      for (let row = 0; row < self.height; row++){

        let type;
        if (col === 0 || col === self.width - 1 || row === 0 || row === self.width - 1){
          type = 'water';
        } else if (Math.random() >= 0.95){
          type = 'wall';
        } else {
          type = 'grass';
        }

        let loc = new Location({
          x: col,
          y: row,
          type: type,
          zone: self.id
        })

        loc.save();
        self.locations.push(loc);
      }
    }
    self.save((err)=>{
      (err) ? reject() : resolve();
    });

  });
};

/**
 * returns a valid zone location when given valid coordinates
 */
zoneSchema.methods.getLocation = function(x, y){
  const self = this;
  return new Promise(function(resolve, reject){
    Location
      .findOne({zone: self.id, x: x, y: y}, function(err, loc){
        if(err){
          reject(err);
        }
        resolve(loc);
      });
  });

};


let Zone;
if (mongoose.models.Zone){
  Zone = mongoose.model('Zone');
} else {
  Zone = mongoose.model('Zone', zoneSchema);
}
export default Zone

