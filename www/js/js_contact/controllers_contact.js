angular.module('starter.contactcontrollers',['starter.contactservices','starter.constantscontact'] )
 
.controller('editPersonCtrl', function($state,$cordovaCamera,$cordovaImagePicker,PersonType,PopupFactory,apiUrlLocal,$http,transformRequestAsFormPost,bridgeService,$scope,COLOR_VIEW, $stateParams,apiUrlLocal,$localstorage) {
     $scope.apiUrlLocal = apiUrlLocal;
    $scope.colorFont = COLOR_VIEW;
    $scope.ntitle = "Edit Person";
    // get contact for edit
    var mainData = bridgeService.getContact();
    $scope.entity = mainData.entity;
    $scope.maindata = mainData;

    $scope.iframeWidth = $(window).width();

    console.log("==EDIT PERSON CONTROLLER==  get maindata:", $scope.maindata);

    var countryArray = $scope.maindata.countryArray;
    $scope.countries = [];    
    countryArray.forEach(function(country) {           
        $scope.countries.push({
          name: country.name,
          value:country.countryId
        });       
        if($scope.entity.countryId == country.countryId) {             
           $scope.country = $scope.countries[$scope.countries.length-1];  
        } 
    });    

    var languageArray = $scope.maindata.languageArray;
    $scope.languages = [];    
    languageArray.forEach(function(language) {           
        $scope.languages.push({
          name: language.name,
          value:language.languageId
        });       
        if($scope.entity.languageId == language.languageId) {             
           $scope.language = $scope.languages[$scope.languages.length-1];  
        } 
    });  

    var telecomTypeArray = $scope.maindata.telecomTypeArray;
    $scope.telecoms = []      
    telecomTypeArray.forEach(function(telecom) {           
      $scope.telecoms.push({
          name: telecom.telecomTypeName,
          value:telecom.telecomTypeId,
      });                  
    }); 

    var groupsArray = $scope.maindata.dataAccessUserGroupArray;
    $scope.GroupsAvailable = [];
    groupsArray.forEach(function(group) {  
        var array =  $scope.entity.accessUserGroupIds.split(',');
        var value = false;
        if(array.indexOf(group.userGroupId) != -1){
          value = true;
        }                
        $scope.GroupsAvailable.push({
          name: group.name,
          userGroupId: group.userGroupId,
          value : value
        });                  
    });   

    if($scope.entity.cityId != ""){
      var cityRequest = $http({
        method: "post",        
        url: apiUrlLocal+"/bmapp/Country/City.do",      
        data: {
            'countryId' : $scope.country.value
         }
      });
      cityRequest.success(
        function(data, status, headers, config) {      

          // call factory 
          PopupFactory.getPopup($scope,data);

          var cityArray = data.mainData.cityArray;
          $scope.cities = [];    
          cityArray.forEach(function(city) {           
              $scope.cities.push({
                name: city.cityName,
                value:city.cityId, 
                zip: city.zip,             
              });   
              if($scope.entity.cityId == city.cityId) {             
                 $scope.city = $scope.cities[$scope.cities.length-1];  
              }                  
          });    
      });
    }

    $scope.choices = [];  

    $scope.entity.telecoms.forEach(function(telecom){      
        telecom.telecomList.forEach(function(item){
          var newItemNo = $scope.choices.length+1;
          $scope.choices.push({'id':newItemNo, value:item.data, telecom:{value: telecom.telecomTypeId ,name: telecom.telecomTypeName}});
        });        
    });

    $scope.addNewChoice = function(value,telecom) {  
      var newItemNo = $scope.choices.length+1;
      $scope.choices.push({'id':newItemNo, value:value, telecom:telecom});    
    };
      
    $scope.removeChoice = function(choice) {
      var index = $scope.choices.indexOf(choice);    
      $scope.choices.splice(index,1);
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
          saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options).then(function(imageData) {      
          $scope.imgURI = "data:image/jpeg;base64," + imageData;
      }, function(err) {
          // An error occured. Show a message to the user
      });
    }

    $scope.updateCountry = function (ncountry)
    {
      $scope.country = ncountry; 
      $scope.city =  undefined; 
      var cityRequest = $http({
        method: "post",        
        url: apiUrlLocal+"/bmapp/Country/City.do",      
        data: {
            'countryId' : ncountry.value
         }
      });
      cityRequest.success(
        function(data, status, headers, config) {      

          // call factory 
          PopupFactory.getPopup($scope,data);

          var cityArray = data.mainData.cityArray;
          $scope.cities = [];    
          cityArray.forEach(function(city) {           
              $scope.cities.push({
                name: city.cityName,
                value:city.cityId, 
                zip: city.zip,             
              });                     
          });    
      });
   
    }

    $scope.updateLanguage = function (nlanguage)
    {
      $scope.language = nlanguage;     
    }

    $scope.updateCity = function (ncity)
    {
      $scope.city = ncity;     
    }

    verifyIndexTelecom = function(contIndexTelecom,choice){
      respCont = 0;
      enterIn = false;
      contIndexTelecom.forEach(function(cont){
        if(cont.id == choice.telecom.value)
        {
          cont.cont = cont.cont + 1;
          respCont= cont.cont;
          enterIn = true;
        }  
      });
      if(!enterIn)
      {
        contIndexTelecom.push({id:choice.telecom.value , cont:0});
      }
      return respCont;
    }

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

    $scope.savePerson = function() {
      contIndexTelecom = [];
      var fd = new FormData();    
      fd.append( 'dto(addressId)', $scope.entity.addressId);
      fd.append( 'dto(companyId)', $scope.entity.companyId);
      fd.append( 'dto(addressType)', $scope.entity.addressType);      
      fd.append( 'dto(version)', $scope.entity.version);      
      fd.append( 'dto(name1)', $scope.entity.name1);
      fd.append( 'dto(name2)', $scope.entity.name2);
      fd.append( 'dto(name3)', '');  
      fd.append( 'dto(street)', $scope.entity.street);  

      if($scope.country != undefined){
        fd.append( 'countryId', $scope.country.value);
      }
      if($scope.language != undefined){
        fd.append( 'dto(languageId)', $scope.language.value);  
      }
      if($scope.city != undefined){
        fd.append( 'cityId', $scope.city.value);
        fd.append( 'city', $scope.city.name);
        fd.append( 'zip', $scope.city.zip);
      }    

      $scope.choices.forEach(function(choice){      
        index = verifyIndexTelecom(contIndexTelecom,choice);
        if(index == 0){
          newdata = "telecom("+choice.telecom.value+").predeterminedIndex";
          fd.append(newdata,0);
        }
        newdata = "telecom("+choice.telecom.value+").telecom["+index+"].data"; 
        fd.append(newdata,choice.value);        
      });

      $scope.telecoms.forEach(function(telecom){
        newdata = "telecom("+telecom.value+").telecomTypeId";
        fd.append(newdata,telecom.value);     
        newdata = "telecom("+telecom.value+").telecomTypeName";
        fd.append(newdata,telecom.value);       
      });    

      var accessUserGroupIds = "";
      $scope.GroupsAvailable.forEach(function(group){
          if(group.value == true){
            accessUserGroupIds = accessUserGroupIds + group.userGroupId + ",";
          }
      });

      if(accessUserGroupIds != ""){
        fd.append( 'dto(accessUserGroupIds)',accessUserGroupIds.substring(0, accessUserGroupIds.length - 1));
      }

      if($scope.imgURI != undefined){
        fd.append( 'imageFile', dataURItoBlob($scope.imgURI));
      }    

      $.ajax({
        url: apiUrlLocal+"/bmapp/Address/Update.do",
        data: fd,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(data){
          var result = JSON.parse(data);
          if(result.forward == "Success")
          {
            console.log("Person edit succesfull");          
            $state.go('app.contacts'); 
          }
          else
          {           
             PopupFactory.getPopup($scope,result);
          }             
        }
      });  
    };

})

