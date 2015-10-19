import Location from './location'

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
    if (!emitter){
      throw new Error('Must have an event emitter!');
    }
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
        this.locations.push(new Location(type, col, row, this, this.emitter));
      }
    }
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
        if(this.getLocation(loc.x, loc.y).add(item)){
          itemsPlaced++;
        // if we cant, find a new spot
        } else {
          loc = finder(loc);
        }
      // look for a new location on invalid locations
      } else {
        loc = finder(loc);
      }
    }
  }
}


/*******************************************
 *          HELPERS
 ******************************************/
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
