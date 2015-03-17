angular.module('starter.webmailservices', [])
/**
 * A simple example service that returns some data.
 */

.factory('MailLoadBD', function($localstorage) {

  var mailsboxes = new Array();
    
  var arr = new Array();  
  for (var i=0; i<3; i++){

    var object = $localstorage.getObject(i)
    console.log("el objeto extraidooooo", object);
    arr[i]=object;
  }
  mailsboxes[0]=arr;
  console.log("creo que yaaaaaaaaaaaaaaaaaa BD",mailsboxes[0]);
  

  


  return {
    all: function(listId) {
      var index;
      switch (listId) {
        case "inbox":
            index = 0;
            break;
        case "sentItems":
            index = 1;
            break;
        case "draftItems":
            index = 2;
            break;
        case "trashItems":
            index = 3;
            break;
        case "outBoxItems":
            index = 4;
            break;
      }
      return mailsboxes[0];
      //return mailsboxes[index];
    },
    get: function(listId,mailId) {
      var index;
      switch (listId) {
        case "inbox":
            index = 0;
            break;
        case "sentItems":
            index = 1;
            break;
        case "draftItems":
            index = 2;
            break;
        case "trashItems":
            index = 3;
            break;
        case "outBoxItems":
            index = 4;
            break;
      } 
      console.log("consult SERVICES GET(idMail) mails");
      return (mailsboxes[index])[mailId];
    }
  }
})
//================================================================================
//================================================================================
//================================================================================

.factory('MailList', function($http,$localstorage) {

  var mailsboxes = new Array();
  
  var url = "http://10.0.0.149:8080/com.servicios/api/mailboxes/";
             
  //request to mailbox INBOX
  $http.get(url.concat('inbox')).then(function(resp) {
      mailsboxes[0]=resp.data;
      console.log('Mails service INBOX Success OK', resp.data);

      var i = 0;
      console.log("guardandnoooooooooooooo",mailsboxes[0]);
      angular.forEach(mailsboxes[0], function(item) {
          if (item!=null) {
            console.log("entraaaaaaaa guardarrrrrrrr",item);
            $localstorage.setObject(i,item);
            i = i+1;
          } 
      });
      // For JSON responses, resp.data contains the result
    }, function(err) {
      console.error('Mails services INBOX Success ERROR', err);
    // err.status will contain the status code
    }
  )
  //request to mailbox SENTITEMS
  $http.get(url.concat('sentItems')).then(function(resp) {
      mailsboxes[1]=resp.data;

      console.log('Mails service SENTITEMS Success OK', resp.data);
      // For JSON responses, resp.data contains the result
    }, function(err) {
      console.error('Mails services SENTITEMS Success ERROR', err);
    // err.status will contain the status code
    }
  )
  //request to mailbox DRAFTITEMS
  $http.get(url.concat('draftItems')).then(function(resp) {
      mailsboxes[2]=resp.data;

      console.log('Mails service DRAFTITEMS Success OK', resp.data);
      // For JSON responses, resp.data contains the result
    }, function(err) {
      console.error('Mails services DRAFTITEMS Success ERROR', err);
    // err.status will contain the status code
    }
  )
  //request to mailbox TRASHITEMS
  $http.get(url.concat('trashItems')).then(function(resp) {
      mailsboxes[3]=resp.data;

      console.log('Mails service TRASHITEMS Success OK', resp.data);
      // For JSON responses, resp.data contains the result
    }, function(err) {
      console.error('Mails services TRASHITEMS Success ERROR', err);
    // err.status will contain the status code
    }
  )
  //request to mailbox OUTBOXITEMS
  $http.get(url.concat('outBoxItems')).then(function(resp) {
      mailsboxes[4]=resp.data;

      console.log('Mails service OUTBOXITEMS Success OK', resp.data);
      // For JSON responses, resp.data contains the result
    }, function(err) {
      console.error('Mails services OUTBOXITEMS Success ERROR', err);
    // err.status will contain the status code
    }
  )

console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  var i = 0;
    angular.forEach(mailsboxes[0], function(item) {
        if (item!=null) {
          console.log("entraaaaaaaa",item);
          $localstorage.setObject(i,item);
          i = i+1;
        } 
    });


  return {
    all: function() {
      return mailsboxes[0];
    }
  }
})


.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])

/**
 * A simple example service that returns some data.
 */
.factory('MailsSubMenu', function() {
  

  // Some fake testing data
  // Some fake testing data
  var mailsSubMenu = [{
    id: "inbox",
    name: 'Inbox',
    notes: 'Enjoys drawing things',
    face: 'img/android-archive.png'
  },{
    id: "sentItems",
    name: 'Send Items',
    notes: 'Wears a sweet leather Jacket. I\'m a bit jealous',
    face: 'img/paper-airplane.png'
  }, {
    id: "draftItems",
    name: 'Draft Items',
    notes: 'Wears a sweet leather Jacket. I\'m a bit jealous',
    face: 'img/android-mail.png'
  }, {
    id: "trashItems",
    name: 'Trash Items',
    notes: 'I think he needs to buy a boat',
    face: 'img/trash-b.png'
  }, {
    id: "outBoxItems",
    name: 'Outbox',
    notes: 'Just the nicest guy',
    face: 'img/log-out.png'
  }];

  return {
    all: function() {
      return mailsSubMenu;
    },
    get: function(mailsSubMenuId) {
      // Simple index lookup
      return mailsSubMenu[mailsSubMenuId];
    }
  }
});

