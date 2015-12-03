function Choice(name, type, effect){
    this.name = name;
    this.type = type; // "combo", "yn", "number"
    this.effect = effect; // Takes in a reference to "this"
    this.value = null;
    this.id = generateID();
}

Choice.prototype.setValue = function(value){
    this.value = value;
}

Choice.prototype.makeCopy = function(){
    var copy = new Choice(this.name, this.type, this.effect);
    return copy;
}

Choice.prototype.equals = function(other){
    if (this.name == other.name && this.type == other.type
        && this.value == other.value && this.effect == other.effect){
        return true;
    }
    return false;
}

Choice.prototype.generateListing = function(){
    var text = this.name;
    
    if (this.value == null){
        return "";
    }
    
    if (this.type == NUMBER){
        if (this.value > 0){
            text += " x" + this.value;
        }
    } else if (this.type == BOOLEAN){
        if (!this.value){
            return "";
        }
    } else if (this.type == COMBO){
        if (!this.value){
            return "";
        }
    }
    
    var listing = "<div class='customization-order-listing'>"+text+"</div>";
    
    return listing;
}

Choice.prototype.getPrice = function(){
    return this.effect(this).toFixed(2);
}

Choice.prototype.choiceFormat = function(){
    var id = "ch" + this.id;
    var input;
    
    var value = "";
    var defaultValue = 0;
    
    if (this.value && this.value != 0){
        defaultValue = this.value;
        var newPrice = this.getPrice();
        if (newPrice > 0)
            value = "<div class='choice-value'> +$" + newPrice + "</div>";
    }
    
    if (this.type == NUMBER){
        input = "<input type='number' class='choice-input number' min=0 value='" + defaultValue + "' id='" + id + "'>";
    } else if (this.type == BOOLEAN){
        defaultValue = this.value;
        if (defaultValue)
            defaultValue = 'checked';
        else    
            defaultValue = '';
            
        input = "<input type='checkbox' class='choice-input boolean' " + defaultValue + " id='" + id + "'>";
        
    } else if (this.type == COMBO){
        if (defaultValue)
            defaultValue = 'checked';
        else
            defaultValue = '';
        input = "<input type='checkbox' class='choice-input combo' " + defaultValue + " id='" + id + "'>";
    }
    
    var result = input +"<div class='choice-name'>" + this.name + "</div>";
    result += value;
    return result;
}

Choice.prototype.generateChoice = function(){
    var id = "ch" + this.id;
    var result = "<div class='customization-option' id='"+ id +"-choice'>";
    result += this.choiceFormat();
    result += "</div>";
    result = $($.parseHTML(result));
    $("#restaurant-food-customization").append(result);
    $("#" + id).data({'data' : this});
}

Choice.prototype.updateChoice = function(){
    $("#ch" + this.id + "-choice").html(this.choiceFormat());
    $("#ch" + this.id).data({'data' : this});
}
