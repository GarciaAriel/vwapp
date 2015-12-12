angular.module('starter.constantProduct',[])  

// url get detail product
.constant('DETAIL_PRODUCT_URL','/bmapp/Product/Event/Forward/Update.do')

// url get participant in product
.constant('PARTICIPANT_PRODUCT_URL', '/bmapp/SalePosition/Participant/List.do')

// url join in product
.constant('JOIN_PRODUCT_URL', '/bmapp/SalePosition/Participant/Create.do')

// url list product mine
.constant('LIST_PRODUCT_MINE_URL', '/bmapp/Product/Event/Mine/List.do')

// get list products
.constant('LIST_PRODUCTS_URL','/bmapp/Product/Event/List.do');
