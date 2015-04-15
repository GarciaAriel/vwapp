angular.module('starter.webmailcontrollers', ['starter.webmailservices','starter.constantsWebmail'])

//FOLDERS WEBMILS 
.controller('MailsCtrl', function($scope,Webmal_read_forlders,colo,PATH_WEBMAIL_READ_FOLDERS,
  FOLDER_INBOX_ID,FOLDER_INBOX_NAME,FOLDER_SENT_ID,FOLDER_SENT_NAME,FOLDER_DRAFT_ID,
  FOLDER_DRAFT_NAME,FOLDER_TRASH_ID,FOLDER_TRASH_NAME,FOLDER_OUTBOX_ID,FOLDER_OUTBOX_NAME) {
  // COLOR DEFAULT
  $scope.colo = colo;

  //  CALL SERVICES WEBMAIL FOLDERS
  console.log("==CONTROLLER WEBMAIL== get query list FOLDERS");
  $scope.newFolders = Webmal_read_forlders.query();
  $scope.folders = [];
  $scope.newFolders.$promise.then(function (results){
    console.log("==CONTROLLER WEBMAIL== get query list FOLDERS success OK");

    var data = ((results['mainData'])['systemFolders']);

    // CONVERT DATA FOLDERS DEFAULT IN OBJECT
    var object_folder_inbox = {folderId: data[FOLDER_INBOX_ID],folderName:data[FOLDER_INBOX_NAME]};
    var object_folder_sent = {folderId: data[FOLDER_SENT_ID],folderName:data[FOLDER_SENT_NAME]};
    var object_folder_draft = {folderId: data[FOLDER_DRAFT_ID],folderName:data[FOLDER_DRAFT_NAME]};
    var object_folder_trash = {folderId: data[FOLDER_TRASH_ID],folderName:data[FOLDER_TRASH_NAME]};
    var object_folder_outbox = {folderId: data[FOLDER_OUTBOX_ID],folderName:data[FOLDER_OUTBOX_NAME]};
    
    //  PUSH OBJECT
    $scope.folders.push(object_folder_inbox);
    $scope.folders.push(object_folder_sent);
    $scope.folders.push(object_folder_draft);
    $scope.folders.push(object_folder_trash);
    $scope.folders.push(object_folder_outbox);

    //  PUSH CUSTOM FOLDERS
    var custom_folders = ((results['mainData'])['customFolderArray']);    
    custom_folders.forEach(function(folder) {
      $scope.folders.push(folder);// console.log(entry);
    });

  });
  
console.log("==CONTROLLER WEBMAIL== GET FOLDERS MAILBOXES",$scope.mailsSubMenu);

$scope.getClassImage = function(item){
  var response = "icon ion-folder";
  var value = item.folderName;
  
  console.log("item.folderName",value);
  console.log("base datos",FOLDER_INBOX_NAME);

  if (value == "Inbox") {
    response = "icon ion-filing";}
    if (value == "Sent items") {
      response = "icon ion-paper-airplane";}
      if (value == "Draft items"){
        response = "icon ion-briefcase";}

        return response;
        
      };

})






//LIST MAILS IN FORDER (REFRESH / LOADMORE)
.controller('MailsListCtrl',function($scope, Mail,$timeout,$ionicLoading,$resource){
  console.log('==CONTROLLER WEBMAIL== STARTING');

  //LOADING IMAGE
  

  $scope.newMailList = Mail.query();
  $scope.mailList = [];
  
  
  $scope.newMailList.$promise.then(function (results){
    console.log("inicio",(results['mainData']));
    console.log('==CONTROLLER WEBMAIL== LOADING FIRST TIME');
    $scope.page = parseInt((results['mainData'])['pageInfo']['pageNumber']);
    $scope.page = $scope.page + 1;
    $scope.mailList = (results['mainData'])['list'];
    // $scope.pageLimit = parseInt((results['mainData'])['pageInfo']['totalPages']);
    
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
.controller('MailDetailCtrl', function($scope, $http,$sce, $stateParams,Mail,apiUrlLocal,PATH_WEBMAIL,BODY_TYPE_HTML,BODY_TYPE_HTML) {
  




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
    // var codigo = ((results['mainData'])['entity'])['body'];
    // $scope.thisCanBeusedInsideNgBindHtml = $sce.trustAsHtml(codigo);

    // this callback will be called asynchronously
    if (results['mainData']['entity']['bodyType'] == BODY_TYPE_HTML) {
      var newurl = results['mainData']['entity']['htmlBodyUrl']
      $http.get(apiUrlLocal+newurl).
      success(function(data, status, headers, config) {
        $scope.thisCanBeusedInsideNgBindHtml = $sce.trustAsHtml(data);
          // when the response is available
        }).
      error(function(data, status, headers, config) {
        // or server returns response with an error status.
      });
    }
    else{
    }
    

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
