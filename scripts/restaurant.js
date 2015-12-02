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

Restaurant.prototype.generateHeader = function(){
    var header = "<span class='restaurant-menu-name'>" + this.name + "</span><br/>\
                  <span class='restaurant-menu-location'> " + this.location +"</span>";
    $("#restaurant-header").empty().append(header);
}

Restaurant.prototype.generateRecentListing = function(){
    return generateRecentListing(this.icon, this.location, this);
}

Restaurant.prototype.generateSearchResult = function(){
    var id = "sr" + generateID();
    var result = "<div class='search-result clickable' id='" + id + "'>\
                      <img src='" + this.icon +"'>\
                      <div class='restaurant-name'>" + this.name + "</div>\
                      <div class='restaurant-location'>" + this.location + "</div>\
                  </div>";
    result = $($.parseHTML(result));
    $("#search-results").append(result);
    $("#" + id).data({'data' : this});
}

Restaurant.prototype.generateCategories = function(){
    this.menu.generateCategories();
}

function generateRecentListing(icon, location, restaurant){
    var listing;
    var id = "rr" +  generateID();
    if (restaurant){
        listing = "<div class='recent-restaurant-wrapper'>\
                            <div id='" + id + "' class='recent-restaurant clickable'>\
                                <img src='" + icon + "'>\
                            </div>\
                            " + location + "\
                        </div>";
    } else {
        listing = "<div class='recent-restaurant-wrapper'>\
                            <div id='" + id + "' class='recent-restaurant'>\
                            </div>\
                        </div>";
    }
    listing = $($.parseHTML(listing));
    $("#recent-restaurants").append(listing);
    $("#" + id).data({'data' : restaurant});
}
