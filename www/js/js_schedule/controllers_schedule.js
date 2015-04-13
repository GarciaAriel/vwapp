angular.module('starter.schedulecontrollers', ['starter.scheduleservices'])

.controller('ControlSchedule',function($scope,Load_variable_date,$ionicLoading,scheduleCalculateAnt,scheduleCalculateNext,$q,SCHEDULE_TYPE_MONTH,SCHEDULE_TYPE_WEEK,SCHEDULE_TYPE_DAY,scheduleService,$localstorage){
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
  // var date = new Date();

  // var yyyy = date.getFullYear().toString();
  // var ww = (date.getWeek()).toString().length == 1 ? "0"+(date.getWeek()).toString() : (date.getWeek()).toString();       
  // var mm = (date.getMonth()+1).toString().length == 1 ? "0"+(date.getMonth()+1).toString() : (date.getMonth()+1).toString();
  // var dd = (date.getDate()).toString().length == 1 ? "0"+(date.getDate()).toString() : (date.getDate()).toString();
    
  // $localstorage.setObject('dataDate',{'yyyy':yyyy,'mm':mm,'ww':ww,'dd':dd,'yyyyc':yyyy,'mmc':mm,'wwc':ww,'ddc':dd,'data':yyyy+mm, 'type':SCHEDULE_TYPE_MONTH});
  //query to server
  //CALL SERVICES WITH TYPE AND DATA
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
            $('.page-header h3').text(this.getTitle());
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
        scheduleCalculateNext.next();
        var _data_date = $localstorage.getObject('dataDate',_data_date);
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
console.log("===list       next ----",$scope.appointments);            
console.log("===getObject  next ----",_data_date);
            //LOAD OPTIONS TO CALENDAR
            var type;
            if (_data_date.type == 3) { type = "month";};
            if (_data_date.type == 2) { type = "week";};
            if (_data_date.type == 1) { type = "day";};
            var calendar = $("#calendar").calendar(
             {
                // day: yyyy+"-"+mm+"-"+dd,
                events_source: $scope.appointments,
                view: type,
                 tmpl_path: 'lib/bootstrap-calendar/tmpls/',
                 day: _data_date.yyyyc+"-"+_data_date.mmc+"-"+_data_date.ddc
             });
          });//END PROMISE
        //////////////////////
        
    };

    $scope.schedulePrev  = function(){
        scheduleCalculateAnt.ant();
        var _data_date = $localstorage.getObject('dataDate',_data_date);
        console.log("data date",_data_date);
        console.log("type data",_data_date.type+" "+_data_date.data);
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
            console.log("===list       ant ----",$scope.appointments);            
console.log("===getObject  ant ----",_data_date);
            var type;
            if (_data_date.type == 3) { type = "month";};
            if (_data_date.type == 2) { type = "week";};
            if (_data_date.type == 1) { type = "day";};
            //LOAD OPTIONS TO CALENDAR
            var calendar = $("#calendar").calendar(
             {
                // day: yyyy+"-"+mm+"-"+dd,
                view: type,
                 tmpl_path: 'lib/bootstrap-calendar/tmpls/',
                 day: _data_date.yyyyc+"-"+_data_date.mmc+"-"+_data_date.ddc,
                 events_source: $scope.appointments
             });
          });//END PROMISE
    };
    $scope.scheduleToday  = function(){
        var _data_date = $localstorage.getObject('dataDate');
        _data_date.yyyyc = _data_date.yyyy;
        _data_date.mmc = _data_date.mm;
        _data_date.wwc = _data_date.ww;
        _data_date.ddc = _data_date.dd;
        if (_data_date.type == 3) {_data_date.data = _data_date.yyyyc+_data_date.mmc};
        if (_data_date.type == 2) {_data_date.data = _data_date.yyyyc+_data_date.wwc};
        if (_data_date.type == 1) {_data_date.data = _data_date.yyyyc+_data_date.mmc+_data_date.ddc};

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
            console.log("===list       hoy ----",$scope.appointments);            
console.log("===getObject  hoy ----",_data_date);
            //LOAD OPTIONS TO CALENDAR
            var type;
            if (_data_date.type == 3) { type = "month";};
            if (_data_date.type == 2) { type = "week";};
            if (_data_date.type == 1) { type = "day";};
            var calendar = $("#calendar").calendar(
             {
                 view: type,
                 tmpl_path: 'lib/bootstrap-calendar/tmpls/',
                 day: _data_date.yyyyc+"-"+_data_date.mmc+"-"+_data_date.ddc,
                 events_source: $scope.appointments
             });
          });//END PROMISE
        $localstorage.setObject('dataDate',_data_date);    
    };

    $scope.dataScheduleMonth = function(){
        var _data_date = $localstorage.getObject('dataDate');
        _data_date.type = SCHEDULE_TYPE_MONTH;
        _data_date.data =  _data_date.yyyyc+_data_date.mmc;
        
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
            console.log("===list       mes ----",$scope.appointments);            
console.log("===getObject  mes ----",_data_date);
            //LOAD OPTIONS TO CALENDAR
            var calendar = $("#calendar").calendar(
             {
                 view: 'month',
                 tmpl_path: 'lib/bootstrap-calendar/tmpls/',
                 day: _data_date.yyyyc+"-"+_data_date.mmc+"-"+_data_date.ddc,
                 events_source: $scope.appointments
             });
          });//END PROMISE
        $localstorage.setObject('dataDate',_data_date);
    };
        
    $scope.dataScheduleDay = function()    {
        var _data_date = $localstorage.getObject('dataDate');
        _data_date.type = SCHEDULE_TYPE_DAY;
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
            console.log("===list       day ----",$scope.appointments);            
console.log("===getObject  day ----",_data_date);
            //LOAD OPTIONS TO CALENDAR
            var calendar = $("#calendar").calendar(
             {
                 view: 'day',
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
        _data_date.data =  _data_date.yyyyc+_data_date.wwc;
        $localstorage.setObject('dataDate',_data_date);
        console.log("set wekkkkkkkkkkk",_data_date);
        
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
        
    };
});
