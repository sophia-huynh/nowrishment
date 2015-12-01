function Food(id, name, cost){
    this.id = id;
    this.name = name;
    this.cost = cost;
    this.customization = null;
}

Food.prototype.setCustomization = function(customization){
    this.customization = customization;
}

Food.prototype.getPrice = function(){
    if (this.customization)
        return this.cost + this.customization.getPrice();
    return this.cost;
}