.controller('EditContactPersonCtrl', function(bridgeService,$scope,COLOR_VIEW, $stateParams,apiUrlLocal,$localstorage) {
  $scope.apiUrlLocal = apiUrlLocal;
  $scope.colorFont = COLOR_VIEW;
  $scope.ntitle = "Edit Contact Person";
   
  var mainData = bridgeService.getContact();
  $scope.entity = mainData.entity;
  $scope.mainData = mainData;

  console.log("==EDIT CONTACT PERSON CONTROLLER==  get maindata:", $scope.mainData);

  var salutationArray = $scope.mainData.salutationArray;  
    $scope.salutations = [];    
    salutationArray.forEach(function(salutation) {           
      $scope.salutations.push({
        name: salutation.name,
        value:salutation.salutationId
      });       
      if($scope.entity.salutationId == salutation.salutationId) {             
         $scope.salutation = $scope.salutations[$scope.salutations.length-1];  
      } 
  });

  var titleArray = $scope.mainData.titleArray;  
    $scope.titles = [];    
    titleArray.forEach(function(title) {           
      $scope.titles.push({
        name: title.name,
        value: title.titleId
      });       
      if($scope.entity.titleId == title.titleId) {             
         $scope.title = $scope.titles[$scope.titles.length-1];  
      } 
  });

  var languageArray = $scope.mainData.languageArray;
  $scope.languages = [];    
  languageArray.forEach(function(language) {           
      $scope.languages.push({
        name: language.name,
        value:language.languageId
      });       
      if($scope.entity.languageId == language.languageId) {             
         $scope.language = $scope.languages[$scope.languages.length-1];  
      } 
  });   

  $scope.birthday = new Date ( [$scope.entity.birthday.slice(0, 4), "/", $scope.entity.birthday.slice(4,6),"/", $scope.entity.birthday.slice(6)].join('') ).getTime();
  console.log("=========birthday",$scope.birthday);
  
})

