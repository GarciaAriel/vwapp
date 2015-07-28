angular.module('starter.webmailcontrollers', ['starter.webmailservices','starter.constantsWebmail'])

/**
 * CONTROLLER FOLDERS
 */
.controller('MailsCtrl', function(PopupFactory,$state,$scope,Webmal_read_forlders,
  PATH_WEBMAIL_READ_FOLDERS,FOLDER_INBOX_ID,FOLDER_INBOX_NAME,FOLDER_SENT_ID,FOLDER_SENT_NAME,
  FOLDER_DRAFT_ID,FOLDER_DRAFT_NAME,FOLDER_TRASH_ID,FOLDER_TRASH_NAME,FOLDER_OUTBOX_ID,
  FOLDER_OUTBOX_NAME,FOLDER_INBOX_TYPE,FOLDER_SENT_TYPE,FOLDER_DRAFT_TYPE,FOLDER_TRASH_TYPE,
  FOLDER_OUTBOX_TYPE,FOLDER_DEFAULT_TYPE,COLOR_VIEW) {

  console.log('*******************************************************');
  console.log("==CONTROLLER WEBMAIL== get query list FOLDERS");

  // COLOR DEFAULT
  $scope.colorFont = COLOR_VIEW;
  $scope.folders = [];
  
  // EXECUTE QUERY WITH ()
  $scope.newFolders = Webmal_read_forlders.query();
  
  // PROMISE
  $scope.newFolders.$promise.then(function (results){

    // call factory 
    PopupFactory.getPopup($scope,results);

    console.log("results of request: ",results);

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
    console.log('*******************************************************');
    console.log("do refresh FOLDERS");
    $scope.folders = [];
    
    // EXECUTE QUERY WITH ()
    $scope.newFolders = Webmal_read_forlders.query();

    // PROMISE
    $scope.newFolders.$promise.then(function (results){

      // call factory to validate the response
      PopupFactory.getPopup($scope,results);

      console.log("results of request: ",results);
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
    
  }

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
  }
})

// MAIL LISTS IN FORDER (REFRESH / LOADMORE)
.controller('MailsListCtrl',function(serviceEmailList,$ionicScrollDelegate,PopupFactory,$filter,$ionicPopup,$scope,COLOR_VIEW,apiUrlLocal, Mail,$timeout,$ionicLoading,$resource,$stateParams){
  
  console.log('*******************************************************');
  console.log('==CONTROLLER WEBMAIL== lis email in folder');  

  $scope.colorFont = COLOR_VIEW;
  $scope.page = 1; 
  $scope.totalPages; 
  $scope.apiUrlLocal = apiUrlLocal;
  $scope.mailList = [];
  $scope.folderName = $stateParams.folderName;
  $scope.asknext = false;
  $scope.showSearchBar = false;

  console.log("folder name",$scope.folderName);
  
  // EXECUTE QUERY WITH ()
  $scope.newMailList = Mail.query({'pageParam(pageNumber)':$scope.page,'folderId':$stateParams.folderId});
  
  // PROMISE
  $scope.newMailList.$promise.then(function (results){

    // call factory to validate the response
    PopupFactory.getPopup($scope,results);

    console.log("results of request: ",results);

    //  SAVE PAGE NUMBER AND TOTAL PAGES
    $scope.page = parseInt((results['mainData'])['pageInfo']['pageNumber']);
    $scope.totalPages = parseInt(results['mainData']['pageInfo']['totalPages']);

    // RECOVER LIST MAIL FOR VIEW
    $scope.mailList = (results['mainData'])['list'];
    serviceEmailList.saveList($scope.mailList);

    // REFRESH = TRUE IF LIST > 0 AND TOTAL PAGES > PAGE ACTUAL
    if ($scope.totalPages > $scope.page) {
        $scope.asknext = true;  
    };

    // if no exists items show message
    if ($scope.mailList.length == 0) {
      console.log("alert if no exists items");
      // An alert dialog
      var message = $filter('translate')('NoItems');
      var messageSelect = $filter('translate')('SelectAnother');

      var alertPopup = $ionicPopup.alert({
          title: message,
          template: messageSelect
      });
    }
      
  });

  $scope.getDateMilli = function(milliseconds){
    var day_Send = new Date(+milliseconds);
    
    var dd = day_Send.getDate();
    var mm = day_Send.getMonth();
    var yy = day_Send.getFullYear();
    
    var date = new Date();
    
    if ( (dd == date.getDate()) && (mm == (date.getMonth())) && (yy == date.getFullYear()) ) {
      // date: in the same day
      var hhh = day_Send.getHours();
      var mmmm = (day_Send.getMinutes()).toString();
      var mmm = (mmmm).length < 2 ? "0"+mmmm : mmmm;
      
      return (hhh+":"+mmm);  
    }
    else {
      // date: week
      var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
      // var firstDate = new Date(date.getFullYear(),date.getMonth()+1,date.getDate());
      // var secondDate = new Date(yy,mm,dd);

      var diffDays = Math.round(Math.abs((date.getTime() - day_Send.getTime())/(oneDay)));
      // return diffDays;
      if ( diffDays <= 6  ) {

        var Monday = $filter('translate')('Monday');
        var Tuesday = $filter('translate')('Tuesday');
        var Wednesday = $filter('translate')('Wednesday');
        var Thursday = $filter('translate')('Thursday');
        var Friday = $filter('translate')('Friday');
        var Saturday = $filter('translate')('Saturday');
        var Sunday = $filter('translate')('Sunday');

                
        var weekdays = new Array(7);
        weekdays[4] = Thursday;
        weekdays[5] = Friday;
        weekdays[6] = Saturday;
        weekdays[0] = Sunday;
        weekdays[1] = Monday;
        weekdays[2] = Tuesday;
        weekdays[3] = Wednesday;

        var day = day_Send.getDay();
        
        return weekdays[day];
      }
      else{// "28/05/2015 23:25"
        // date: older
        var d = (dd.toString()).length < 2 ? "0"+dd : dd;
        var mes = parseInt(mm) + 1;
        var ms = (mes.toString()).length < 2 ? "0"+mes : mes;
        
        var ddddd = d+"-"+ms+"-"+(yy.toString()).substring(2, 4);
        return ddddd;
      }
    }
  }
  
  $scope.doRefresh = function() {
    console.log('*******************************************************');
    console.log('do refresh list emails');
    $scope.searchKey = "";
    $scope.page = 1; 
    $scope.asknext = false;

    // EXECUTE QUERY WITH (PAGE NUMBER)  
    $scope.newMailList = Mail.query({'pageParam(pageNumber)':$scope.page,'folderId':$stateParams.folderId});

    // PROMISE
    $scope.newMailList.$promise.then(function (results){

      // call factory to validate the response
      PopupFactory.getPopup($scope,results);

      console.log("results of request: ",results);

      //  MAIL LIST
      $scope.mailList = (results['mainData'])['list'];
      $scope.page = parseInt((results['mainData'])['pageInfo']['pageNumber']);
      $scope.totalPages = parseInt((results['mainData'])['pageInfo']['totalPages']);
      $scope.$broadcast('scroll.refreshComplete');  
      
      if ($scope.totalPages > $scope.page) {
        $scope.asknext = true;  
      };  
    });
  }

  $scope.loadMore = function() {
    console.log('*******************************************************');
    console.log('load more');
    $scope.page = $scope.page + 1;
    
    //  CALL SERVICES WITH (PAGE NUMBER AND FOLDER ID)
    $scope.newMails = Mail.query({'pageParam(pageNumber)':$scope.page,'folderId':$stateParams.folderId});

    // PROMISE
    $scope.newMails.$promise.then(function(results){
      // call factory 
      PopupFactory.getPopup($scope,results);

      console.log("results of request: ",results);
      $scope.mailList = $scope.mailList.concat((results['mainData'])['list']);
      $scope.page = parseInt((results['mainData'])['pageInfo']['pageNumber']);
      $scope.totalPages = parseInt((results['mainData'])['pageInfo']['totalPages']);
      $scope.$broadcast('scroll.infiniteScrollComplete');

      // REFRESH = FALSE IF TOTAL PAGES <= PAGE ACTUAL ++
      if ($scope.totalPages<$scope.page+1) {
        $scope.asknext = false;  
      };
    });  
  }

  // function search mail
  $scope.search = function () {
    console.log('*******************************************************');
    console.log("search function with: ",$scope.searchKey);
    $scope.mailList = [];
    $scope.showSearchBar = !$scope.showSearchBar;
    $scope.asknext = false;
    $scope.page = 1;

    //  CALL SERVICES WITH (PAGE NUMBER AND FOLDER ID)
    $scope.newMails = Mail.query({'pageParam(pageNumber)':$scope.page,'folderId':$stateParams.folderId,'parameter(mailSubject@_mailFrom@_mailPersonalFrom)':$scope.searchKey});
    
    // PROMISE
    $scope.newMails.$promise.then(function (results){
          
      // call factory to validate the response
      PopupFactory.getPopup($scope,results);    

      console.log("results of request: ",results);

      $scope.mailList = (results['mainData'])['list'];
      $scope.page=parseInt((results['mainData'])['pageInfo']['pageNumber']);
      $scope.totalPages = parseInt((results['mainData'])['pageInfo']['totalPages']);
      
      console.log("page number: "+$scope.page+" total pages: "+$scope.totalPages);
          
      if ( $scope.totalPages > $scope.page) {
        $scope.asknext = true;  
      }; 

      // if no exists items show message
      if ($scope.mailList.length == 0) {
        console.log("alert if no exists items");

        var message = $filter('translate')('NoItems');
        var messageRefresh = $filter('translate')('PulltoRefresh');
        // An alert dialog
        
        var alertPopup = $ionicPopup.alert({
            title: message,
            template: messageRefresh
        });
      }
      $ionicScrollDelegate.scrollTop();
                  
    });
        
    $scope.loadMore = function() {
      console.log('*******************************************************');
      console.log("loadMore dentro search");
      $scope.page = $scope.page +1;
      $scope.asknext = false;

      //  CALL SERVICES WITH (PAGE NUMBER AND FOLDER ID)
      $scope.newMails = Mail.query({'pageParam(pageNumber)':$scope.page,'folderId':$stateParams.folderId,'parameter(mailSubject@_mailFrom@_mailPersonalFrom)':$scope.searchKey});
  
      // promise
      $scope.newMails.$promise.then(function(results){

        // call factory to validate the response
        PopupFactory.getPopup($scope,results);

        console.log("results of request: ",results);

        $scope.page=parseInt((results['mainData'])['pageInfo']['pageNumber']);
        $scope.totalPages=parseInt((results['mainData'])['pageInfo']['totalPages']);
        $scope.mailList = $scope.mailList.concat((results['mainData'])['list']);
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
              
      if ($scope.totalPages > $scope.page) {
        $scope.asknext = true;  
      };              
    };
  }

  // show or hide search
  $scope.searchcon = function(){
    $scope.showSearchBar = !$scope.showSearchBar;
  }

  // clear search
  $scope.hideSearch = function() {
    $scope.searchKey = "";
    $scope.showSearchBar = false;
  };

})

// NEW EMAIL 
.controller('NewMail',function($ionicPlatform,$fileFactory,$cordovaImagePicker,$state,PopupFactory,COMPOSE_EMAIL_URL,FORWARD_CREATE_MAIL_URL,apiUrlLocal,$http,$stateParams,$scope,COLOR_VIEW){
  console.log('*******************************************************');
  console.log('compose new email');
    
  $scope.data = {to: "", cc: "", bcc: "",mailSubject: "",body: ""};
  $scope.colorFont = COLOR_VIEW;
  $scope.iframeWidth = $(window).width()*0.17;

  if ($stateParams.to) {
    $scope.data.to = $stateParams.to;
    console.log('entrooo');
  }
  
  var request = $http({
    method: "get",    
    url: apiUrlLocal+FORWARD_CREATE_MAIL_URL,
  });
  request.success(
    function(data, status, headers, config) {          
      
      // call factory to validate the response
      PopupFactory.getPopup($scope,data);

      var aMailAccountArray = data.mainData.mailAccountArray;
      $scope.mailAccountArray = [];
      aMailAccountArray.forEach(function(aMail) {
        $scope.mailAccountArray.push({
          name: aMail.email,
          value: aMail.mailAccountId
        });       
        if( aMail.isDefaultAccount == 'true') {
          $scope.mailAccount = $scope.mailAccountArray[$scope.mailAccountArray.length-1];  
        }
      });
      console.log('user mail list: ',$scope.mailAccountArray);
    }
  );

  var fs = new $fileFactory();

    $ionicPlatform.ready(function() {
        fs.getEntriesAtRoot().then(function(result) {
            $scope.files = result;
        }, function(error) {
            console.error(error);
        });

        $scope.getContents = function(path) {
            fs.getEntries(path).then(function(result) {
                $scope.files = result;
                $scope.files.unshift({name: "[parent]"});
                fs.getParentDirectory(path).then(function(result) {
                    result.name = "[parent]";
                    $scope.files[0] = result;
                });
            });
        }
    })

  function convertImgToBase64(url, callback, outputFormat){
      var img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = function(){
          var canvas = document.createElement('CANVAS');
          var ctx = canvas.getContext('2d');
        canvas.height = this.height;
        canvas.width = this.width;
          ctx.drawImage(this,0,0);
          var dataURL = canvas.toDataURL(outputFormat || 'image/jpeg');
          callback(dataURL);
          canvas = null; 
      };
      img.src = url;
    }

  // prueba image picker
  $scope.pickerImage= function (){
      var options = {
      maximumImagesCount: 1,
      width: 300,
      height: 300,
      quality: 75
      };

      $cordovaImagePicker.getPictures(options)
        .then(function (results) {          
            convertImgToBase64(results[0], function(base64Img){
                $scope.$apply(function(){
                  $scope.imgURI=base64Img;
                })           
            });      
        }, function(error) {
          // error getting photos
        })
    }
    // -----------------  

  // help function to update email
  $scope.updateEmail = function(nEmail){
    $scope.mailAccount = nEmail;
  };
  $scope.mySwitch = false;
  $scope.seeCc = function(){
    $scope.mySwitch = !$scope.mySwitch;
  }

  $scope.sendMail = function() {
    console.log('*******************************************************');
    console.log('data to send new email: ', $scope.data);
    console.log('mail user: ', $scope.mailAccount);

    var fd = new FormData();    
    fd.append( 'save', 'save');
    fd.append( 'dto(to)', $scope.data.to);
    fd.append( 'dto(mailSubject)', $scope.data.mailSubject);
    fd.append( 'dto(body)', $scope.data.body);
    if ($scope.mailAccount) {
      fd.append( 'dto(mailAccountId)', $scope.mailAccount.value);  
    }

//     dto(attachmentCounter) = 3     -> number of attachments
// dto(file1)= document.doc
// dto(file2)= summary.xls
// dto(file3)= logo.jpg
    
    if ($scope.mySwitch) {
      fd.append( 'dto(cc)', $scope.data.cc);
      fd.append( 'dto(bcc)', $scope.data.bcc);
    }
    else{
      fd.append( 'dto(cc)', "");
      fd.append( 'dto(bcc)', ""); 
    }
      
    $.ajax({
      url: apiUrlLocal+COMPOSE_EMAIL_URL,
      data: fd,
      processData: false,
      contentType: false,
      type: 'POST',
      success: function(data){

        // call factory to validate the response
        PopupFactory.getPopup($scope,data);

        var result = JSON.parse(data);
        if(result.forward == "Success")
        {
          console.log("Email sent succesfull");          
          $state.go('app.mailboxes'); 
        }
        else
        {        
          PopupFactory.getPopup($scope,result);
        }             
      }
    });
  }

  $scope.attachFile = function(){
    
  }

})

// DETAILS MAIL
.controller('MailDetailCtrl', function($state,serviceEmailList,PopupFactory,$filter,$scope,$cordovaFileTransfer,$http,$sce,$ionicPopup,$ionicLoading,$stateParams,Mail,apiUrlLocal,PATH_WEBMAIL,BODY_TYPE_HTML,BODY_TYPE_HTML) {
  console.log('*******************************************************');
  console.log("==WEBMAIL CONTROLLER DETAILS MAIL== start");

  // get list of email for slide
  $scope.emailList = serviceEmailList.getList();
  console.log('email list service: ',$scope.emailList);

    //  CALL SERVICES WITH (PAGE NUMBER AND FOLDER ID)
    $scope.detail = Mail.query({'dto(mailId)': $stateParams.mailId,'folderId': $stateParams.folderId});
    $scope.item = {};
    $scope.iframeWidth = $(window).width();
   
    // PROMISE
    $scope.detail.$promise.then(function (results){

      // call factory 
      PopupFactory.getPopup($scope,results);

        console.log("query detail success OK data: ",results);
        $scope.item = (results['mainData'])['entity'];
        console.log('itemmmmmmm query',$scope.item);

        //SPLIT STRING TO ARRAY CC
        $scope.arrayCC = [];
        var cc = results['mainData']['entity']['cc'];
        $scope.arrayCC.push(cc);
        
        //SPLIT STRING TO ARRAY BCC
        $scope.arrayBCC = [];
        var bcc = results['mainData']['entity']['bcc'];
        $scope.arrayBCC.push(bcc);  
        
        // this callback will be called asynchronously
        // CALL HTML BODY
        if (results['mainData']['entity']['bodyType'] == BODY_TYPE_HTML) {
            
            var newurl = results['mainData']['entity']['htmlBodyUrl'];
            $http.get(apiUrlLocal+newurl).

            success(function(data, status, headers, config) {

              // call factory 
              PopupFactory.getPopup($scope,data);

              console.log("==CONTROLLER WEBMAIL== html body",data);

              // var newHtml = data.split('width="600"').join(' ');
              // var newHtml = data.split('width="500"').join(' ');
              // var newHtml = data.split('width="140"').join(' ');
              // var newHtml = data.split('width="183"').join(' ');
              // var newHtml = data.split('width="310"').join(' ');
              // var newHtml = data.split('width="200"').join(' ');
              // var newHtml = data.split('width="138"').join(' ');

              var newHtml = data.split("<img").join(" <img class='img-class' ");
              
              $scope.thisCanBeusedInsideNgBindHtml = $sce.trustAsHtml(newHtml);
            }).
            error(function(data, status, headers, config) {
              // or server returns response with an error status.
            });
        }
        else{
          angular.element(document).ready(function () {
            console.log('page loading completed');
            var element = document.getElementById("page_content");
            element.style.height = element.scrollHeight + "px";
          });
        }
        

        $scope.iframeHeight = $(window).height();
        $scope.iframeWidth = $(window).width();
    });

    // $scope.onSlideChanged = function(index,item){
    //   console.log('----===change slide item:',item);
    //   // console.log('----===change slide direction:',direction);
    //   var res = {};
    //   // var varDirection = direction=='left' ?  1 : -1;
    //   for(var i=0; i < $scope.emailList.length; i++){
    //     if ($scope.emailList[i].mailId == item.mailId) {
    //       res = $scope.emailList[i+1];
    //       break;
    //     }
    //   }
    //   console.log('on change ==== method',res);
    //   $state.go('app.details-mail',{'mailId':res.mailId,'folderId':res.folderId,'imageFrom':res.fromImageUrl,'fromImageId':res.fromImageId}); 
    // }

    // $scope.onSwipeRight = function(){
    //   console.log('------=====llloppppppp righttttt');
    // }
    // $scope.onSwipeLeft = function(){
    //  console.log('------=====llloppppppp lefttttttt'); 
    // }
    
    // DOWNLOAD FILE
    $scope.download = function(attach) {
        $ionicLoading.show({
          template: '<i class="ion-loading-d"></i>'
        });
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
            fs.root.getDirectory(
                "bm App",
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
                            $ionicLoading.hide();
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
      $scope.imageFrom = "img/user_default_unknown.png";

      if ($stateParams.imageFrom != null) {
        $scope.imageFrom = apiUrlLocal+$stateParams.imageFrom+'='+$stateParams.fromImageId;
      }
      return $scope.imageFrom;
    };

    $scope.group = {name: "grupo1"};
    $scope.group2 = {name: "grupo2"};
    $scope.group3 = {name: "grupo3"};

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

    $scope.updateEditor = function() {
      angular.element(document).ready(function () {
          console.log('page loading completed');
      });
      // var element = document.getElementById("page_content");
      // element.style.height = element.scrollHeight + "px";
    };

});

window.onload = function () {
    angular.element(document.getElementById('page_content')).scope().updateEditor();
}