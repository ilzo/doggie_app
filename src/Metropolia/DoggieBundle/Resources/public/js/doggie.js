var map;
var markers = [];
var sidebarItem; 
var latLngList = [];
var markerID = 0;
var serviceMapMatches = [];
var placesService;
var radarArray = [];
var detailsArray = [];
var searchedCategories = [];
var checkboxes = [];
/*
var petstoresSearched = false;
var vetsSearched = false;
*/


//var placeItem = $('<div class="place-item"></div>');
//var geocoder;

function initMap() {
map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 60.192059, lng: 24.945831},
  zoom: 12
});
//geocoder = new google.maps.Geocoder;
placesService = new google.maps.places.PlacesService(map);

// The idle event is a debounced event, so we can query & listen without
// throwing too many requests at the server.
//map.addListener('idle', performRadarSearch);  



//map.addListener('idle', performTextSearch);


}


$( document ).ready(function() {


$( "#search-box" ).autocomplete({
  source: searchArray
});
    
  var searchInput = $("#input-data").data("id");
    if(searchInput) {
        var convertedInput = searchInput.replace(/ /gi, "+").replace(/ä/gi, "%E4").replace(/ö/gi, "%F6");
    }
    
    $("#search-data-container").find('.categories-data').each(function(){
        checkboxes.push($(this).data("id"));
    });
    
  if(checkboxes.length > 0) {
      console.log(checkboxes);
      var time = 200;
      $.each( checkboxes, function( i, val ) {

            setTimeout( function(){ 

                if(val === 'pet_store') {
                    performRadarSearch('pet_store');

                }else if(val === 'veterinary_care') {
                    performRadarSearch('veterinary_care');
                    
                }else if(val === 'dog_park'){

                   
                    searchFromServiceMap('Koira-alueet');
                }


            }, time);

          time += 1000;


        });

     
  }else{
      if(convertedInput){
          searchFromServiceMap(convertedInput); 
      }else{
          console.log("Error: No search terms given!");
      }
          
  }
  

});

function performRadarSearch(category) {

if($.inArray(category, searchedCategories) == -1) {

    console.log("category " + category + " was not found in searchedCategories");

    var request = {
        location: new google.maps.LatLng(60.192059, 24.945831),
        radius: '25000',
        type: [category]
    };
    placesService.radarSearch(request, processRadarResults);

    searchedCategories.push(category);

}else{

    console.log("category " + category + " has already been searched");

    processRadarArray();   

}  


}

function performTextSearch() {
var request = {
    location: new google.maps.LatLng(60.192059, 24.945831),
    radius: '25000',
    query: 'Musti ja Mirri'
};

placesService.textSearch(request, textCallback);
}


function processRadarResults(results, status) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
    console.error(status);
    return;
    }

    $("#sidebar-content-wrapper").empty();
    console.log(results);

    if(markers.length > 0){
        markers.forEach(markerRemover);
        markers = [];
        latLngList = [];
        markerID = 0;
        //radarArray = [];
    } 

    for (var i = 0, result; result = results[i]; i++) {
      radarArray.push(result);
    }

    for(var i = 0; i < 8; i++) {

        if (detailsArray.filter(function(e) { return e.place_id == radarArray[i].place_id; }).length == 0) {

            var detailsRequest = {
                placeId: radarArray[i].place_id
            }

            placesService.getDetails(detailsRequest, detailsCallback);
        }else{
            console.log("PLACE IS ALREADY IN DETAILS ARRAY");
            populateMap(detailsArray[i]);
        }

        }


    if(results.length > 0) {
        $('#places-show-more').unbind( "click" );
        $('#places-show-more').unbind( "dblclick" );
        $('#places-show-more').css('display', 'block').bind( "click", getNextPlaces).dblclick(function(e){
          console.log("double-clicked but did nothing");
          e.stopPropagation();
          e.preventDefault();
          return false;
        });
    }

    console.log("radarArray:"); 
    console.log(radarArray);

}


function processRadarArray() {
    $("#sidebar-content-wrapper").empty();


    if(markers.length > 0){
        markers.forEach(markerRemover);
        markers = [];
        latLngList = [];
        markerID = 0;
    }


    for(var i = 0; i < 8; i++) {

        if (detailsArray.filter(function(e) { return e.place_id == radarArray[i].place_id; }).length == 0) {

            var detailsRequest = {
                placeId: radarArray[i].place_id
            }

            placesService.getDetails(detailsRequest, detailsCallback);
        }else{
            console.log("PLACE IS ALREADY IN DETAILS ARRAY");
            populateMap(detailsArray[i]);
        }

    }

    $('#places-show-more').unbind( "click" );
    $('#places-show-more').unbind( "dblclick" );
    $('#places-show-more').css('display', 'block').bind( "click", getNextPlaces).dblclick(function(e){
        console.log("double-clicked but did nothing");
        e.stopPropagation();
        e.preventDefault();
        return false;
    });
   
    console.log("radarArray:"); 
    console.log(radarArray); 
}


