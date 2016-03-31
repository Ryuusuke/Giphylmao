// Given a search query and callback function, fetch GIF images from GIPHY.
//
// The callback function must take a single argument, which is the array of all
// found GIF images. Each element of the array is an object with the following
// properties:
//
//   {
//     type: "gif",
//     id: "FiGiRei2ICzzG",
//     url: "http://giphy.com/gifs/funny-cat-FiGiRei2ICzzG",
//     bitly_gif_url: "http://gph.is/1fIdLOl",
//     bitly_url: "http://gph.is/1fIdLOl",
//     embed_url: "http://giphy.com/embed/FiGiRei2ICzzG",
//     username: "",
//     source: "http://tumblr.com",
//     rating: "g",
//     caption: "",
//     content_url: "",
//     import_datetime: "2014-01-18 09:14:20",
//     trending_datetime: "1970-01-01 00:00:00",
//     images: {
//       ...
//       downsized: {
//         url: "http://media2.giphy.com/media/FiGiRei2ICzzG/giphy.gif",
//         width: "500",
//         height: "176",
//         ...
//       },
//       ...
//       original: {
//         url: "http://media2.giphy.com/media/FiGiRei2ICzzG/giphy.gif",
//         width: "500",
//         height: "176",
//         ...
//       },
//       ...
//     }
//   }
//
// See the full list of properties here:
//   https://github.com/giphy/GiphyAPI#search-endpoint
//
// Sample callback function:
//   function(data) {
//     // Log the URL of the first GIF result to the console.
//     console.log(data[0].url);
//   }
//
function addimages(data){
  for (var i = 0; i < data.length; i++) {
        var gifs = data[i].images.fixed_width_downsampled.url;
        $("#search-results").append("<div class=\"row\">" + "<img src=" + gifs + ">" + "</div>");
      }
}
$(document).ready(function(){
  var pagenumbers = 0;
  
  $("#submit").click(function(){
    
    $('#search-results').empty();
    var search = $("#query").val();
    pagenumbers = 0;
    getGiphyGifs(search, 0, addimages);
    
  });
  
  $("#button").click(function(){
    var search = $("#query").val();
    $("#search-results").empty();
    pagenumbers += 25;
      getGiphyGifs(search, pagenumbers, addimages);
  });



  function getGiphyGifs(query, offset, callback) {
    var endpoint = "https://api.giphy.com/v1/gifs/search";
    var parameters = {
      // Public beta API key.
      api_key: "dc6zaTOxFJmzC",
      // Return up to 25 GIF images.
      limit: 25,
      // jQuery will sanitize the query, e.g. " " because "+".
      q: query,
      offset: offset, 
    }

    $.get(endpoint, parameters).done(function(response) {
      callback(response.data);
    });
  }
});

