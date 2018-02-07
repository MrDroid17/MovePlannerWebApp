
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    var streetName = $("#street").val();
    var cityName = $("#city").val();
    var address = streetName + ", "+ cityName;

    $greeting.text("So you want to live at "+ address +"?");

    var streetViewURL = "https://maps.googleapis.com/maps/api/streetview?size=600x300&location="+address+"";
    $body.append('<img class="bgimg" src="' + streetViewURL + '">');

    // YOUR CODE GOES HERE!

    // var streetStr = $("#street").val();
    // var cityStr = $("#city").val();
    // var address = streetStr + ", " + cityStr;
    
    // $("label").css("color","#fafafa");
    // $greeting.text("So, you want to live at " + address + "?").css("color","#fafafa");
    // var streetViewURL = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location="+ address + " ";
    // $body.append('<img class="bgimg" src="'+streetViewURL+'">');
   

    return false;

    
};

$('#form-container').submit(loadData);
