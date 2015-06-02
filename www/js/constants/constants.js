angular.module('starter.constants',[])  

.constant('apiUrlLocal', 'http://localhost:8080/bm')
// .constant('apiUrlLocal', 'http://10.0.0.148:8080/bm')

//url server local
// .constant('apiUrlLocal', 'localhost/bm')

//path contact
.constant('pathContact', '/bmapp/Contact/REST.do')

// path recent contact
.constant('recentContact', '/bmapp/Contact/Recent/List.do')


//path schedule
.constant('pathSchedule', '/bmapp/Appointment/REST.do')

//path logon
.constant('pathLogon','/bmapp/LogonBMApp.do')

//path logout
.constant('pathLogout','/bmapp/LogoffBMApp.do')

//color view
.constant('COLOR_VIEW','color: #ba0808')
.constant('COLOR_2','#ba0808');
// .constant('COLOR_VIEW','color: #1A36A7')





