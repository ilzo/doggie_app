var serviceMapData;
var serviceMapResults = [];
var searchArray = ["Koira-alueet", "Koira-aitaukset", "Opaskoira-aitaukset", "Koirametsät", "Koirakäymälät", "Koirauimarannat", "Koiravero", "Koiraurheilu"];

var serviceMapRequest = $.ajax({
    url: 'http://www.hel.fi/palvelukarttaws/rest/v2/unit/?service=30927+31852+30931+31855+30968+30935+33537+33538+33539',
    dataType: 'jsonp' 
});

serviceMapRequest.done(function( result ) {
  serviceMapData = result;  
  if( serviceMapData ) {
    $.each( serviceMapData, function( key, value ) {
        serviceMapResults.push(value);
        searchArray.push(value.name_fi);
    });
    console.log("serviceMapResults:");  
    console.log(serviceMapResults);  
  }
    
});

serviceMapRequest.fail(function( jqXHR, textStatus ) {
  console.log( "Request failed: " + textStatus );
});

