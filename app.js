var app = angular.module('Fundoo.Directives.AutoSave', ['ngRoute']);
		console.log('Helloo');
app.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'form.html',
				controller: 'FormController as frmCtrl'
			})
			.when('/next', {
				templateUrl: 'display.html',
				controller: 'DisplayController as displayCtrl'
			})
			.otherwise({redirectTo: '/'});
	}
]);

app.controller('FormController', ['$location',
		function($location) {
			var self = this;
			self.modelObj = {name: '', email: ''};
			self.submitForm = function() {
				console.log('Saving modelObj : ', self.modelObj);
			};

			self.partialSave = function() {
				console.log('auto saving : ', self.modelObj);
			};

			self.next = function() {
				$location.path('/next');
			}
		}
	]);

app.controller('DisplayController', [
		function() {
			var self = this;
			self.display = 'Random Data';
		}
	]);