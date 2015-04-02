angular.module('starter.schedulecontrollers', [])

.controller('ControlSchedule',function($scope,$ionicLoading,$q){

        var date = new Date();
        var yyyy = date.getFullYear().toString();
        var mm = (date.getMonth()+1).toString().length == 1 ? "0"+(date.getMonth()+1).toString() : (date.getMonth()+1).toString();
        var dd = (date.getDate()).toString().length == 1 ? "0"+(date.getDate()).toString() : (date.getDate()).toString();
        //var items = TaskList.all();
    //establecemos los valores del calendario
        var options = {
            events_source:function () { return [{ "id": 0,"title": "titulo 1","body": "body 1 subject1","url": "https://www.youtube.com/","start": "1427304600000","end": "1427401800000"},{ "id": 0,"title": "titulo 2","body": "body 1 subject1","url": "https://www.youtube.com/","start": "1427304600000","end": "1427315400000"}]; }, //items,//
            view: 'month',
            language: 'es-ES',
            tmpl_path: 'lib/bootstrap-calendar/tmpls/',
            tmpl_cache: false,
            day: yyyy+"-"+mm+"-"+dd,
            time_start: '10:00',
            time_end: '20:00',
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


    // $ionicLoading.show({
    //     template: '<i class="icon ion-loading-d" style="font-size: 32px"></i>',
    //     animation: 'fade-in',
    //     noBackdrop: false
    // })
        
        calendar = $('#calendar').calendar(options);      

        // calendar.$promise.then(function(){
        //     $ionicLoading.hide();
        // })
    

    $scope.scheduleNext  = function($scope){
        calendar.navigate('next');
    };

    $scope.schedulePrev  = function($scope){
        calendar.navigate('prev');
    };
    $scope.scheduleToday  = function($scope){
             calendar.navigate('today');
    };

    $scope.dataScheduleMonth = function($scope){
        calendar.view('month');
    };
        
    $scope.dataScheduleDay = function($scope)    {
        // var $this = $(this);
        calendar.view('day');
        // calendar.navigate($('#calendar').data('day'));
    };

    $scope.dataScheduleWekk = function($scope){
        calendar.view('week');
    };
});