.controller('ContactsCtrl', function(allContact,PopupFactory,$localstorage,$filter,$ionicScrollDelegate,$window,$scope,COLOR_VIEW, Contact,$timeout,$ionicLoading,apiUrlLocal,$location, $state, $window,$ionicPopup) {
    
    $scope.apiUrlLocal = apiUrlLocal;
    $scope.colorFont = COLOR_VIEW;
    $scope.pagesintotal; 
    $scope.page = 1; 


    $scope.showSearchBar = false;
    $scope.apiUrlLocal = apiUrlLocal;
    $scope.newContacts = allContact.query({'pageParam(pageNumber)':$scope.page});
    $scope.contacts = [];
    
    $scope.asknext = false;
   

    console.log("FIRST CALL",$scope.newContacts);

    $scope.newContacts.$promise.then(function (results){
        
        // call factory 
        PopupFactory.getPopup($scope,results);
        
        console.log("THIS INFO",(results['mainData']));
  
        $scope.contacts = (results['mainData'])['list'];

        console.log('LIST OF THE FIRST CONTACTS',$scope.contacts);
        $scope.page = parseInt((results['mainData'])['pageInfo']['pageNumber']);
        $scope.pagesintotal = parseInt((results['mainData'])['pageInfo']['totalPages']);
        console.log("page integer", $scope.page);
        console.log("pages in total", $scope.pagesintotal);

        if ($scope.contacts.length > 0 && $scope.pagesintotal>$scope.page) {
          $scope.asknext = true;  
        };
        // $window.location.reload();
    })


$scope.doRefresh = function() {
    console.log("------------------1 do refresh principal");
    $scope.page=1;
    $scope.searchKey = "";
    $scope.pag = 1;
    $scope.$broadcast('scroll.infiniteScrollComplete');


  $scope.newContacts = allContact.query({'pageParam(pageNumber)':$scope.page});

  $scope.newContacts.$promise.then(function (results){

    // call factory 
    PopupFactory.getPopup($scope,results);

    if (results['forward'] == "") {
      $scope.contacts = (results['mainData'])['list'];
      $scope.pagesintotal = parseInt((results['mainData'])['pageInfo']['totalPages']);
      $scope.$broadcast('scroll.refreshComplete'); 
        
      $scope.pag=parseInt((results['mainData'])['pageInfo']['pageNumber']);
      $scope.totalpag=parseInt((results['mainData'])['pageInfo']['totalPages']);
      
      console.log('COMEBACK TO THE FIRST LIST',$scope.page);
      console.log('WITH THIS CONTACTS',$scope.contacts);
      console.log('PAGE #',$scope.page);
      console.log("pages in total on refresh", $scope.pagesintotal);
      
      if ($scope.contacts.length > 0 && $scope.pagesintotal>$scope.page) {
        $scope.asknext = true;
      };
      $ionicScrollDelegate.scrollTop();
    }
  });
};  

$scope.loadMore = function() {
    
    console.log("------------------1 loadMore principal");
  console.log('Loading more contacts');
  $scope.page = $scope.page + 1;
  $scope.newContacts = allContact.query({'pageParam(pageNumber)':$scope.page});
  $scope.newContacts.$promise.then(function(results){
    
    // call factory 
    PopupFactory.getPopup($scope,results);

    console.log("+++++new info",(results['mainData']));
    console.log("++++new page #", $scope.page);
    $scope.contacts = $scope.contacts.concat((results['mainData'])['list']);
    $scope.$broadcast('scroll.infiniteScrollComplete');
      console.log("++++new contacts list ", $scope.contacts);
      
      if ($scope.pagesintotal<=$scope.page+1) {
          $scope.asknext = false;  
        };
      
  });
    };


$scope.getContactUrl = function(item,type){  
  var accessRight = $localstorage.getObject('accessRight');
  accessRightContactPerson = $scope.accessRight.CONTACTPERSON.VIEW;  

  // IF CONTACT PERSON HAVE PERMISSION TO READ
  if (item.contactPersonAddressId != "" && accessRightContactPerson != "true") {
    return "#";
  }

  switch(type) {
    case 'contactPerson':
        return item.contactPersonAddressId ==='' ? '#/app/contactPerson?contactId=' +item.addressId +'&addressId='+ item.addressId + '&addressType=' + item.addressType : '#/app/contactPerson?contactId='+item.contactPersonAddressId+'&addressId='+item.contactPersonAddressId+'&contactPersonId='+item.addressId+'&addressType='+item.addressType2;  
        break;
    case 'organization':
        return item.contactPersonAddressId ==='' ? '#/app/organization?contactId=' +item.addressId +'&addressId='+ item.addressId + '&addressType=' + item.addressType : '#/app/organization?contactId='+item.contactPersonAddressId+'&addressId='+item.contactPersonAddressId+'&contactPersonId='+item.addressId+'&addressType='+item.addressType2;  
        break;
    case 'person':
        return item.contactPersonAddressId ==='' ? '#/app/person?contactId=' +item.addressId +'&addressId='+ item.addressId + '&addressType=' + item.addressType : '#/app/person?contactId='+item.contactPersonAddressId+'&addressId='+item.contactPersonAddressId+'&contactPersonId='+item.addressId+'&addressType='+item.addressType2;  
        break;        
    default:
        return "#";
  }    
};

$scope.searchcon = function(){
  $scope.showSearchBar = !$scope.showSearchBar;
}   

$scope.clearSearch = function () {
  
  $scope.searchKey = "";
  $scope.showSearchBar = !$scope.showSearchBar;

  $scope.page=1;
  $scope.searchKey = "";
  $scope.pag = 1;
  
  $scope.newContacts = allContact.query({'pageParam(pageNumber)':$scope.page});

  $scope.newContacts.$promise.then(function (results){

    // call factory 
    PopupFactory.getPopup($scope,results);

    if (results['forward'] == "") {
      $scope.contacts = (results['mainData'])['list'];
      $scope.pagesintotal = parseInt((results['mainData'])['pageInfo']['totalPages']);
      $scope.$broadcast('scroll.refreshComplete'); 
        
      $scope.pag=parseInt((results['mainData'])['pageInfo']['pageNumber']);
      $scope.totalpag=parseInt((results['mainData'])['pageInfo']['totalPages']);
      
      console.log('COMEBACK TO THE FIRST LIST',$scope.page);
      console.log('WITH THIS CONTACTS',$scope.contacts);
      console.log('PAGE #',$scope.page);
      console.log("pages in total on refresh", $scope.pagesintotal);
      
      if ($scope.contacts.length > 0 && $scope.pagesintotal>$scope.page) {
        $scope.asknext = true;
      };
    }
  });
}


        
            
$scope.search = function () {
  console.log("------------------1 search function");
    $scope.contacts = [];
    $scope.showSearchBar = !$scope.showSearchBar;
    $scope.buscados = allContact.query({'parameter(contactSearchName)':$scope.searchKey});
    $scope.asknext = false;

    $scope.buscados.$promise.then(function (results){
        
        // call factory 
        PopupFactory.getPopup($scope,results);    

        $scope.pag=parseInt((results['mainData'])['pageInfo']['pageNumber']);
        $scope.totalpag=parseInt((results['mainData'])['pageInfo']['totalPages']);
                
        $scope.contacts = (results['mainData'])['list'];
        console.log("search info", results['mainData']);
        console.log("list  of contacts, first search", $scope.contacts);
         
        if ($scope.contacts.length > 0 && $scope.totalpag>$scope.pag) {
          $scope.asknext = true;  
        }; 

        // if no exists items show message
        if ($scope.contacts.length == 0) {

          var message = $filter('translate')('NoItems');
          var messageRefresh = $filter('translate')('PulltoRefresh');
          // An alert dialog
          console.log("==CONTROLLER CONTACTS== alert if no exists items");
          var alertPopup = $ionicPopup.alert({
              title: message,
              template: messageRefresh
          });
        }
        $ionicScrollDelegate.scrollTop();
                
    });
      
    $scope.loadMore = function() {
      console.log("------------------1 loadMore dentro search");
      console.log("trying to load more of the search",$scope.pag);
      $scope.pag = $scope.pag +1;        
      $scope.buscados = allContact.query({'parameter(contactSearchName)':$scope.searchKey,'pageParam(pageNumber)':$scope.pag});
      $scope.buscados.$promise.then(function(results){

          // call factory 
          PopupFactory.getPopup($scope,results);

          $scope.totalpag=parseInt((results['mainData'])['pageInfo']['totalPages']);

          console.log("===== 000new info for search",(results['mainData']));
          $scope.contacts = $scope.contacts.concat((results['mainData'])['list']);
          $scope.$broadcast('scroll.infiniteScrollComplete');
          console.log("======0000new list of contacts for search",$scope.contacts);
                
      });
            
      if ($scope.totalpag<$scope.pag+1) {
        $scope.asknext = false;  
      };              
    };
}




 $scope.createp = function() {
     console.log("go to create person");
      $state.go('app.newperson'); 
    };
                            
})



