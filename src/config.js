import angular from 'angular';
import uiRouter from 'angular-ui-router';
import 'ngstorage';
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

const app = angular.module('workEat', [uiRouter, todoFactory.name, 'ngStorage']);

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
    controller: headerController
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
        controller: homeController
      }
    }
  })
  .state('app.account', {
    url: '/account',
    views : {
      '@': {
        templateUrl: accountTemplate,
        controller: accountController
      }
    }
  })
  .state('app.login', {
    url: '/login',
    views: {
      '@': {
        templateUrl: loginTemplate,
        controller: loginController
      }
    }
  })
  .state('app.createAccount', {
    url: '/signUp',
    views: {
      '@': {
        templateUrl: createAccountTemplate,
        controller: createAccountController
      }
    }
  })
  .state('app.user', {
    url: '/user',
    views: {
      '@': {
        templateUrl: userTemplate,
        controller: userController
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
        controller: tagsController
      }
    }
  })
  .state('app.admin.product', {
    url: '/product',
    views: {
      '@': {
        templateUrl: productsTemplate,
        controller: productsController
      }
    }
  });

  $locationProvider.html5Mode(true);
});

export default app;
