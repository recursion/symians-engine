import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  x: Number,
  y: Number,
  zone: {type: Schema.Types.ObjectId, ref: 'Zone'},
  type: {type: String, default: 'grass'}
});

let Location;
if (mongoose.models.Location){
  Location = mongoose.model('Location');
} else {
  Location = mongoose.model('Location', LocationSchema);
}
export default Location

