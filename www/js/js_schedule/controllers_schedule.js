angular.module('starter.schedulecontrollers', ['starter.scheduleservices'])

// 
// CONTROLLER SCHEDULE EDIT
//
.controller('ControllerScheduleEdit', function(UPDATE_APPOINTMENT_URL,$state,PopupFactory,apiUrlLocal,getFormatDate,$filter,$scope,bridgeServiceAppointment){
  
  console.log('*******************************************************');
  console.log("==CONTROLLER SCHEDULE== edit appointment");

  // GET OBJECT APPOINTMET TO EDIT
  $scope.viewTitle = $filter('translate')('EditAppointment');
  var mainData = bridgeServiceAppointment.getAppointment();
  console.log("recover mainData: ",mainData);

  $scope.entity = mainData.entity;

  // prepare info to view
  // display the current day // start and end
  var dateStart = new Date(parseInt($scope.entity.startDateTime,10));
  var dateEnd = new Date(parseInt($scope.entity.endDateTime,10));
  $scope.dateStart = { value: dateStart };
  $scope.dateEnd = { value: dateEnd };
  $scope.entity.isAllDay  = $scope.entity.isAllDay == 'true' ? true : false;
  $scope.entity.reminder  = $scope.entity.reminder == 'true' ? true : false;
  $scope.entity.isPrivate = $scope.entity.isPrivate == 'true' ? true : false;
  $scope.entity.isRecurrence = $scope.entity.isRecurrence == 'true' ? true : false;

  var aTypesArray = mainData.appointmentTypeArray;
  $scope.appointmentTypes = [];  
  aTypesArray.forEach(function(aType) {           
      $scope.appointmentTypes.push({
        name: aType.name,
        value: aType.appointmentTypeId
      });       
      if($scope.entity.appointmentTypeId == aType.appointmentTypeId) {             
         $scope.typeAppointment = $scope.appointmentTypes[$scope.appointmentTypes.length-1];  
      } 
  });

  var aHoursArray = mainData.hoursArray;
  $scope.hoursArray = [];    
  aHoursArray.forEach(function(aHour) {           
      $scope.hoursArray.push({
        name: aHour.label,
        value: aHour.value
      });       
      if($scope.entity.startHour == aHour.value) {             
         $scope.startHourType = $scope.hoursArray[$scope.hoursArray.length-1];  
      }
      if($scope.entity.endHour == aHour.value) {             
         $scope.endHourType = $scope.hoursArray[$scope.hoursArray.length-1];  
      }
  });
  
  var aMinutesArray = mainData.minutesArray;
  $scope.minutesArrayStart = [];
  $scope.minutesArrayEnd = [];
  aMinutesArray.forEach(function(aMinute) {           
      $scope.minutesArrayStart.push({
        name: aMinute.label,
        value: aMinute.value
      });
      $scope.minutesArrayEnd.push({
        name: aMinute.label,
        value: aMinute.value
      });
      if($scope.entity.startMin == aMinute.value) {             
         $scope.startMinuteType = $scope.minutesArrayStart[$scope.minutesArrayStart.length-1];  
      }
      if($scope.entity.endMin == aMinute.value) {             
         $scope.endMinuteType = $scope.minutesArrayEnd[$scope.minutesArrayEnd.length-1];  
      }
  });

  // var prioritiesArray = mainData.priorityArray;
  // $scope.priorities = [];    
  // prioritiesArray.forEach(function(priority) {           
  //     $scope.priorities.push({
  //       name: priority.name,
  //       value:priority.priorityId
  //     });       
  //     if($scope.entity.priorityId == priority.priorityId) {             
  //        $scope.priority = $scope.priorities[$scope.priorities.length-1];  
  //     } 
  // });

  var textMinute = $filter('translate')('minutesBefore');
  var textHour = $filter('translate')('hourBefore');
  var textDay = $filter('translate')('dayBefore');  
  $scope.reminderList = [{name: '5 '+textMinute,type: '1',value: '5'},{name: '15 '+textMinute,type: '1',value: '15'},
        {name: '30 '+textMinute,type: '1',value: '30'},{name: '45 '+textMinute,type: '1',value: '45'},
        {name: '1 '+textHour,type: '2',value: '1'},{name: '2 '+textHour,type: '2',value: '2'},
        {name: '3 '+textHour,type: '2',value: '3'},{name: '12 '+textHour,type: '2',value: '12'},
        {name: '1 '+textDay,type: '3',value: '1'},{name: '2 '+textDay,type: '3',value: '2'},];
  $scope.typeReminder = $scope.reminderList[0];

  // search type of rimender type by id
  if ($scope.entity.reminder == true) {
    $scope.typeReminder = $scope.reminderList.filter(function ( obj ) {
      if (obj.type === $scope.entity.reminderType) {
        if (obj.type == '1') {
          if (parseInt(obj.value) == parseInt($scope.entity.timeBefore_1) ) {
            return obj;
          }
        }
        else{
          if (parseInt(obj.value) == parseInt($scope.entity.timeBefore_2) ) {
            return obj;
          }
        }
      }
    })[0];  

    // add new value if not exist
    if ($scope.typeReminder == undefined) {
      var newType = $scope.entity.reminderType;
      var newTimeBefore1 = $scope.entity.timeBefore_1;
      var newTimeBefore2 = $scope.entity.timeBefore_2;

      if (newType == '1') {
        var text = newTimeBefore1+' '+'minutos';
        $scope.typeReminder = {name: text,type: newType, value: newTimeBefore1};
        $scope.reminderList.unshift($scope.typeReminder);  
      }
      else{
        if (newType == '2') {
          var text = newTimeBefore2+' '+'hour';
          $scope.typeReminder = {name: text,type: newType, value: newTimeBefore1};
          $scope.reminderList.unshift($scope.typeReminder);     
        }
        else{
          var text = newTimeBefore2+' '+'day';
          $scope.typeReminder = {name: text,type: newType, value: newTimeBefore2};
          $scope.reminderList.unshift($scope.typeReminder);    
        }
      }
    }
  }
  
  console.log('reminder type: ',$scope.typeReminder);
 
  // help function to update reminder
  $scope.updateReminder = function(nTypeReminder){
    $scope.typeReminder = nTypeReminder;
  };

  // update date end with date start
  $scope.changeValue = function(dateStart){
    $scope.dateEnd = { value:  dateStart};
  }

  $scope.maxLenght = function(text){
    $scope.entity.location = text.length > 30 ? text.substring(0,30) : text;
  }

  // help function to update hour
  $scope.updateStartHour = function(nHourType){
    $scope.startHourType = nHourType;
    
    $scope.endHourType = $scope.hoursArray[$scope.hoursArray.length-1];
    $scope.hoursArray = $scope.hoursArray;
    for (i = 0; i < $scope.hoursArray.length-1; i++) {
      if(nHourType.value == $scope.hoursArray[i].value) {
        $scope.endHourType = $scope.hoursArray[i+1];
      }
    }  

    var val = nHourType.name;
    var sel = document.getElementById('endHour');
    var opts = sel.options;
    sel.selectedIndex = opts.length-1;
    
    for(j=0 ; j < opts.length-1 ; j++){
      if(opts[j].label == val) {
          sel.selectedIndex = j+1;
          break;
      }
    }

  }

  // help function to update hour
  $scope.updateEndHour = function(nHourType){
    $scope.endHourType = nHourType;
  };

  // help function to update minutes
  $scope.updateStartMinute = function(nStartMinute){
    $scope.startMinuteType = nStartMinute;

    for (i = 0; i < $scope.minutesArrayEnd.length; i++) {
      if(nStartMinute.value == $scope.minutesArrayEnd[i].value) {
        $scope.endMinuteType = $scope.minutesArrayEnd[i];
        break;
      }
    }
    var val = nStartMinute.name;
    var sel = document.getElementById('endMinute');
    var opts = sel.options;
    for(var opt, j = 0; opt = opts[j]; j++) {
        if(opt.label == val) {
            sel.selectedIndex = j;
            break;
        }
    }
  }

  // help function to update minutes
  $scope.updateEndMinute = function(nMinuteType){
    $scope.endMinuteType = nMinuteType;
  };

  // help function to update type
  $scope.updateTypeAppointment = function (nTypeAppointment)
  {
    $scope.typeAppointment = nTypeAppointment;
  }
  // help function to update appointment
  $scope.saveAppointment = function(){
    console.log('*******************************************************');
    console.log("==CONTROLLER SCHEDULE UPDATE APPOINTMENT== update appointment");
    console.log('update appointment entity: ',$scope.entity);
    console.log('update appointment type appointment',$scope.typeAppointment);
    console.log('update appointment date start',$scope.dateStart);
    console.log('update appointment date end',$scope.dateEnd);
    console.log('update appointment type reminder',$scope.typeReminder);
    
    var fd = new FormData();
    fd.append('dto(op)', 'update');
    fd.append('dto(save)', 'save');
    fd.append('dto(appointmentId)',$scope.entity.appointmentId);
    fd.append('dto(version)',$scope.entity.version);
    fd.append('dto(appointmentTypeId)', $scope.typeAppointment.value);
    fd.append('dto(reminder)', $scope.entity.reminder);

    if ($scope.entity.title != undefined) {
      fd.append('dto(title)', $scope.entity.title);
    }
    else{
     fd.append('dto(title)', ""); 
    }

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

      fd.append('dto(reminderType)',$scope.typeReminder.type);
      fd.append('dto(timeBefore_1)',$scope.typeReminder.value);
      fd.append('dto(timeBefore_2)',$scope.typeReminder.value);
    }

    if ($scope.entity.isRecurrence) {
     fd.append('dto(isRecurrence)',$scope.entity.isRecurrence); 
    }
    
    var datePattern = $filter('translate')('datePattern');
    var stringDateStart = "";
    var stringDateEnd = "";
    if ($scope.dateStart.value != null) {
      stringDateStart = getFormatDate.getStringDate($scope.dateStart.value,datePattern);
    }
    if ($scope.dateEnd.value != null) {
      stringDateEnd = getFormatDate.getStringDate($scope.dateEnd.value,datePattern);
    }
    fd.append('dto(startDate)', stringDateStart);
    fd.append('dto(startHour)',$scope.startHourType.value);
    fd.append('dto(startMin)', $scope.startMinuteType.value);
    fd.append('dto(endDate)', stringDateEnd);
    fd.append('dto(endHour)', $scope.endHourType.value);
    fd.append('dto(endMin)', $scope.endMinuteType.value);
    
    fd.append('dto(location)',$scope.entity.location);
    fd.append('dto(descriptionText)',$scope.entity.descriptionText);
               
    $.ajax({
      url: apiUrlLocal+UPDATE_APPOINTMENT_URL,
      data: fd,
      processData: false,
      contentType: false,
      type: 'POST',
      success: function(data){

        var result = JSON.parse(data);
        if(result.forward == "Success"){
          console.log("Appointment update succesfull");
          $state.go('app.schedulerView');
        }
        else{        
          // call factory to validate the response
          PopupFactory.getPopup($scope,result);
        }             
      }
    });
  }
})

