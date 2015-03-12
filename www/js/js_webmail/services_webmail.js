angular.module('starter.webmailservices', [])


/**
 * A simple example service that returns some data.
 */
.factory('MailList', function($http) {

var mailList;
  
    $http.get('http://localhost:8080/com.servicios/api/mail/get').then(function(resp) {
    mailList = resp.data;
    console.log('Mails service Success OK', resp.data);
    // For JSON responses, resp.data contains the result
  }, function(err) {
    console.error('Mails services Success ERROR', err);
    // err.status will contain the status code
  })

  return {
    all: function() {
      return mailList;
    },
    get: function(mailListId) {
      // Simple index lookup
      return mailList[mailListId];
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

