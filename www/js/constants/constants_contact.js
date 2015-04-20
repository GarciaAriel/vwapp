angular.module('starter.constantscontact',[])  


.constant('apiUrlLocal', 'http://localhost:8080/bm')

.constant('pathContact', '/bmapp/Contact/REST.do')

//CONSTANTS FOR CONTACTS
//type of contact
// Contact person>1
.constant('PersonType',1)
// contact Organiztion or company> 0
.constant('OrgType',0);