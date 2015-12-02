var lastID = -1;
var user = new User();
var restaurants = [];
var recentRestaurants = [];
var selectedRestaurant = null;
var createdFood = null;

function generateID(){
    lastID += 1;
    return lastID;
}

function addRecentRestaurant(restaurant){
    // Go through the list of recent restaurants.
    // If the name and location matches one, return
    for (i in recentRestaurants){
        var r = recentRestaurants[i];
        if (r.name == restaurant.name && r.location == restaurant.location)
            return;
    }
    recentRestaurants.push(restaurant);
}

function getRestaurants(substring){
    returnList = [];
    substring = substring.toLowerCase();
    for (restaurant in restaurants){
        var restaurant = restaurants[restaurant];
        if (restaurant.name.toLowerCase().indexOf(substring) != -1){
            returnList.push(restaurant);
        }
    }
    return returnList;
}

// amount is the price per item in scope.value 
function scalePrice(amount){
    var lambda = function(scope){
        if (scope.value)
            return scope.value * amount
        return 0;
    }
    return lambda;
}

function makeBurgerCombo(additional){
    var lambda = function(scope){
        var combo = new Combo(additional);

        var ch1 = new Choice("Upsize to Large", BOOLEAN, scalePrice(1.25));
        var ch2 = new Choice("No Ice", BOOLEAN, scalePrice(0));
        var cs = new Customization();
        cs.addChoice(ch1);
        var cd = cs.makeCopy();
        cd.addChoice(ch2);


        // Add a drink to the combo
        var d1 = new Food(generateID(), "Fountain Drink");
        d1.setCustomization(cd);
        combo.addFood(d1);

        // Add fries to the combo
        var s1 = new Food(generateID(), "French Fries");
        s1.setCustomization(cs);
        combo.addFood(s1);

        scope.value = combo;
    }
    return lambda;
}

function init(){
    // Set up McDonalds
    var r1 = new Restaurant("McDonalds", "552 Yonge St.", "images/mcdonalds.png");
    var r2 = new Restaurant("McDonalds", "344 Bathurst St.", "images/mcdonalds.png");
    
    // Set up Burgers
    var c1 = new Category(generateID(), "Burgers", "images/burger.png");
    var f1 = new Food(generateID(), "McChicken", "images/mcchicken.png", 4.25);
    var f2 = new Food(generateID(), "Big Mac", "images/burger.png", 4.75);
    var cb = new Customization();

    var ch1 = new Choice("Number of Patties", NUMBER, scalePrice(1));
    var ch2 = new Choice("Remove Ketchup", BOOLEAN, scalePrice(0));
    var ch5 = new Choice("Make Combo", COMBO, makeBurgerCombo(2.25));

    cb.addChoice(ch1);
    cb.addChoice(ch2);
    cb.addChoice(ch5);
    f1.setCustomization(cb);
    f2.setCustomization(cb);
    c1.addFood(f1);
    c1.addFood(f2);

    var ch3 = new Choice("Upsize to Large", BOOLEAN, scalePrice(1.25));
    var ch4 = new Choice("No Ice", BOOLEAN, scalePrice(0));

    var cs = new Customization();
    cs.addChoice(ch3);

    var cd = cs.makeCopy();
    cd.addChoice(ch4);

    // Set up Drinks
    var c2 = new Category(generateID(), "Drinks", "images/drink.png");
    var d1 = new Food(generateID(), "Fountain Drink", "images/drink.png", 1.25);
    var d2 = new Food(generateID(), "McCafe", "images/coffee.png", 1.50);
    d1.setCustomization(cd);
    d2.setCustomization(cd);
    c2.addFood(d1);
    c2.addFood(d2);

    // Set up Sides
    var c3 = new Category(generateID(), "Sides", "images/fries.png");
    var s1 = new Food(generateID(), "French Fries", "images/fries.png", 1.75);
    s1.setCustomization(cs);
    c3.addFood(s1);

    var menu = new Menu();
    menu.addCategory(c1);
    menu.addCategory(c2);
    menu.addCategory(c3);

    r1.setMenu(menu);
    r2.setMenu(menu);

    // Set up Tim Hortons
    //var r3 = new Restaurant("Tim Hortons", "101 College St.")


    restaurants.push(r1);
    restaurants.push(r2);
    //restaurants.push(r3);
    
    addRecentRestaurant(r1);
}