.controller('newpCtrl', function ($cordovaCamera,$cordovaImagePicker,PersonType,COLOR_VIEW,PopupFactory,$state,apiUrlLocal,$scope,$ionicModal,$http,transformRequestAsFormPost) {
  $scope.apiUrlLocal = apiUrlLocal;
  $scope.colorFont = COLOR_VIEW;
  $scope.ntitle = "New Person";
  $scope.entity=[];  
  $scope.entity.imageUrl = "";

  var request = $http({
    method: "get",        
    url: apiUrlLocal+"/bmapp/Address/Forward/Create.do",      
  });
  request.success(
    function(data, status, headers, config) {    
      console.log("asdfasfdsfdfas",data);
      // call factory 
      PopupFactory.getPopup($scope,data);    

       var countryArray = data.mainData.countryArray;  
        $scope.countries = [];    
        countryArray.forEach(function(country) {           
            $scope.countries.push({
              name: country.name,
              value:country.countryId
            });                     
        });

        var languageArray = data.mainData.languageArray;
        $scope.languages = [];    
        languageArray.forEach(function(language) {           
            $scope.languages.push({
              name: language.name,
              value:language.languageId
            });                     
        }); 

        var telecomTypeArray = data.mainData.telecomTypeArray;
        $scope.telecoms = []      
        telecomTypeArray.forEach(function(telecom) {           
            $scope.telecoms.push({
              name: telecom.telecomTypeName,
              value:telecom.telecomTypeId,
            });                  
        });      

        var groupsArray = data.mainData.dataAccessUserGroupArray;
        $scope.GroupsAvailable = [];
        groupsArray.forEach(function(group) {           
            $scope.GroupsAvailable.push({
              name: group.name,
              userGroupId: group.userGroupId,
              value : false
            });                  
        });                   

    });

  $scope.choices = [];
  $scope.iframeWidth = $(window).width();
 

  $scope.addNewChoice = function(value,telecom) {  
    var newItemNo = $scope.choices.length+1;
    $scope.choices.push({'id':newItemNo, value:value, telecom:telecom});    
  };
    
  $scope.removeChoice = function(choice) {
    var index = $scope.choices.indexOf(choice);    
    $scope.choices.splice(index,1);
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

  $scope.pickerImage= function ()
  {
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
        saveToPhotoAlbum: false
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {      
        $scope.imgURI = "data:image/jpeg;base64," + imageData;
    }, function(err) {
        // An error occured. Show a message to the user
    });
  }

    $scope.updateCountry = function (ncountry)
    {
      $scope.country = ncountry; 
      $scope.city =  undefined; 
      var cityRequest = $http({
        method: "post",        
        url: apiUrlLocal+"/bmapp/Country/City.do",      
        data: {
            'countryId' : ncountry.value
         }
      });
      cityRequest.success(
        function(data, status, headers, config) {      

          // call factory 
          PopupFactory.getPopup($scope,data);

          var cityArray = data.mainData.cityArray;
          $scope.cities = [];    
          cityArray.forEach(function(city) {           
              $scope.cities.push({
                name: city.cityName,
                value:city.cityId, 
                zip: city.zip,             
              });                     
          });    
      });
   
    }

    $scope.updateLanguage = function (nlanguage)
    {
      $scope.language = nlanguage;     
    }

    $scope.updateCity = function (ncity)
    {
      $scope.city = ncity;     
    }

  verifyIndexTelecom = function(contIndexTelecom,choice){
    respCont = 0;
    enterIn = false;
    contIndexTelecom.forEach(function(cont){
      if(cont.id == choice.telecom.value)
      {
        cont.cont = cont.cont + 1;
        respCont= cont.cont;
        enterIn = true;
      }  
    });
    if(!enterIn)
    {
      contIndexTelecom.push({id:choice.telecom.value , cont:0});
    }
    return respCont;
  }

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

  $scope.savePerson = function() {
    contIndexTelecom = [];
    var fd = new FormData();    
    fd.append( 'dto(addressType)', PersonType);
    fd.append( 'dto(name1)', $scope.entity.name1);
    fd.append( 'dto(name2)', $scope.entity.name2);  
    fd.append( 'dto(name3)', '');    
    fd.append( 'dto(street)', $scope.entity.street);  

    if($scope.country != undefined){
      fd.append( 'countryId', $scope.country.value);
    }
    if($scope.language != undefined){
      fd.append( 'dto(languageId)', $scope.language.value);  
    }
    if($scope.city != undefined){
      fd.append( 'cityId', $scope.city.value);
      fd.append( 'city', $scope.city.name);
      fd.append( 'zip', $scope.city.zip);
    }    

    $scope.choices.forEach(function(choice){      
      index = verifyIndexTelecom(contIndexTelecom,choice);
      if(index == 0){
        newdata = "telecom("+choice.telecom.value+").predeterminedIndex";
        fd.append(newdata,0);
      }
      newdata = "telecom("+choice.telecom.value+").telecom["+index+"].data"; 
      fd.append(newdata,choice.value);        
    });

    $scope.telecoms.forEach(function(telecom){
      newdata = "telecom("+telecom.value+").telecomTypeId";
      fd.append(newdata,telecom.value);     
      newdata = "telecom("+telecom.value+").telecomTypeName";
      fd.append(newdata,telecom.value);       
    });    

    var accessUserGroupIds = "";
    $scope.GroupsAvailable.forEach(function(group){
        if(group.value == true){
          accessUserGroupIds = accessUserGroupIds + group.userGroupId + ",";
        }
    });

    if(accessUserGroupIds != ""){
      fd.append( 'dto(accessUserGroupIds)',accessUserGroupIds.substring(0, accessUserGroupIds.length - 1));
    }

    if($scope.imgURI != undefined){
      fd.append( 'imageFile', dataURItoBlob($scope.imgURI));
    }    

    $.ajax({
      url: apiUrlLocal+"/bmapp/Address/Create.do",
      data: fd,
      processData: false,
      contentType: false,
      type: 'POST',
      success: function(data){
        var result = JSON.parse(data);
        if(result.forward == "Success")
        {
          console.log("Person creation succesfull");          
          $state.go('app.contacts'); 
        }
        else
        {           
           PopupFactory.getPopup($scope,result);
        }             
      }
    });  
  };

})

