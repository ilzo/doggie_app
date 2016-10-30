var linkedEventsData;
var linkedEventsResults = [];

var linkedEventsRequest = $.ajax({
    url: 'https://api.hel.fi/linkedevents/v1/event/?include=location&keyword=helmet%3A10689&text=koira&text=koirat',
    //url: '/linkedevents/v1/event/?include=location&keyword=helmet%3A10689&page=2&text=koira&text=koirat',
    dataType: 'json' 
});

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

linkedEventsRequest.fail(function( jqXHR, textStatus ) {
  console.log( "Request failed: " + textStatus );
});