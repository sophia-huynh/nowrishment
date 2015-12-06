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
            updateCustomization = false;
            return;
        case "submit-order":
            openPaymentScreen();
            return;
        case "order-type-now":
            selectedRestaurant.addOrder(user.order);
            openQRScreenNow();
            return;
        case "order-type-later":
            selectedRestaurant.addOrder(user.order);
            openQRScreenLater();
            return;
        case "select-old-order":
            /* TODO Implement this: It should list selectedRestaurant's orders
             * -- if one is clicked, user.order gets a copy of that order.
             * (Order.getCopy()) and then move to the menu screen.
             * Remember to updateOrder()! */
            selectOldOrder();
            return;
        case "select-new-order":
            openRestaurant(selectedRestaurant);
            return;
        case "footer-back":
            // Goes back one step
            backButton();
            return;
        case "footer-menu":
            // Returns you to the start of the app (as if it's a new order)
            restart();
            return;
    }

    // At this point, all of the above cases failed, so it's something else!
    if (id.startsWith("rr") || id.startsWith("sr")){
        // A restaurant was selected
        addRecentRestaurant(data);
        openRestaurant(data);
    } else if (id.startsWith("cg")){
        openCategory(data);
    } else if (id.startsWith("fd")){
        openCustomization(data);
    } else if (id.startsWith("fr")){
        toggleCart();
        updateCustomization = true;
        openCustomization(data);
    }

}

function backButton(){
    // If the order thing is up: Back should hide it
    if (orderVisible){
        toggleCart();
    } else {
        // Hide the topmost screen
        /* XXX UPDATE THIS IF NEW SCREENS ARE ADDED */
        if ($("#view-QR-code").css('display') != 'none'){
            $("#view-QR-code").hide();
            $("#submit-order").show();
        }
        else if ($("#view-order-type").css('display') != 'none'){
            $("#view-order-type").hide();
        }
        else if ($("#restaurant-food-screen").css('display') != 'none'){
            $("#restaurant-food-screen").hide();
        }
        else if ($("#restaurant-category-food").css('display') != 'none'){
            /* XXX If users try to hit BACK after adding an order, they will be
             * brought out of the restaurant since I don't save their previous
             * order :( We could always find the last item in the order,
             * add the customizations and whatever to the screen,
             * remove it from the order and open up restaurant-food-screen
             * but I don't want to write that right now. */
            $("#restaurant-category-food").hide();
        }
        else if ($("#restaurant-category-menu").css('display') != 'none'){
            $("#navbar-cart").hide();
            $("#order-amount").hide();
            $("#restaurant-category-menu").hide();
        }
        else if ($("#select-order-start").css('display') != 'none'){
            $("#select-order-start").hide();
        }
        else if ($("#restaurant-search-results").css('display') != 'none'){
            $("#restaurant-search-results").hide();
        }
    }
}

function restart(){
    if (orderVisible){
        toggleCart();
    }
    $(".screen").hide();
    $("#navbar-cart").hide();
    $("#order-amount").hide();
    $("#main-menu").show();
    $("#view-order-screen").show();
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
    user.order = new Order();
    updateOrder();
    
    if (restaurant.orders.length > 0){
        selectOrderType();
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