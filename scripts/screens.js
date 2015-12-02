function clickHandler(e){
    var element = $(e.target).closest(".clickable");
    var id = element.attr("id");
    var data = element.data("data");

    // Cases: #search, #rr<number>, #navbar-cart

    switch(id){
        case "search":
            // Perform a search for a restaurant
            var searchBars = $(".restaurant-search");
            var string = "";
            for (var i = 0; i < searchBars.length; i++){
                if (visible($(searchBars[i]))){
                    string = $(searchBars[i]).val();
                }
            }
            openSearchResults(string);
            searchBars.val(string);
            return;
        case "navbar-cart":
            // Toggle the view of the current order
            return;
    }

    // At this point, all of the above cases failed, so it's something else!
    if (id.startsWith("rr") || id.startsWith("sr")){
        // A restaurant was selected
        addRecentRestaurant(data);
        openRestaurant(data);
    } else if (id.startsWith("cg")){
        openCategory(data);
    }
}

function toggleCart(){
}

function openSearchResults(string){
    var restaurants = getRestaurants(string);
    $("#restaurant-search-results").show();
    $("#search-results").empty();
    for (i in restaurants){
        restaurants[i].generateSearchResult();
    }
}

function openRestaurant(restaurant){
    selectedRestaurant = restaurant;
    
    if (restaurant.orders.length > 0){
        // There are past orders: openOrderDecision()
    } else {
        // No old orders exist, so open the menu screen
        openCategories();
    }
}

function openCategories(){
    $("#restaurant-categories").empty();
    $("#restaurant-category-menu").show();
    $("#navbar-cart").show();
    selectedRestaurant.generateHeader();
    selectedRestaurant.generateCategories();
}

function openCategory(category){
    $("#restaurant-food-listings").empty();
    $("#restaurant-category-food").show();
    category.generateFoodListings();
}

function foodCustomization(food){
    createdFood = food;
    $("#restaurant-food-customizations").empty();
    $("#restaurant-food-screen").show();
    createdFood.generateCustomizations();
}
