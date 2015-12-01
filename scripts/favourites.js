function Favourites(id){
    this.id = id;
    this.restaurants = []; // A list of restaurants
}

Favourites.prototype.addRestaurant = function(restaurant){
    this.restaurants.push(restaurant);
}