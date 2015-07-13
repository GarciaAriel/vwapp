angular.module('starter.constantsSchedule',[])  

.constant('NEW_APPOINTMENT_FORWARD','/bmapp/Appointment/Forward/Create.do') 


// create appointment
.constant('CREATE_APPOINTMENT_URL','/bmapp/Appointment/Create.do')

// update appointment
.constant('UPDATE_APPOINTMENT_URL','/bmapp/Appointment/Update.do')

// CONSTANTS TYPE SCHEDULE STRING
.constant('SCHEDULE_TYPE_MONTH_STRING','month')
.constant('SCHEDULE_TYPE_WEEK_STRING','week')
.constant('SCHEDULE_TYPE_DAY_STRING','day')

// CONSTANTS TYPE SCHEDULE INT
.constant('SCHEDULE_TYPE_MONTH',3)
.constant('SCHEDULE_TYPE_WEEK',2)
.constant('SCHEDULE_TYPE_DAY',1)

// DEFAULT TYPE OF CUSTOM FOLDER
.constant('FOLDE','default');