function getNextPlaces() {
    var mapItemId = $(".sidebar-item:last-child").attr('id');
    var numStr = mapItemId.substring(9);
    var start = (parseInt(numStr)) + 1;
    var max = start + 5;

    if (radarArray[max]) {

        console.log("testing radarArray: ");
        console.log(radarArray[start]);

        for(var i = start; i < max; i++) {

            if (detailsArray.filter(function(e) { return e.place_id == radarArray[i].place_id; }).length == 0) {

                var detailsRequest = {
                    placeId: radarArray[i].place_id
                }

                placesService.getDetails(detailsRequest, detailsCallback);
            }else{

                if(detailsArray[i]) {
                    console.log("PLACE IS ALREADY IN DETAILS ARRAY");
                    populateMap(detailsArray[i]);
                }else{
                    
                    console.log("undefined detailsArray value!");
                    
                }

            
            }

        }

    }else{
        console.log("reached the end of radarArray!");
        
        for(var i = start; i < max; i++) {

            if(radarArray[i]) {
                
                if (detailsArray.filter(function(e) { return e.place_id == radarArray[i].place_id; }).length == 0) {

                    var detailsRequest = {
                        placeId: radarArray[i].place_id
                    }

                    placesService.getDetails(detailsRequest, detailsCallback);
                }else{

                    if(detailsArray[i]) {
                        console.log("PLACE IS ALREADY IN DETAILS ARRAY");
                        populateMap(detailsArray[i]);
                    }else{

                        console.log("undefined detailsArray value!");

                    }


                }
                
                
            }else{
                console.log("radarArray:")
                console.log(radarArray);
                console.log("detailsArray:")
                console.log(detailsArray);
                break;
            }

        }
        
        
        
        /*

        for(var i = max - 1; i > start; i--) {

            if(radarArray[i]) {
                console.log("the last index of radarArray: " + i);
                max = i;
                console.log(radarArray);
                console.log(detailsArray);
                break;
            }

        }
        */
        
        

    }

    console.log(detailsArray.length);


}


function textCallback(results, status, pagination) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
    console.error(status);
    return;
    }


    console.log(results);
    //console.log(results[0].geometry.location);

    var detailsRequest = {
        placeId: results[0].place_id
    }

    placesService.getDetails(detailsRequest, detailsCallback);

}

function detailsCallback(place, status) {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        console.error(status);
        return;
      }


     /*
    if($.inArray(place, detailsArray) == -1) {
            console.log("pushing place details into detailsArray");
            detailsArray.push(place);
    }



    if(detailsArray.length == 0) {
        console.log("pushing place details into detailsArray");
        detailsArray.push(place);
    }else{
        for (var i = 0; i < detailsArray.length; i++) {
            if (detailsArray[i] === place) {
                console.log("pushing place details into detailsArray");
                detailsArray.push(place);
                break;
            }
        }

    }
    */

    populateMap(place);

}



function populateMap(place) {


    if($.inArray(place, detailsArray) == -1) {
        console.log("pushing place details into detailsArray");
        detailsArray.push(place);
    }

    //detailsArray = jQuery.unique( detailsArray );

/*

    detailsArray = detailsArray.filter(function(item, pos) {
        return detailsArray.indexOf(item) == pos;
    });
    */

    markerMaker(place, markerID);
    //  Create a new viewpoint bound
    var bounds = new google.maps.LatLngBounds ();
    //  Go through each...
    for (var i = 0, ltLgLen = latLngList.length; i < ltLgLen; i++) {
        //  And increase the bounds to take this point
        bounds.extend (latLngList[i]);
    }
    //  Fit these bounds to the map
    map.fitBounds (bounds);


    //console.log(place);
    //$("#sidebar-content-wrapper").append('<div id="map-item-'+markerID+'" data-id="'+place.place_id+'" class="sidebar-item">'+place.name+'</div>');
    
    appendPlaceDetails(place, markerID)
    
    $(".sidebar-item:last-child").bind( "click", function() {

            console.log(place);

            var mapItemId = $(this).attr('id');

            var thisPlaceId = mapItemId.substring(9);

            //showPlaceDetails(place);
            
            //var thisInfoMarker = marker.get(markerID);
            //console.log(thisInfoMarker);
            var thismarker = markers[thisPlaceId];

            if(thismarker){
                map.setZoom(15);
                map.setCenter(thismarker.getPosition());
            }  

        });
     markerID++;
}


function searchFromServiceMap(input){
    $.ajax({
          url: 'http://www.hel.fi/palvelukarttaws/rest/v2/unit/?search='+input+'',
          dataType: 'jsonp',
          'success': processServiceMapResults  
    });
}


$("#dog-parks-button").click(function() {
    getDogParks();
});

