angular.module('starter.constantProfile',[])  

.constant('MY_PROFILE_URL', '/bmapp/User/Profile/Forward/Detail.do')
									
.constant('FORWARD_UPDATE_URL', '/bmapp/User/Change/Forward/Update.do')

// get product detail
.constant('DETAIL_PRODUCT_URL','/bmapp/Product/Forward/Update.do')

.constant('CHANGE_INFO_URL','/bmapp/User/Change/Update.do')

// get list products
.constant('LIST_PRODUCTS_URL','/bmapp/Product/List.do');