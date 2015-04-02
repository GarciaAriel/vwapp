angular.module('starter.scheduleservices', [])

.factory('TaskList', function($http,$localstorage) {
  var taskList;
  			
  var url = "http://10.0.0.149:8080/com.servicios/api/eventos/get";

   $http.get(url).then(function(resp) {
       taskList = resp.data;
       console.log('schedule services GET TASK Success OK', taskList);
       // For JSON responses, resp.data contains the result
     }, function(err) {
       console.error('schedule services GET TASK Success ERROR', err);
     // err.status will contain the status code
     }
   )
             
  // var i = 0;
  //   angular.forEach(taskList, function(item) {
  //       if (item!=null) {
  //         $localstorage.setObject(i,item);
  //         i = i+1;
  //       } 
  //   });


  return {
    all: function() {
      return taskList;
    }
  }
});