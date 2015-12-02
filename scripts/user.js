function User(){
    this.favourites = null;
    this.order = null;
}

User.prototype.setOrder = function(order){
    if (order){
        this.order = order;
    } else {
        this.order = new Order();
    }
}
