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
//          var autoRemoveInterval = $scope.$eval($attrs.autoRemoveInterval) * 1;
          var autoRemoveFn = $scope.$eval($attrs.autoRemoveFn);
//          var removeInterval = 60*60*10000;

          var intervalPromise = null;

          function blurHandler() {
            $scope.$apply(function() {
              autoSaveFn();
            });
          }

          $scope.$watch('autoSaveModel', function() {
              console.log('autoSaveModel',autoSaveModel);
              console.log('latestModel',latestModel);
          });

          var autosave = function() {
            console.log('autosave called')
            if(autoSaveMode === 'interval') {
              intervalPromise = $interval(function() {
                if(!hasModel || !angular.equals(latestModel, autoSaveModel)) {
                  latestModel = angular.copy(autoSaveModel);
                  autoSaveFn();
                }
              }, autoSaveInterval);
            } else if (autoSaveMode === 'blur') {
              $element.find('input').on('blur', blurHandler);
            }
          }

          autosave();



            var removeFromLocalStorage = $interval(function() {
              console.log('inside directive to remove')
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