function getDogParks(){
    $.ajax({
          url: 'http://www.hel.fi/palvelukarttaws/rest/v2/service/30927',
          dataType: 'jsonp',
          'success': processServiceMapResults  
    });
}


function processGoogleResults(data){ 
if(markers.length > 0){
    markers.forEach(markerRemover);
    markers = [];
    latLngList = [];
    markerID = 0;
}

}


function processServiceMapResults(data){
    console.log(data);

    if(markers.length > 0){
        markers.forEach(markerRemover);
        markers = [];
        latLngList = [];
        markerID = 0;
    }

    $("#sidebar-content-wrapper").empty();

    $.each( data, function( key, value ) {
        //console.log( key + "= lat: " + value.latitude + " lng: " + value.longitude );

        markerMaker(value, markerID);
        //  Create a new viewpoint bound
        var bounds = new google.maps.LatLngBounds ();
        //  Go through each...
        for (var i = 0, ltLgLen = latLngList.length; i < ltLgLen; i++) {
          //  And increase the bounds to take this point
          bounds.extend (latLngList[i]);
        }
        //  Fit these bounds to the map
        map.fitBounds (bounds);
        //populateSidebar(value.name_fi);
        
        
        //$("#sidebar-content-wrapper").append('<div id="map-item-'+markerID+'" class="sidebar-item">'+value.name_fi+'</div>');
        appendPlaceDetails(value, markerID);



        $(".sidebar-item:last-child").bind( "click", function() {

            //showPlaceDetails(value);
            var mapItemId = $(this).attr('id');

            var thisPlaceId = mapItemId.substring(9);

            //var thisInfoMarker = marker.get(markerID);
            //console.log(thisInfoMarker);
            var thismarker = markers[thisPlaceId];

            if(thismarker){
                map.setZoom(15);
                map.setCenter(thismarker.getPosition());
            }  

        });

        markerID++;

    });

    console.log("markers:");
    console.log(markers);

}


function appendPlaceDetails(value, markerID) {
    //console.log("User clicked on " + value.name_fi);

    var undefinedString = "Tietoa ei saatavilla";

    if(value.name_fi){
        var placeName = value.name_fi;
    }else if(value.name){
        var placeName = value.name;
    }

    if(value.street_address_fi) {
        var strAddr = value.street_address_fi;  
    }else if(value.formatted_address){
        var strAddr = value.formatted_address;  
    }

    if(value.phone) {
        var phoneNum = value.phone;
    }else if(value.formatted_phone_number){
        var phoneNum = value.formatted_phone_number;
    }else{
        var phoneNum = undefinedString;
    }

    if(value.email) {
        var emailAddr = value.email;
    }else{
        var emailAddr = undefinedString;
    }

    if(value.www_fi) {
        var webAddr = value.www_fi;
    }else if(value.website){
        var webAddr = value.website;
    }else{
        var webAddr = undefinedString;
    }
    
    var thisMapItem = $('<div id="map-item-'+markerID+'" class="sidebar-item"></div>');
    
    $(thisMapItem).append('<h2 class="place-name-fi">'+placeName+'</h2><div class="place-phone"><span>Phone: </span>'+phoneNum+'</div><div class="place-email"><span>Email: </span>'+emailAddr+'</div><div class="place-address"><span>Street address: </span>'+strAddr+'</div><div class="place-website-fi"><span>Website: </span>'+webAddr+'</div><div class="place-desc">Some description of the item</div>');
    
    $("#sidebar-content-wrapper").append(thisMapItem);

    //$("#place-info-container").empty();
    //$(".wrapper .place-info").remove();
   
}

function markerMaker(value, markerID){

    if(value.latitude && value.longitude){
        var latlng = {lat: value.latitude, lng: value.longitude};

        var marker = new google.maps.Marker({
          'position': latlng,
          'map': map
        });

        latLngList.push(new google.maps.LatLng(value.latitude, value.longitude));

    }else if(value.geometry.location){
       var location = value.geometry.location;

       var marker = new google.maps.Marker({
          'position': location,
          'map': map
        });

        latLngList.push(location);

    }else{
        console.log("No latitude and longitude values associated with the place/service");
        return;
    }

    markers.push(marker);

    google.maps.event.addListener(marker, 'click', function() {
        $(".sidebar-item").css('background-color', '#E7E5E5');
        
        var thisMapItem = $("#map-item-"+markerID);
        
            $('#sidebar, #sidebar-content-wrapper').animate({
                    scrollTop: $(thisMapItem).offset().top
                }, 1000);
        
            $(thisMapItem).css('background-color', 'lightgreen');
        
            map.setZoom(15);
            map.setCenter(marker.getPosition());

    });	
}

function markerRemover(marker){
    marker.setMap(null);
}

function populateSidebar(name) {
    $("#sidebar-content-wrapper").append('<div class="sidebar-item">'+name+'</div>');
}