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
            toggleCart();
            return;
        case "add-order":
            addToOrder(createdFood);
            return;
        case "submit-order":
            openPaymentScreen();
            return;
        case "order-type-now":
            openQRScreenNow();
            return;
        case "order-type-later":
            openQRScreenLater();
            return;
        case "select-old-order":
            selectOldOrder();
            return;
        case "select-new-order":
            openRestaurant(selectedRestaurant);
            return;
    }

    // At this point, all of the above cases failed, so it's something else!
    if (id.startsWith("rr") || id.startsWith("sr")){
        // A restaurant was selected
        addRecentRestaurant(data);
        selectedRestaurant = data; // REMOVE THIS LATER
        selectOrderType();  // MOVE THIS TO OPENRESTAURANT CONDITIONAL XXX
    } else if (id.startsWith("cg")){
        openCategory(data);
    } else if (id.startsWith("fd")){
        openCustomization(data);
    }
}

function selectOrderType(){
    $("#select-order-start").show();
}

function openQRScreenNow(){
    $("#view-QR-code").show();
    $("#view-QR-code").show();
    $("#submit-order").hide();
    $("#payment-warning").html("Your order has been placed!<br><br>Scan this QR code at the cashier to pick up your order.");
}

function openQRScreenLater(){
    $("#view-QR-code").show();
    $("#payment-warning").html("Scan this QR code at the cashier to place your order.<br><br>Your order will be processed after payment is received. You may revise your order at any time before payment.");
}

function openPaymentScreen(){
    toggleCart();
    $("#view-order-type").show();
}

function toggleCart(){
    if (!orderVisible){
        $("#view-order-screen").animate({right:'0'});
    } else {
        var width = area.width();
        $("#view-order-screen").animate({right:-width});
    }
    orderVisible = !orderVisible;
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
    $("#order-amount").show();
    updateOrderAmount();
    selectedRestaurant.generateHeader();
    selectedRestaurant.generateCategories();
}

function openCategory(category){
    $("#restaurant-food-listings").empty();
    $("#restaurant-category-food").show();
    category.generateFoodListings();
}

function openCustomization(food){
    createdFood = food;
    $("#restaurant-food-customizations").empty();
    $("#restaurant-food-screen").show();
    createdFood.generateCustomizations();
    $("#customization-total-price").html(food.getPrice().toFixed(2));
}
