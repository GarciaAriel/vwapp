angular.module('starter.webmailservices', [])


/**
 * A simple example service that returns some data.
 */
.factory('MailList', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  // Some fake testing data
  var mailList = [{
    id: 0,
    name: 'Elmo Mey',
    notes: 'Enjoys drawing things',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  },{
    id: 1,
    name: 'Armando Carpas',
    notes: 'Wears a sweet leather Jacket. I\'m a bit jealous',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 2,
    name: 'Pepe Chino',
    notes: 'Wears a sweet leather Jacket. I\'m a bit jealous',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Armando lios',
    notes: 'I think he needs to buy a boat',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];


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
  // Might use a resource here that returns a JSON array

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

