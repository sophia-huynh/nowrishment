function Restaurant(name, location, icon){
    this.name = name;
    this.location = location;
    this.icon = icon;
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
        var order = this.orders[order];
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
        var order = this.orders[order];
        if (order.favourite){
            favourites.push(order);
        } else {
            notFavourites.push(order);
        }
    }
    
    return favourites.concat(notFavourites);
}

function generateRecentListing(icon, location, restaurant){
    var listing;
    if (restaurant){
        listing = "<div class='recent-restaurant-wrapper'>\
                            <div class='recent-restaurant clickable'>\
                                <img src='" + icon + "'>\
                            </div>\
                            " + location + "\
                        </div>";
    } else {
        listing = "<div class='recent-restaurant-wrapper'>\
                            <div class='recent-restaurant'>\
                            </div>\
                        </div>";
    }
    return listing;
}

Restaurant.prototype.generateRecentListing = function(){
    return generateRecentListing(this.icon, this.location, this);
}
