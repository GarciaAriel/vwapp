angular.module('starter.webmailcontrollers', [])

//FOLDERS WEBMILS 
.controller('MailsCtrl', function($scope,  MailsSubMenu) {
  $scope.mailsSubMenu = MailsSubMenu.all();
  console.log("==CONTROLLER WEBMAIL== GET FOLDERS MAILBOXES",$scope.mailsSubMenu);
})

//LIST MAILS IN FORDER (REFRESH / LOADMORE)
.controller('MailsListCtrl',function($scope, Mail,$timeout){
  $scope.page = 1;
  $scope.mailList = Mail.query({'pageParam(pageNumber)': $scope.page});
  console.log('==CONTROLLER WEBMAIL== QUERY ITEMS',$scope.mailList);
  
  $scope.doRefresh = function(){
    $scope.page = 1;
    $scope.mailList = Mail.query({'pageParam(pageParam)':$scope.page});

    $scope.mailList.$promise.them(function (results){
      $scope.mailList = results;
      $scope.$broadcast('scroll.refreshComplete');  
    });
  };

  $scope.loadMore = function(){
    $scope.page = $scope.page +1;
    $scope.newMails = Mail.query({'pageParam(pageParam)':$scope.page});
    $scope.newMails.$promise.then(function(results){
      $scope.mailList = $scope.mailList.concat(results);
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
