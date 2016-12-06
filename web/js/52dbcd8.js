var linkedEventsData1;
var linkedEventsData2;
var linkedEventsResults1 = [];
var linkedEventsResults2 = [];
var allEventResults = [];
var eventObject;
var formattedEventObjects = [];
var eventName;
var eventDescShort;
var eventDescLong;
var shortenThis;
var eventStartTimes = [];
var eventEndTimes = [];
var eventImages = [];


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
      
    $.each( linkedEventsData1[0]['data'], function( key, value ) {
        linkedEventsResults1.push(value);
    });

  }
    
    
  if( linkedEventsData2 ) {
      
    $.each( linkedEventsData2[0]['data'], function( key, value ) {
        linkedEventsResults2.push(value);
    });
     
    
  }
    
    console.log("linkedEventsResults1:");  
    console.log(linkedEventsResults1);
    
    console.log("linkedEventsResults2:");  
    console.log(linkedEventsResults2);
    
    
    allEventResults = linkedEventsResults1.concat(linkedEventsResults2);
    
    allEventResults.sort(compare);
    
    console.log("calling duplicate removal:");
    var uniqueArray = removeDuplicates(allEventResults, "id");
    
    console.log("event results: ");  
    console.log(uniqueArray);
    
    
    var containerArr = sortRecurrentEvents(uniqueArray);
    
    console.log("Container array:");
    console.log(containerArr);
    
    formatEventData(containerArr);
    
    formattedEventObjects.reverse();
    console.log("formatted events:");
    console.log(formattedEventObjects);
    
    outputEvents(formattedEventObjects);
  
});


$( document ).ready(function() {
    
    
    /*
    $('.content-area .container a').click(function(event) {
        event.preventDefault();
        console.log("clicked a link");
    });
    */
    
    
    
});



linkedEventsRequest1.fail(function( jqXHR, textStatus ) {
  console.log( "Request failed: " + textStatus );
});

linkedEventsRequest2.fail(function( jqXHR, textStatus ) {
  console.log( "Request failed: " + textStatus );
});



function compare(a,b) {
  if (a.description.fi < b.description.fi)
    return -1;
  if (a.description.fi > b.description.fi)
    return 1;
  return 0;
}

function sortRecurrentEvents (eventsArr) {
    var pointer = 1;
    var j = 0;
    var resultArr = [];
    var comparedItem;
    
    $.each( eventsArr, function( i, val ) {
        
        if( (pointer > 1) && (i < (pointer - 1)) ){
            return true;
        }
        
        if(eventsArr[pointer] == null) {
            var subArr = [val];
            resultArr[j] = subArr;
            return false;
        }
        
        var flag = false;
        
        while(flag == false) {
            
            comparedItem = eventsArr[pointer];
            
            if(comparedItem == null){
                var subArr = eventsArr.slice(i);
                resultArr[j] = subArr;
                return false;
                
            }else{
                
                
                if(val.description.fi !== comparedItem.description.fi) {
                    
                    if(val.name.fi !== comparedItem.name.fi) {
                        
                        var subArr = eventsArr.slice(i, pointer);
                        resultArr[j] = subArr;
                        j++;
                        flag = true;
                        
                    }
                      
                }
                
            }
            pointer++;    
        }
        
    });
    
    return resultArr;
    
}


function formatEventData (container) {
    $.each( container, function( key, value ) {
        if(value.length == 1){
            
            if (value[0].images.length > 0) {
                for(var i = 0; i < value[0].images.length; i++) {
                    eventImages.push(value[0].images[i].url);
                }
                
            }else{
                eventImages.push("../img/event4.jpg");
            }
            
            if(value[0].short_description !== null) {
                eventDescShort = value[0].short_description.fi;
            }else{
                shortenThis = value[0].description.fi;
                eventDescShort = shortenThis.substring(0, 80) + "...";
            }
            
            eventObject = {name : value[0].name.fi, start : reformatTime(value[0].start_time), end : reformatTime(value[0].end_time), desc_short : eventDescShort, desc_long : value[0].description.fi, images : eventImages};
            formattedEventObjects.push(eventObject);
            
        }else{
            
            eventName = value[0].name.fi;
            
            if(value[0].short_description !== null) {
                eventDescShort = value[0].short_description.fi;
            }else{
                shortenThis = value[0].description.fi;
                eventDescShort = shortenThis.substring(0, 80) + "...";
            }
            
            eventDescLong = value[0].description.fi;
            
            if (value[0].images.length > 0) {
                for(var i = 0; i < value[0].images.length; i++) {
                    eventImages.push(value[0].images[i].url);
                }
                
            }else{
                eventImages.push("../img/event4.jpg");
            }
            
            
            for(var i = 0; i < value.length; i++) {
                
                eventStartTimes.push(reformatTime(value[i].start_time));
                
                eventEndTimes.push(reformatTime(value[i].end_time));
                
                
            }
            
            eventObject = {name : eventName, start : eventStartTimes, end : eventEndTimes, desc_short : eventDescShort, desc_long : eventDescLong, images : eventImages};
            formattedEventObjects.push(eventObject);
            
            eventStartTimes = [];
            eventEndTimes = [];
            
        }
        
        eventImages = [];
        
    });
     
}

