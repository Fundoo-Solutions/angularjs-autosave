
var app = angular.module('Fundoo.Directives.AutoSave.Example',
  ['ngRoute', 'Fundoo.Directives.AutoSave', 'toaster', 'LocalStorageModule']);

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

app.controller('FormController', ['$location', 'toaster', '$scope', 'localStorageService',
    function($location, toaster, $scope, localStorageService) {
      var self = this;
      self.modelObj = self.dummyObj= {name: '', email: '', gender: '', city: ''};
      self.gender = ['Male', 'Female'];
      self.modelObj.hobbies = [
        {value: 'Playing', selected: false },
        {value: 'Reading', selected: false },
        {value: 'Surfing', selected: false },
        {value: 'Drawing', selected: false }
      ];
      self.city = ['Mumbai','Pune', 'Bangalore', 'Delhi'];

      self.submitForm = function () {
        toaster.pop('success', '', 'Form has been submitted')
      };

      self.partialSave = function () {
        toaster.pop('success', '', 'Form auto-save has been triggered');
        console.log('self.modelObj',self.modelObj)
        localStorageService.set('localStorageDemo', self.modelObj);
      };

      self.restore = function () {
        self.modelObj = localStorageService.get('localStorageDemo');
      };

      self.remove = function() {
        console.log('inside remove fn')
        localStorageService.remove('localStorageDemo');
      }

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
