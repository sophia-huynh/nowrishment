function Category(id, name){
    this.id = id;
    this.name = name;
    this.food = []; // A list of food
}

Category.prototype.addFood = function(food){
    this.food = food;
}