.controller('editOrganizationCtrl', function($state,$cordovaImagePicker,PopupFactory,$http,$cordovaCamera,bridgeService,$scope,COLOR_VIEW, $stateParams,apiUrlLocal,$localstorage) {
    $scope.apiUrlLocal = apiUrlLocal;
    $scope.colorFont = COLOR_VIEW;
    $scope.ntitle = "Edit Organization";
    // get contact for edit
    var mainData = bridgeService.getContact();
    $scope.entity = mainData.entity;
    $scope.maindata = mainData;

    $scope.iframeWidth = $(window).width();

    console.log("==EDIT ORGANIZATION CONTROLLER==  get maindata:", $scope.maindata);

    var countryArray = $scope.maindata.countryArray;
    $scope.countries = [];    
    countryArray.forEach(function(country) {           
        $scope.countries.push({
          name: country.name,
          value:country.countryId
        });       
        if($scope.entity.countryId == country.countryId) {             
           $scope.country = $scope.countries[$scope.countries.length-1];  
        } 
    });    

    var languageArray = $scope.maindata.languageArray;
    $scope.languages = [];    
    languageArray.forEach(function(language) {           
        $scope.languages.push({
          name: language.name,
          value:language.languageId
        });       
        if($scope.entity.languageId == language.languageId) {             
           $scope.language = $scope.languages[$scope.languages.length-1];  
        } 
    });  

    var telecomTypeArray = $scope.maindata.telecomTypeArray;
    $scope.telecoms = []      
    telecomTypeArray.forEach(function(telecom) {           
      $scope.telecoms.push({
          name: telecom.telecomTypeName,
          value:telecom.telecomTypeId,
      });                  
    }); 

    var groupsArray = $scope.maindata.dataAccessUserGroupArray;
    $scope.GroupsAvailable = [];
    groupsArray.forEach(function(group) {  
        var array =  $scope.entity.accessUserGroupIds.split(',');
        var value = false;
        if(array.indexOf(group.userGroupId) != -1){
          value = true;
        }                
        $scope.GroupsAvailable.push({
          name: group.name,
          userGroupId: group.userGroupId,
          value : value
        });                  
    });   

    if($scope.entity.cityId != ""){
      var cityRequest = $http({
        method: "post",        
        url: apiUrlLocal+"/bmapp/Country/City.do",      
        data: {
            'countryId' : $scope.country.value
         }
      });
      cityRequest.success(
        function(data, status, headers, config) {      

          // call factory 
          PopupFactory.getPopup($scope,data);

          var cityArray = data.mainData.cityArray;
          $scope.cities = [];    
          cityArray.forEach(function(city) {           
              $scope.cities.push({
                name: city.cityName,
                value:city.cityId, 
                zip: city.zip,             
              });   
              if($scope.entity.cityId == city.cityId) {             
                 $scope.city = $scope.cities[$scope.cities.length-1];  
              }                  
          });    
      });
    }

    $scope.choices = [];  

    $scope.entity.telecoms.forEach(function(telecom){      
        telecom.telecomList.forEach(function(item){
          var newItemNo = $scope.choices.length+1;
          $scope.choices.push({'id':newItemNo, value:item.data, telecom:{value: telecom.telecomTypeId ,name: telecom.telecomTypeName}});
        });        
    });

    $scope.addNewChoice = function(value,telecom) {  
      var newItemNo = $scope.choices.length+1;
      $scope.choices.push({'id':newItemNo, value:value, telecom:telecom});    
    };
      
    $scope.removeChoice = function(choice) {
      var index = $scope.choices.indexOf(choice);    
      $scope.choices.splice(index,1);
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
          saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options).then(function(imageData) {      
          $scope.imgURI = "data:image/jpeg;base64," + imageData;
      }, function(err) {
          // An error occured. Show a message to the user
      });
    }

    $scope.updateCountry = function (ncountry)
    {
      $scope.country = ncountry; 
      $scope.city =  undefined; 
      var cityRequest = $http({
        method: "post",        
        url: apiUrlLocal+"/bmapp/Country/City.do",      
        data: {
            'countryId' : ncountry.value
         }
      });
      cityRequest.success(
        function(data, status, headers, config) {      

          // call factory 
          PopupFactory.getPopup($scope,data);

          var cityArray = data.mainData.cityArray;
          $scope.cities = [];    
          cityArray.forEach(function(city) {           
              $scope.cities.push({
                name: city.cityName,
                value:city.cityId, 
                zip: city.zip,             
              });                     
          });    
      });
   
    }

    $scope.updateLanguage = function (nlanguage)
    {
      $scope.language = nlanguage;     
    }

    $scope.updateCity = function (ncity)
    {
      $scope.city = ncity;     
    }

    verifyIndexTelecom = function(contIndexTelecom,choice){
      respCont = 0;
      enterIn = false;
      contIndexTelecom.forEach(function(cont){
        if(cont.id == choice.telecom.value)
        {
          cont.cont = cont.cont + 1;
          respCont= cont.cont;
          enterIn = true;
        }  
      });
      if(!enterIn)
      {
        contIndexTelecom.push({id:choice.telecom.value , cont:0});
      }
      return respCont;
    }

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

    $scope.saveOrganization = function() {
      contIndexTelecom = [];
      var fd = new FormData();    
      fd.append( 'dto(addressId)', $scope.entity.addressId);
      fd.append( 'dto(companyId)', $scope.entity.companyId);
      fd.append( 'dto(addressType)', $scope.entity.addressType);      
      fd.append( 'dto(version)', $scope.entity.version);      
      fd.append( 'dto(name1)', $scope.entity.name1);
      fd.append( 'dto(name2)', $scope.entity.name2);
      fd.append( 'dto(name3)', $scope.entity.name3);  
      fd.append( 'dto(street)', $scope.entity.street);  

      if($scope.country != undefined){
        fd.append( 'countryId', $scope.country.value);
      }
      if($scope.language != undefined){
        fd.append( 'dto(languageId)', $scope.language.value);  
      }
      if($scope.city != undefined){
        fd.append( 'cityId', $scope.city.value);
        fd.append( 'city', $scope.city.name);
        fd.append( 'zip', $scope.city.zip);
      }    

      $scope.choices.forEach(function(choice){      
        index = verifyIndexTelecom(contIndexTelecom,choice);
        if(index == 0){
          newdata = "telecom("+choice.telecom.value+").predeterminedIndex";
          fd.append(newdata,0);
        }
        newdata = "telecom("+choice.telecom.value+").telecom["+index+"].data"; 
        fd.append(newdata,choice.value);        
      });

      $scope.telecoms.forEach(function(telecom){
        newdata = "telecom("+telecom.value+").telecomTypeId";
        fd.append(newdata,telecom.value);     
        newdata = "telecom("+telecom.value+").telecomTypeName";
        fd.append(newdata,telecom.value);       
      });    

      var accessUserGroupIds = "";
      $scope.GroupsAvailable.forEach(function(group){
          if(group.value == true){
            accessUserGroupIds = accessUserGroupIds + group.userGroupId + ",";
          }
      });

      if(accessUserGroupIds != ""){
        fd.append( 'dto(accessUserGroupIds)',accessUserGroupIds.substring(0, accessUserGroupIds.length - 1));
      }

      if($scope.imgURI != undefined){
        fd.append( 'imageFile', dataURItoBlob($scope.imgURI));
      }    

      $.ajax({
        url: apiUrlLocal+"/bmapp/Address/Update.do",
        data: fd,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(data){
          var result = JSON.parse(data);
          if(result.forward == "Success")
          {
            console.log("Organization edit succesfull");          
            $state.go('app.contacts'); 
          }
          else
          {           
             PopupFactory.getPopup($scope,result);
          }             
        }
      });  
    };

})


