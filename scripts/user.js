function User(){
    this.favourites = new Favourites();
    this.order = new Order();
}

User.prototype.setOrder = function(order){
    if (order){
        this.order = order;
    } else {
        this.order = new Order();
    }
}