// 
// CONTROLLER SCHEDULE DETAIL
//
.controller('ControlScheduleDetail', function($localstorage,bridgeServiceAppointment,$state,PopupFactory,$scope, $stateParams,scheduleService,pathSchedule,$ionicActionSheet) {
  console.log('*******************************************************');
  console.log("==CONTROLLER SCHEDULE== view detail");
  console.log("param id appointment: ", $stateParams.appointmentId);

  $scope.accessRight = $localstorage.getObject('accessRight');
  $scope.updatePermission = $scope.accessRight.APPOINTMENT.UPDATE;
  console.log('Access right appointment update',$scope.accessRight);

  // EXECUTE QUERY WITH (appointment id)
  $scope.taskcall = scheduleService.query({'dto(appointmentId)':$stateParams.appointmentId,'dto(title)':'meeting'});

  // PROMISE
  $scope.taskcall.$promise.then(function (results){

    // call factory to validate the response
    PopupFactory.getPopup($scope,results);
    console.log("results of request: ",results);

    // prepare info to view
    $scope.mainData = results['mainData'];
    $scope.entity = results['mainData']['entity'];
    $scope.appointmentTypeArray = results['mainData']['appointmentTypeArray'];
    $scope.priorityArray = results['mainData']['priorityArray'];
    $scope.reminderTypeArray = results['mainData']['reminderTypeArray'];

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
      $scope.timebefore = $scope.entity.reminderType == '1' ? $scope.entity.timeBefore_1 : $scope.entity.timeBefore_2;
      console.log('reminder type: ',$scope.reminder);
      console.log('reminder time before: ',$scope.timebefore);
    }
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
.controller('NewAppointmentController',function($rootScope,bridgeServiceDate,CREATE_APPOINTMENT_URL,$filter,getFormatDate,$state,NEW_APPOINTMENT_FORWARD,$scope,PopupFactory,apiUrlLocal,$http){
  console.log('*******************************************************');
  console.log("==CONTROLLER SCHEDULE NEW APPOINTMENT==");

  // prepare info to view
  $scope.entity = {isAllDay: false, reminder: false, isPrivate:false, location:"",descriptionText:"",title:"",isRecurrence:false};
  $scope.viewTitle = $filter('translate')('NewAppointment');
  var dateBridge = bridgeServiceDate.getDate();
  console.log('date calendar to use in new appointment: ',dateBridge);
  
  // reminter list type
  var textMinute = $filter('translate')('minutesBefore');
  var textHour = $filter('translate')('hourBefore');
  var textDay = $filter('translate')('dayBefore');  
  $scope.reminderList = [{name: '5 '+textMinute,type: '1',value: '5'},{name: '15 '+textMinute,type: '1',value: '15'},
        {name: '30 '+textMinute,type: '1',value: '30'},{name: '45 '+textMinute,type: '1',value: '45'},
        {name: '1 '+textHour,type: '2',value: '1'},{name: '2 '+textHour,type: '2',value: '2'},
        {name: '3 '+textHour,type: '2',value: '3'},{name: '12 '+textHour,type: '2',value: '12'},
        {name: '1 '+textDay,type: '3',value: '1'},{name: '2 '+textDay,type: '3',value: '2'},];

  $scope.typeReminder = $scope.reminderList[0];

  // display the current day // start and end
  var date = dateBridge; 
  date.setMilliseconds(0);
  date.setSeconds(0);
  date.setMinutes(0); 
  $scope.dateStart = { value: date };
  var dateToday = dateBridge;
  var datePlus = new Date(dateToday.setHours(dateToday.getHours()+1));
  datePlus.setMilliseconds(0);
  datePlus.setSeconds(0);
  datePlus.setMinutes(0);
  $scope.dateEnd = { value: datePlus };
  console.log('date start: ',$scope.dateStart);
  console.log('date end: ',$scope.dateEnd);

  // var datePattern = $filter('translate')('datePattern');
  // console.log("++++++++++++++datePattern",datePattern);
  // $scope.dateStart = $filter("date")($scope.dateStart, datePattern);

  $scope.endHourType = {};
  $scope.startHourType = {};

  // Simple POST request
  var request = $http({
    method: "get",        
    url: apiUrlLocal+NEW_APPOINTMENT_FORWARD 
  });
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

      var aHoursArray = data.mainData.hoursArray;
      $scope.hoursArray = [];    
      aHoursArray.forEach(function(aHour) {           
          $scope.hoursArray.push({
            name: aHour.label,
            value: aHour.value
          });       
      });
      $scope.startHourType = $scope.hoursArray[0];
      $scope.endHourType = $scope.hoursArray[0];

      var aMinutesArray = data.mainData.minutesArray;
      $scope.minutesArrayStart = [];    
      $scope.minutesArrayEnd = [];    
      aMinutesArray.forEach(function(aMinute) {           
          $scope.minutesArrayStart.push({
            name: aMinute.label,
            value: aMinute.value
          });       
          $scope.minutesArrayEnd.push({
            name: aMinute.label,
            value: aMinute.value
          });
      });
      $scope.startMinuteType = $scope.minutesArrayStart[0];
      $scope.endMinuteType = $scope.minutesArrayEnd[0];

  //     var datePattern = $filter('translate')('datePattern');
  // stringDateStart = getFormatDate.getStringDate($scope.dateStart.value,datePattern);
  // stringDateEnd = getFormatDate.getStringDate($scope.dateEnd.value,datePattern);
  
  // console.log('---===',stringDateStart);
  // console.log('---===',stringDateEnd);
  // document.getElementById("dateStartValue").value = stringDateStart;
  // document.getElementById("dateEndValue").value = stringDateEnd;
   // $scope.date = $filter("date")(Date.now(), 'yyyy.MM.dd');

    }).error(
    function(data, status, headers, config) {    
      console.log("problems with http request: get info new appointment",data);
    }
  );

  $scope.updateTypeAppointment = function (nTypeAppointment){
    $scope.typeAppointment = nTypeAppointment;
  }

  $scope.updateReminder = function(nTypeReminder){
    $scope.typeReminder = nTypeReminder;
  }

  // update date end with date start
  $scope.changeValue = function(dateStart){
    $scope.dateEnd = { value:  dateStart};

  //   var datePattern = $filter('translate')('datePattern');
  //   stringDateStart = getFormatDate.getStringDate($scope.dateStart.value,datePattern);
  //   stringDateEnd = getFormatDate.getStringDate($scope.dateEnd.value,datePattern);
  
  // console.log('---===',stringDateStart);
  // console.log('---===',stringDateEnd);
  // document.getElementById("dateStartValue").value = stringDateStart;
  // document.getElementById("dateEndValue").value = stringDateEnd;

  }

  // help function to update hour
  $scope.updateStartHour = function(nHourType){
    $scope.startHourType = nHourType;
    
    $scope.endHourType = $scope.hoursArray[$scope.hoursArray.length-1];
    $scope.hoursArray = $scope.hoursArray;
    for (i = 0; i < $scope.hoursArray.length-1; i++) {
      if(nHourType.value == $scope.hoursArray[i].value) {
        $scope.endHourType = $scope.hoursArray[i+1];
      }
    }  

    var val = nHourType.name;
    var sel = document.getElementById('endHour');
    var opts = sel.options;
    sel.selectedIndex = opts.length-1;
    
    for(j=0 ; j < opts.length-1 ; j++){
      if(opts[j].label == val) {
          sel.selectedIndex = j+1;
          break;
      }
    }

  }

  // help function to update hour
  $scope.updateEndHour = function(nHourType){
    $scope.endHourType = nHourType;
  }

  // help function to update minutes
  $scope.updateStartMinute = function(nStartMinute){
    $scope.startMinuteType = nStartMinute;

    for (i = 0; i < $scope.minutesArrayEnd.length; i++) {
      if(nStartMinute.value == $scope.minutesArrayEnd[i].value) {
        $scope.endMinuteType = $scope.minutesArrayEnd[i];
        break;
      }
    }
    var val = nStartMinute.name;
    var sel = document.getElementById('endMinute');
    var opts = sel.options;
    for(var opt, j = 0; opt = opts[j]; j++) {
        if(opt.label == val) {
            sel.selectedIndex = j;
            break;
        }
    }
  }

  // help function to update minutes
  $scope.updateEndMinute = function(nEndMinute){
    $scope.endMinuteType = nEndMinute;
  }

  $scope.maxLenght = function(text){
    $scope.entity.location = text.length > 30 ? text.substring(0,30) : text;
  }
  
  $scope.saveAppointment = function(){
    console.log('*******************************************************');
    console.log("==CONTROLLER SCHEDULE NEW APPOINTMENT==save appointment");
    console.log('save appointment entity: ',$scope.entity);
    console.log('save appointment type appointment',$scope.typeAppointment);
    console.log('save appointment date start',$scope.dateStart);
    console.log('save appointment date end',$scope.dateEnd);
    console.log('save appointment type reminder',$scope.entity.reminder);
    console.log('save appointment start hour: ',$scope.startHourType);
    console.log('save appointment start minutes: ',$scope.startMinuteType);
    console.log('save appointment end hour: ', $scope.endHourType);
    console.log('save appointment end minutes: ', $scope.endMinuteType);
    console.log('');

    // load into usint Form Data
    var fd = new FormData();
    fd.append('dto(op)', 'create');
    fd.append('dto(save)', 'save');
    fd.append('dto(title)', $scope.entity.title);
    fd.append('dto(appointmentTypeId)', $scope.typeAppointment.value);
    fd.append('dto(descriptionText)',$scope.entity.descriptionText);
    fd.append('dto(location)', $scope.entity.location);

    var datePattern = $filter('translate')('datePattern');
    var stringDateStart = "";
    var stringDateEnd = "";
    if ($scope.dateStart.value != null) {
      stringDateStart = getFormatDate.getStringDate($scope.dateStart.value,datePattern);
    }
    if ($scope.dateEnd.value != null) {
      stringDateEnd = getFormatDate.getStringDate($scope.dateEnd.value,datePattern);
    }
    fd.append('dto(startDate)', stringDateStart);
    fd.append('dto(startHour)',$scope.startHourType.value);
    fd.append('dto(startMin)', $scope.startMinuteType.value);
    fd.append('dto(endDate)', stringDateEnd);
    fd.append('dto(endHour)', $scope.endHourType.value);
    fd.append('dto(endMin)', $scope.endMinuteType.value);
    
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
      
    // ajax query post to create new appointment           
    $.ajax({
      url: apiUrlLocal+CREATE_APPOINTMENT_URL,
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

  }
})

// 
// CONTROLLER SCHEDULE VIEW CALENDAR
// 
.controller('ControlSchedule',function(bridgeServiceDate,PopupFactory,getAppointments,$http,apiUrlLocal,pathSchedule,$ionicScrollDelegate,$state,$window,COLOR_VIEW,COLOR_2,$scope,Load_variable_date,schedule_calculate_Next_Ant,$q,scheduleService,$localstorage,SCHEDULE_TYPE_MONTH,SCHEDULE_TYPE_WEEK,SCHEDULE_TYPE_DAY,SCHEDULE_TYPE_MONTH_STRING,SCHEDULE_TYPE_WEEK_STRING,SCHEDULE_TYPE_DAY_STRING){
  console.log('*******************************************************');
  console.log("==CONTROLLER SCHEDULE VIEW CALENDAR==");

  // COLOR DEFAULT
  $scope.colorFont = COLOR_VIEW;
  $('button').css({"color":COLOR_2});
  $('view-title').css({"color":COLOR_2});

  $scope.calendar;
  $scope.accessRight = $localstorage.getObject('accessRight');
  $scope.newPermission = $scope.accessRight.APPOINTMENT.CREATE;
  console.log('Access right appointment create: ',$scope.newPermission);

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
    time_start: '01:00',
    time_end: '23:00',
    time_split: '60',
    width: '100%',   

    onClickADate: function(event) {
      console.log('*******************************************************');
    	var aux = this.innerHTML;
      var pos = aux.indexOf("data-cal-date=");
      var res = aux.substring(pos+15, pos+25);     
		  setTimeout(function(){
		    console.log('first name being reset');
			  $scope.$apply(function(){
				  $scope.real_date_view = res;
				})
		  }, 0);
    },
    onAfterViewLoad: function(view)
    {
      console.log('*******************************************************');     
      console.log('on after view load');     
      if ($scope.calendar != undefined) {
        console.log("see calendar: ",$scope.calendar);

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

        console.log("results of request: ");

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
            console.log("new id appointment without '-' IN RECURRENT", idAppointment);
          };
          
          // load appointment and push in list
          var change = {id: appointment.virtualAppointmentId, title: appointment.title, start: appointment.startMillis, end: appointment.endMillis ,body: appointment.location,url:'#app/schedulerDetail'+'?appointmentId=' +idAppointment};
          $scope.appointments.push(change);
      
        });

        console.log("final list of appointments: ",$scope.appointments);

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

  // FUNCTION NEXT/PREV FOR DAY WEEK AND MONTH  
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
    console.log('refresh calendar');

    // GET OBJECT OF LOCAL STORAGE
    var _data_date = $localstorage.getObject('dataDate');

    // EXECUTE QUERY WITH (type, calendar)
    $scope.newAppointments = scheduleService.query({type: _data_date.type,calendar: _data_date.data});

      // PROMISE 
    $scope.newAppointments.$promise.then(function (results){
      // call factory to validate the response
      PopupFactory.getPopup($scope,results);

      console.log("results of request: ",results);
        
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
          console.log("new id appointment without '-' IN RECURRENT", idAppointment);
        };
        
        var change = {id: appointment.virtualAppointmentId, title: appointment.title, start: appointment.startMillis, end: appointment.endMillis ,body: appointment.location,url:'#app/schedulerDetail'+'?appointmentId=' +idAppointment};
        $scope.appointments.push(change);
      });

      console.log("final list of appointments: ",$scope.appointments);

      $scope.$broadcast('scroll.refreshComplete');  

      //LOAD OPTIONS TO CALENDAR
      $scope.calendar.options.events = $scope.appointments;
      $scope.calendar._render();          
    });//END PROMISE

  };

  $scope.newevent = function(){
    // console.log('^^^^^^^^^^^^^^^^START^^^^^^^^^^^^^^^^');
    console.log('----------------START----------------');
    console.log('new event');

    var check = new Date();
    var from = $scope.calendar.options.position.start;
    var to = $scope.calendar.options.position.end;
    var result = from;
    if((check.getTime() <= to.getTime() && check.getTime() >= from.getTime())){
      console.log('date actual into range view');
      result = check;
    }
    bridgeServiceDate.saveDate(result);
    
    console.log('-------------END------------------');
    $state.go('app.newAppointment');
  };

});
