$(document).ready(function() {
  // 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=74c748016b93d02d0bf3fb091373a1ba&tags=lighthouse'
  var search_term = "lighthouse";
  var api_key = "74c748016b93d02d0bf3fb091373a1ba";
  var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key="+api_key+"&tags="+search_term;
  var photoHTML;
  var result;

  var images = [];

  $("button").click(function() {
    $(this).hide();


  $.ajax({
    url: url,
    jsonp: "jsoncallback",
    dataType: "jsonp",
    success: function(data) {
      var c=0;
      $.each(data.photos.photo, function(i,item) {
        // FLICKR API WITH AJAX DOESNOT RETURN PATH OF THE IMAGE. 
        // WE HAVE TO CREATE THE PATH OR SRC IN THE WAY DEFINED BELOW 
        //https://farm2.staticflickr.com/1652/24581769439_04afc3c044.jpg
        //https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg

        // var photoHTML = "<li><h4>" +item.title + "</h4>";
        // photoHTML = "<li style=\"display:none;\">"
        photoHTML =       "   <li style=\"display:none;\">"
        photoHTML +=      "   <a href='https://farm"+ item.farm + ".staticflickr.com/"+ item.server +"/"+ item.id+ "_"+ item.secret +".jpg'>";
        photoHTML +=      "   <img src='https://farm"+item.farm+".staticflickr.com/"+item.server+"/"+item.id+"_"+item.secret+".jpg'>";
        photoHTML +=      "   </a>";
        photoHTML +=      "   <h4>" + item.title + "</h4>";
        populateFavCount(item.id);
        photoHTML +=      "<p id='" + item.id + "_favourite'> Favourited: <span></span></p>";
        populateCommentCount(item.id);
        photoHTML +=      "<p id='" + item.id + "_comment'> Comments: <span></span></p></li>";
        $('.slide-show').append(photoHTML);
        // setTimeout(function() {
        
        // }, 2000);

        // $('.slide-show').append(photoHTML);
        // console.log(favorite_count);
        //console.log(favorite_count);
       
        //console.log(result);

        //photoHTML +=      "   <p>"+result+"</p></li>";
        
        //console.log(favorite_count);
        if(i == 20) return false;
        console.log(data.photos.photo);
          //}
          //c=c+1;
      }); 
  
      startSlideShow();
    },
    error: function(message){
      alert('Try again!!');
    }
  });
});


  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
  function populateFavCount(photoId) {

  // loop through the images and find the number of favs for each
    var url = "https://api.flickr.com/services/rest/?method=flickr.photos.getFavorites&photo_id=" + photoId + "&format=json&api_key="+api_key;
    
    $.ajax({
      url: url,
      jsonp: "jsoncallback",
      dataType: "jsonp",
      async: false,
      success: function(data){
        $('#' + photoId + "_favourite span").text(data.photo.total);
      }
    });
  }

    //this function makes another ajax call to flicker API and retrieves the tag that includes the number of comments passing the photo id as the identifier of the specific image and it then appends the info to the span with the id allocated for the number of comments 
   function populateCommentCount(photoId) {

  // loop through the images and find the number of favs for each
    var url = "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&photo_id=" + photoId + "&format=json&api_key="+api_key;
    
    $.ajax({
      url: url,
      jsonp: "jsoncallback",
      dataType: "jsonp",
      async: false,
      success: function(data){
        $('#' + photoId + "_comment span").text(data.photo.comments._content);
      }
    });
  }
  
    
  var slides = [];
  var slideCount = 0;
  var totalSlides = slides.length;



    
  function startSlideShow() {
    slides = $('.slide-show > li');
    totalSlides = slides.length;
    slideShow();
  }

    function slideShow(){
      slides.eq(slideCount).fadeIn(1000).delay(4000).fadeOut(1000, function(){
        slideCount < totalSlides-1 ? slideCount++ : slideCount = 0;
        slideShow();
      });
    }     

});