.controller('neworganizationCtrl', function (OrgType,$ionicPopup,$cordovaImagePicker,$cordovaCamera,PopupFactory,transformRequestAsFormPost,apiUrlLocal,$scope,$ionicModal, AuthenticationService,$state,$http,$ionicLoading,$location, $state, $window,COLOR_VIEW) {
  $scope.colorFont = COLOR_VIEW;

  $scope.ntitle = "New Organization";
  $scope.entity=[];  
  $scope.entity.imageUrl = "";

  var request = $http({
    method: "get",        
    url: apiUrlLocal+"/bmapp/Address/Forward/Create.do",      
  });
  request.success(
    function(data, status, headers, config) {    
      // call factory 
      PopupFactory.getPopup($scope,data);    

       var countryArray = data.mainData.countryArray;  
        $scope.countries = [];    
        countryArray.forEach(function(country) {           
            $scope.countries.push({
              name: country.name,
              value:country.countryId
            });                     
        });

        var languageArray = data.mainData.languageArray;
        $scope.languages = [];    
        languageArray.forEach(function(language) {           
            $scope.languages.push({
              name: language.name,
              value:language.languageId
            });                     
        }); 

        var telecomTypeArray = data.mainData.telecomTypeArray;
        $scope.telecoms = []      
        telecomTypeArray.forEach(function(telecom) {           
            $scope.telecoms.push({
              name: telecom.telecomTypeName,
              value:telecom.telecomTypeId,
            });                  
        });      

        var groupsArray = data.mainData.dataAccessUserGroupArray;
        $scope.GroupsAvailable = [];
        groupsArray.forEach(function(group) {           
            $scope.GroupsAvailable.push({
              name: group.name,
              userGroupId: group.userGroupId,
              value : false
            });                  
        });                   

    });

  $scope.choices = [];
  $scope.iframeWidth = $(window).width();
 

  $scope.addNewChoice = function(value,telecom) {  
    var newItemNo = $scope.choices.length+1;
    $scope.choices.push({'id':newItemNo, value:value, telecom:telecom});    
  };
    
  $scope.removeChoice = function(choice) {
    var index = $scope.choices.indexOf(choice);    
    $scope.choices.splice(index,1);
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

  $scope.pickerImage= function ()
  {
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
        saveToPhotoAlbum: false
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {      
        $scope.imgURI = "data:image/jpeg;base64," + imageData;
    }, function(err) {
        // An error occured. Show a message to the user
    });
  }


 //  $scope.showPopup = function() {
 //  $scope.data = []; 
 //  $scope.data.push({'id':1, value:true, name:"1"},{'id':2, value:false, name:"2"},{'id':3, value:true, name:"3"},{'id':4, value:false, name:"4"});    
 //  // An elaborate, custom popup
 //  var myPopup = $ionicPopup.show({
 //    template: '<div data-ng-repeat="d in data"><ion-toggle  ng-model="d.value" toggle-class="toggle-calm">{{d.name}}</ion-toggle></div>',
 //    title: 'Data access security',
 //    subTitle: 'Allowed user groups',
 //    scope: $scope,
 //    buttons: [      
 //      {
 //        text: '<b>OK</b>',
 //        type: 'button-positive',
 //        onTap: function(e) {
 //          // if (!$scope.data.wifi) {
 //          //   //don't allow the user to close unless he enters wifi password
 //          //   e.preventDefault();
 //          // } else {
 //            return $scope.data;
 //          // }
 //        }
 //      }
 //    ]
 //  });
 //  myPopup.then(function(res) {
 //    console.log('Tapped!', res);      
 //  });  
 // };
 

    $scope.updateCountry = function (ncountry)
    {
      $scope.country = ncountry; 
      $scope.city =  undefined; 
      var cityRequest = $http({
        method: "post",        
        url: apiUrlLocal+"/bmapp/Country/City.do",      
        data: {
            'countryId' : ncountry.value
         }
      });
      cityRequest.success(
        function(data, status, headers, config) {      

          // call factory 
          PopupFactory.getPopup($scope,data);

          var cityArray = data.mainData.cityArray;
          $scope.cities = [];    
          cityArray.forEach(function(city) {           
              $scope.cities.push({
                name: city.cityName,
                value:city.cityId, 
                zip: city.zip,             
              });                     
          });    
      });
   
    }

    $scope.updateLanguage = function (nlanguage)
    {
      $scope.language = nlanguage;     
    }

    $scope.updateCity = function (ncity)
    {
      $scope.city = ncity;     
    }

  verifyIndexTelecom = function(contIndexTelecom,choice){
    respCont = 0;
    enterIn = false;
    contIndexTelecom.forEach(function(cont){
      if(cont.id == choice.telecom.value)
      {
        cont.cont = cont.cont + 1;
        respCont= cont.cont;
        enterIn = true;
      }  
    });
    if(!enterIn)
    {
      contIndexTelecom.push({id:choice.telecom.value , cont:0});
    }
    return respCont;
  }

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

  $scope.saveOrganization = function() {
    contIndexTelecom = [];
    var fd = new FormData();    
    fd.append( 'dto(addressType)', OrgType);
    fd.append( 'dto(name1)', $scope.entity.name1);
    fd.append( 'dto(name2)', $scope.entity.name2);
    fd.append( 'dto(name3)', $scope.entity.name3);  
    fd.append( 'dto(street)', $scope.entity.street);  

    if($scope.country != undefined){
      fd.append( 'countryId', $scope.country.value);
    }
    if($scope.language != undefined){
      fd.append( 'dto(languageId)', $scope.language.value);  
    }
    if($scope.city != undefined){
      fd.append( 'cityId', $scope.city.value);
      fd.append( 'city', $scope.city.name);
      fd.append( 'zip', $scope.city.zip);
    }    

    $scope.choices.forEach(function(choice){      
      index = verifyIndexTelecom(contIndexTelecom,choice);
      if(index == 0){
        newdata = "telecom("+choice.telecom.value+").predeterminedIndex";
        fd.append(newdata,0);
      }
      newdata = "telecom("+choice.telecom.value+").telecom["+index+"].data"; 
      fd.append(newdata,choice.value);        
    });

    $scope.telecoms.forEach(function(telecom){
      newdata = "telecom("+telecom.value+").telecomTypeId";
      fd.append(newdata,telecom.value);     
      newdata = "telecom("+telecom.value+").telecomTypeName";
      fd.append(newdata,telecom.value);       
    });    

    var accessUserGroupIds = "";
    $scope.GroupsAvailable.forEach(function(group){
        if(group.value == true){
          accessUserGroupIds = accessUserGroupIds + group.userGroupId + ",";
        }
    });

    if(accessUserGroupIds != ""){
      fd.append( 'dto(accessUserGroupIds)',accessUserGroupIds.substring(0, accessUserGroupIds.length - 1));
    }

    if($scope.imgURI != undefined){
      fd.append( 'imageFile', dataURItoBlob($scope.imgURI));
    }    

    $.ajax({
      url: apiUrlLocal+"/bmapp/Address/Create.do",
      data: fd,
      processData: false,
      contentType: false,
      type: 'POST',
      success: function(data){
        var result = JSON.parse(data);
        if(result.forward == "Success")
        {
          console.log("Organization creation succesfull");          
          $state.go('app.contacts'); 
        }
        else
        {           
           PopupFactory.getPopup($scope,result);
        }             
      }
    });  
  };
})


