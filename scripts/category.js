function Category(id, name, icon){
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.food = []; // A list of food
}

Category.prototype.addFood = function(food){
    this.food.push(food);
}

Category.prototype.generateFoodListings = function(){
    for (i in this.food){
        this.food[i].generateListing();
    }
}

Category.prototype.generateCategory = function(){
    var listing;
    var id = "cg" +  this.id;
    listing = "<div class='category-wrapper'>\
                        <div id='" + id + "' class='category clickable'>\
                            <img src='" + this.icon + "'>\
                        </div>\
                        " + this.name + "\
                    </div>";
                        
    listing = $($.parseHTML(listing));
    $("#restaurant-categories").append(listing);
    $("#" + id).data({'data' : this});
}
