var data;
var objectArray = [];
var searchArray = ["Koira-alueet", "Koira-aitaukset", "Opaskoira-aitaukset", "Koirametsät", "Koirakäymälät", "Koirauimarannat", "Koiravero", "Koiraurheilu"];
var request = $.ajax({
    url: 'http://www.hel.fi/palvelukarttaws/rest/v2/unit/?service=30927+31852+30931+31855+30968+30935+33537+33538+33539',
    dataType: 'json' 
});

request.done(function( result ) {
  data = result;
  /*
  console.log("Following data queried:");    
  console.log(data);
  console.log("Example:");
  console.log(data[133]["name_fi"]);
  */
    
  if( data ) {
      
    $.each( data, function( key, value ) {
        objectArray.push(value);
        searchArray.push(value.name_fi);
    });
    console.log("objectArray:");  
    console.log(objectArray);  
  }
    
});

request.fail(function( jqXHR, textStatus ) {
  console.log( "Request failed: " + textStatus );
});

