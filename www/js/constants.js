angular.module('starter.constants',[])  

//url server local
.constant('apiUrlLocal', 'http://localhost:8080/bm')

//url prueba celular
// .constant('apiUrlLocal', 'http://10.0.0.149:8080/bm')

//path webmail
.constant('pathWebmail', '/bmapp/Webmail/REST.do')

//path contact
.constant('pathContact', '/bmapp/Contact/REST.do')

.constant('SCHEDULE_TYPE_MONTH',3)
.constant('SCHEDULE_TYPE_WEEK',2)
.constant('SCHEDULE_TYPE_DAY',1)

//path schedule
.constant('pathSchedule', '/bmapp/Appointment/REST.do')

//color view
.constant('colo','color: #B80808')

//path logon
.constant('pathLogon','/bmapp/LogonBMApp.do');
