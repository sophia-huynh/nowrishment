function Choice(name, type, effect){
    this.name = name;
    this.type = type; // "combo", "yn", "number"
    this.effect = effect; // Takes in a reference to "this"
    this.value = null;
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

Choice.prototype.generateChoice = function(){
    var id = "ch" + generateID();
    var result = "<div class='customization-option clickable' id='" + id + "'>";
    var input;
    // change the option type depending on this.type
    if (this.type == NUMBER){
        input = "<div class='number'></div>";
    } else if (this.type == BOOLEAN){
        
    } else if (this.type == COMBO){
        
    }
    
    result += input +"<div class='choice-name'>" + this.name + "</div></div>";
    result = $($.parseHTML(result));
    $("#search-results").append(result);
    $("#" + id).data({'data' : this});
}
