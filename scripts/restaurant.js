function Restaurant(name, location){
    this.name = name;
    this.location = location;
    this.menu = null;
    this.orders = []; // Orders is a list of past orders

    // Hardcoded random distance generator :)
    this.distance = Math.floor((Math.random() * 100));
}

Restaurant.prototype.setMenu = function(menu){
    this.menu = menu;
}

Restaurant.prototype.addOrder = function(newOrder){
    for (order in this.orders){
        if (order.equals(newOrder)){
            return;
        }
    }
    this.orders.push(newOrder);
}

// Return orders (ordered by favourites first)
Restaurant.prototype.getOrders = function(){
    var favourites = [];
    var notFavourites = [];
    for (order in this.orders){
        if (order.favourite){
            favourites.push(order);
        } else {
            notFavourites.push(order);
        }
    }
    
    return favourites.concat(notFavourites);
}
