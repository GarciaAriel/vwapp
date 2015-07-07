angular.module('starter.schedulecontrollers', ['starter.scheduleservices'])

//
// CONTROLLER LIST CONTACT TO ADD APPOINTMENT
//
.controller('addParticipantsToAnAppointment', function($ionicPopup,$filter,$ionicScrollDelegate,PopupFactory,allContact,$scope,apiUrlLocal,$localstorage) {
  console.log('*******************************************************');
  console.log("==CONTROLLER SCHEDULE== LIST TO AD PARTICIPANT TO APPOINTMENT: ");

  $scope.pagesintotal; 
  $scope.page = 1;
  $scope.showSearchBar = false;
  $scope.apiUrlLocal = apiUrlLocal;
  $scope.contacts = [];
  $scope.asknext = false;

  // EXECUTE QUERY WITH (PAGE NUMBER)
  $scope.newContacts = allContact.query({'pageParam(pageNumber)':$scope.page});
  
  $scope.newContacts.$promise.then(function (results){
      
      // call factory to validate the response
      PopupFactory.getPopup($scope,results);
      
      console.log("1. results of request: ",results);

      $scope.contacts = (results['mainData'])['list'];

      // get page and page in total
      $scope.page = parseInt((results['mainData'])['pageInfo']['pageNumber']);
      $scope.pagesintotal = parseInt((results['mainData'])['pageInfo']['totalPages']);

      console.log("2. page number", $scope.page);
      console.log("3. page in total", $scope.pagesintotal);

      if ($scope.contacts.length > 0 && $scope.pagesintotal>$scope.page) {
        $scope.asknext = true;  
      };
  })

  $scope.hideSearch = function() {
    console.log('*******************************************************');
    console.log("4. hide search");
    $scope.searchKey = "";
    $scope.showSearchBar = false;
  };    

  $scope.doRefresh = function() {
    console.log('*******************************************************');
    console.log("5. do refresh");

    $scope.page=1;
    $scope.searchKey = "";
    $scope.showSearchBar = false;
    $scope.$broadcast('scroll.infiniteScrollComplete');

    // EXECUTE QUERY WITH (PAGE NUMBER)
    $scope.newContacts = allContact.query({'pageParam(pageNumber)':$scope.page});

    // PROMISE
    $scope.newContacts.$promise.then(function (results){

      // call factory to validate the response
      PopupFactory.getPopup($scope,results);
      
      console.log("6. results of request: ",results);

      $scope.contacts = (results['mainData'])['list']
      $scope.totalPages = parseInt((results['mainData'])['pageInfo']['totalPages']);
      $scope.page=parseInt((results['mainData'])['pageInfo']['pageNumber']);

      console.log("7. page number", $scope.page);
      console.log("8. page in total", $scope.totalPages);

      if ( $scope.totalPages > $scope.page ) {
        $scope.asknext = true;
      };

      $scope.$broadcast('scroll.refreshComplete'); 
      $ionicScrollDelegate.scrollTop();
    });
  };  

  $scope.loadMore = function() {
    console.log('*******************************************************');
    console.log("9. load more contacts");
    
    $scope.page = $scope.page + 1;

    // EXECUTE QUERY WITH (PAGE NUMBER)
    $scope.newContacts = allContact.query({'pageParam(pageNumber)':$scope.page});
    // PROMISE
    $scope.newContacts.$promise.then(function(results){
    
      // call factory to validate the response
      PopupFactory.getPopup($scope,results);

      console.log("10. results of request: ",results);

      $scope.contacts = $scope.contacts.concat((results['mainData'])['list']);
      $scope.page = parseInt((results['mainData'])['pageInfo']['pageNumber']);
      $scope.totalPages = parseInt((results['mainData'])['pageInfo']['totalPages']);

      console.log("11. page number", $scope.page);
      console.log("12. page in total", $scope.totalPages);

      $scope.$broadcast('scroll.infiniteScrollComplete');
      if ($scope.totalPages <= $scope.page) {
        $scope.asknext = false;  
      };

    });
  };

  $scope.searchcon = function(){
    $scope.showSearchBar = !$scope.showSearchBar;
  }   

  $scope.search = function () {
    console.log('*******************************************************');
    console.log("13. function search");

    $scope.contacts = [];
    $scope.asknext = false;
    $scope.showSearchBar = !$scope.showSearchBar;

    // EXECUTE QUERY WITH (CONTACT SEARCH NAME)
    $scope.buscados = allContact.query({'parameter(contactSearchName)':$scope.searchKey});
    
    // PROMISE
    $scope.buscados.$promise.then(function (results){
        
      // call factory to validate the response
      PopupFactory.getPopup($scope,results);  

      console.log("14. results of request: ",results);  

      $scope.contacts = (results['mainData'])['list'];
      $scope.page = parseInt((results['mainData'])['pageInfo']['pageNumber']);
      $scope.totalPages = parseInt((results['mainData'])['pageInfo']['totalPages']);

      console.log("15. page number", $scope.page);
      console.log("16. page in total", $scope.totalPages);

      if ( $scope.totalPages > $scope.page) {
        $scope.asknext = true;  
      }; 

      // if no exists items show message
      if ($scope.contacts.length == 0) {

        console.log("17. no exists items");

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
      console.log("18. load more into search");

      $scope.page = $scope.page +1;      

      // EXECUTE QUERY WITH (contactSearchName, pageNumber)
      $scope.buscados = allContact.query({'parameter(contactSearchName)':$scope.searchKey,'pageParam(pageNumber)':$scope.page});
      // PROMISE
      $scope.buscados.$promise.then(function(results){

        // call factory to validate the response
        PopupFactory.getPopup($scope,results);

        console.log("19. results of request: ",results);

        $scope.contacts = $scope.contacts.concat((results['mainData'])['list']);
        $scope.page = parseInt((results['mainData'])['pageInfo']['pageNumber']);
        $scope.totalPages = parseInt((results['mainData'])['pageInfo']['totalPages']);

        console.log("20. page number", $scope.page);
        console.log("21. page in total", $scope.totalPages);

        $scope.$broadcast('scroll.infiniteScrollComplete');
                
      });
            
      if ($scope.totalPages <= $scope.page) {
        $scope.asknext = false;  
      };              
    };
  }

  $scope.getContactUrl = function(item,type){  
    var accessRight = $localstorage.getObject('accessRight');
    accessRightContactPerson = $scope.accessRight.CONTACTPERSON.VIEW;  

    // IF CONTACT PERSON HAVE PERMISSION TO READ
    if (item.contactPersonAddressId != "" && accessRightContactPerson != "true") {
      return "#";
    }
    switch(type) {
      case 'contactPerson':
          return '#/app/contactPerson?contactId='+item.contactPersonAddressId+'&addressId='+item.contactPersonAddressId+'&contactPersonId='+item.addressId+'&name1='+item.name1+'&name2='+item.name2;  
          // return item.contactPersonAddressId ==='' ? '#/app/contactPerson?contactId=' +item.addressId +'&addressId='+ item.addressId + '&addressType=' + item.addressType : '#/app/contactPerson?contactId='+item.contactPersonAddressId+'&addressId='+item.contactPersonAddressId+'&contactPersonId='+item.addressId+'&addressType='+item.addressType2;  
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
                            
})

// 
// CONTROLLER SCHEDULE EDIT
//
.controller('ControllerScheduleEdit', function($scope,bridgeServiceAppointment){
  console.log('*******************************************************');
  // GET OBJECT APPOINTMET TO EDIT
  var mainData = bridgeServiceAppointment.getAppointment();
  console.log("==CONTROLLER SCHEDULE== edit appointment:",mainData);

  $scope.entity = mainData.entity;
  // display the current day // start and end
  var dateStart = new Date(parseInt($scope.entity.startDateTime,10));
  var dateEnd = new Date(parseInt($scope.entity.endDateTime,10));
  $scope.dateStart = {  value: dateStart  };
  $scope.dateEnd = {  value: dateEnd  };

  // reminter list type 
  $scope.reminderList = [{name: '5 min before',type: 1,value: 5},{name: '15 min before',type: 1,value: 15},
        {name: '30 min before',type: 1,value: 30},{name: '45 min before',type: 1,value: 45},
        {name: '1 hour before',type: 2,value: 1},{name: '2 hour before',type: 2,value: 2},
        {name: '3 hour before',type: 2,value: 3},{name: '12 hour before',type: 12},
        {name: '1 day before',type: 3,value: 1},{name: '2 day before',type: 3,value: 2},];
  // $scope.typeReminder = $scope.reminderList[0];

  var aTypesArray = mainData.appointmentTypeArray;
  $scope.appointmentTypes = [];    
  aTypesArray.forEach(function(aType) {           
      $scope.appointmentTypes.push({
        name: aType.name,
        value:aType.appointmentTypeId
      });       
      if($scope.entity.appointmentTypeId == aType.appointmentTypeId) {             
         $scope.typeAppointment = $scope.appointmentTypes[$scope.appointmentTypes.length-1];  
      } 
  });

  var prioritiesArray = mainData.priorityArray;
  $scope.priorities = [];    
  prioritiesArray.forEach(function(priority) {           
      $scope.priorities.push({
        name: priority.name,
        value:priority.priorityId
      });       
      if($scope.entity.priorityId == priority.priorityId) {             
         $scope.priority = $scope.priorities[$scope.priorities.length-1];  
      } 
  });

  // show or hide time All day
  $scope.entity.isAllDay = $scope.entity.isAllDay == 'true' ? true : false;

  // show or hide time All day
  $scope.isRecurrenceValue = $scope.entity.isRecurrence == 'true' ? true : false;

  // appointment is reminder convert string to boolean
  if ($scope.entity.reminder == 'true') {
    $scope.entity.reminder = true;
    // switch($scope.entity.reminder) {
    //   case '1':
          
    //       break;
    //   case '2':
          
    //       break;
    //   default:
    //       default code block
    // } 
    // reminderType:"1"
  }
  else{
    $scope.entity.reminder = false; 
  }

  

  // show or hide time All day
  $scope.isRecurrenceValue = $scope.entity.isRecurrence == 'true' ? true : false;
  
  // get date start and end
  $scope.startDate = new Date(parseInt($scope.entity.startDateTime));
  $scope.endDate = new Date(parseInt($scope.entity.endDateTime));

  $scope.as = true;
  $scope.groupDaily = {name: 'groupDaily', type: true};
  $scope.groupWeek = {name: 'groupWeek', type: false};
  $scope.groupMonth = {name: 'groupMonth', type: false};
  $scope.groupYear = {name: 'groupYear', type: false};

  $scope.a = false;
  $scope.b = false;
  $scope.c = false;
  $scope.d = false;
  $scope.e = false;
  $scope.f = false;
  $scope.g = false;

  $scope.days = [{name:'1'},{name:'2'},{name:'3'},{name:'4'},{name:'5'}]

  // if ($scope.entity.isAllDay == 'true') {
  //     console.log("asdf---true");
  //     $scope.showDiv = true;
  //   }
  //   else{
  //     console.log("asdf---false");
  //    $scope.showDiv = false; 
  //   }

  // $scope.hideDiv = function(){
  //   if ($scope.showDiv) {
  //     console.log("asdf---true => false");
  //     $scope.showDiv = false;
  //   }
  //   else{
  //     console.log("asdf---false => true");
  //    $scope.showDiv = true; 
  //   }
  // }
  $scope.updateType = function (nType)
  {
    $scope.aType = nType;     
  }

  $scope.saveAppointment = function(){
    console.log("==aaaaaaaa== entity:",$scope.entity);
    console.log("==aaaaaaaa== type:",$scope.aType);
  }

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
  
})

// 
// CONTROLLER SCHEDULE DETAIL
//
.controller('ControlScheduleDetail', function(bridgeServiceAppointment,$state,PopupFactory,$scope, $stateParams,scheduleService,pathSchedule,$ionicActionSheet) {
  console.log('*******************************************************');
  console.log("==CONTROLLER SCHEDULE== view detail");
  console.log("param id appointment: ", $stateParams.appointmentId);

  $scope.pathSchedule = pathSchedule;
  
  // EXECUTE QUERY WITH (appointment id)
  $scope.taskcall = scheduleService.query({'dto(appointmentId)':$stateParams.appointmentId,'dto(title)':'meeting'});

  // PROMISE
  $scope.taskcall.$promise.then(function (results){

    // call factory to validate the response
    PopupFactory.getPopup($scope,results);
    console.log("results of request: ",results);

    $scope.entity = results['mainData']['entity'];
    $scope.appointmentTypeArray = results['mainData']['appointmentTypeArray'];
    $scope.priorityArray = results['mainData']['priorityArray'];
    $scope.reminderTypeArray = results['mainData']['reminderTypeArray'];

    // search appointment type by id
    $scope.appointmentType = $scope.appointmentTypeArray.filter(function ( obj ) {
      return obj.appointmentTypeId === $scope.entity.appointmentTypeId;
    })[0];
    console.log('appointment type: ',$scope.appointmentType);

    // search priority by id
    if ($scope.entity.priorityId != '') {
      $scope.priority = $scope.priorityArray.filter(function ( obj ) {
        return obj.priorityId === $scope.entity.priorityId;
      })[0];  
      console.log('priority type: ',$scope.priority);
    }
    // search reminder by id
    if ($scope.entity.reminderType != '') {
      $scope.reminder = $scope.reminderTypeArray.filter(function ( obj ) {
        return obj.value === $scope.entity.reminderType;
      })[0];  
      console.log('reminder type: ',$scope.reminder);
      $scope.timebefore = $scope.entity.reminderType == '1' ? $scope.entity.timeBefore_1 : $scope.entity.timeBefore_2;
      console.log('reminder time before: ',$scope.timebefore);
    }

    $scope.tareas = results;
    $scope.prioridades = (results['mainData'])['priorityArray'];
    $scope.prid = parseInt((results['mainData'])['entity']['priorityId']);
    $scope.appoid = parseInt((results['mainData'])['entity']['appointmentTypeId']);
    $scope.mainData = results['mainData'];

    console.log("==CONTROLLER SCHEDULE== results detail:",results['mainData']);

  })

    $scope.callToEditAppointment = function(){
      // SEND OBJECT APPOINTMET TO EDIT
      bridgeServiceAppointment.saveAppointment($scope.mainData);
      $state.go('app.schedulerEdit');
    }
})
// 
// CONTROLLER SCHEDULE NEW APPOINTMENT
// 
.controller('NewAppointmentController',function(factoryAccessRight,$filter,getFormatDate,$state,NEW_APPOINTMENT_FORWARD,$scope,PopupFactory,apiUrlLocal,$http){
  console.log('*******************************************************');
  console.log("==CONTROLLER SCHEDULE NEW APPOINTMENT==");

  // recurrent appointment
  $scope.groupDaily = {name: 'groupDaily'};
  $scope.groupWeek = {name: 'groupWeek'};
  $scope.groupMonth = {name: 'groupMonth'};
  $scope.groupYear = {name: 'groupYear'};
  $scope.shownGroup = null;

  // entity data
  $scope.entity = {isAllDay: false, reminder: false, isPrivate: false};
  // $scope.isAllDayValue

  // reminter list type 
  $scope.reminderList = [{name: '5 min before',type: 1,value: 5},{name: '15 min before',type: 1,value: 15},
        {name: '30 min before',type: 1,value: 30},{name: '45 min before',type: 1,value: 45},
        {name: '1 hour before',type: 2,value: 1},{name: '2 hour before',type: 2,value: 2},
        {name: '3 hour before',type: 2,value: 3},{name: '12 hour before',type: 12},
        {name: '1 day before',type: 3,value: 1},{name: '2 day before',type: 3,value: 2},];
  $scope.typeReminder = $scope.reminderList[0];

  // display the current day // start and end
  var date = new Date();
  date.setMilliseconds(0);
  date.setSeconds(0);
  date.setMinutes(0); 
  $scope.dateStart = { value: date };
  var dateToday = new Date();
  var datePlus = new Date(dateToday.setHours(dateToday.getHours()+1));
  datePlus.setMilliseconds(0);
  datePlus.setSeconds(0);
  datePlus.setMinutes(0);
  $scope.dateEnd = { value: datePlus };

  // Simple POST request
  var request = $http({
    method: "get",        
    url: apiUrlLocal+NEW_APPOINTMENT_FORWARD //newPersonGetJsonInfo,      
  });
  // request success or error
  request.success(
    function(data, status, headers, config) {    

      // call factory to validate the response
      PopupFactory.getPopup($scope,data);

      console.log("results of request: ",data);
      
      // list of type of appointments
      var appointmentTypeArray = data.mainData.appointmentTypeArray;  
      $scope.appointmentTypes = [];
        appointmentTypeArray.forEach(function(appointmentType) {           
          $scope.appointmentTypes.push({
            name: appointmentType.name,
            value:appointmentType.appointmentTypeId
          });       
      });  
      $scope.typeAppointment = $scope.appointmentTypes[0];
    
    }).error(
    function(data, status, headers, config) {    
      console.log("problems with http request: get info new appointment",data);
    });

  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return ($scope.shownGroup === group);
  };

  $scope.updateTypeAppointment = function (nTypeAppointment)
  {
    $scope.typeAppointment = nTypeAppointment;
  };

  $scope.updateReminder = function(nTypeReminder){
    $scope.typeReminder = nTypeReminder;
  };
  
  $scope.saveAppointment = function(){
    console.log('*******************************************************');
    console.log("==CONTROLLER SCHEDULE NEW APPOINTMENT==save appointment");
    console.log('save appointment entity: ',$scope.entity);
    console.log('save appointment type appointment',$scope.typeAppointment);
    console.log('save appointment date start',$scope.dateStart);
    console.log('save appointment date end',$scope.dateEnd);
    console.log('save appointment type reminder',$scope.typeReminder);
    
    var fd = new FormData();
    fd.append('dto(op)', 'create');
    fd.append('dto(save)', 'save');
    fd.append('dto(title)', $scope.entity.title);
    fd.append('dto(appointmentTypeId)', $scope.typeAppointment.value);

    if ($scope.entity.isAllDay) {
      console.log('ppointment all day true');
      fd.append('dto(isAllDay)', $scope.entity.isAllDay);  
    }
    if ($scope.entity.isPrivate) {
      console.log('appointment private true');
      fd.append('dto(isPrivate)', $scope.entity.isPrivate);
    }
    if ($scope.entity.reminder) {
      console.log('appointment reminder true');

      fd.append('dto(reminder)', $scope.entity.reminder);
      fd.append('dto(reminderType)',$scope.typeReminder.type);
      fd.append('dto(timeBefore_1)',$scope.typeReminder.value);
      fd.append('dto(timeBefore_2)',$scope.typeReminder.value);
      
    }
    
    var datePattern = $filter('translate')('datePattern');
    fd.append('dto(startDate)', getFormatDate.getStringDate($scope.dateStart.value,datePattern));
    fd.append('dto(startHour)',getFormatDate.getStringHour($scope.dateStart.value));
    fd.append('dto(startMin)', getFormatDate.getStringMinute($scope.dateStart.value));
    fd.append('dto(endDate)', getFormatDate.getStringDate($scope.dateEnd.value,datePattern));
    fd.append('dto(endHour)', getFormatDate.getStringHour($scope.dateEnd.value));
    fd.append('dto(endMin)', getFormatDate.getStringMinute($scope.dateEnd.value));

    fd.append('dto(location)',$scope.entity.location);
    fd.append('dto(descriptionText)',$scope.entity.descriptionText);
               
    $.ajax({
      url: apiUrlLocal+"/bmapp/Appointment/Create.do",
      data: fd,
      processData: false,
      contentType: false,
      type: 'POST',
      success: function(data){

        var result = JSON.parse(data);
        if(result.forward == "Success")
        {
          console.log("Appointment create succesfull");
          $state.go('app.schedulerView');
        }
        else
        {        
          PopupFactory.getPopup($scope,result);
        }             
      }
    });

  };

  $scope.addPerson = function(){
    console.log('-----add person');
    $state.go('app.addParticipantsToAnAppointment');
  };

})

// 
// CONTROLLER SCHEDULE VIEW CALENDAR
// 
.controller('ControlSchedule',function(factoryAccessRight,PopupFactory,getAppointments,$http,apiUrlLocal,pathSchedule,$ionicScrollDelegate,$state,$window,COLOR_VIEW,COLOR_2,$scope,Load_variable_date,schedule_calculate_Next_Ant,$q,scheduleService,$localstorage,SCHEDULE_TYPE_MONTH,SCHEDULE_TYPE_WEEK,SCHEDULE_TYPE_DAY,SCHEDULE_TYPE_MONTH_STRING,SCHEDULE_TYPE_WEEK_STRING,SCHEDULE_TYPE_DAY_STRING){
  console.log('*******************************************************');
  console.log("==CONTROLLER SCHEDULE VIEW CALENDAR==");

  // COLOR DEFAULT
  $scope.colorFont = COLOR_VIEW;
  $('button').css({"color":COLOR_2});
  $('view-title').css({"color":COLOR_2});

  $scope.calendar;
  $scope.newAppointmentPermission = factoryAccessRight.getAccessRight('APPOINTMENT','CREATE');

  // GET USER INFO FOR LANGUAGE CALENDAR
  var userInfo = $localstorage.getObject('userInfo');
  $scope.languageCalendar = "";
  switch(userInfo.locale) {
    case 'es':
        $scope.languageCalendar = 'es-ES';
        break;
    case 'de':
        $scope.languageCalendar = 'de-DE';
        break;
    case 'fr':
        $scope.languageCalendar = 'fr-FR';
        break;    
  };
  
  //  LOAD OBJECT IN LOCAL STORAGE
  Load_variable_date.setData();

  //  GET OBJECT OF LOCAL STORAGE
  var _data_date = $localstorage.getObject('dataDate');

  var date = new Date();

  var yyyy = date.getFullYear().toString();
  var ww = (date.getWeek()).toString().length == 1 ? "0"+(date.getWeek()).toString() : (date.getWeek()).toString();       
  var mm = (date.getMonth()+1).toString().length == 1 ? "0"+(date.getMonth()+1).toString() : (date.getMonth()+1).toString();
  var dd = (date.getDate()).toString().length == 1 ? "0"+(date.getDate()).toString() : (date.getDate()).toString();

  //  HELP TO SEE DATE IN VIEW
  $scope.real_date_view = yyyy+"-"+mm+"-"+dd;

  var options = {
    events_source: function () {       
        return [];
    }, 
    tmpl_path: 'lib/bootstrap-calendar/tmpls/',
    view: 'month',
    language: $scope.languageCalendar,
    tmpl_cache: false,
    day: yyyy+"-"+mm+"-"+dd,
    time_split: '60',
    width: '100%',   

    onClickADate: function(event) {
      console.log('*******************************************************');
    	var aux = this.innerHTML;
      var pos = aux.indexOf("data-cal-date=");
      var res = aux.substring(pos+15, pos+25);     
		  setTimeout(function(){
		    console.log('1. first name being reset');
			  $scope.$apply(function(){
				  $scope.real_date_view = res;
				})
		  }, 0);
    },
    onAfterViewLoad: function(view)
    {
      console.log('*******************************************************');     
      console.log('2. on after view load');     
      if ($scope.calendar != undefined) {
        console.log("3. see calendar: ",$scope.calendar);

        var yyyy = $scope.calendar.options.position.start.getFullYear();
        var mmm = ($scope.calendar.options.position.start.getMonth()+1);
        var ddd = ($scope.calendar.options.position.start.getDate());  
        var www = ($scope.calendar.options.position.start.getWeek());

        var mm = (mmm).toString().length == 1 ? "0"+(mmm).toString() : (mmm).toString();
        var dd = (ddd).toString().length == 1 ? "0"+(ddd).toString() : (ddd).toString();
        var ww = (www).toString().length == 1 ? "0"+(www).toString() : (www).toString();

        // load date in calendar view
        var realDate = $scope.calendar.options.day;
        $scope.real_date_view = realDate;

        Load_variable_date.newValue(yyyy,mm,ww,dd,$scope.calendar.options.view);

        var _data_date = $localstorage.getObject('dataDate');
      };
      
      $scope.appointments =[];
      var _data_date = $localstorage.getObject('dataDate');
      
      // EXECUTE QUERY WITH (type, calendar)
      $scope.newAppointments = scheduleService.query({type: _data_date.type,calendar: _data_date.data});

      // PROMISE
      $scope.newAppointments.$promise.then(function (results){

        // call factory to validate the response
        PopupFactory.getPopup($scope,results);

        console.log("4. results of request: ");

        $scope.listAppointments = (results['mainData'])['appointmentsList'];
    
        //parse to variables
        $scope.appointments = [];
        angular.forEach($scope.listAppointments, function (appointment) {

          // APPOINTMENT RECURRENT GET ID WITHOUT "-"
          var str = appointment.virtualAppointmentId;
          var pos = str.indexOf("-"); 
          var idAppointment = appointment.virtualAppointmentId;
          if (pos > -1) {
            idAppointment = str.substring(0, pos);   
            console.log("5. new id appointment without '-' IN RECURRENT", idAppointment);
          };
          
          // load appointment and push in list
          var change = {id: appointment.virtualAppointmentId, title: appointment.title, start: appointment.startMillis, end: appointment.endMillis ,body: appointment.location,url:'#app/schedulerDetail'+'?appointmentId=' +idAppointment};
          $scope.appointments.push(change);
      
        });

        console.log("6. final list of appointments: ",$scope.appointments);

        $scope.calendar.options.events = $scope.appointments;
        $scope.calendar._render();

        // get month string to show in view
        var realDate = $scope.calendar.options.day;
        var res = realDate.substring(5, 7); 
        var resInt = parseInt(res);

        var monthString = $scope.calendar.locale['m'+(resInt-1)];
        $scope.realMonth = monthString;
        
    });//END PROMISE
    
    },
    onAfterEventsLoad: function(events)
    {
      if(!events)
      {
        return;
      }
      var list = $('#eventlist');
      list.html('');
      $.each(events, function(key, val)
      {
        $(document.createElement('li'))
        .html('<a href="' + val.url + '">' + val.title + '</a>')
        .appendTo(list);
      });
    },
  };

 

  //LOAD OPTIONS TO CALENDAR
  $scope.calendar = $('#calendar').calendar(options);    

  // FUNCTION NEXT FOR DAY WEEK AND MONTH  
  $scope.scheduleLoadAppointments = function(){
     return [];
  };   

  // FUNCTION NEXT FOR DAY WEEK AND MONTH  
  $scope.scheduleNext  = function(){
    $scope.calendar.navigate('next');
  };

  $scope.schedulePrev  = function(){
    $scope.calendar.navigate('prev');
  };

  $scope.scheduleToday  = function(){
    $scope.calendar.navigate('today');
  };

  $scope.dataScheduleMonth = function(){
    var _data_date = $localstorage.getObject('dataDate');
    _data_date.type = SCHEDULE_TYPE_MONTH;
    $localstorage.setObject('dataDate',_data_date);    
    $scope.calendar.view('month');
  };

  $scope.dataScheduleDay = function()    {
    var _data_date = $localstorage.getObject('dataDate');
    _data_date.type = SCHEDULE_TYPE_DAY;
    $localstorage.setObject('dataDate',_data_date);    

    $scope.calendar.view('day');
  };

  $scope.dataScheduleWekk = function(){
    var _data_date = $localstorage.getObject('dataDate');
    _data_date.type = SCHEDULE_TYPE_WEEK;
    $localstorage.setObject('dataDate',_data_date);    
    
    $scope.calendar.view('week');
  };

  $scope.doRefresh = function() {
    console.log('*******************************************************');
    console.log('7. refresh calendar');

    // GET OBJECT OF LOCAL STORAGE
    var _data_date = $localstorage.getObject('dataDate');

    // EXECUTE QUERY WITH (type, calendar)
    $scope.newAppointments = scheduleService.query({type: _data_date.type,calendar: _data_date.data});

      // PROMISE 
    $scope.newAppointments.$promise.then(function (results){
      // call factory to validate the response
      PopupFactory.getPopup($scope,results);

      console.log("8. results of request: ",results);
        
      $scope.listAppointments = (results['mainData'])['appointmentsList'];

      //parse to variables
      $scope.appointments = [];
      angular.forEach($scope.listAppointments, function (appointment) {

        // APPOINTMENT RECURRENT GET ID WITHOUT "-"
        var str = appointment.virtualAppointmentId;
        var pos = str.indexOf("-"); 
        var idAppointment = appointment.virtualAppointmentId;
        if (pos > -1) {
          idAppointment = str.substring(0, pos);   
          console.log("9. new id appointment without '-' IN RECURRENT", idAppointment);
        };
        
        var change = {id: appointment.virtualAppointmentId, title: appointment.title, start: appointment.startMillis, end: appointment.endMillis ,body: appointment.location,url:'#app/schedulerDetail'+'?appointmentId=' +idAppointment};
        $scope.appointments.push(change);
      });

      console.log("10. final list of appointments: ",$scope.appointments);

      $scope.$broadcast('scroll.refreshComplete');  

      //LOAD OPTIONS TO CALENDAR
      $scope.calendar.options.events = $scope.appointments;
      $scope.calendar._render();          
    });//END PROMISE

  };

  $scope.newevent = function(){
    console.log('new event');
    $state.go('app.newAppointment');
  };

});
