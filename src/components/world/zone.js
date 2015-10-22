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
        let loc = new Location(type, col, row, this.emitter);
        this.locations.push(loc);
      }
    }
    winston.info(`Created map with: ${this.width * this.height} locations.`);
  }

  /**
   * populate the map with some objects
   * @param {Array} options - config the population
   * the objects in the array take the format:
   * [{type: <GObj>,    // the type of item to create
   *   clusters: {
   *     amount: <Number> // the number of clusters to create
   *     size: <Number>   // the size of each cluster
   *   }
   *  }]
   *  where each object in the array represents the
   *  details of what type and size of cluster to create
   */
  populateMap(options){

    let objName;
    options.forEach((obj)=>{
      for (let i = 0; i < obj.clusters.amount; i++){
        // create a random point within the range of the zone
        let point = {
          x: randy(0, this.width),
          y: randy(0, this.height)
        };
        objName = this.createCluster(obj.item, point, obj.clusters.size);
      }
      winston.info(`Added ${obj.clusters.amount} clusters of ${obj.clusters.size} ${objName}`);
    });

  }

  /**
   * create a cluster of items around a point in the zone
   * @param {GObj} item - the item to cluster
   * @param {Point} loc - the point to center the cluster around
   * @param {Number} size - the size of the cluster to create
   */
  createCluster(item, loc, size){

    let itemName;
    let itemsPlaced = 0;
    // create our function to find nearby locations
    const finder = findNextLoc();

    // do until we have fullfilled the request
    while(itemsPlaced < size){
      // try to add an item to this location
      let location = this.getLocation(loc.x, loc.y);
      if(location && !location.isBlocked){
        // if we are able to place the item

        // get the constructor name of the item we are making
        let it = new item(loc.x, loc.y, this.emitter);
        itemName = it.constructor.name;

        if(location.add(it)){
          itemsPlaced++;
          continue;
        }

      // we werent able to place
      // look for a new location
      loc = finder(loc);
      }
    }
    // hand the item name back to whoever called us
    // so they know what we actually made
    return itemName;
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
 * return a memoized function that moves
 * the x/y coordinate of a location/point by 1
 * each time it is called. The pattern created by
 * the series of calls will become an outward spiraling square.
 * moving right, down, left, up and increasing step as needed
 */
function findNextLoc(){
  let lastDir = 0;
  let moves = 1;
  /**
   * takes a location and finds the next location
   * in its sequence of square making.
   * @param {Point} l - an object with x, y coords.
   * @return {Point} a point with x, y coords.
   */
  return (location)=>{
    // make a copy of the object passed in
    let loc = Object.assign({}, location);
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
