var lastID = -1;
var user = new User();
var restaurants = [];
var recentRestaurants = [];
var selectedRestaurant = null;

function generateID(){
    lastID += 1;
    return lastID;
}

function getRestaurants(substring){
    returnList = [];
    for (restaurant in restaurants){
        if (restaurant.name.indexOf(substring) != -1){
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
        d1.addCustomization(cd);
        combo.addFood(d1);

        // Add fries to the combo
        var s1 = new Food(generateID(), "French Fries");
        s1.addCustomization(cs);
        combo.addFood(s1);

        scope.value = combo;
    }
    return lambda;
}

function init(){
    // Set up McDonalds
    var r1 = new Restaurant("McDonalds", "552 Yonge St.");
    var r2 = new Restaurant("McDonalds", "344 Bathurst St.");
    
    // Set up Burgers
    var c1 = new Category(generateID(), "Burgers");
    var f1 = new Food(generateID(), "McChicken", 4.25);
    var f2 = new Food(generateID(), "Big Mac", 4.75);
    var cb = new Customization();

    var ch1 = new Choice("Number of Patties", NUMBER, scalePrice(1));
    var ch2 = new Choice("Remove Ketchup", BOOLEAN, scalePrice(0));
    var ch5 = new Choice("Make Combo", COMBO, makeBurgerCombo(2.25));

    cb.addChoice(ch1);
    cb.addChoice(ch2);
    cb.addChoice(ch5);
    f1.setCustomization(cb);
    f2.setCustomization(cb);

    var ch3 = new Choice("Upsize to Large", BOOLEAN, scalePrice(1.25));
    var ch4 = new Choice("No Ice", BOOLEAN, scalePrice(0));

    var cs = new Customization();
    cs.addChoice(ch3);

    var cd = cs.makeCopy();
    cd.addChoice(ch4);

    // Set up Drinks
    var c2 = new Category(generateID(), "Drinks");
    var d1 = new Food(generateID(), "Fountain Drink");
    var d2 = new Food(generateID(), "Apple Juice");
    d1.addCustomization(cd);
    d2.addCustomization(cd);

    // Set up Sides
    var c3 = new Category(generateID(), "Sides");
    var s1 = new Food(generateID(), "French Fries");
    s1.addCustomization(cs);

    var menu = new Menu();
    menu.addCategory(c1);
    menu.addCategory(c2);
    menu.addCategory(c3);

    // Set up Tim Hortons
    //var r3 = new Restaurant("Tim Hortons", "101 College St.")


    restaurants.push(r1);
    restaurants.push(r2);
    //restaurants.push(r3);
}