angular.module('starter.scheduleservices', [])

.factory('scheduleService', function($resource,apiUrlLocal,pathSchedule) {
  var url = apiUrlLocal+pathSchedule;
  console.log('==SERVICE SCHEDULE== URL',url);
  return $resource(url,{},{'query':{method:'GET', isArray:false}}); 
})

.factory('scheduleCalculateNext', function($localstorage,SCHEDULE_TYPE_MONTH,SCHEDULE_TYPE_WEEK,SCHEDULE_TYPE_DAY) {
  return{
    next: function() {
      var _data_date = $localstorage.getObject('dataDate');
      var _data;
      var _type;

      switch(_data_date.type) {
          case SCHEDULE_TYPE_MONTH:
              var _increment = (parseInt(_data_date.mmc))+1; 
              if (_increment<10) {_increment = "0"+_increment};
              _data_date.mmc = _increment;
              _data_date.data = _data_date.yyyy+_increment;
              break;
          case SCHEDULE_TYPE_WEEK:
              var _increment = (parseInt(_data_date.wwc))+1; 
              if (_increment<10) {_increment = "0"+_increment};
              _data_date.wwc = _increment;
              _data_date.data = _data_date.yyyy+_increment;
              break;
          case SCHEDULE_TYPE_DAY:
              var _increment = (parseInt(_data_date.ddc))+1; 
              if (_increment<10) {_increment = "0"+_increment};
              _data_date.ddc = _increment;
              _data_date.data = _data_date.yyyy+_data_date.mm+_increment;
              break;    
          // default:
          //     _type = SCHEDULE_TYPE_MONTH;
          //     var _increment = (parseInt(_data_date.mm))+1; 
          //     _data = _data_date.yyyy+_increment;
      } 
      $localstorage.setObject('dataDate',_data_date);
      return _data_date;
    }
  }
  
})


.factory('scheduleCalculateAnt', function($localstorage,SCHEDULE_TYPE_MONTH,SCHEDULE_TYPE_WEEK,SCHEDULE_TYPE_DAY) {
  return{
    ant: function() {
      var _data_date = $localstorage.getObject('dataDate');
      console.log("antessss",_data_date);
      var _data;
      var _type;

      switch(_data_date.type) {
          case SCHEDULE_TYPE_MONTH:
              var _increment = (parseInt(_data_date.mmc))-1; 
              if (_increment<10) {_increment = "0"+_increment};
              _data_date.mmc = _increment;
              _data_date.data = _data_date.yyyy+_increment;
              break;
          case SCHEDULE_TYPE_WEEK:
              var _increment = (parseInt(_data_date.wwc))-1; 
              if (_increment<10) {_increment = "0"+_increment};
              _data_date.wwc = _increment;
              _data_date.data = _data_date.yyyy+_increment;
              break;
          case SCHEDULE_TYPE_DAY:
              var _increment = (parseInt(_data_date.ddc))-1; 
              if (_increment<10) {_increment = "0"+_increment};
              _data_date.ddc = _increment;
              _data_date.data = _data_date.yyyy+_data_date.mm+_increment;
              break;    
          // default:
          //     _type = SCHEDULE_TYPE_MONTH;
          //     var _increment = (parseInt(_data_date.mm))+1; 
          //     _data = _data_date.yyyy+_increment;
      } 
      console.log("despues",_data_date);
      $localstorage.setObject('dataDate',_data_date);
      
      return _data_date;
    }
  }
  
})



.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);