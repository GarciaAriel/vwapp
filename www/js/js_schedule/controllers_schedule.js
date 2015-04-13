angular.module('starter.schedulecontrollers', ['starter.scheduleservices'])

.controller('ControlSchedule',function($scope,Load_variable_date,$ionicLoading,schedule_calculate_Next_Ant,$q,scheduleService,$localstorage,SCHEDULE_TYPE_MONTH,SCHEDULE_TYPE_WEEK,SCHEDULE_TYPE_DAY,SCHEDULE_TYPE_MONTH_STRING,SCHEDULE_TYPE_WEEK_STRING,SCHEDULE_TYPE_DAY_STRING){
  //ANIMATION LOAD
  $ionicLoading.show({
    template: '<i class="icon ion-loading-d" style="font-size: 32px"></i>',
    animation: 'fade-in',
    noBackdrop: false
  })

  //LOAD OBJECT IN LOCAL STORAGE
  Load_variable_date.setData();

  //GET OBJECT OF LOCAL STORAGE
  var _data_date = $localstorage.getObject('dataDate');

  //CALL SERVICES WITH (TYPE AND DATA)
  $scope.getAppointments = scheduleService.query({type: _data_date.type,calendar: _data_date.data});

  $scope.getAppointments.$promise.then(function (results){
    //INTO PROMISE
    $scope.listAppointments = (results['mainData'])['appointmentsList'];
    
    //parse to variables PROVISIONAL
    $scope.appointments = [];
    angular.forEach($scope.listAppointments, function (appointment) {
        var change = {id: appointment.virtualAppointmentId, title: appointment.title, start: appointment.startMillis, end: appointment.endMillis ,body: appointment.location,url:'https://www.youtube.com/'};
        $scope.appointments.push(change);
    });


    // var options = Get_options_schedule.getoptions();

    //INIT PROPERTIES FOR CALENDAR
    var options = {
        events_source: $scope.appointments,//function () { return [ { "id" : "3098", "title" : "9 de abril reunion", "location" : "en la puerta de la U", "color" : "#ff9900", "isPublic" : "true", "isAllDay" : "false", "isOwner" : "true", "dateInteger" : "20150409", "start" : "1428613200000", "end" : "1428616800000" } , { "id" : "3078-1", "title" : "app todos los viernes 22", "location" : "", "color" : "#CCCCCC", "isPublic" : "true", "isAllDay" : "false", "isOwner" : "true", "dateInteger" : "20150410", "start" : "1428705000000", "end" : "1428708600000" } ]; }, //items,//
        view: 'month',
        language: 'es-ES',
        tmpl_path: 'lib/bootstrap-calendar/tmpls/',
        tmpl_cache: false,
        day: _data_date.yyyy+"-"+_data_date.mm+"-"+_data_date.dd,
        time_start: '07:00',
        time_end: '20:00',
        time_split: '30',
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
    calendar = $('#calendar').calendar(options);      

    $ionicLoading.hide()

  });//END PROMISE
    
    
    $scope.scheduleNext  = function(){
        //CHANGE OBJECT FOR NEXT OR ANT
        schedule_calculate_Next_Ant.go(1);
        //GET OBJECT OF LOCAL STORAGE
        var _data_date = $localstorage.getObject('dataDate',_data_date);
        //CALL SERVICES WITH (TYPE AND DATA)
        $scope.getAppointments = scheduleService.query({type: _data_date.type,calendar: _data_date.data});

          $scope.getAppointments.$promise.then(function (results){
            //INTO PROMISE
            $scope.listAppointments = (results['mainData'])['appointmentsList'];
            //parse to variables

            $scope.appointments = [];
            angular.forEach($scope.listAppointments, function (appointment) {
                var change = {id: appointment.virtualAppointmentId, title: appointment.title, start: appointment.startMillis, end: appointment.endMillis ,body: appointment.location};
                $scope.appointments.push(change);
            });
            console.log("no carga datos NEXT",$scope.appointments);
            //LOAD OPTIONS TO CALENDAR
            var calendar = $("#calendar").calendar(
             {
                events_source: $scope.appointments,
                view: _data_date.type_string,
                tmpl_path: 'lib/bootstrap-calendar/tmpls/',
                day: _data_date.yyyyc+"-"+_data_date.mmc+"-"+_data_date.ddc
             });
          });//END PROMISE
    };

    $scope.schedulePrev  = function(){
        //SERVICE CHANGE NEXT OR ANT
        schedule_calculate_Next_Ant.go(-1);
        //GET OBJECT OF LOCAL STORAGE
        var _data_date = $localstorage.getObject('dataDate',_data_date);
        //CALL SERVICES WITH (TYPE AND DATA)
          $scope.getAppointments = scheduleService.query({type: _data_date.type,calendar: _data_date.data});

          $scope.getAppointments.$promise.then(function (results){
            //INTO PROMISE
            $scope.listAppointments = (results['mainData'])['appointmentsList'];
            //parse to variables

            $scope.appointments = [];
            angular.forEach($scope.listAppointments, function (appointment) {
                var change = {id: appointment.virtualAppointmentId, title: appointment.title, start: appointment.startMillis, end: appointment.endMillis ,body: appointment.location};
                $scope.appointments.push(change);
            });
                 console.log("no carga datos ant",$scope.appointments);     
            //LOAD OPTIONS TO CALENDAR
            var calendar = $("#calendar").calendar(
             {
              events_source: $scope.appointments,
                view: _data_date.type_string,
                tmpl_path: 'lib/bootstrap-calendar/tmpls/',
                day: _data_date.yyyyc+"-"+_data_date.mmc+"-"+_data_date.ddc
                
             });
          });//END PROMISE
    };
    $scope.scheduleToday  = function(){
      

      //CHANGE OBJECT TODAY
      Load_variable_date.setDataToday();

      //GET OBJECT OF LOCAL STORAGE
      var _data_date = $localstorage.getObject('dataDate');
      
      //CALL SERVICES WITH (TYPE AND DATA)
      $scope.newAppointments = scheduleService.query({type: _data_date.type,calendar: _data_date.data});

      $scope.newAppointments.$promise.then(function (results){
            //INTO PROMISE
        $scope.listAppointments = (results['mainData'])['appointmentsList'];
            //parse to variables
        $scope.appointments = [];
        angular.forEach($scope.listAppointments, function (appointment) {
          var change = {id: appointment.virtualAppointmentId, title: appointment.title, start: appointment.startMillis, end: appointment.endMillis ,body: appointment.location};
          $scope.appointments.push(change);
        });
        
        //LOAD OPTIONS TO CALENDAR
        var calendar = $("#calendar").calendar(
         {
             view: _data_date.type_string,
             tmpl_path: 'lib/bootstrap-calendar/tmpls/',
             day: _data_date.yyyyc+"-"+_data_date.mmc+"-"+_data_date.ddc,
             events_source: $scope.appointments
         });
      });//END PROMISE
    };

    $scope.dataScheduleMonth = function(){
      //GET OBJECT OF LOCAL STORAGE
      var _data_date = $localstorage.getObject('dataDate');
        
      _data_date.type = SCHEDULE_TYPE_MONTH;
      _data_date.type_string = SCHEDULE_TYPE_MONTH_STRING;
      _data_date.data =  _data_date.yyyyc+_data_date.mmc;
        
      $scope.newAppointments = scheduleService.query({type: _data_date.type,calendar: _data_date.data});

      $scope.newAppointments.$promise.then(function (results){
            //INTO PROMISE
            $scope.listAppointments = (results['mainData'])['appointmentsList'];
            //parse to variables
            $scope.appointments = [];
            angular.forEach($scope.listAppointments, function (appointment) {
                var change = {id: appointment.virtualAppointmentId, title: appointment.title, start: appointment.startMillis, end: appointment.endMillis ,body: appointment.location};
                $scope.appointments.push(change);
            });
            
            //LOAD OPTIONS TO CALENDAR
            var calendar = $("#calendar").calendar(
             {
                 view: _data_date.type_string,
                 tmpl_path: 'lib/bootstrap-calendar/tmpls/',
                 day: _data_date.yyyyc+"-"+_data_date.mmc+"-"+_data_date.ddc,
                 events_source: $scope.appointments
             });
      });//END PROMISE
        $localstorage.setObject('dataDate',_data_date);
    };
        
    $scope.dataScheduleDay = function()    {
        //GET OBJECT OF LOCAL STORAGE
        var _data_date = $localstorage.getObject('dataDate');

        _data_date.type = SCHEDULE_TYPE_DAY;
        _data_date.type_string = SCHEDULE_TYPE_DAY_STRING;
        _data_date.data =  _data_date.yyyyc+_data_date.mmc+_data_date.ddc;
        
        $scope.getAppointments = scheduleService.query({type: _data_date.type,calendar: _data_date.data});

          $scope.getAppointments.$promise.then(function (results){
            //INTO PROMISE
            $scope.listAppointments = (results['mainData'])['appointmentsList'];
            //parse to variables
            $scope.appointments = [];
            angular.forEach($scope.listAppointments, function (appointment) {
                var change = {id: appointment.virtualAppointmentId, title: appointment.title, start: appointment.startMillis, end: appointment.endMillis ,body: appointment.location};
                $scope.appointments.push(change);
            });
            
            //LOAD OPTIONS TO CALENDAR
            var calendar = $("#calendar").calendar(
             {
                 view: _data_date.type_string,
                 tmpl_path: 'lib/bootstrap-calendar/tmpls/',
                 day: _data_date.yyyyc+"-"+_data_date.mmc+"-"+_data_date.ddc,
                 events_source: $scope.appointments
             });
          });//END PROMISE
        $localstorage.setObject('dataDate',_data_date);
    };

    $scope.dataScheduleWekk = function(){
        
        var _data_date = $localstorage.getObject('dataDate');
        _data_date.type = SCHEDULE_TYPE_WEEK;
        _data_date.type_string = SCHEDULE_TYPE_WEEK_STRING;
        _data_date.data =  _data_date.yyyyc+_data_date.wwc;
        $localstorage.setObject('dataDate',_data_date);
        
        $scope.getAppointments = scheduleService.query({type: _data_date.type,calendar: _data_date.data});

          $scope.getAppointments.$promise.then(function (results){
            //INTO PROMISE
            $scope.listAppointments = (results['mainData'])['appointmentsList'];
            //parse to variables
            $scope.appointments = [];
            angular.forEach($scope.listAppointments, function (appointment) {
                var change = {id: appointment.virtualAppointmentId, title: appointment.title, start: appointment.startMillis, end: appointment.endMillis ,body: appointment.location};
                $scope.appointments.push(change);
            });
            console.log("===list       week ----",$scope.appointments);            
console.log("===getObject  week ----",_data_date);
            //LOAD OPTIONS TO CALENDAR
            console.log("list semana",$scope.appointments);
            var calendar = $("#calendar").calendar(
             {
                 view: 'week',
                 tmpl_path: 'lib/bootstrap-calendar/tmpls/',
                 day: _data_date.yyyyc+"-"+_data_date.mmc+"-"+_data_date.ddc,
                 events_source: $scope.appointments
             });
          });//END PROMISE
        $localstorage.setObject('dataDate',_data_date);
    };
});
