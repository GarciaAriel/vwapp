angular.module('starter.webmailcontrollers', ['starter.webmailservices'])

//FOLDERS WEBMILS 
.controller('MailsCtrl', function($scope,  MailsSubMenu,$ionicLoading) {

  $ionicLoading.show({
    template: '<i class="icon ion-loading-d" style="font-size: 32px"></i>',
    animation: 'fade-in',
    noBackdrop: false
  })

  MailsSubMenu.getContacts().then(function(result) {
    $scope.mailsSubMenu = result;
    console.log("ssss",result);
    $ionicLoading.hide()
  })         
//$scope.mailsSubMenu = MailsSubMenu.all();
  console.log("==CONTROLLER WEBMAIL== GET FOLDERS MAILBOXES",$scope.mailsSubMenu);
})

//LIST MAILS IN FORDER (REFRESH / LOADMORE)
.controller('MailsListCtrl',function($scope, Mail,$timeout,$ionicLoading,$resource){
  console.log('==CONTROLLER WEBMAIL== STARTING');

  //LOADING IMAGE
  $ionicLoading.show({
    template: '<i class="icon ion-loading-d" style="font-size: 32px"></i>',
    animation: 'fade-in',
    noBackdrop: false
  })

  $scope.mailList = Mail.get({'pageParam(pageNumber)': $scope.page});
  
  $scope.mailList.$promise.then(function (results){
    console.log('==CONTROLLER WEBMAIL== LOADING FIRST TIME');
    $scope.page = parseInt((results['mainData'])['pageInfo']['pageNumber']);
    $scope.mailList = (results['mainData'])['list'];
    $ionicLoading.hide()
  });
  
  $scope.doRefresh = function() {
    $scope.page = 1;
    $scope.mailList = Mail.get({'pageParam(pageNumber)':$scope.page});

    $scope.mailList.$promise.then(function (results){
      $scope.mailList = (results['mainData'])['list'];
      $scope.$broadcast('scroll.refreshComplete');  
    });
  };

  $scope.loadMore = function() {
    console.log('==CONTROLLER WEBMAIL== LOAD MORE');
    $scope.page = $scope.page + 1;
    $scope.newMails = Mail.get({'pageParam(pageNumber)':$scope.page});

    $scope.newMails.$promise.then(function(results){
      $scope.mailList = $scope.mailList.concat((results['mainData'])['list']);
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };

});


//aaaaaaaaaaaaaaaaaaaaaaaaaa lista de mails en un fordel
// .controller('MailsListCtrl', function($scope, $stateParams, MailLoadBD) {
//   $scope.mailList = MailLoadBD.all($stateParams.itemId);
//   $scope.nameList = (($scope.mailList)[0].folder);

//   console.log("Controller WEBMAIL list mails",$scope.mailList);

// })



// .controller('MailDetailCtrl', function($scope, $stateParams, MailLoadBD, $ionicSlideBoxDelegate) {

//   $scope.groups = [];
//   for (var i=0; i<3; i++) {
//     $scope.groups[i] = {
//       name: i,
//       items: []
//     };
//     for (var j=0; j<3; j++) {
//       $scope.groups[i].items.push(i + '-' + j);
//     }
//   }

//   $scope.toggleGroup = function(group) {
//     if ($scope.isGroupShown(group)) {
//       $scope.shownGroup = null;
//     } else {
//       $scope.shownGroup = group;
//     }
//   };
//   $scope.isGroupShown = function(group) {
//     return $scope.shownGroup === group;
//   };
//   //dooooooooooooo

//   $scope.data = [];
//   $scope.myActiveSlide = $stateParams.mailId;

//   $scope.data.slides = 	MailLoadBD.all($stateParams.folderId);

//   $scope.mail = MailLoadBD.get($stateParams.folderId,$stateParams.mailId);
//   console.log("Controller WEBMAIL detail mail",$scope.mail);
//   $ionicSlideBoxDelegate.update();

// });

// .controller("indexController", function($scope) {
//     $scope.vm = {
//         caption: 'angular is here',
//         isBlockVisible: false,
//         toggle: function() {
//             this.isBlockVisible = !this.isBlockVisible;
//         }
//     };
// });



// .controller("ExampleController", function($scope, $cordovaSQLite) {

//     $scope.insert = function(firstname, lastname) {
//         console.log("call insert function with: "+firstname+lastname);
//         var query = "INSERT INTO people (firstname, lastname) VALUES (?,?)";
//         $cordovaSQLite.execute(db, query, [firstname, lastname]).then(function(res) {
//             console.log("INSERT ID -> " + res.insertId);
//             console.log("siiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
//         }, function (err) {
//             console.log("nooooooooooooooooooooooooooooooooooooooooooooooo");
//             console.error(err);
//         });
//     }

//     $scope.select = function(lastname) {
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
//     }

// });
