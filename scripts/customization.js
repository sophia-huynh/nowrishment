function Customization(){
    this.choices = []; // A list of choices
}

Customization.prototype.addChoice = function(choice){
    this.choices.push(choice);
}

Customization.prototype.makeCopy = function(){
    copy = new Customization();
    for (choice in this.choices){
        var choice = this.choices[choice];
        copy.addChoice(choice.makeCopy());
    }
    return copy;
}

// Takes in a list of choices, returns the total price
Customization.prototype.getPrice = function(){
    var total = 0;
    for (choice in this.choices){
        var choice = this.choices[choice];
        if (choice.type != COMBO){
            total += choice.effect(choice);
        } else {
            if (choice.value)
                total += choice.value.getPrice;
        }
    }
    return total;
}

Customization.prototype.equals = function(customization){
    for (choice in this.choices){
        var found = false;
        for (other in customization.choices){
            var choice = customization.choices[other];
            if (choice.equals(other)){
                found = true;
            }
        }
        if (!found){
            return false;
        }
    }
    return true;
}

Customization.prototype.generateCustomization = function(){
    for (i in this.choices){
        this.choices[i].generateChoice();
    }
}
