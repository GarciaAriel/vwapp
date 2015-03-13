angular.module('starter.contactservices', [])

.factory('Contacts', function($http) {

  var contacts;
  
  var url = "http://localhost:8080/com.servicios/api/contacts/get";
             
  //request to mailbox OUTBOXITEMS
  $http.get(url).then(function(resp) {
      contacts = resp.data;

      console.log('contacts service OUTBOXITEMS Success OK', resp.data);
      // For JSON responses, resp.data contains the result
    }, function(err) {
      console.error('contacts services OUTBOXITEMS Success ERROR', err);
    // err.status will contain the status code
    }
  )


  return {
    all: function() {
      console.log("xxxxxxxxxxxcontact GET allllllll services",contacts);
      return contacts;
    },
    get: function(mailId) {

      return contacts[mailId];
    }
  }
});
