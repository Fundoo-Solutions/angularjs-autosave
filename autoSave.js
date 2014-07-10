angular.module('Fundoo.Directives.AutoSave')
	.directive('autoSave', ['$interval'
		function($interval) {
			return {
				restrict: 'A',
				require: 'form',
				link: function($scope, $element, $attrs) {
					var latestModel = null;
					var autoSaveModel = $scope.$eval($attrs.autoSaveModel);
					var autoSaveFn = $scope.$parse($attrs.autoSaveFn);
					var autoSaveMode = $scope.$eval($attrs.autoSaveMode);
					var autoSaveInterval = $scope.$eval($attrs.autoSaveInterval) * 1;
					latestModel = angular.copy(autoSaveModel);
					var intervalPromise = null;

					if(autoSaveMode === 'interval') {
						intervalPromise = $interval(function() {
							if(!angular.equals(latestModel, autoSaveModel)) {
								latestModel = angular.copy(autoSaveModel);
								autoSaveFn();
							}
						}, autoSaveInterval);
					}

					$scope.$on('$destroy', function(event) {
						if(intervalPromise) {
							intervalPromise.cancel();
						}
					});
				}
			}
		}
	]); 