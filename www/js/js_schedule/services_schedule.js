angular.module('starter.scheduleservices', [])

.factory('scheduleService', function($resource,apiUrlLocal,pathSchedule) {
  var url = apiUrlLocal+pathSchedule;
  console.log('==SERVICE SCHEDULE== URL',url);
  return $resource(url,{},{'query':{method:'GET', isArray:false}}); 
})

//LOAD OBJECT 'dataDate' 
.factory('Load_variable_date', function(SCHEDULE_TYPE_MONTH,SCHEDULE_TYPE_MONTH_STRING,$localstorage) {
  return{
    setData: function(){
      var date = new Date();

      var yyyy = date.getFullYear().toString();
      var ww = (date.getWeek()).toString().length == 1 ? "0"+(date.getWeek()).toString() : (date.getWeek()).toString();       
      var mm = (date.getMonth()+1).toString().length == 1 ? "0"+(date.getMonth()+1).toString() : (date.getMonth()+1).toString();
      var dd = (date.getDate()).toString().length == 1 ? "0"+(date.getDate()).toString() : (date.getDate()).toString();
        
      $localstorage.setObject('dataDate',{'yyyy':yyyy,'mm':mm,'ww':ww,'dd':dd,'yyyyc':yyyy,'mmc':mm,'wwc':ww,'ddc':dd,'data':yyyy+mm, 'type':SCHEDULE_TYPE_MONTH,'type_string':SCHEDULE_TYPE_MONTH_STRING});    
    },
    setDataToday: function(){
      var _data_date = $localstorage.getObject('dataDate');
      _data_date.yyyyc = _data_date.yyyy;
      _data_date.mmc = _data_date.mm;
      _data_date.wwc = _data_date.ww;
      _data_date.ddc = _data_date.dd;
        if (_data_date.type == 3) {_data_date.data = _data_date.yyyyc+_data_date.mmc};
        if (_data_date.type == 2) {_data_date.data = _data_date.yyyyc+_data_date.wwc};
        if (_data_date.type == 1) {_data_date.data = _data_date.yyyyc+_data_date.mmc+_data_date.ddc};
        
      $localstorage.setObject('dataDate',_data_date);    
    }
  }
  
  return $resource(url,{},{'query':{method:'GET', isArray:false}}); 
})



.factory('schedule_calculate_Next_Ant', function($localstorage,SCHEDULE_TYPE_MONTH,SCHEDULE_TYPE_WEEK,SCHEDULE_TYPE_DAY) {
  return{
    go: function(tipo) {
      var _data_date = $localstorage.getObject('dataDate');
      var _data;
      var _type;

      var today = new Date();
      var next_date = new Date();
      next_date.setDate(today.getDate()+20);
      
      console.log("fecha actual",today);
      console.log("fecha tomorrow",next_date);
      // var yyyy = date.getFullYear().toString();
      // var ww = (date.getWeek()).toString().length == 1 ? "0"+(date.getWeek()).toString() : (date.getWeek()).toString();       
      // var mm = (date.getMonth()+1).toString().length == 1 ? "0"+(date.getMonth()+1).toString() : (date.getMonth()+1).toString();
      // var dd = (date.getDate()).toString().length == 1 ? "0"+(date.getDate()).toString() : (date.getDate()).toString();

      switch(_data_date.type) {
          case SCHEDULE_TYPE_MONTH:
              var _new_value = (parseInt(_data_date.mmc))+tipo; 
              if (_new_value<10) {_new_value = "0"+_new_value};
              _data_date.mmc = _new_value;
              _data_date.data = _data_date.yyyy+_new_value;
              break;
          case SCHEDULE_TYPE_WEEK: 
              var _new_value = (parseInt(_data_date.ddc))+(tipo*7); 
              if (_new_value<10) {_new_value = "0"+_new_value};
              _data_date.ddc = _new_value;

              var _new_value_week = (parseInt(_data_date.wwc))+tipo; 
              if (_new_value_week<10) {_new_value_week = "0"+_new_value_week};
              _data_date.wwc = _new_value_week;

              _data_date.data = _data_date.yyyy+_new_value_week;
              break;
          case SCHEDULE_TYPE_DAY:
              var _new_value = (parseInt(_data_date.ddc))+tipo; 
              if (_new_value<10) {_new_value = "0"+_new_value};
              _data_date.ddc = _new_value;
              _data_date.data = _data_date.yyyy+_data_date.mm+_new_value;
              break;    
      } 
      $localstorage.setObject('dataDate',_data_date);
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