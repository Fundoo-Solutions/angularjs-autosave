angular.module('Fundoo.Directives.AutoSave', [])
  .directive('autoSave', ['$interval',
    function($interval) {
      return {
        restrict: 'A',
        require: 'form',
        link: function($scope, $element, $attrs) {
          var latestModel = null;
          var autoSaveModel = $scope.$eval($attrs.autoSaveModel);
          var hasModel = !!autoSaveModel;
          var autoSaveFn = $scope.$eval($attrs.autoSaveFn);
          var autoSaveMode = $attrs.autoSaveMode;
          var autoSaveInterval = $scope.$eval($attrs.autoSaveInterval) * 1;
          latestModel = angular.copy(autoSaveModel);
          var intervalPromise = null;



          function blurHandler() {
            $scope.$apply(function() {
              autoSaveFn();
            });
          }

            var autoSave = function() {
              if(autoSaveMode === 'interval') {
                intervalPromise = $interval(function() {
                  autoSaveModel = $scope.$eval($attrs.autoSaveModel);
                  if(!hasModel || !angular.equals(latestModel, autoSaveModel)) {
                    latestModel = angular.copy(autoSaveModel);
                    autoSaveFn();
                  }
                }, autoSaveInterval);
              }
            }

          autoSave();

          var removeFromLocalStorage = $interval(function() {
              autoRemoveFn();
            }, 600000/10 );



          $element.on('$destroy', function(event) {
            if(intervalPromise) {
              $interval.cancel(intervalPromise);
            }
            if (autoSaveMode === 'blur') {
              $element.find('input').off('blur', blurHandler);
            }
          });
        }
      }
    }
  ]);
