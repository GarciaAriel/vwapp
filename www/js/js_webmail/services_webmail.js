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
  
  var url = "http://localhost:8080/com.servicios/api/mailboxes/idUser";
             
  //request to mailbox INBOX
  $http.get(url).then(function(resp) {
      var result = resp.data;
      var inbox = new Array();
      var sentItems = new Array();
      var draftItems = new Array();
      var trashItems = new Array();
      var outBoxItems = new Array();
      angular.forEach(result, function(item){
        switch (item.folder) {
        case "inbox":
            inbox.push(item);
            break;
        case "sentItems":
            sentItems.push(item);
            break;
        case "draftItems":
            draftItems.push(item);
            break;
        case "trashItems":
            trashItems.push(item);
            break;
        case "outBoxItems":
            outBoxItems.push(item);
            break;
      }
      })

      mailsboxes[0]=inbox;
      mailsboxes[1]=sentItems;
      mailsboxes[2]=draftItems;
      mailsboxes[3]=trashItems;
      mailsboxes[4]=outBoxItems;
      console.log('Mails service GET MAILS Success OK', mailsboxes);


      // save data in localstorage
      var i = 0;
      console.log("guardandnoooooooooooooo",mailsboxes[0]);
      angular.forEach(mailsboxes[0], function(item) {
          if (item!=null) {
            console.log("entraaaaaaaa guardarrrrrrrr",item);
            $localstorage.setObject(i,item);
            i = i+1;
          } 
      });
      
    }, function(err) {
      console.error('Mails services GET MAILS Success ERROR', err);
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


// .factory('dataBase', function($scope, $cordovaSQLite) {
  
//   return {
//     insert: function(firstname, lastname) {
//         console.log("call insert function with: "+firstname+lastname);
//         var query = "INSERT INTO people (firstname, lastname) VALUES (?,?)";
//         $cordovaSQLite.execute(db, query, [firstname, lastname]).then(function(res) {
//             console.log("INSERT ID -> " + res.insertId);
//             console.log("siiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
//         }, function (err) {
//             console.log("nooooooooooooooooooooooooooooooooooooooooooooooo");
//             console.error(err);
//         });
//         return 'o';
//     },
 
//     select: function(lastname) {
//         console.log("call select function with: "+ lastname);
//         var query = "SELECT firstname, lastname FROM people WHERE lastname = ?";
//         $cordovaSQLite.execute(db, query, [lastname]).then(function(res) {
//             if(res.rows.length > 0) {
                  
//                 console.log("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
//                 console.log("siiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
//             } else {
//                 console.log("nooooooooooooooooooooooooooooooooooooooooooooooo");
//                 console.log("No results found");
//             }
//         }, function (err) {
//             console.error(err);
//         });
//         return 'o';
//     }
//   }
// })

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

