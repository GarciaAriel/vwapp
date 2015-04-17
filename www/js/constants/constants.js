angular.module('starter.constants',[])  

//url server local

//.constant('apiUrlLocal', 'http://localhost:8080/bm')

//.constant('apiUrlLocal', 'http://192.168.1.3:8080/bm')

// .constant('apiUrlLocal', 'http://192.168.1.8:8080/bm')
.constant('apiUrlLocal', 'http://localhost:8080/bm')

// .constant('apiUrlLocal', 'http://10.0.0.148:8080/bm')

//url prueba celular
// .constant('apiUrlLocal', 'http://10.0.0.149:8080/bm')

//path contact
.constant('pathContact', '/bmapp/Contact/REST.do')

//path schedule
.constant('pathSchedule', '/bmapp/Appointment/REST.do')

//color view
.constant('COLOR_VIEW','color: #2FA71A')
.constant('COLOR_2','#2FA71A')
// .constant('COLOR_VIEW','color: #1A36A7')

//path logon
.constant('pathLogon','/bmapp/LogonBMApp.do')

//CONSTANTS FOR CONTACTS
//type of contact
// Contact person>1
.constant('PersonType',1)
// contact Organiztion or company> 0
.constant('OrgType',0);

