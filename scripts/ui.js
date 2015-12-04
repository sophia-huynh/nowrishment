$(document).ready(onPageLoad);

$(window).resize(resizeEmulator);

var area;
var wrapper;
var screen;

function adjustedAlign(toalign, container){
    toalign.css({
        top: (container.height() - toalign.outerHeight())/2 ,
        left: (container.width() - toalign.outerWidth())/2
    });
}


function resizeEmulator(){
    // Resize to keep aspect ratio
    var width = area.width();
    var height = area.height();
    var calculatedHeight = ratioHeight * width / ratioWidth;
    var calculatedWidth = ratioWidth * height / ratioHeight;
    
    if (width > calculatedWidth){
        wrapper.width(calculatedWidth);
        wrapper.height(height);
    } else {
        wrapper.height(calculatedHeight);
        wrapper.width(width);
    }
    
    // Center emulator
    adjustedAlign(wrapper, $("body"));
    
    // Adjust screen
    screen.height(wrapper.height() - 140);

    // Adjust main-menu heights
    var padding = parseInt($("#recent-restaurants").css("padding-bottom"));
    $(".under-search").height($("#main-menu").height() - $("#search-bar").outerHeight() - padding);
    
    $("#view-order-type").css({'line-height':screen.height()+'px'});
    $("#select-order-start").css({'line-height':screen.height()+'px'});
}


function loadRecentRestaurants(){
    for (var i = 0; i < 9; i++){
        if (i < recentRestaurants.length)
            recentRestaurants[i].generateRecentListing();
        else
            generateRecentListing();
    }
}

function displayCombo(){
}

function hideCombo(){
}

function updatePrice(food){
    $("#customization-total-price").html(food.getPrice().toFixed(2));
}

function updateChoice(e){
    var element = $(e.target).closest(".choice-input");
    var id = element.attr("id");
    var data = element.data("data");
    var newValue;
    
    if (data.type == NUMBER){
        newValue = $("#"+id).val();
    } else if (data.type == BOOLEAN){
        newValue = $("#"+id).prop('checked');
    } else if (data.type == COMBO){
        newValue = $("#"+id).prop('checked');
    }
    data.setValue(newValue);
    data.updateChoice();
    updatePrice(createdFood);
}

function visible(element){
    return element.is(':visible');
}

function onPageLoad(){
    area = $("#emulator-area");
    wrapper = $("#emulator-wrapper");
    screen = $("#emulator-screen");
    resizeEmulator();
    init();
    loadRecentRestaurants();

    $(document).on('click', ".clickable", function(e){clickHandler(e);});
    $(document).on('click', ".combo", function(e) {
        if(this.checked){
            displayCombo();
        } else {
            hideCombo();
        }
    });
    
    $(document).on('mouseup', '.choice-input.number', function(e){updateChoice(e);});
    $(document).on('click', '.choice-input.combo', function(e){updateChoice(e);});
    $(document).on('click', '.choice-input.boolean', function(e){updateChoice(e);});
    $("#view-order-screen").css({right:-area.width()});
}
