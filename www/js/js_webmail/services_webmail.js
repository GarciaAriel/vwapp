angular.module('starter.webmailservices', [])
/**
 * A simple example service that returns some data.
 */
.factory('MailList', function($http) {

  var mailsboxes = new Array();
  
  var url = "http://localhost:8080/com.servicios/api/mailboxes/";
             
  //request to mailbox INBOX
  $http.get(url.concat('inbox')).then(function(resp) {
      mailsboxes[0]=resp.data;

      console.log('Mails service INBOX Success OK', resp.data);
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


  return {
    all: function(listId) {
      console.log("consult get ALL(idList) mails");
      return mailsboxes[listId];
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
      return (mailsboxes[index])[mailId];
    }
  }
})

/**
 * A simple example service that returns some data.
 */
.factory('MailsSubMenu', function() {
  

  // Some fake testing data
  // Some fake testing data
  var mailsSubMenu = [{
    id: 0,
    name: 'Inbox',
    notes: 'Enjoys drawing things',
    face: 'img/android-archive.png'
  },{
    id: 1,
    name: 'Send Items',
    notes: 'Wears a sweet leather Jacket. I\'m a bit jealous',
    face: 'img/paper-airplane.png'
  }, {
    id: 2,
    name: 'Draft Items',
    notes: 'Wears a sweet leather Jacket. I\'m a bit jealous',
    face: 'img/android-mail.png'
  }, {
    id: 3,
    name: 'Trash Items',
    notes: 'I think he needs to buy a boat',
    face: 'img/trash-b.png'
  }, {
    id: 4,
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

