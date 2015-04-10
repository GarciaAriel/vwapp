angular.module('starter.schedulecontrollers', ['starter.scheduleservices'])

.controller('ControlSchedule',function($scope,$ionicLoading,$q,SCHEDULE_TYPE_MONTH,SCHEDULE_TYPE_WEEK,SCHEDULE_TYPE_DAY,scheduleService,$localstorage){
    //LOADING IMAGE
  $ionicLoading.show({
    template: '<i class="icon ion-loading-d" style="font-size: 32px"></i>',
    animation: 'fade-in',
    noBackdrop: false
  })

  var date = new Date();
  var yyyy = date.getFullYear().toString();
  var mm = (date.getMonth()+1).toString().length == 1 ? "0"+(date.getMonth()+1).toString() : (date.getMonth()+1).toString();
  var dd = (date.getDate()).toString().length == 1 ? "0"+(date.getDate()).toString() : (date.getDate()).toString();
  $localstorage.setObject('dataDate',{'yyyy':yyyy,'mm':mm,'dd':dd,'view':'mm'});
  //query to server
  $scope.getAppointments = scheduleService.query({type: SCHEDULE_TYPE_MONTH,calendar: yyyy+mm});

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
        day: yyyy+"-"+mm+"-"+dd,
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

        var _data_date = $localstorage.getObject('dataDate');
        var _data;
        var _type;
        switch(_data_date.view) {
            case 'mm':
                _type = SCHEDULE_TYPE_MONTH;
                var _increment = (parseInt(_data_date.mm))+1; 
                if (_increment<10) {_increment = "0"+_increment};
                _data = _data_date.yyyy+_increment;
                break;
            case 'ww':
                _type = SCHEDULE_TYPE_WEEK;
                var _increment = (parseInt(_data_date.ww))+1; 
                if (_increment<10) {_increment = "0"+_increment};
                _data = _data_date.yyyy+_increment;
                break;
            case 'dd':
                _type = SCHEDULE_TYPE_DAY;
                var _increment = (parseInt(_data_date.dd))+1; 
                if (_increment<10) {_increment = "0"+_increment};
                _data = _data_date.yyyy+_data_date.mm+_increment;
                break;    
            default:
                _type = SCHEDULE_TYPE_MONTH;
                var _increment = (parseInt(_data_date.mm))+1; 
                _data = _data_date.yyyy+_increment;
        } 
        ////////////////////
        //query to server
        console.log("data date",_data_date);
        console.log("type data",_type+" "+_data);
          $scope.getAppointments = scheduleService.query({type: _type,calendar: _data});

          $scope.getAppointments.$promise.then(function (results){
            //INTO PROMISE
            $scope.listAppointments = (results['mainData'])['appointmentsList'];
            //parse to variables

            $scope.appointments = [];
            angular.forEach($scope.listAppointments, function (appointment) {
                var change = {id: appointment.virtualAppointmentId, title: appointment.title, start: appointment.startMillis, end: appointment.endMillis ,body: appointment.location};
                $scope.appointments.push(change);
            });
            console.log("nuevovvvooooooooooo listtt schedule",$scope.appointments);
            //LOAD OPTIONS TO CALENDAR
            
            var calendar = $("#calendar").calendar(
             {
                 tmpl_path: 'lib/bootstrap-calendar/tmpls/',
                 day: "2015"+"-"+"04"+"-"+"10",
                 events_source: $scope.appointments
             });
            calendar.navigate('next');
            // calendar = $('#calendar').calendar(options);      
            // $ionicLoading.hide()
          });//END PROMISE
        //////////////////////
        
    };

    $scope.schedulePrev  = function($scope){
        // console.log("prev yyyy="+$scope.year+" mes="+$scope.month+" dia="+$scope.day);
        calendar.navigate('prev');
    };
    $scope.scheduleToday  = function($scope){
            // console.log("next yyyy="+$scope.year+" mes="+$scope.month+" dia="+$scope.day);
             calendar.navigate('today');
    };

    $scope.dataScheduleMonth = function($scope){
        var date = new Date();
        var yyyy = date.getFullYear().toString();
        var mm = (date.getMonth()+1).toString().length == 1 ? "0"+(date.getMonth()+1).toString() : (date.getMonth()+1).toString();
// var listtt = [ { "id" : "3098", "title" : "nuevovvvooooooooooo", "location" : "en la puerta de la U", "color" : "#ff9900", "isPublic" : "true", "isAllDay" : "false", "isOwner" : "true", "dateInteger" : "20150409", "start" : "1428613200000", "end" : "1428616800000" } ];
       var calendar = $('#calendar').calendar({
          events_source: [],
          tmpl_path: 'lib/bootstrap-calendar/tmpls/'
        });
        // calendar.view('month');
    };
        
    $scope.dataScheduleDay = function($scope)    {
        var date = new Date();
        var yyyy = date.getFullYear().toString();
        var mm = (date.getMonth()+1).toString().length == 1 ? "0"+(date.getMonth()+1).toString() : (date.getMonth()+1).toString();
        var dd = (date.getDate()).toString().length == 1 ? "0"+(date.getDate()).toString() : (date.getDate()).toString();
        
        calendar.view('day');
    };

    $scope.dataScheduleWekk = function($scope){
        calendar.view('week');
    };
});
