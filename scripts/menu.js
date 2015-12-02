function Menu(){
    this.categories = []; // A list of categories
}

Menu.prototype.addCategory = function(category){
    this.categories.push(category);
}

Menu.prototype.generateCategories = function(){
    for (i in this.categories){
        this.categories[i].generateCategory();
    }
}
