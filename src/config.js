import angular from 'angular';
import uiRouter from 'angular-ui-router';
import 'ngstorage';
import 'ngmap';
import homeTemplate from './components/home/home.html';
import homeController from './components/home';
import accountTemplate from './components/account/account.html';
import accountController from './components/account';
import loginTemplate from './components/login/login.html';
import loginController from './components/login';
import createAccountTemplate from './components/createAccount/createAccount.html';
import createAccountController from './components/createAccount';
import userTemplate from './components/user/user.html';
import userController from './components/user';
import tagsTemplate from './components/tags/tags.html';
import tagsController from './components/tags';
import productsTemplate from './components/products/products.html';
import productsController from './components/products';
import adminTemplate from './components/admin/admin.html';
import headerTemplate from './components/header/header.html';
import headerController from './components/header';
import livraisonTemplate from './components/livraison/livraison.html';
import livraisonController from './components/livraison';
import paymentController from './components/payment';
import paymentTemplate from './components/payment/payment.html';
import shoppingController from './components/shopping';
import shoppingTemplate from './components/shopping/shopping.html';
import createArticleController from './components/createArticle';
import createArticleTemplate from './components/createArticle/createArticle.html';
import bundleController from './components/bundle';
import bundleTemplate from './components/bundle/bundle.html';
import prestataireTemplate from './components/prestataire/prestataire.html';
import csvController from './components/prestataire/csv';
import csvTemplate from './components/prestataire/csv/csv.html';

import starDirective from './components/products/stars.directive';

const app = angular.module('workEat', [uiRouter, 'ngStorage', 'ngMap', starDirective.name]);

app.directive('fileread', [function() {
  return {
    scope: {
      fileread: '=',
    },
    link: (scope, element) => {
      element.bind('change', (changeEvent) => {
        const reader = new FileReader();
        reader.onload = (loadEvent) => {
          scope.$apply(() => {
            scope.fileread = loadEvent.target.result;
          });
        };
        reader.readAsDataURL(changeEvent.target.files[0]);
      });
    },
  };
}]);

app.filter('pasteHTML', $sce => $sce.trustAsHtml);
// app.filter('km', () => (input) => `${input.toFixed(2)}m`)

app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
  $urlRouterProvider.otherwise('/');

  const header = {
    templateUrl: headerTemplate,
    controller: headerController,
    controllerAs: 'vm',
  };

  $stateProvider
  .state('app', {
    url: '',
    views: {
      header,
    },
  })
  .state('app.home', {
    url: '/',
    views: {
      '@': {
        templateUrl: homeTemplate,
        controller: homeController,
        controllerAs: 'vm',
      },
    },
  })
  .state('app.account', {
    url: '/account',
    views: {
      '@': {
        templateUrl: accountTemplate,
        controller: accountController,
        controllerAs: 'vm',
      },
    },
  })
  .state('app.login', {
    url: '/login',
    views: {
      '@': {
        templateUrl: loginTemplate,
        controller: loginController,
        controllerAs: 'vm',
      },
    },
  })
  .state('app.createAccount', {
    url: '/signUp',
    views: {
      '@': {
        templateUrl: createAccountTemplate,
        controller: createAccountController,
        controllerAs: 'vm',
      },
    },
  })
  .state('app.user', {
    url: '/user/:name',
    views: {
      '@': {
        templateUrl: userTemplate,
        controller: userController,
        controllerAs: 'vm',
      },
    },
  })
  .state('app.admin', {
    url: '/admin',
    views: {
      '@': {
        templateUrl: adminTemplate,
      },
    },
  })
  .state('app.admin.article', {
    url: '/article',
    views: {
      '@': {
        templateUrl: createArticleTemplate,
        controller: createArticleController,
        controllerAs: 'vm',
      },
    },
  })
  .state('app.admin.tag', {
    url: '/tag',
    views: {
      '@': {
        templateUrl: tagsTemplate,
        controller: tagsController,
        controllerAs: 'vm',
      },
    },
  })
  .state('app.admin.product', {
    url: '/product',
    views: {
      '@': {
        templateUrl: productsTemplate,
        controller: productsController,
        controllerAs: 'vm',
      },
    },
  })
  .state('app.admin.livraison', {
    url: '/map',
    views: {
      '@': {
        templateUrl: livraisonTemplate,
        controller: livraisonController,
        controllerAs: 'vm',
      },
    },
  })
  .state('app.admin.bundle', {
    url: '/bundle',
    views: {
      '@': {
        templateUrl: bundleTemplate,
        controller: bundleController,
        controllerAs: 'vm',
      }
    }
  })
  .state('app.prestataire', {
    url: '/prestataire',
    views: {
      '@': {
        templateUrl: prestataireTemplate,
      },
    },
  })
  .state('app.prestataire.csv', {
    url: '/csv',
    views: {
      '@': {
        templateUrl: csvTemplate,
        controller: csvController,
        controllerAs: 'vm',
      },
    },
  })
  .state('app.payment', {
    url: '/payment/:id',
    views: {
      '@': {
        templateUrl: paymentTemplate,
        controller: paymentController,
        controllerAs: 'vm',
      },
    },
  })
  .state('app.shopping', {
    url: '/shopping',
    views: {
      '@': {
        templateUrl: shoppingTemplate,
        controller: shoppingController,
        controllerAs: 'vm',
      },
    },
  });

  $locationProvider.html5Mode(true);
});

export default app;
