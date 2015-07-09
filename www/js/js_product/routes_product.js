
angular.module('starter.productRoutes', ['starter.productsController'])

.config(function($stateProvider, $urlRouterProvider) {


  $stateProvider.state('app.products', {
    url: '/products',
    cache: true,
    views: {
      'menuContent': {
       controller: 'productsCtrl',
       templateUrl: 'templates/views_product/productList.html'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
  
});
