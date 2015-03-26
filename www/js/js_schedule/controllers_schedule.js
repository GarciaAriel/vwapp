angular.module('starter.schedulecontrollers', [])

.controller('ControlSchedule',function($scope,TaskList){

    var date = new Date();
        var yyyy = date.getFullYear().toString();
        var mm = (date.getMonth()+1).toString().length == 1 ? "0"+(date.getMonth()+1).toString() : (date.getMonth()+1).toString();
        var dd = (date.getDate()).toString().length == 1 ? "0"+(date.getDate()).toString() : (date.getDate()).toString();
        var items = TaskList.all();
    //establecemos los valores del calendario
        var options = {
            events_source: items,//function () { return [{ "id": 0,"title": "titulo 1","body": "body 1 subject1","url": "https://www.youtube.com/","start": "1427304600000","end": "1427401800000"},{ "id": 0,"title": "titulo 2","body": "body 1 subject1","url": "https://www.youtube.com/","start": "1427304600000","end": "1427315400000"}]; },
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

        var calendar = $('#calendar').calendar(options);

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
	
	// $scope.myFunction = function($scope){
        
 //        $('.button-bar button[data-calendar-nav]').each(function()
 //        {
 //         var $this = $(this);
 //         $this.click(function()
 //         {
 //             calendar.navigate($this.data('calendar-nav'));
 //         });
 //        });

 //        $('.button-bar button[data-calendar-view]').each(function()
 //        {
 //         var $this = $(this);
 //         $this.click(function()
 //         {
 //             calendar.view($this.data('calendar-view'));
 //         });
 //        });

 //        $('#first_day').change(function()
 //        {
 //         var value = $(this).val();
 //         value = value.length ? parseInt(value) : null;
 //         calendar.setOptions({first_day: value});
 //         calendar.view();
 //        });
        
 //        $('#events-in-modal').change(function()
 //        {
 //         var val = $(this).is(':checked') ? $(this).val() : null;
 //         calendar.setOptions(
 //         {
 //             modal: val,
 //             modal_type:'iframe'
 //         }
 //         );
 //        });

 //    };

});
