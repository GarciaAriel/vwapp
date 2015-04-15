angular.module('starter.constants',[])  

// .constant('apiUrlLocal', 'http://192.168.1.3:8080/bm')
.constant('apiUrlLocal', 'http://localhost:8080/bm')

// .constant('apiUrlLocal', 'http://10.0.0.148:8080/bm')


//url prueba celular
// .constant('apiUrlLocal', 'http://10.0.0.149:8080/bm')



//path contact
.constant('pathContact', '/bmapp/Contact/REST.do')

.constant('SCHEDULE_TYPE_MONTH',3)
.constant('SCHEDULE_TYPE_WEEK',2)
.constant('SCHEDULE_TYPE_DAY',1)

.constant('SCHEDULE_TYPE_MONTH_STRING','month')
.constant('SCHEDULE_TYPE_WEEK_STRING','week')
.constant('SCHEDULE_TYPE_DAY_STRING','day')

//path schedule
.constant('pathSchedule', '/bmapp/Appointment/REST.do')

//color view
.constant('colo','color: #B80808')

//path logon
.constant('pathLogon','/bmapp/LogonBMApp.do')

//CONSTANTS FOR CONTACTS
//type of contact
// Contact person>1
.constant('PersonType','1')
// contact Organiztion or company> 0
.constant('OrgType','0');

