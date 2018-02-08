
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
    /***
     * The Hindu Api-   0994813ad94e4cc2aa2db6ab3e0308c9
     * https://newsapi.org/v2/top-headlines?delhi&apiKey=0994813ad94e4cc2aa2db6ab3e0308c9
     * https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=0994813ad94e4cc2aa2db6ab3e0308c9
     */

    var nyTimesURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q='+ cityName + '&sort=newest&api-key=a4f8b6864c3e4db7b282c9ca174b6cdc';
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

        /**
         * As of jQuery 1.8, .error() is deprecated. Use .fail() instead.`
         */
    }).error(function(e){
        $nytHeaderElem.text('New York Times Article cannot be loaded')
    });

    /***
     * Wikipedia Ajax reques goes here
     */
    var wikipediaURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityName + '&formant=json&callback=wikiCallback';
    $.ajax(wikipediaURL, {
        dataType: "jsonp",
        success: function( response) {
            var articleList= response[1];

            for(var i=0; i< articleList.length; i++){
                articleStr= articleList[i];
                var url= 'https://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a href="' +url + '">' + articleStr + '</a></li>'); 
            };
        }
    });


    return false;

    
};

$('#form-container').submit(loadData);