function reformatTime (string) {
    
    if(string == null) {
        return null;
    }
    
    if ((string.indexOf("T") !== -1) && (string.indexOf("Z") !== -1)){
        var dateString = string.substring(0,string.lastIndexOf("T"));
        var dateArr = dateString.split("-",3);
        dateString = dateArr[2] + "." + dateArr[1] + "." + dateArr[0];
        var timeString = string.substring(string.lastIndexOf("T")+1, 16);
    }else{
        var dateArr = string.split("-",3);
        var dateString = dateArr[2] + "." + dateArr[1] + "." + dateArr[0];
        var timeString = null;
    }
    
    var dateObj = {date : dateString , time : timeString};
    return dateObj;
    
}

function outputEvents(events) {
    var eventDate;
    var itemCount = 0;
    var row = $('<div class="row"></div>');
    var item;
    
    for(var i = 0; i < events.length; i++) {
        
        if(i > 0) {
            if(itemCount == 0){
                $(".content-area .container").append(row);
                row = $('<div class="row"></div>');

            }   
        }
        
        if( Object.prototype.toString.call( events[i].start ) === '[object Array]' ) {
            eventDate = events[i].start[0].date;
        }else{
            eventDate = events[i].start.date;
        }
        
        var encodedObj = encodeURIComponent(JSON.stringify(events[i]));
        
        //var encodedObj = JSON.stringify(events[i]);
        
        var backendPath = Routing.generate('MetropoliaDoggieBundle_single_event', { id: i});
        
        //console.log(encodedObj);
        
        //item = $('<div id="'+i+'" class="col-md-3 event-item"><a href="#"><img class="img-responsive" src="'+events[i].images[0]+'"></a><h3 class="name-of-the-event"><a  href="#">'+events[i].name+'</a></h3><p>'+eventDate+'</p><p>'+events[i].desc_short+'</p></div>');
        
        item = $('<div id="'+i+'" class="col-md-3 event-item"><form class="event-form" method="post" action="'+backendPath+'"><button type="submit" class="event-submit-link"><img class="img-responsive" src="'+events[i].images[0]+'"></button><h3 class="name-of-the-event"><button type="submit" class="event-submit-link">'+events[i].name+'</button></h3><p>'+eventDate+'</p><p>'+events[i].desc_short+'</p><input type="hidden" name="event-object-data" value="'+encodedObj+'"></form></div>');
        
        row.append(item);
        
        if(events.length - i == 1) {
                $(".content-area .container").append(row);
                break;
        }
        
        if(itemCount < 3) {
            itemCount++; 
        }else{
            itemCount = 0;
        }
            
          
    }
    
    $('.content-area .container a').click(function(e){ prepareSingleEvent(e); return false; });
    
    
    document.getElementById("loader").style.display = "none";
      
}


function removeDuplicates(arr, prop) {
     var new_arr = [];
     var lookup  = {};
 
     for (var i in arr) {
         lookup[arr[i][prop]] = arr[i];
     }
 
     for (i in lookup) {
         new_arr.push(lookup[i]);
     }
 
     return new_arr;
 }
 

function checkDuplicates(arr) {
    var valueArr = arr.map(function(item){ return item.id });
    var isDuplicate = valueArr.some(function(item, idx){ 
        return valueArr.indexOf(item); 
    });
    
    return isDuplicate;
}

