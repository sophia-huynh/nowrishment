function Order(){
    this.food = []; // A list of food
    this.favourite = false;
}

Order.prototype.getCopy = function(){
    var newOrder = new Order();
    for (i in this.food){
        newOrder.addFood(this.food[i].getCopy());
    }
}

Order.prototype.getTotalPrice = function(){
    var totalPrice = 0;
    for (i in this.food){
        totalPrice += this.food[i].getPrice();
    }
    return totalPrice;
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

Order.prototype.toggleFavourite = function(){
    this.favourite = !this.favourite;
}

Order.prototype.equals = function(order){
    for (food in this.food){
        var food = this.food[food];
        var found = false;
        for (other in order.food){
            var other = order.food[other];
            if (food.equals(other)){
                found = true;
            }
        }
        if (!found){
            return false;
        }
    }
    return true;
}

Order.prototype.updateOrderDetails = function(){
    $("#order-listing").empty();
    for (i in this.food){
        var listing = this.food[i].generateOrderListing();
    }
}

function addToOrder(food){
    user.order.addFood(food);
    $("#restaurant-food-screen").hide();
    $("#restaurant-food-customization").empty();
    $("#restaurant-category-food").hide();
    updateOrderAmount();
}

function updateOrderAmount(){
    $("#order-amount").html(user.order.food.length);
    updateOrder();
}

function updateOrder(){
    $("#order-total-price").html(user.order.getTotalPrice().toFixed(2));
    user.order.updateOrderDetails();
}
