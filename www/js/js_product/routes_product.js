
angular.module('starter.productRoutes', ['starter.listProduct','starter.detailProduct','starter.participants'])

.config(function($stateProvider, $urlRouterProvider) {

  // route product list
  $stateProvider.state('app.products', {
    url: '/products',
    cache: true,
    views: {
      'menuContent': {
       controller: 'productsCtrl',
       templateUrl: 'templates/views_product/list.html'
      }
    }
  })

  // route detail product
  $stateProvider.state('app.productDetail', {
    url: "/productDetail?productId&productName",
    cache: true,
    views: {
      'menuContent': {
       controller: 'ProductDetail_Controller',
       templateUrl: 'templates/views_product/detail.html'
      }
    }
  })

  // route participants product
  $stateProvider.state('app.participants', {
    url: '/participants?productId',
    cache: true,
    views: {
      'menuContent': {
       controller: 'participants',
       templateUrl: 'templates/views_product/participants.html'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
  
});
