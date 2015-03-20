angular.module('starter.webmailcontrollers', [])


.controller('MailsCtrl', function($scope,  MailsSubMenu) {

  $scope.mailsSubMenu = MailsSubMenu.all();
  console.log("Controller WEBMAIL mailboxes folders",$scope.mailsSubMenu);
})


.controller('MailsListCtrl', function($scope, $stateParams, MailLoadBD) {
  $scope.mailList = MailLoadBD.all($stateParams.itemId); 
  $scope.nameList = (($scope.mailList)[0].folder);
  
// .controller('MailsListCtrl', function($scope, $stateParams, MailList) {
//   $scope.mailList = MailList.all($stateParams.itemId);

  console.log("Controller WEBMAIL list mails",$scope.mailList);


})

.controller("indexController", function($scope) {
    $scope.vm = {
        caption: 'angular is here',
        isBlockVisible: false,
        toggle: function() {
            this.isBlockVisible = !this.isBlockVisible;
        }
    };
})

.controller('MailDetailCtrl', function($scope, $stateParams, MailLoadBD, $ionicSlideBoxDelegate) {
  $scope.data = [];
  $scope.myActiveSlide = $stateParams.mailId;

  $scope.data.slides = 	MailLoadBD.all($stateParams.folderId); 
  
  $scope.mail = MailLoadBD.get($stateParams.folderId,$stateParams.mailId);

  console.log("Controller WEBMAIL detail mail",$scope.mail);

  $ionicSlideBoxDelegate.update();
  
});



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
