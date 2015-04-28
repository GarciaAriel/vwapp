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
          
        console.log("==CONTROLLER SCHEDULE== results:",(results['mainData'])['entity']);

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
.controller('ControlSchedule',function($window,COLOR_VIEW,COLOR_2,$scope,Load_variable_date,schedule_calculate_Next_Ant,$q,scheduleService,$localstorage,SCHEDULE_TYPE_MONTH,SCHEDULE_TYPE_WEEK,SCHEDULE_TYPE_DAY,SCHEDULE_TYPE_MONTH_STRING,SCHEDULE_TYPE_WEEK_STRING,SCHEDULE_TYPE_DAY_STRING){
  // COLOR DEFAULT
  $scope.colorFont = COLOR_VIEW;

  // change paragraph text colour to green 
  $('button').css({"color":COLOR_2});
  $('view-title').css({"color":COLOR_2});
  
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
    console.log("==CONTROLLER SCHEDULE== get query list appointments success OK");
    $scope.listAppointments = (results['mainData'])['appointmentsList'];
    
    //parse to variables PROVISIONAL
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
      
      // load appointment and push in list
      var change = {id: appointment.virtualAppointmentId, title: appointment.title, start: appointment.startMillis, end: appointment.endMillis ,body: appointment.location,url:'#app/schedulerDetail'+'?appointmentId=' +idAppointment};
      $scope.appointments.push(change);
      
    });

    console.log("==CONTROLLER SCHEDULE== list appointments: ",$scope.appointments);

    //INIT PROPERTIES FOR CALENDAR
    var options = {
          events_source: $scope.appointments,//function () { return [ { "id" : "3098", "title" : "9 de abril reunion", "location" : "en la puerta de la U", "color" : "#ff9900", "isPublic" : "true", "isAllDay" : "false", "isOwner" : "true", "dateInteger" : "20150409", "start" : "1428613200000", "end" : "1428616800000" } , { "id" : "3078-1", "title" : "app todos los viernes 22", "location" : "", "color" : "#CCCCCC", "isPublic" : "true", "isAllDay" : "false", "isOwner" : "true", "dateInteger" : "20150410", "start" : "1428705000000", "end" : "1428708600000" } ]; }, //items,//
          tmpl_path: 'lib/bootstrap-calendar/tmpls/',
          view: 'month',
          // language: 'es-ES',
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
      

      // $window.location.reload(true);
      // console.log("----------------",(date.getDate()).toString().length == 1 ? "0"+(date.getDate()).toString() : (date.getDate()).toString()); 

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

          //LOAD OPTIONS TO CALENDAR
          var calendar = $("#calendar").calendar(
          {
            events_source: $scope.appointments,
            view: _data_date.type_string,
            time_split: '60',
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


            //LOAD OPTIONS TO CALENDAR
            var calendar = $("#calendar").calendar(
            {
              events_source: $scope.appointments,
              view: _data_date.type_string,
              time_split: '60',
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
        
            //LOAD OPTIONS TO CALENDAR
            var calendar = $("#calendar").calendar(
            {
             view: _data_date.type_string,
             time_split: '60',
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

            //LOAD OPTIONS TO CALENDAR
            var calendar = $("#calendar").calendar(
            {
             view: _data_date.type_string,
             time_split: '60',
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
      $scope.getAppointments = scheduleService.query({type: _data_date.type,calendar: _data_date.data});
          //  PROMISE
          $scope.getAppointments.$promise.then(function (results){
            console.log("==CONTROLLER SCHEDULE== get query list appointments change view DAY success OK");    
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
            
                //LOAD OPTIONS TO CALENDAR
                var calendar = $("#calendar").calendar({
                  view: _data_date.type_string,
                  tmpl_path: 'lib/bootstrap-calendar/tmpls/',
                  day: _data_date.yyyyc+"-"+_data_date.mmc+"-"+_data_date.ddc,
                  events_source: $scope.appointments,
                  time_split: '60'
                });
          });//END PROMISE
};

$scope.doRefresh = function() {
    //GET OBJECT OF LOCAL STORAGE
    var _data_date = $localstorage.getObject('dataDate');

    //CALL SERVICES WITH (TYPE AND DATA)
    console.log("==CONTROLLER SCHEDULE== get query list doRefresh appointments");  
    $scope.newAppointments = scheduleService.query({type: _data_date.type,calendar: _data_date.data});

    //  PROMISE
    $scope.newAppointments.$promise.then(function (results){
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
         time_split: '60',
         tmpl_path: 'lib/bootstrap-calendar/tmpls/',
         day: _data_date.yyyyc+"-"+_data_date.mmc+"-"+_data_date.ddc,
         events_source: $scope.appointments
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

            //LOAD OPTIONS TO CALENDAR
            console.log("list semana",$scope.appointments);
            var calendar = $("#calendar").calendar(
            {
             view: 'week',
             time_split: '60',
             tmpl_path: 'lib/bootstrap-calendar/tmpls/',
             day: _data_date.yyyyc+"-"+_data_date.mmc+"-"+_data_date.ddc,
             events_source: $scope.appointments
           });
        });//END PROMISE
};



});
