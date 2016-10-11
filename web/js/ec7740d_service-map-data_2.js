var data;
var searchArray = [];
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
        //console.log(value.name_fi);
        searchArray.push(value.name_fi);
    });
    console.log(searchArray);  
  }
    
});

request.fail(function( jqXHR, textStatus ) {
  console.log( "Request failed: " + textStatus );
});

