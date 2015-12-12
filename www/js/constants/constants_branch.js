angular.module('starter.constants_branch',[])  

// get list branch
.constant('BRANCH_LIST_URL','/bmapp/Branch/List.do')

//path contact person list en branch
.constant('CONTACT_PERSON_BRANCH_URL', '/bmapp/Branch/Member/List.do')

// get detail contact person en branch
.constant('DETAIL_CONTACT_PERSON_BRANCH_URL','/bmapp/Branch/Member/Forward/Update.do');