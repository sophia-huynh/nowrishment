function Order(){
    this.food = []; // A list of food
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