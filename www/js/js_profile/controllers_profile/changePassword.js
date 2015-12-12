angular.module('starter.changePassword',['starter.profileServices','starter.constantProfile'] )
 
.controller('changePassword', function(CHANGE_INFO_URL,$ionicHistory,change_info,forward_update, $state,PopupFactory,$scope,$stateParams,apiUrlLocal,$cordovaCamera,$cordovaImagePicker) {
  $scope.apiUrlLocal = apiUrlLocal;
  $scope.iframeWidth = $(window).width();
  $scope.userInfo = null;

  $scope.oldPass = '';
  $scope.newPass = '';
  $scope.repeatPass = '';
  
  $scope.result = forward_update.get({});

  $scope.result.$promise.then(function (results){
    // call factory 
    console.log("------aaa 12",results);
    PopupFactory.getPopup($scope,results);
    
   $scope.userInfo = results.mainData.userInfo;

   if ($scope.userInfo.visibleMobileApp == 'true') {
    $scope.userInfo.visibleMobileApp = true; 
   }
   if ($scope.userInfo.visibleMobileApp == 'false') {
    $scope.userInfo.visibleMobileApp = false;
   }
   if ($scope.userInfo.visibleMobileApp != 'false' && $scope.userInfo.visibleMobileApp == 'true') {
    $scope.userInfo.visibleMobileApp = false;
   };
   
  });
  
  $scope.changeVisibility = function(){
    console.log("changeVisibility");
  };

  $scope.takePicture = function() {
	  var options = { 
	      quality : 75, 
	      destinationType : Camera.DestinationType.DATA_URL, 
	      sourceType : Camera.PictureSourceType.CAMERA, 
	      allowEdit : true,
	      encodingType: Camera.EncodingType.JPEG,
	      targetWidth: 300,
	      targetHeight: 300,
	      popoverOptions: CameraPopoverOptions,
	      saveToPhotoAlbum: false,
	    correctOrientation: true
	  };

	  $cordovaCamera.getPicture(options).then(function(imageData) {      
	      $scope.imgURI = "data:image/jpeg;base64," + imageData;
	  }, function(err) {
	      // An error occured. Show a message to the user
	  });
	}

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
    };

    dataURItoBlob = function(dataURI) {
      // convert base64/URLEncoded data component to raw binary data held in a string
      var byteString;
      if (dataURI.split(',')[0].indexOf('base64') >= 0)
          byteString = atob(dataURI.split(',')[1]);
      else
          byteString = unescape(dataURI.split(',')[1]);

      // separate out the mime component
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

      // write the bytes of the string to a typed array
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ia], {type:mimeString});
    }

    $scope.saveChange = function (oldPass,newPass,repeatPass,visibleMobileApp){
      
      var fd = new FormData();    
      fd.append( 'dto(visibleMobileApp)', visibleMobileApp);
      fd.append( 'dto(userId)', $scope.userInfo.userId);
      

      if ( (null != oldPass && '' != oldPass) && (null != newPass && '' != newPass) && (null != repeatPass && '' != repeatPass) )  {
        fd.append( 'dto(userPassword)', oldPass);
        fd.append( 'dto(password1)', newPass);
        fd.append( 'dto(password2)', repeatPass);
      }

      if($scope.imgURI != undefined){
        fd.append( 'imageFile', dataURItoBlob($scope.imgURI));
      }

      $.ajax({
        url: apiUrlLocal+CHANGE_INFO_URL,
        data: fd,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(data){
          var result = JSON.parse(data);
          if(result.forward == "Success")
          {
            console.log("Person creation succesfull");          
            $ionicHistory.goBack();
          }
          else
          {           
             PopupFactory.getPopup($scope,result);
          }             
        }
      });  

     // $scope.result = change_info.get(setParameters(oldPass,newPass,repeatPass,visibleMobileApp));

      //$scope.result.$promise.then(function (results){
        // call factory 
       // console.log("------aaa 12",results);
       // PopupFactory.getPopup($scope,results);
        
      // $scope.userInfo = results.mainData.userInfo;
       //if (results.forward == "Success") {
       //   $ionicHistory.goBack();  
      // };

      //});
      
    };

    function setParameters(oldPass,newPass,repeatPass,visibleMobileApp){
      var parameters = {'dto(visibleMobileApp)':visibleMobileApp};

      if ( (null != oldPass && '' != oldPass) && (null != newPass && '' != newPass) && (null != repeatPass && '' != repeatPass) )  {
        parameters = {'dto(userPassword)':oldPass,'dto(password1)':newPass,'dto(password2)':repeatPass,'dto(visibleMobileApp)':visibleMobileApp}
      }

      return parameters;
    };

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



})

  