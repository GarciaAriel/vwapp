angular.module('starter.constantsWebmail',[])  

//path webmail
.constant('PATH_WEBMAIL', '/bmapp/Webmail/REST.do')

//path webmail
.constant('PATH_WEBMAIL_READ_FOLDERS', '/bmapp/Mail/ReadFolders.do')

//	TYPE BODY
.constant('BODY_TYPE_HTML','1')

//	TYPE BODY
.constant('BODY_TYPE_TEXT','2')

//	FOLDER INBOX
.constant('FOLDER_INBOX_ID','inboxId')
.constant('FOLDER_INBOX_NAME','inboxName')

//	FOLDER SENT
.constant('FOLDER_SENT_ID','sentId')
.constant('FOLDER_SENT_NAME','sendName')

//	FOLDER DRAFT
.constant('FOLDER_DRAFT_ID','draftId')
.constant('FOLDER_DRAFT_NAME','draftName')

//	FOLDER TRASH
.constant('FOLDER_TRASH_ID','trashId')
.constant('FOLDER_TRASH_NAME','trashName')

//	FOLDER OUTBOX
.constant('FOLDER_OUTBOX_ID','outboxId')
.constant('FOLDER_OUTBOX_NAME','outboxName');