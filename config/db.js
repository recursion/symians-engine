import mongoose from 'mongoose'

const dbURI = 'mongodb://localhost/symians';

export default {
  /**
   * create a connection to the local test db
   */
  connect(callback){
    let db = mongoose.connect(dbURI, function(err){
      if (err){
        console.error(err);
      }
      if (callback){
        callback(db);
      }
    });

  },
  disconnect(done){
    mongoose.disconnect(done);
  }
}

