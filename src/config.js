import angular from 'angular';
import uiRouter from 'angular-ui-router';
import 'ngstorage';
import 'ngmap';
import todoFactory from 'factories/todo-factory';
import homeTemplate from 'components/home/home.html';
import homeController from 'components/home';
import accountTemplate from 'components/account/account.html';
import accountController from 'components/account';
import loginTemplate from 'components/login/login.html';
import loginController from 'components/login';
import createAccountTemplate from 'components/createAccount/createAccount.html';
import createAccountController from 'components/createAccount';
import userTemplate from 'components/user/user.html';
import userController from 'components/user';
import tagsTemplate from 'components/tags/tags.html';
import tagsController from 'components/tags';
import productsTemplate from 'components/products/products.html';
import productsController from 'components/products';
import adminTemplate from 'components/admin/admin.html';
import headerTemplate from 'components/header/header.html';
import headerController from 'components/header';
import livraisonTemplate from 'components/livraison/livraison.html';
import livraisonController from 'components/livraison';

const app = angular.module('workEat', [uiRouter, todoFactory.name, 'ngStorage', 'ngMap']);

app.directive('fileread', [function () {
    return {
        scope: {
            fileread: '='
        },
        link: (scope, element) => {
            element.bind('change', changeEvent => {
                var reader = new FileReader();
                reader.onload = loadEvent => {
                    scope.$apply(() => {
                        scope.fileread = loadEvent.target.result;
                    });
                };
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    };
}]);

app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
  $urlRouterProvider.otherwise('/');

  const header = {
    templateUrl: headerTemplate,
    controller: headerController,
    controllerAs: 'vm'
  };

  $stateProvider
  .state('app', {
    url: '',
    views: {
      header
    }
  })
  .state('app.home', {
    url: '/',
    views: {
      '@': {
        templateUrl: homeTemplate,
        controller: homeController,
        controllerAs: 'vm'
      }
    }
  })
  .state('app.account', {
    url: '/account',
    views : {
      '@': {
        templateUrl: accountTemplate,
        controller: accountController,
        controllerAs: 'vm'
      }
    }
  })
  .state('app.login', {
    url: '/login',
    views: {
      '@': {
        templateUrl: loginTemplate,
        controller: loginController,
        controllerAs: 'vm'
      }
    }
  })
  .state('app.createAccount', {
    url: '/signUp',
    views: {
      '@': {
        templateUrl: createAccountTemplate,
        controller: createAccountController,
        controllerAs: 'vm'
      }
    }
  })
  .state('app.user', {
    url: '/user/:name',
    views: {
      '@': {
        templateUrl: userTemplate,
        controller: userController,
        controllerAs: 'vm'
      }
    }
  })
  .state('app.admin', {
    url: '/admin',
    views: {
      '@': {
        templateUrl: adminTemplate
      }
    }
  })
  .state('app.admin.tag', {
    url: '/tag',
    views: {
      '@': {
        templateUrl: tagsTemplate,
        controller: tagsController,
        controllerAs: 'vm'
      }
    }
  })
  .state('app.admin.product', {
    url: '/product',
    views: {
      '@': {
        templateUrl: productsTemplate,
        controller: productsController,
        controllerAs: 'vm'
      }
    }
  })
  .state('app.admin.livraison', {
    url: '/map',
    views: {
      '@': {
        templateUrl: livraisonTemplate,
        controller: livraisonController,
        controllerAs: 'vm'
      }
    }
  });

  $locationProvider.html5Mode(true);
});

export default app;