.controller('ContactPersonCtrl', function(allContact,$state,PopupFactory,bridgeService,$scope,COLOR_VIEW,$localstorage,$stateParams, Contact,apiUrlLocal) {
    $scope.apiUrlLocal = apiUrlLocal;
    $scope.colorFont = COLOR_VIEW;

  console.log("param1", $stateParams.contactId);
  console.log("param2", $stateParams.addressId);
  console.log("param3", $stateParams.contactPersonId);
  console.log("param4", $stateParams.addressType);

  $scope.contact = allContact.get({contactId: $stateParams.contactId, "dto(addressId)": $stateParams.addressId, "dto(contactPersonId)": $stateParams.contactPersonId, "dto(addressType)": $stateParams.addressType});

  $scope.contact.$promise.then(function (results){

    // call factory 
    PopupFactory.getPopup($scope,results);

    $scope.contact = results;
    console.log("==CONTROLLER CONTACTS== result detail contact:", $scope.contact);

    $scope.telecomss=results.mainData.entity.telecoms;
    console.log("list of telecoms",$scope.telecomss);

    $scope.firstGruoup = [];
    $scope.secondGruoup = [];
    $scope.auxEmail = [];
    $scope.auxFax = [];
    $scope.auxLink = [];    
    $scope.telecomss.forEach(function(telecom) {

      switch(telecom.telecomTypeType) {
          case 'PHONE':
              $scope.firstGruoup.push(telecom);
              break;
          case 'EMAIL':
              $scope.auxEmail.push(telecom);
              break;
          case 'OTHER':
              $scope.secondGruoup.push(telecom);
              break;
          case 'FAX':
              $scope.auxFax.push(telecom);
              break;         
          case 'LINK':
              $scope.auxLink.push(telecom);
              break;
      }     
    });

    $scope.firstGruoup = $scope.firstGruoup.concat($scope.auxEmail);
    $scope.secondGruoup = $scope.secondGruoup.concat($scope.auxFax);
    $scope.secondGruoup = $scope.secondGruoup.concat($scope.auxLink); 

    $scope.writeEmail = function(email)
    {      
        $state.go('app.newmail',{'to': email }); 
    }
    
    String.prototype.startsWith = function(prefix) {
      return this.indexOf(prefix) === 0;
    }

    $scope.go_to = function(link)
    {      
      if (!link.startsWith("http://")){
        window.open('http://'+link, '_system', 'location=yes'); return false;
      }
      else{
       window.open(link, '_system', 'location=yes'); return false; 
      }       
    }    

    $localstorage.setObject("EditContact",results.mainData);

    if (results.mainData.entity.countryId != "") {
      var countries = results.mainData.countryArray;
      countries.forEach(function(country) {
          if (country.countryId == results.mainData.entity.countryId) {
            $scope.countryName = country.name;
          }
      });
    }

    if (results.mainData.entity.titleId != "") {
      var titles = results.mainData.titleArray;
      titles.forEach(function(title) {
          if (title.titleId == results.mainData.entity.titleId) {
            $scope.titleperson = title.name;
          }
      });
    }


    // save contact for edit do not call service
    bridgeService.saveContact($scope.contact.mainData);

    $scope.firstGruoup = $scope.firstGruoup.sort(compare);
    $scope.secondGruoup = $scope.secondGruoup.sort(compare);

    function compare(a,b) {     
      return a.telecomTypePosition - b.telecomTypePosition        
    }
    
  });

})

