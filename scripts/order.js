function Order(){
    this.food = []; // A list of food
    this.favourite = false;
}

Order.prototype.addFood = function(food){
    this.food.push(food);
}

Order.prototype.removeFood = function(id){
    for (var i = 0; i < this.food.length; i++){
        if (this.food[i].id = id){
            this.food.splice(i, 1);
            return;
        }
    }
}

Order.prototype.toggleFavourite = function(){
    this.favourite = !this.favourite;
}

Order.prototype.equals = function(order){
    for (food in this.food){
        var found = false;
        for (other in order.food){
            var other = order.food[other];
            if (food.equals(other)){
                found = true;
            }
        }
        if (!found){
            return false;
        }
    }
    return true;
}
