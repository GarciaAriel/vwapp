angular.module('starter.webmailservices', [])
/**
 * A simple example service that returns some data.
 */

.factory('MailLoadBD', function($localstorage) {

  var mailsboxes = $localstorage.getObject("mBoxes");
  
  return {
    all: function(listId) {
      var result = mailsboxes[listId];
      return result;
      //return mailsboxes[index];
    },
    get: function(listId,mailId) {
      var result = mailsboxes[listId];
      console.log("consult SERVICES GET(idMail) mails");
      var index = parseInt(mailId);
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaresultList",result);
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaMail",index);
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaIDDDD",index);
      return (result[index]);
    }
  }
})
//================================================================================
//================================================================================
//================================================================================

.factory('MailList', function($http,$localstorage,apiUrl,apiUr) {
  var mailsboxes = { };
  
  var url = apiUrl;
  console.log("asdfasdfasdfasdfasdfasdfasdf",apiUr);
             
  //request to mailbox INBOX
  $http.get(url).then(function(resp) {
      var result = resp.data;
      angular.forEach(result, function(item){
        if (mailsboxes[(item.folder)]) {
          //exists
          (mailsboxes[item.folder]).push(item);
        } else {
            // Does not exist
            var nombre = item.folder;
            var auxiliar = new Array();
            mailsboxes[nombre] = auxiliar;
            (mailsboxes[item.folder]).push(item);
        }
        
      });

      console.log('Mails service GET M Success OK', mailsboxes);


      // save data in localstorage
      console.log("guardandnoooooooooooooo");
      $localstorage.setObject("mBoxes",mailsboxes);
    }, function(err) {
      console.error('Mails services INBOX Success ERROR', err);
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
.factory('MailsSubMenu', function($localstorage) {
  
  var mailsboxes = $localstorage.getObject("mBoxes");
  console.log("Load folders webmail",mailsboxes);

  var mailsSubMenu = new Array();
  for (var k in mailsboxes){
    if (mailsboxes.hasOwnProperty(k)) {
        //alert("Key is " + k + ", value is" + target[k]);
        var obj;
        switch (k) {
        case "inbox":
            obj = {id: k,name: k,face:'img/android-archive.png'};
            break;
        case "sentItems":
            obj = {id: k,name: k,face:'img/paper-airplane.png'};
            break;
        case "draftItems":
            obj = {id: k,name: k,face:'img/android-mail.png'};
            break;
        case "trashItems":
            obj = {id: k,name: k,face:'img/trash-b.png'};
            break;
        case "outBoxItems":
            obj = {id: k,name: k,face:'img/log-out.png'};
            break;
        default:
            obj = {id: k,name: k,face:'img/ios7-folder.png'};
      }

         
         mailsSubMenu.push(obj);
    }
  }
  console.log("vamos carajooooo",mailsboxes);
  
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

