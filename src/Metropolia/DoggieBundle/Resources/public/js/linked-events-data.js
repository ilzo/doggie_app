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
      
    $.each( linkedEventsData1[0]['data'], function( key, value ) {
        linkedEventsResults1.push(value);
    });
    
    console.log("linkedEventsResults1:");  
    console.log(linkedEventsResults1);
    linkedEventsResults1.sort(compare);
      
    var containerArr1 = sortRecurrentEvents(linkedEventsResults1);
      
    console.log("Container array 1:");
    console.log(containerArr1);
    
  }
    
    
  if( linkedEventsData2 ) {
      
    $.each( linkedEventsData2[0]['data'], function( key, value ) {
        linkedEventsResults2.push(value);
    });
    console.log("linkedEventsResults2:");  
    console.log(linkedEventsResults2);
    linkedEventsResults2.sort(compare);
      
    var containerArr2 = sortRecurrentEvents(linkedEventsResults2);
      
    console.log("Container array 2:");
    console.log(containerArr2);
    
  }
  
    
    
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
                    var subArr = eventsArr.slice(i, pointer);
                    resultArr[j] = subArr;
                    j++;
                    flag = true;
                }
                
            }
            pointer++;    
        }
        
    });
    
    return resultArr;
    
}




/*


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
 */
 



/*
function checkDuplicateInObject(propertyName, inputArray) {
  //var seenDuplicate = false;
  var testObject = {};
 
  inputArray.map(function(item) {
    var itemPropertyName = item[propertyName];    
    if (itemPropertyName in testObject) {
      testObject[itemPropertyName].duplicate = true;
      item.duplicate = true;
      duplicates.push(item);
      //seenDuplicate = true;
        console.log("ItemPropertyName:");
        console.log(itemPropertyName);
        
    }else{
      testObject[itemPropertyName] = item;
        
      delete item.duplicate;
    }
  });
 
  return duplicates;
}
*/


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