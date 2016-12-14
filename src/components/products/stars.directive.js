import angular from 'angular';

const starDirective = angular.module('inputStars', [])
.directive('inputStars', [function () {
  function link(scope, element, attrs, ngModelCtrl) {
    var computed = {
      get readonly() {
        return attrs.readonly !== 'false' && (attrs.readonly || attrs.readonly === '');
      },
      get fullIcon() {
        return attrs.iconFull || 'fa-star';
      },
      get emptyIcon() {
        return attrs.iconEmpty || 'fa-star-o';
      },
      get iconBase() {
        return attrs.iconBase || 'fa fa-fw';
      },
      get iconHover() {
        return attrs.iconHover || 'angular-input-stars-hover';
      }
    };

    scope.items = new Array(+attrs.max);
    scope.listClass = attrs.listClass || 'angular-input-stars';

    ngModelCtrl.$render = function () {
      scope.lastValue = ngModelCtrl.$viewValue || 0;
    };

    scope.getClass = function (index) {
      var icon = index >= scope.lastValue ? computed.iconBase + ' ' + computed.emptyIcon : computed.iconBase + ' ' + computed.fullIcon + ' active ';
      return computed.readonly ? icon + ' readonly' : icon;
    };

    scope.unpaintStars = function ($index, hover) {
      scope.paintStars(scope.lastValue - 1, hover);
    };

    scope.paintStars = function ($index, hover) {
      // ignore painting if readonly
      if (computed.readonly) {
        return;
      }

      var items = element.find('li').find('i');

      for (var index = 0; index < items.length; index++) {
        var $star = angular.element(items[index]);

        if ($index >= index) {
          $star.removeClass(computed.emptyIcon);
          $star.addClass(computed.fullIcon);
          $star.addClass('price-text-color');
          $star.addClass(computed.iconHover);
        } else {
          $star.removeClass(computed.fullIcon);
          $star.removeClass('price-text-color');
          $star.removeClass(computed.iconHover);
          $star.addClass(computed.emptyIcon);

        }
      }

      if (! hover) {
        items.removeClass(computed.iconHover);
      }
    };

    scope.setValue = function (index, e) {
      // ignore setting value if readonly
      if (computed.readonly) {
        return;
      }

      var star = e.target,
      newValue;

      if (e.pageX < star.getBoundingClientRect().left + star.offsetWidth / 2) {
        newValue = index + 1;
      } else {
        newValue = index + 1;
      }

      scope.lastValue = newValue;

      ngModelCtrl.$setViewValue(newValue);
      ngModelCtrl.$render();

      if(attrs.onStarClick){
        scope.$eval(attrs.onStarClick);
      }

    };
  }


  var directive = {
    restrict: 'EA',
    replace: true,
    template: `
    <div ng-class="listClass" class="rating hidden-sm">
      <i ng-class="getClass($index)"
         ng-click="setValue($index, $event)"
         ng-touch="paintStars($index)"
         ng-mouseenter="paintStars($index, true)"
         ng-mouseleave="unpaintStars($index, false)"
         ng-repeat="item in items track by $index"></i>
    </div>
    `,
    require: 'ngModel',
    scope: true,
    link: link
  };

  return directive;
}]);

export default starDirective;
