'use strict';

angular.module('clubEstudiantesApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('/', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      });
  });
