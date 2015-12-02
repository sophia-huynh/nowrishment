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
}

function onPageLoad(){
    area = $("#emulator-area");
    wrapper = $("#emulator-wrapper");
    screen = $("#emulator-screen");
    resizeEmulator();
}
