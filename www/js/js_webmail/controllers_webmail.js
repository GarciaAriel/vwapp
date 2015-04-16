angular.module('starter.webmailcontrollers', ['starter.webmailservices','starter.constantsWebmail'])

//FOLDERS WEBMILS 
.controller('MailsCtrl', function($scope,Webmal_read_forlders,colo,PATH_WEBMAIL_READ_FOLDERS,
  FOLDER_INBOX_ID,FOLDER_INBOX_NAME,FOLDER_SENT_ID,FOLDER_SENT_NAME,FOLDER_DRAFT_ID,
  FOLDER_DRAFT_NAME,FOLDER_TRASH_ID,FOLDER_TRASH_NAME,FOLDER_OUTBOX_ID,FOLDER_OUTBOX_NAME,
  FOLDER_INBOX_TYPE,FOLDER_SENT_TYPE,FOLDER_DRAFT_TYPE,FOLDER_TRASH_TYPE,FOLDER_OUTBOX_TYPE,
  FOLDER_DEFAULT_TYPE) {
  // COLOR DEFAULT
  $scope.colo = colo;
  
  //  CALL SERVICES WEBMAIL FOLDERS
  console.log("==CONTROLLER WEBMAIL== get query list FOLDERS");
  $scope.newFolders = Webmal_read_forlders.query();
  $scope.folders = [];
  $scope.newFolders.$promise.then(function (results){
    console.log("==CONTROLLER WEBMAIL== get query list FOLDERS success OK");
    var data = ((results['mainData'])['systemFolders']);

    // CONVERT DATA OF FOLDERS DEFAULT IN OBJECT
    var object_folder_inbox = {folderId: data[FOLDER_INBOX_ID],folderName:data[FOLDER_INBOX_NAME],type:FOLDER_INBOX_TYPE};
    var object_folder_sent = {folderId: data[FOLDER_SENT_ID],folderName:data[FOLDER_SENT_NAME],type:FOLDER_SENT_TYPE};
    var object_folder_draft = {folderId: data[FOLDER_DRAFT_ID],folderName:data[FOLDER_DRAFT_NAME],type:FOLDER_DRAFT_TYPE};
    var object_folder_trash = {folderId: data[FOLDER_TRASH_ID],folderName:data[FOLDER_TRASH_NAME],type:FOLDER_TRASH_TYPE};
    var object_folder_outbox = {folderId: data[FOLDER_OUTBOX_ID],folderName:data[FOLDER_OUTBOX_NAME],type:FOLDER_OUTBOX_TYPE};
    
    //  PUSH OBJECT
    $scope.folders.push(object_folder_inbox);
    $scope.folders.push(object_folder_sent);
    $scope.folders.push(object_folder_draft);
    $scope.folders.push(object_folder_trash);
    $scope.folders.push(object_folder_outbox);

    //  PUSH CUSTOM FOLDERS
    var custom_folders = ((results['mainData'])['customFolderArray']);    
    custom_folders.forEach(function(folder) {
      var custom_folder = folder;
      custom_folder["type"] = FOLDER_DEFAULT_TYPE;
      $scope.folders.push(custom_folder);
    });

  });
  
  //  RETURN CLASS ICON OF FOLDER
  $scope.getClassImage = function(item){
    var response = "icon ion-folder";
    var value = item.type;

    if (value == FOLDER_INBOX_TYPE) {
      response = "icon ion-filing";}
    if (value == FOLDER_SENT_TYPE) {
      response = "icon ion-paper-airplane";}
    if (value == FOLDER_DRAFT_TYPE){
      response = "icon ion-briefcase";}
    if (value == FOLDER_TRASH_TYPE){
      response = "icon ion-trash-b";}  
    if (value == FOLDER_OUTBOX_TYPE){
      console.log("entraaaaaaXD");
      response = "icon ion-ios7-box";}  
    
    return response;
  };

})

//LIST MAILS IN FORDER (REFRESH / LOADMORE)
.controller('MailsListCtrl',function($scope, Mail,$timeout,$ionicLoading,$resource,$stateParams){
  console.log('==CONTROLLER WEBMAIL== STARTING');

  $scope.page = 1; 
  $scope.totalPages; 

  $scope.newMailList = Mail.query({'pageParam(pageNumber)':$scope.page,'folderId':$stateParams.folderId});
  $scope.mailList = [];
  $scope._doRefresh = false;

  $scope.newMailList.$promise.then(function (results){
    console.log('==CONTROLLER WEBMAIL== LOADING FIRST TIME');
    $scope.page = parseInt((results['mainData'])['pageInfo']['pageNumber']);
    
    $scope.totalPages = parseInt(results['mainData']['pageInfo']['totalPages']);

    $scope.page = $scope.page;
    $scope.mailList = (results['mainData'])['list'];
    if ($scope.mailList.length > 0 && $scope.totalPages>$scope.page) {
      $scope._doRefresh = true;  
    };
  });
  
  $scope.doRefresh = function() {
    
    $scope.page = 1;  
    $scope.newMailList = Mail.query({'pageParam(pageNumber)':$scope.page,'folderId':$stateParams.folderId});

    $scope.newMailList.$promise.then(function (results){
      console.log("doRefresh",(results['mainData']));
      $scope.mailList = ((results['mainData'])['list']).concat($scope.mailList);
      $scope.mailList = (results['mainData'])['list'];
      $scope.$broadcast('scroll.refreshComplete');  

      if ($scope.mailList.length > 0 && $scope.totalPages>$scope.page) {
        $scope._doRefresh = true;  
      };  
    });
  };

  $scope.loadMore = function() {
      console.log('==CONTROLLER WEBMAIL== LOAD MORE');
      $scope.page = $scope.page + 1;
      
      console.log("ifff loadMore",$scope.page);
      $scope.newMails = Mail.query({'pageParam(pageNumber)':$scope.page,'folderId':$stateParams.folderId});

      $scope.newMails.$promise.then(function(results){
        $scope.mailList = $scope.mailList.concat((results['mainData'])['list']);
        $scope.$broadcast('scroll.infiniteScrollComplete');
        if ($scope.totalPages<=$scope.page+1) {
          $scope._doRefresh = false;  
        };
        console.log("tammmmmmmmmm",$scope.mailList.length);
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
