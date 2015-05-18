angular.module('starter.schedulecontrollers', ['starter.scheduleservices'])


.controller('ControlScheduleDetail', function($scope, $stateParams,scheduleService,pathSchedule,$ionicActionSheet) {
    $scope.pathSchedule = pathSchedule;

    

    console.log("==CONTROLLER SCHEDULE==", $stateParams.appointmentId);
    
    $scope.taskcall = scheduleService.query({'dto(appointmentId)':$stateParams.appointmentId});

    $scope.taskcall.$promise.then(function (results){


        $scope.tareas = results;
        $scope.prioridades = (results['mainData'])['priorityArray'];
        $scope.prid = parseInt((results['mainData'])['entity']['priorityId']);
        $scope.tipolist = (results['mainData'])['appointmentTypeArray'];
        $scope.appoid = parseInt((results['mainData'])['entity']['appointmentTypeId']);
          
        console.log("==CONTROLLER SCHEDULE== results detail:",results['mainData']);

    })
    
    $scope.conf = function(){
      $ionicActionSheet.show({
         buttons: [
         
         { text: 'Edit' }
          ],
          destructiveText: 'Delete ',
          cancelText: 'Cancel',
          destructiveButtonClicked: function(){
          }
      });
    };
    
})
// 
// CONTROLLER SCHEDULE
// 
.controller('ControlSchedule',function(getAppointments,$http,apiUrlLocal,pathSchedule,scheduleService22,ControlError,$ionicScrollDelegate,$state,$window,COLOR_VIEW,COLOR_2,$scope,Load_variable_date,schedule_calculate_Next_Ant,$q,scheduleService,$localstorage,SCHEDULE_TYPE_MONTH,SCHEDULE_TYPE_WEEK,SCHEDULE_TYPE_DAY,SCHEDULE_TYPE_MONTH_STRING,SCHEDULE_TYPE_WEEK_STRING,SCHEDULE_TYPE_DAY_STRING){
  
  // COLOR DEFAULT
  $scope.colorFont = COLOR_VIEW;

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
  } 
  
  // change text colour 
  $('button').css({"color":COLOR_2});
  $('view-title').css({"color":COLOR_2});
  
  //  LOAD OBJECT IN LOCAL STORAGE
  Load_variable_date.setData();

  //  GET OBJECT OF LOCAL STORAGE
  var _data_date = $localstorage.getObject('dataDate');

  //  HELP TO SEE DATE IN VIEW
  $scope.real_date_view = _data_date.yyyyc+"-"+_data_date.mmc+"-"+_data_date.ddc;

 
  // $scope.calendar;

  //INIT PROPERTIES FOR CALENDAR

  var getAppo = function(_data_date){
     $scope.appointments = [];
      var myAppointments = getAppointments.getData(_data_date);
        myAppointments.then(function(result) {  
           $scope.appointments = result;
           console.log("12111111",$scope.appointments);
           return $scope.appointments;
        });
    }; 

  $scope.oooo= getAppo(_data_date);

  var options = {
    events_source: function () { 
      
        // scheduleService22.getLogData().success(function(data){
        //   return data;
        // }).error(function(e){
        //   //show error message
        // });
        
        //return [];

       


        // $http({
        //   method: 'get',
        //   url: apiUrlLocal+""+pathSchedule,
        //   async: false,
        //   data: {
        //     type: _data_date.type,
        //     calendar: _data_date.data 
        //   }
        //   }).success(function(data, status, headers, config) {

        //     $scope.listAppointments = (data['mainData'])['appointmentsList'];

        //     angular.forEach($scope.listAppointments, function (appointment) {
       
        //     var str = appointment.virtualAppointmentId;
        //     var pos = str.indexOf("-"); 
        //     var idAppointment = appointment.virtualAppointmentId;
        //     if (pos > -1) {
        //       idAppointment = str.substring(0, pos);   
        //     };
        //     var change = {id: appointment.virtualAppointmentId, title: appointment.title, start: appointment.startMillis, end: appointment.endMillis ,body: appointment.location,url:'#app/schedulerDetail'+'?appointmentId=' +idAppointment};
        //     $scope.appointments.push(change);
            
        //   });

        //     console.log("1111" , $scope.appointments); 
        //     return $scope.appointments;
           
        //   }
        // ).error(function(data, status, headers, config) {
        
         
        // });

       
        // var myAppointments= getAppo(_data_date);

         console.log("22222222",$scope.oooo);
        return 
        
   
    }, //items,//$scope.appointments,
    tmpl_path: 'lib/bootstrap-calendar/tmpls/',
    view: 'month',
    language: $scope.languageCalendar,
    tmpl_cache: false,
    day: _data_date.yyyy+"-"+_data_date.mm+"-"+_data_date.dd,
    time_split: '60',
    width: '100%',
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
    onAfterViewLoad: function(view)
    {
      $('.page-header h3').text(this.Title);
      $('.btn-group button').removeClass('active');
      $('button[data-calendar-view="' + view + '"]').addClass('active');
    },
    classes: {
      months: {
        general: 'label'
      }
    }
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

    $scope.calendar.view('month');
  };

  $scope.dataScheduleDay = function()    {
    $scope.calendar.view('day');
  };

  $scope.dataScheduleWekk = function(){
    $scope.calendar.view('week');
  };

  $scope.doRefresh = function() {
      //GET OBJECT OF LOCAL STORAGE
      var _data_date = $localstorage.getObject('dataDate');

      //CALL SERVICES WITH (TYPE AND DATA)
      console.log("==CONTROLLER SCHEDULE== get query list doRefresh appointments");  
      $scope.newAppointments = scheduleService.query({type: _data_date.type,calendar: _data_date.data});

      //  PROMISE
      $scope.newAppointments.$promise.then(function (results){
        if (results.mainData == undefined) {
          $state.go('login');
        }
        console.log("==CONTROLLER SCHEDULE== get query list doRefresh appointmentssuccess OK",results['mainData']);
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
            };
            console.log("==CONTROLLER SCHEDULE== id appointment without '-'", idAppointment);

            var change = {id: appointment.virtualAppointmentId, title: appointment.title, start: appointment.startMillis, end: appointment.endMillis ,body: appointment.location,url:'#app/schedulerDetail'+'?appointmentId=' +idAppointment};
            $scope.appointments.push(change);
          });
          console.log("==CONTROLLER SCHEDULE== list appointments: ",$scope.appointments);

          $scope.$broadcast('scroll.refreshComplete');  

          //LOAD OPTIONS TO CALENDAR
          console.log("list semana",$scope.appointments);
          var calendar = $("#calendar").calendar(
          {
           view: _data_date.type_string,
           language: $scope.languageCalendar,
           time_split: '60',
           tmpl_path: 'lib/bootstrap-calendar/tmpls/',
           day: _data_date.yyyyc+"-"+_data_date.mmc+"-"+_data_date.ddc,
           events_source: $scope.appointments
         });
      });//END PROMISE
  };
});
