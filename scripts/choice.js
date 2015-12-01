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
    copy = new Choice(this.name, this.type, this.effect);
    return copy;
}