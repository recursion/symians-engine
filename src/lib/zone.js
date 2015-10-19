import Location from './location'
import winston from 'winston'

/**
 * A zone is the largest chunk of a world that
 * can be 'subscribed' to at a time. It is very
 * much a level or 'zone' within the world.
 */
export default class Zone {

  /**
   * creates a Zone instance
   *@param {number} width - the total width of the zone
   *@param {number} height - the total height of the zone
   */
  constructor(emitter, width=0, height=0){
    this.emitter = emitter;
    this.width = width;
    this.height = height;
    this.locations = [];
  }

  /**
   * retrieves a map location
   *@param {number} x - an x coordinate
   *@param {number} y - a y coordinate
   *@returns {Location} - a location item or null
   */
  getLocation(x, y){
    let idx = (y*this.width)+x;
    let loc = this.locations[idx];
    if (loc){
      return this.locations[idx];
    } else {
      return null;
    }
  }

  /**
   * creates an array of location objects of width * height size
   * with width columns and height rows;
   * @param {String} type - the type of terrain to create
   * @returns {Array} - array of locations
   */
  createMap(type='grass'){
    for (let col = 0; col < this.width; col++){
      for (let row = 0; row < this.height; row++){
        let loc = new Location(type, col, row, this, this.emitter);
        this.locations.push(loc);
      }
    }
  }

  /**
   * populate the map with some objects
   * @param {Array} options - config the population
   * options takes the format:
   * [{type: <String>,
   *   clusters: {
   *     amount: <Number>
   *     size: <Number>
   *   }
   *  }]
   *  where each object in the array represents the
   *  details of what type and size of cluster to create
   */
  populateMap(options){

    options.forEach((obj)=>{
      for (let i = 0; i < obj.clusters.amount; i++){
        // create a random point within the range of the zone
        let point = {
          x: randy(0, this.width),
          y: randy(0, this.height)
        };
        this.createCluster(obj.item, point, obj.clusters.size);
      }
    });

  }

  /**
   * create a cluster of items around a point in the zone
   * @param {GObj} item - the item to cluster
   * @param {Point} loc - the point to center the cluster around
   * @param {Number} size - the size of the cluster to create
   */
  createCluster(item, loc, size){

    let itemsPlaced = 0;
    const finder = findNextLoc();
    while(itemsPlaced < size){
      if(validateLocation(loc)) {
        // try to add an item to this location
        let location = this.getLocation(loc.x, loc.y);
        if(location){
          if(location.add(item)){
            itemsPlaced++;
            continue;
          }
        }
      // look for a new location on invalid locations
      loc = finder(loc);
      }
    }
  }
}


/*******************************************
 *          HELPERS
 ******************************************/

/**
 * return a number between min and max exclusive
 */
function randy(min, max){
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * validate coordinates are in bounds
 * and that the location is not blocked
 * @param {Point} loc - the location to validate
 * @returns {Boolean}
 */
function validateLocation(loc){
  if (loc) {
    return true;
  } else {
    return false;
  }
}

/**
 * keep track of the last move we made
 * and make the next accordingly
 */
function findNextLoc(){
  let lastDir = 0;
  let moves = 1;
  return (l)=>{
    let loc = l;
    switch(lastDir){

      case 0:
        loc.x += moves;
        lastDir++;
        break;
      case 1:
        loc.y += moves;
        lastDir++;
        moves++;
        break;
      case 2:
        loc.x -= moves;
        lastDir++;
        break;
      case 3:
        loc.y -= moves;
        lastDir = 0;
        moves++;
        break;
      default:
        winston.debug('Invalid switch:', loc);
        throw new Error('Invalid switch value');
    }
    return loc;
  }
}
