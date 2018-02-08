
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview in Background

    var streetName = $("#street").val();
    var cityName = $("#city").val();
    var address = streetName + ", "+ cityName;

    $greeting.text("So you want to live at "+ address +"?");

    var streetViewURL = "https://maps.googleapis.com/maps/api/streetview?size=1080x720&location="+address+"";
    $body.append('<img class="bgimg" src="' + streetViewURL + '">');  

    /***
     * Your New York Times Api AJAX Request goes here
     */

    var nyTimesURL = 'https://api.nyasdtimes.com/svc/search/v2/articlesearch.json?q='+ cityName + '&sort=newest&api-key=a4f8b6864c3e4db7b282c9ca174b6cdc';
    $.getJSON(nyTimesURL, function(data){
        $nytHeaderElem.text('New York Times Article About '+ cityName);
        articles = data.response.docs;
        for(var i=0; i< articles.length; i++){
            var article= articles[i];
            $nytElem.append('<li class="article">'+ 
        '<a href="' +article.web_url+ '">' + article.headline.main +'</a>'+
        '<p>'+ article.snippet +'</p>'+
        '</li>');
        };
    }).error(function(e){
        $nytHeaderElem.text('New York Times Article cannot be loaded')
    });



    return false;

    
};

$('#form-container').submit(loadData);