.controller('OrganizationCtrl', function(allContact,$state,PopupFactory,bridgeService,$scope,COLOR_VIEW,$localstorage,$stateParams, Contact,apiUrlLocal) {
    $scope.apiUrlLocal = apiUrlLocal;
    $scope.colorFont = COLOR_VIEW;

  console.log("param1", $stateParams.contactId);
  console.log("param2", $stateParams.addressId);
  console.log("param3", $stateParams.contactPersonId);
  console.log("param4", $stateParams.addressType);

  $scope.contact = allContact.get({contactId: $stateParams.contactId, "dto(addressId)": $stateParams.addressId, "dto(contactPersonId)": $stateParams.contactPersonId, "dto(addressType)": $stateParams.addressType});

  $scope.contact.$promise.then(function (results){

    // call factory 
    PopupFactory.getPopup($scope,results);

    $scope.contact = results;
    console.log("==CONTROLLER CONTACTS== result detail contact:", $scope.contact);

    $scope.telecomss=results.mainData.entity.telecoms;    

    $scope.firstGruoup = [];
    $scope.secondGruoup = [];
    $scope.auxEmail = [];
    $scope.auxFax = [];
    $scope.auxLink = [];    
    $scope.telecomss.forEach(function(telecom) {

      switch(telecom.telecomTypeType) {
          case 'PHONE':
              $scope.firstGruoup.push(telecom);
              break;
          case 'EMAIL':
              $scope.auxEmail.push(telecom);
              break;
          case 'OTHER':
              $scope.secondGruoup.push(telecom);
              break;
          case 'FAX':
              $scope.auxFax.push(telecom);
              break;         
          case 'LINK':
              $scope.auxLink.push(telecom);
              break;
      }     
    });

    



    $scope.firstGruoup = $scope.firstGruoup.concat($scope.auxEmail);
    $scope.secondGruoup = $scope.secondGruoup.concat($scope.auxFax);
    $scope.secondGruoup = $scope.secondGruoup.concat($scope.auxLink); 
   

    $scope.writeEmail = function(email)
    {      
        $state.go('app.newmail',{'to': email}); 
    }
    
    String.prototype.startsWith = function(prefix) {
      return this.indexOf(prefix) === 0;
    }

    $scope.go_to = function(link)
    {      
      if (!link.startsWith("http://")){
        window.open('http://'+link, '_system', 'location=yes'); return false;
      }
      else{
       window.open(link, '_system', 'location=yes'); return false; 
      }


       
    }    

    $localstorage.setObject("EditContact",results.mainData);

    if (results.mainData.entity.countryId != "") {
      var countries = results.mainData.countryArray;
      countries.forEach(function(country) {
          if (country.countryId == results.mainData.entity.countryId) {
            $scope.countryName = country.name;
          }
      });
    }   

    // save contact for edit do not call service
    bridgeService.saveContact($scope.contact.mainData);

    $scope.firstGruoup = $scope.firstGruoup.sort(compare);
    $scope.secondGruoup = $scope.secondGruoup.sort(compare);

    function compare(a,b) {     
      return a.telecomTypePosition - b.telecomTypePosition        
    }
  });

})

.controller('PersonCtrl', function(allContact,$state,PopupFactory,bridgeService,$scope,COLOR_VIEW,$localstorage,$stateParams, Contact,apiUrlLocal) {
    $scope.apiUrlLocal = apiUrlLocal;
    $scope.colorFont = COLOR_VIEW;

  console.log("param1", $stateParams.contactId);
  console.log("param2", $stateParams.addressId);
  console.log("param3", $stateParams.contactPersonId);
  console.log("param4", $stateParams.addressType);

  $scope.contact = allContact.get({contactId: $stateParams.contactId, "dto(addressId)": $stateParams.addressId, "dto(contactPersonId)": $stateParams.contactPersonId, "dto(addressType)": $stateParams.addressType});

  $scope.contact.$promise.then(function (results){

    // call factory 
    PopupFactory.getPopup($scope,results);

    $scope.contact = results;
    console.log("==CONTROLLER CONTACTS== result detail contact:", $scope.contact);

    $scope.telecomss=results.mainData.entity.telecoms;
    console.log("list of telecoms",$scope.telecomss);

    $scope.firstGruoup = [];
    $scope.secondGruoup = [];
    $scope.auxEmail = [];
    $scope.auxFax = [];
    $scope.auxLink = [];    
    $scope.telecomss.forEach(function(telecom) {

      switch(telecom.telecomTypeType) {
          case 'PHONE':
              $scope.firstGruoup.push(telecom);
              break;
          case 'EMAIL':
              $scope.auxEmail.push(telecom);
              break;
          case 'OTHER':
              $scope.secondGruoup.push(telecom);
              break;
          case 'FAX':
              $scope.auxFax.push(telecom);
              break;         
          case 'LINK':
              $scope.auxLink.push(telecom);
              break;
      }     
    });

    $scope.firstGruoup = $scope.firstGruoup.concat($scope.auxEmail);
    $scope.secondGruoup = $scope.secondGruoup.concat($scope.auxFax);
    $scope.secondGruoup = $scope.secondGruoup.concat($scope.auxLink);  

    $scope.writeEmail = function(email)
    {      
        $state.go('app.newmail',{'to': email }); 
    }

    String.prototype.startsWith = function(prefix) {
      return this.indexOf(prefix) === 0;
    }

    $scope.go_to = function(link)
    {      
      if (!link.startsWith("http://")){
        window.open('http://'+link, '_system', 'location=yes'); return false;
      }
      else{
       window.open(link, '_system', 'location=yes'); return false; 
      }       
    }  

    $localstorage.setObject("EditContact",results.mainData);

    if (results.mainData.entity.countryId != "") {
      var countries = results.mainData.countryArray;
      countries.forEach(function(country) {
          if (country.countryId == results.mainData.entity.countryId) {
            $scope.countryName = country.name;
          }
      });
    }    

    if (results.mainData.entity.titleId != "") {
      var titles = results.mainData.titleArray;
      titles.forEach(function(title) {
          if (title.titleId == results.mainData.entity.titleId) {
            $scope.titleperson = title.name;
          }
      });
    }

    // save contact for edit do not call service
    bridgeService.saveContact($scope.contact.mainData);

    $scope.firstGruoup = $scope.firstGruoup.sort(compare);
    $scope.secondGruoup = $scope.secondGruoup.sort(compare);

    function compare(a,b) {     
      return a.telecomTypePosition - b.telecomTypePosition        
    }
    
  });

})





