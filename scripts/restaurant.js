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