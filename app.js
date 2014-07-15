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

app.controller('FormController', ['$location', 'toaster',
		function($location, toaster) {
      var self = this;
      self.modelObj = {name: '', email: '', gender: '', hobbies: []};
      self.gender = ['Male', 'Female'];
      self.hobbies = [
        {value: 'Playing', selected: false },
        {value: 'Reading', selected: false },
        {value: 'Surfing', selected: false },
        {value: 'Drawing', selected: false }
      ];
      self.submitForm = function () {
        toaster.pop('success', '', 'Form has been submitted')
      };

      self.partialSave = function () {
        toaster.pop('success', '', 'Form auto-save has been triggered');
      };

      self.next = function () {
        $location.path('/next');
      };
    }
	]);

app.controller('DisplayController', [
		function() {
			var self = this;
			self.display = 'Random Data';
		}
	]);
