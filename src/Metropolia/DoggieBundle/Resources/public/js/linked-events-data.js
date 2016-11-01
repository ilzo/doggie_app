var linkedEventsData1;
var linkedEventsData2;
var linkedEventsResults1 = [];
var linkedEventsResults2 = [];

var linkedEventsRequest1 = $.ajax({
    url: 'https://api.hel.fi/linkedevents/v1/event/?include=location&keyword=helmet%3A10689&text=koira&text=koirat&page_size=50',
    //url: '/linkedevents/v1/event/?include=location&keyword=helmet%3A10689&page=2&text=koira&text=koirat',
    dataType: 'json' 
});

var linkedEventsRequest2 = $.ajax({
    url: 'https://api.hel.fi/linkedevents/v1/search/?q=koira&q=koirat&type=event&page_size=50',
    dataType: 'json' 
});



$.when(linkedEventsRequest1, linkedEventsRequest2).done(function(data1, data2) {
  linkedEventsData1 = data1;
  linkedEventsData2 = data2;
    
  if( linkedEventsData1 ) {
    $.each( linkedEventsData1, function( key, value ) {
        linkedEventsResults1.push(value);
    });
    console.log("linkedEventsResults1:");  
    console.log(linkedEventsResults1);  
  }
    
    
  if( linkedEventsData2 ) {
    $.each( linkedEventsData2, function( key, value ) {
        linkedEventsResults2.push(value);
    });
    console.log("linkedEventsResults2:");  
    console.log(linkedEventsResults2);  
  }
    
    
});

linkedEventsRequest1.fail(function( jqXHR, textStatus ) {
  console.log( "Request failed: " + textStatus );
});

linkedEventsRequest2.fail(function( jqXHR, textStatus ) {
  console.log( "Request failed: " + textStatus );
});


/*
linkedEventsRequest.done(function(result) {
  linkedEventsData = result;
    
  if( linkedEventsData ) {
    $.each( linkedEventsData, function( key, value ) {
        linkedEventsResults.push(value);
    });
    console.log("linkedEventsResults:");  
    console.log(linkedEventsResults);  
  }
    
});




var promise1 = $.ajax("/myServerScript1");
var promise2 = $.ajax("/myServerScript2");
 
$.when(promise1, promise2).done(function(data1, data2) {
  // Handle data from both Ajax calls
});

*/