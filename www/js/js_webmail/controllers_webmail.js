angular.module('starter.webmailcontrollers', ['starter.webmailservices','starter.constantsWebmail'])

/**
 * CONTROLLER FOLDERS
 */
.controller('MailsCtrl', function($state,$scope,Webmal_read_forlders,COLOR_VIEW,PATH_WEBMAIL_READ_FOLDERS,
  FOLDER_INBOX_ID,FOLDER_INBOX_NAME,FOLDER_SENT_ID,FOLDER_SENT_NAME,FOLDER_DRAFT_ID,
  FOLDER_DRAFT_NAME,FOLDER_TRASH_ID,FOLDER_TRASH_NAME,FOLDER_OUTBOX_ID,FOLDER_OUTBOX_NAME,
  FOLDER_INBOX_TYPE,FOLDER_SENT_TYPE,FOLDER_DRAFT_TYPE,FOLDER_TRASH_TYPE,FOLDER_OUTBOX_TYPE,
  FOLDER_DEFAULT_TYPE) {

  // COLOR DEFAULT
  $scope.colorFont = COLOR_VIEW;
  // $('icon').css({"color":COLOR_2});
  
  //  CALL SERVICES WEBMAIL FOLDERS
  console.log("==CONTROLLER WEBMAIL== get query list FOLDERS");
  $scope.newFolders = Webmal_read_forlders.query();
  $scope.folders = [];

  // PROMISE
  $scope.newFolders.$promise.then(function (results){
    if (results.mainData == undefined) {
      $state.go('login');
    }
    console.log("==CONTROLLER WEBMAIL== get query list FOLDERS success OK",results['mainData']);
    var data = ((results['mainData'])['systemFolders']);

    // CONVERT DATA OF FOLDERS DEFAULT IN OBJECT
    var object_folder_inbox = {folderId: data[FOLDER_INBOX_ID],folderName:'Inbox',type:FOLDER_INBOX_TYPE};
    var object_folder_sent = {folderId: data[FOLDER_SENT_ID],folderName:'SentItems',type:FOLDER_SENT_TYPE};
    var object_folder_draft = {folderId: data[FOLDER_DRAFT_ID],folderName:'DraftItems',type:FOLDER_DRAFT_TYPE};
    var object_folder_trash = {folderId: data[FOLDER_TRASH_ID],folderName:'Trash',type:FOLDER_TRASH_TYPE};
    var object_folder_outbox = {folderId: data[FOLDER_OUTBOX_ID],folderName:'Outbox',type:FOLDER_OUTBOX_TYPE};
    
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

  $scope.doRefresh = function() {
    $scope.folders = [];
    //  CALL SERVICES WEBMAIL FOLDERS
    console.log("==CONTROLLER WEBMAIL== do refresh FOLDERS");
    $scope.newFolders = Webmal_read_forlders.query();

    // PROMISE
    $scope.newFolders.$promise.then(function (results){
      console.log("==CONTROLLER WEBMAIL== get query refresh list FOLDERS success OK",results['mainData']);
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

      $scope.$broadcast('scroll.refreshComplete');  

    });
    
  };
  
  //  RETURN CLASS ICON OF FOLDER
  $scope.getClassImage = function(item){
    var response;
    var value = item.type;

    switch (value) {
        case FOLDER_INBOX_TYPE:
            response = "icon ion-filing";
            break;
        case FOLDER_SENT_TYPE:
            response = "icon ion-paper-airplane";;
            break;
        case FOLDER_DRAFT_TYPE:
            response = "icon ion-briefcase";;
            break;    
        case FOLDER_TRASH_TYPE:
            response = "icon ion-trash-b";;
            break;    
        case FOLDER_OUTBOX_TYPE:
            response = "icon ion-ios7-box";;
            break;            
        default:
            response = "icon ion-folder"
    }
    return response;
  };
})

// MAILLISTS IN FORDER (REFRESH / LOADMORE)
.controller('MailsListCtrl',function($filter,$ionicPopup,$scope,COLOR_VIEW,apiUrlLocal, Mail,$timeout,$ionicLoading,$resource,$stateParams){
  // COLOR DEFAULT
  $scope.colorFont = COLOR_VIEW;

  console.log('==CONTROLLER WEBMAIL== STARTING');

  // NUMBER PAGE EQUAL 1 -- TOTAL PAGES 
  $scope.page = 1; 
  $scope.totalPages; 
  $scope.apiUrlLocal = apiUrlLocal;

  $scope.folderName = $stateParams.folderName;
  console.log("folderName======== ",$scope.folderName);

  //  CALL SERVICES WITH (PAGE NUMBER AND FOLDER ID)
  console.log("==CONTROLLER WEBMAIL== get query list mails first time");
  $scope.newMailList = Mail.query({'pageParam(pageNumber)':$scope.page,'folderId':$stateParams.folderId});
  $scope.mailList = [];

  // REFRESH FALSE IF THERE ARE NOT MORE MAILS
  $scope._doRefresh = false;

  // PROMISE
  $scope.newMailList.$promise.then(function (results){
      console.log('==CONTROLLER WEBMAIL== get query list mails success OK',results['mainData']);
      
      //  SAVE PAGE NUMBER
      $scope.page = parseInt((results['mainData'])['pageInfo']['pageNumber']);

      // SAVE TOTAL PAGES
      $scope.totalPages = parseInt(results['mainData']['pageInfo']['totalPages']);

      // RECOVER LIST MAIL FOR VIEW
      $scope.mailList = (results['mainData'])['list'];

      // REFRESH = TRUE IF LIST > 0 AND TOTAL PAGES > PAGE ACTUAL
      if ($scope.mailList.length > 0 && $scope.totalPages>$scope.page) {
          $scope._doRefresh = true;  
      };

      // if no exists items show message
      if ($scope.mailList.length == 0) {
        // An alert dialog
        var message = $filter('translate')('NoItems');
        var messageSelect = $filter('translate')('SelectAnother');

        console.log("==CONTROLLER CONTACTS== alert if no exists items");
        var alertPopup = $ionicPopup.alert({
            title: message,
            template: messageSelect
        });
      }
      
  });

  
  
  $scope.doRefresh = function() {
    $scope.page = 1; 

    //  CALL SERVICES WITH (PAGE NUMBER AND FOLDER ID)
    console.log('==CONTROLLER WEBMAIL== do refresh');
    $scope.newMailList = Mail.query({'pageParam(pageNumber)':$scope.page,'folderId':$stateParams.folderId});

    // PROMISE
    $scope.newMailList.$promise.then(function (results){
      console.log("==CONTROLLER WEBMAIL==  query doRefresh success OK data: ",results['mainData']);

      //  MAIL LIST
      $scope.mailList = (results['mainData'])['list'];
      $scope.$broadcast('scroll.refreshComplete');  

      
      if ($scope.mailList.length > 0 && $scope.totalPages>$scope.page) {
        $scope._doRefresh = true;  
      };  
    });
  };

  $scope.loadMore = function() {
      $scope.page = $scope.page + 1;

      //  CALL SERVICES WITH (PAGE NUMBER AND FOLDER ID)
      console.log('==CONTROLLER WEBMAIL== load more');
      $scope.newMails = Mail.query({'pageParam(pageNumber)':$scope.page,'folderId':$stateParams.folderId});

      // PROMISE
      $scope.newMails.$promise.then(function(results){
        console.log("==CONTROLLER WEBMAIL==  query loadMore success OK data: ",results['mainData']);
        $scope.mailList = $scope.mailList.concat((results['mainData'])['list']);
        $scope.$broadcast('scroll.infiniteScrollComplete');

        // REFRESH = FALSE IF TOTAL PAGES <= PAGE ACTUAL ++
        if ($scope.totalPages<=$scope.page+1) {
          $scope._doRefresh = false;  
        };
      });  
    }
  })

// NEW MAIL 
.controller('NewMail',function($stateParams,$scope,COLOR_VIEW){
  $scope.data = {};
  $scope.colorFont = COLOR_VIEW;

  $scope.sendMail = function() {
    console.log('---send data new mail', $scope.data);
    // var mailAccountId = $scope.data.mailAccountId;
    // var to = $scope.data.to;
    // console.log("mailAccountId",mailAccountId);
    // console.log("to",to);
  }

})

// DETAILS MAIL
.controller('MailDetailCtrl', function($filter,$scope,$cordovaFileTransfer,$http,$sce,$ionicPopup,$ionicLoading,$stateParams,Mail,apiUrlLocal,PATH_WEBMAIL,BODY_TYPE_HTML,BODY_TYPE_HTML) {
  
    console.log("==WEBMAIL CONTROLLER DETAILS MAIL== start");

    //  CALL SERVICES WITH (PAGE NUMBER AND FOLDER ID)
    $scope.detail = Mail.query({'dto(mailId)': $stateParams.mailId,folderId: $stateParams.folderId});
    $scope.item = {};

    // PROMISE
    $scope.detail.$promise.then(function (results){
        console.log("==CONTROLLER WEBMAIL==  query detail success OK data: ",results['mainData']);
        $scope.item = (results['mainData'])['entity'];

        //SPLIT STRING TO ARRAY CC
        var cc = ((results['mainData'])['entity'])['cc'];
        $scope.arrayCC = [];
        $scope.arrayCC.push(cc);
      
        //SPLIT STRING TO ARRAY BCC
        var bcc = ((results['mainData'])['entity'])['bcc'];
        $scope.arrayBCC = [];
        $scope.arrayBCC.push(bcc);
      
        // this callback will be called asynchronously
        // CALL HTML BODY
        if (results['mainData']['entity']['bodyType'] == BODY_TYPE_HTML) {
            var newurl = results['mainData']['entity']['htmlBodyUrl']
            $http.get(apiUrlLocal+newurl).

            success(function(data, status, headers, config) {
              var newHtml = data.split("<img").join(" <img width='100%' ");
              // var newHtml = data.substr(0, pos+5) + "width='100%'" + data.substr(pos+5);
              $scope.thisCanBeusedInsideNgBindHtml = $sce.trustAsHtml(newHtml);
                // when the response is available
                console.log("==CONTROLLER WEBMAIL== html body",newHtml);
              }).
            error(function(data, status, headers, config) {
              // or server returns response with an error status.
            });
        }
    });

    // DOWNLOAD FILE
    $scope.download = function(attach) {
        $ionicLoading.show({
          template: 'Donwloading...'
        });
        console.log("-----1");

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
          console.log("-----2");
            fs.root.getDirectory(
                "BMapp",
                {
                    create: true
                },
                function(dirEntry) {
                    console.log("==CONTROLLER WEBMAIL== download attach CREATE folder");
                    dirEntry.getFile(
                        attach.fileName, 
                        {
                            create: true, 
                            exclusive: false
                        }, 
                        function gotFileEntry(fe) {
                            console.log("==CONTROLLER WEBMAIL== download attach url");
                            var p = fe.toURL();
                            fe.remove();
                            ft = new FileTransfer();
                            ft.download(
                                encodeURI(apiUrlLocal+attach.downloadUrl),
                                
                                p,
                                function(entry) {
                                    $ionicLoading.hide();
                                    $scope.imgFile = entry.toURL();

                                    var message = $filter('translate')('Downloaded');
                                    var messageCheck = $filter('translate')('CheckFolder');

                                    var alertPopup = $ionicPopup.alert({
                                       title: message,
                                       template: messageCheck
                                     });
                                },
                                function(error) {
                                    $ionicLoading.hide();
                                    alert("Download Error Source -> " + error.source);
                                },
                                false,
                                null
                            );
                        }, 
                        function() {
                            // $ionicLoading.hide();
                            console.log("Get file failed");
                        }
                    );
                }
            );
        },
        function() {
            // $ionicLoading.hide();
            console.log("Request for filesystem failed");
        });
        //
    }

    // URL IMAGE
    $scope.imageF = function(){
      $scope.imageFrom = "img/user_default.png";

      if ($stateParams.imageFrom != null) {
        $scope.imageFrom = apiUrlLocal+$stateParams.imageFrom+'='+$stateParams.fromImageId;
      }
      return $scope.imageFrom;
    };

    // ACORDEON HELP
    $scope.toggleGroup = function(group) {
      if ($scope.isGroupShown(group)) {
        $scope.shownGroup = null;
      } else {
        $scope.shownGroup = group;
      }
    };

    // ACORDEON HELP
    $scope.isGroupShown = function(group) {
      return $scope.shownGroup === group;
    };

});