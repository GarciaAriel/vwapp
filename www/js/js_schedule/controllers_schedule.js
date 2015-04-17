angular.module('starter.schedulecontrollers', ['starter.scheduleservices'])

// 
// CONTROLLER SCHEDULE
// 
.controller('ControlSchedule',function(COLOR_VIEW,COLOR_2,$scope,Load_variable_date,schedule_calculate_Next_Ant,$q,scheduleService,$localstorage,SCHEDULE_TYPE_MONTH,SCHEDULE_TYPE_WEEK,SCHEDULE_TYPE_DAY,SCHEDULE_TYPE_MONTH_STRING,SCHEDULE_TYPE_WEEK_STRING,SCHEDULE_TYPE_DAY_STRING){
  // COLOR DEFAULT
  $scope.colorFont = COLOR_VIEW;

  // change paragraph text colour to green 
  $('button').css({"color":COLOR_2});
  $('view-title').css({"color":COLOR_2});
  // $('button-positive').css({"color":COLOR_2});

  //  LOAD OBJECT IN LOCAL STORAGE
  Load_variable_date.setData();

  //  GET OBJECT OF LOCAL STORAGE
  var _data_date = $localstorage.getObject('dataDate');

  //  HELP TO SEE DATE IN VIEW
  $scope.real_date_view = _data_date.yyyyc+"-"+_data_date.mmc+"-"+_data_date.ddc;

  //  CALL SERVICES WITH (TYPE AND DATA)
  console.log("==CONTROLLER SCHEDULE== get query list appointments first time");
  $scope.newAppointments = scheduleService.query({type: _data_date.type,calendar: _data_date.data});

  //  PROMISE
  $scope.newAppointments.$promise.then(function (results){
      console.log("==CONTROLLER SCHEDULE== get query list appointments success OK",results['mainData']);
      $scope.listAppointments = (results['mainData'])['appointmentsList'];

      
      //parse to variables PROVISIONAL
      $scope.appointments = [];
      angular.forEach($scope.listAppointments, function (appointment) {
          var change = {id: appointment.virtualAppointmentId, title: appointment.title, start: appointment.startMillis, end: appointment.endMillis ,body: appointment.location,url:'https://www.youtube.com/'};
          $scope.appointments.push(change);
      });

    //INIT PROPERTIES FOR CALENDAR
      var options = {
          events_source: $scope.appointments,//function () { return [ { "id" : "3098", "title" : "9 de abril reunion", "location" : "en la puerta de la U", "color" : "#ff9900", "isPublic" : "true", "isAllDay" : "false", "isOwner" : "true", "dateInteger" : "20150409", "start" : "1428613200000", "end" : "1428616800000" } , { "id" : "3078-1", "title" : "app todos los viernes 22", "location" : "", "color" : "#CCCCCC", "isPublic" : "true", "isAllDay" : "false", "isOwner" : "true", "dateInteger" : "20150410", "start" : "1428705000000", "end" : "1428708600000" } ]; }, //items,//
          tmpl_path: 'lib/bootstrap-calendar/tmpls/',
          view: 'month',
          // language: 'es-ES',
          tmpl_cache: false,
          day: _data_date.yyyy+"-"+_data_date.mm+"-"+_data_date.dd,
          time_split: '60',
          time_start: '07:00',
          time_end: '17:30',
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

  });//END PROMISE
    
  
  // FUNCTION NEXT FOR DAY WEEK AND MONTH  
  $scope.scheduleNext  = function(){
      //  CALL SERVICE TO CHANGE OBJECT FOR NEXT
      schedule_calculate_Next_Ant.go(1);

      //GET OBJECT OF LOCAL STORAGE
      var _data_date = $localstorage.getObject('dataDate',_data_date);
      console.log("==CONTROLLER SCHEDULE== action next",_data_date);

      //HELP TO SEE DATE IN VIEW
      $scope.real_date_view = _data_date.yyyyc+"-"+_data_date.mmc+"-"+_data_date.ddc;

      //CALL SERVICES WITH (TYPE AND DATA)
      console.log("==CONTROLLER SCHEDULE== get query list appointments NEXT function");
      $scope.newAppointments = scheduleService.query({type: _data_date.type,calendar: _data_date.data});

      //PROMISE
      $scope.newAppointments.$promise.then(function (results){
          //  GET LIST APPOINTMENTS
          console.log("==CONTROLLER SCHEDULE== get query list appointments NEXT success OK",results['mainData']);
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

        //HELP TO SEE DATE IN VIEW
        $scope.real_date_view = _data_date.yyyyc+"-"+_data_date.mmc+"-"+_data_date.ddc;

        //CALL SERVICES WITH (TYPE AND DATA)
        console.log("==CONTROLLER SCHEDULE== get query list appointments PREV function",_data_date);
        $scope.newAppointments = scheduleService.query({type: _data_date.type,calendar: _data_date.data});

        //  PROMISE
        $scope.newAppointments.$promise.then(function (results){
            console.log("==CONTROLLER SCHEDULE== get query list appointments PREV success OK",results['mainData']);
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
              events_source: $scope.appointments,
                view: _data_date.type_string,
                tmpl_path: 'lib/bootstrap-calendar/tmpls/',
                day: _data_date.yyyyc+"-"+_data_date.mmc+"-"+_data_date.ddc
                
             });
          });//END PROMISE
    };
    
    $scope.scheduleToday  = function(){
        //CHANGE OBJECT LOCAL STORAGE TODAY
        Load_variable_date.setDataToday();

        //GET OBJECT OF LOCAL STORAGE
        var _data_date = $localstorage.getObject('dataDate');

        //HELP TO SEE DATE IN VIEW
        $scope.real_date_view = _data_date.yyyyc+"-"+_data_date.mmc+"-"+_data_date.ddc;
      
        //CALL SERVICES WITH (TYPE AND DATA)
        console.log("==CONTROLLER SCHEDULE== get query list appointments TODAY function",_data_date);
        $scope.newAppointments = scheduleService.query({type: _data_date.type,calendar: _data_date.data});

        //  PROMISE
        $scope.newAppointments.$promise.then(function (results){
            console.log("==CONTROLLER SCHEDULE== get query list appointments TODAY success OK",results['mainData']);    
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
        
        //CHANGE TYPE WITH CONSTANT 'SCHEDULE_TYPE_MONTH'  
        _data_date.type = SCHEDULE_TYPE_MONTH;
        _data_date.type_string = SCHEDULE_TYPE_MONTH_STRING;
        _data_date.data =  _data_date.yyyyc+_data_date.mmc;
        
        //CALL SERVICES WITH (TYPE AND DATA)
        console.log("==CONTROLLER SCHEDULE== get query list appointments change view MONTH function");  
        $scope.newAppointments = scheduleService.query({type: _data_date.type,calendar: _data_date.data});

        // PROMISE
        $scope.newAppointments.$promise.then(function (results){
            console.log("==CONTROLLER SCHEDULE== get query list appointments change view MONTH success OK",results['mainData']);    
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

        //CHANGE TYPE WITH CONSTANT 'SCHEDULE_TYPE_DAY'
        _data_date.type = SCHEDULE_TYPE_DAY;
        _data_date.type_string = SCHEDULE_TYPE_DAY_STRING;
        _data_date.data =  _data_date.yyyyc+_data_date.mmc+_data_date.ddc;
        $localstorage.setObject('dataDate',_data_date);
        
        //CALL SERVICES WITH (TYPE AND DATA)
        console.log("==CONTROLLER SCHEDULE== get query list appointments change view DAY function");  
        $scope.newAppointments = scheduleService.query({type: _data_date.type,calendar: _data_date.data});
            //  PROMISE
            $scope.newAppointments.$promise.then(function (results){
                console.log("==CONTROLLER SCHEDULE== get query list appointments change view DAY success OK");    
                $scope.listAppointments = (results['mainData'])['appointmentsList'];
                
                //parse to variables
                $scope.appointments = [];
                angular.forEach($scope.listAppointments, function (appointment) {
                    var change = {id: appointment.virtualAppointmentId, title: appointment.title, start: appointment.startMillis, end: appointment.endMillis ,body: appointment.location};
                    $scope.appointments.push(change);
                });
            
                //LOAD OPTIONS TO CALENDAR
                var calendar = $("#calendar").calendar({
                    view: _data_date.type_string,
                    tmpl_path: 'lib/bootstrap-calendar/tmpls/',
                    day: _data_date.yyyyc+"-"+_data_date.mmc+"-"+_data_date.ddc,
                    events_source: $scope.appointments,
                    time_start: '08:00',
                    time_end: '17:30',
                    time_split: '30'
                });
          });//END PROMISE
    };

    $scope.dataScheduleWekk = function(){
        //GET OBJECT OF LOCAL STORAGE
        var _data_date = $localstorage.getObject('dataDate');

        //CHANGE TYPE WITH CONSTANT 'SCHEDULE_TYPE_WEEK'
        _data_date.type = SCHEDULE_TYPE_WEEK;
        _data_date.type_string = SCHEDULE_TYPE_WEEK_STRING;
        _data_date.data =  _data_date.yyyyc+_data_date.wwc;
        $localstorage.setObject('dataDate',_data_date);

        //CALL SERVICES WITH (TYPE AND DATA)
        console.log("==CONTROLLER SCHEDULE== get query list appointments change view WEEK function");  
        $scope.newAppointments = scheduleService.query({type: _data_date.type,calendar: _data_date.data});

        //  PROMISE
        $scope.newAppointments.$promise.then(function (results){
            console.log("==CONTROLLER SCHEDULE== get query list appointments change view WEEK success OK",results['mainData']);
            $scope.listAppointments = (results['mainData'])['appointmentsList'];
            
            //parse to variables
            $scope.appointments = [];
            angular.forEach($scope.listAppointments, function (appointment) {
                var change = {id: appointment.virtualAppointmentId, title: appointment.title, start: appointment.startMillis, end: appointment.endMillis ,body: appointment.location};
                $scope.appointments.push(change);
            });

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
    };
});
