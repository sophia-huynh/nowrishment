function Menu(){
    this.categories = []; // A list of categories
}

Menu.prototype.addCategory = function(category){
    this.categories.push(category);
}