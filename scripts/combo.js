function Combo(base){
    this.food = []; // A list of food
    this.base = base;
}

Combo.prototype.addFood = function(food){
    this.food.push(food);
}

Combo.prototype.getPrice = function(){
    var total = base;
    for (food in this.food){
        total += food.getPrice();
    }
    return total;
}