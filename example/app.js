
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
      self.isActive = false;
      self.modelObj = {Firstname: '', Lastname: '' , email: '', gender: '', city: ''};
      self.gender = ['Male', 'Female'];
      self.modelObj.hobbies = [
        {value: 'Playing', selected: false },
        {value: 'Reading', selected: false },
        {value: 'Surfing', selected: false },
        {value: 'Drawing', selected: false }
      ];
      self.cities  = ['Mumbai','Pune', 'Bangalore', 'Delhi'];


      self.submitForm = function () {
        toaster.pop('success', '', 'Form has been submitted');
        localStorageService.remove('localStorageDemo');
      };

      self.partialSave = function () {
        toaster.pop('success', '', 'Form auto-save has been triggered');
        localStorageService.set('localStorageDemo', self.modelObj);
        self.isActive = false
      };

      self.restore = function () {
        self.modelObj = localStorageService.get('localStorageDemo');
        self.isActive = false;
        localStorageService.remove('localStorageDemo');
      };

      self.remove = function() {
        localStorageService.set('localStorageDemo', null);
        self.isActive = false;
      };

      var isEmpty = function() {
        var dummyObj = localStorageService.get('localStorageDemo');
        self.isActive = !!dummyObj
      };

      isEmpty();

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
