angular.module('starter.webmailcontrollers', ['starter.webmailservices'])

//FOLDERS WEBMILS 
.controller('MailsCtrl', function($scope,  MailsSubMenu,$ionicLoading,colo) {

  $scope.colo = colo;
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

  $scope.getClass = function(item){
    var response = "icon ion-folder";
    var value = item.id;
    console.log("colorrrrrrr",value);

    if (value == "inbox") {
      response = "icon ion-filing";}
    if (value == "sentItems") {
      response = "icon ion-paper-airplane";}
    if (value == "draftItems"){
      response = "icon ion-briefcase";}

    return response;
    
  };

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

  $scope.newMailList = Mail.query();
  $scope.mailList = [];
  
  
  $scope.newMailList.$promise.then(function (results){
    console.log("inicio",(results['mainData']));
    console.log('==CONTROLLER WEBMAIL== LOADING FIRST TIME');
    $scope.page = parseInt((results['mainData'])['pageInfo']['pageNumber']);
    $scope.page = $scope.page + 1;
    $scope.mailList = (results['mainData'])['list'];
    // $scope.pageLimit = parseInt((results['mainData'])['pageInfo']['totalPages']);
    $ionicLoading.hide()
  });
  
  $scope.doRefresh = function() {
    
    $scope.page = 1;  
    $scope.newMailList = Mail.query({'pageParam(pageNumber)':$scope.page});

    $scope.newMailList.$promise.then(function (results){
      console.log("doRefresh",(results['mainData']));
      $scope.mailList = ((results['mainData'])['list']).concat($scope.mailList);
      $scope.mailList = (results['mainData'])['list'];
      $scope.$broadcast('scroll.refreshComplete');    
    });
  };

  $scope.loadMore = function() {
    // console.log("limite loadMore", $scope.page+"  "+$scope.pageLimit);
    // if ($scope.page < $scope.pageLimit) {
      console.log('==CONTROLLER WEBMAIL== LOAD MORE');
      $scope.page = $scope.page + 1;
      
      console.log("ifff loadMore",$scope.page);
      $scope.newMails = Mail.query({'pageParam(pageNumber)':$scope.page});

      $scope.newMails.$promise.then(function(results){
        console.log("loadMore",(results['mainData']));
        $scope.mailList = $scope.mailList.concat((results['mainData'])['list']);
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });  
  }
})





// DETAILS MAIL
.controller('MailDetailCtrl', function($scope, $http,$sce, $ionicLoading, $stateParams,Mail,apiUrlLocal,pathWebmail) {
  
  
  //LOADING IMAGE
  $ionicLoading.show({
    template: '<i class="icon ion-loading-d" style="font-size: 32px"></i>',
    animation: 'fade-in',
    noBackdrop: false
  })



  console.log("==WEBMAIL CONTROLLER DETAILS MAIL== start");
  $scope.detail = Mail.query({'dto(mailId)': $stateParams.mailId,folderId: $stateParams.folderId});
  $scope.item = {};

  $scope.detail.$promise.then(function (results){
    console.log("entraaaaaaXD",(results['mainData'])['entity']);
    $scope.item = (results['mainData'])['entity'];

    //SPLIT STRING TO ARRAY CC
    var cc = ((results['mainData'])['entity'])['cc'];
    $scope.arrayCC = cc.split(',');
    console.log("primero",$scope.arrayCC);

    //SPLIT STRING TO ARRAY BCC
    var bcc = ((results['mainData'])['entity'])['bcc'];
    $scope.arrayBCC = bcc.split(',');
    console.log("primero",$scope.arrayBCC);

    //SHOW HTML IN VIEW
    var codigo = ((results['mainData'])['entity'])['body'];
    $scope.thisCanBeusedInsideNgBindHtml = $sce.trustAsHtml(codigo);
    
    $ionicLoading.hide()
  });


  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };

});


//aaaaaaaaaaaaaaaaaaaaaaaaaa lista de mails en un fordel
// .controller('MailsListCtrl', function($scope, $stateParams, MailLoadBD) {
//   $scope.mailList = MailLoadBD.all($stateParams.itemId);
//   $scope.nameList = (($scope.mailList)[0].folder);

//   console.log("Controller WEBMAIL list mails",$scope.mailList);

// })




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
