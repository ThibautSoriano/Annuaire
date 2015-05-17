'use strict';

/**
 * @ngdoc function
 * @name pooIhmExemplesApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the pooIhmExemplesApp
 */
angular.module('pooIhmExemplesApp')
  .controller('UsersCtrl', ['$scope', '$http', '$location', '$routeParams', function ($scope, $http, $location, $routeParams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users')
      .success(function(data) {
        $scope.users = data.data;
      });

    $scope.clickedOnUser = function(id) {
      this.details = !this.details;
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + id)
          .success(function (data) {
            if (data.status == "success") {
              $scope.currentUser = data.data;
            }
          });

    }



    $scope.hoverIn = function() {
      this.hoverEdit = true;
    }

    $scope.hoverOut = function() {
      this.hoverEdit = false;
    }

    $scope.addU=function(nomA, prenomA, emailA, websiteA) {
      var datas = new Object();

      if (nomA == null || nomA == "") {
        return;
      }
      datas.name = nomA;

      if (prenomA == null || prenomA == "") {
        return;
      }
      datas.surname = prenomA;
      datas.email = emailA;
      datas.website = websiteA;

      var jsonDatas = JSON.stringify(datas);

      $http.post('http://poo-ihm-2015-rest.herokuapp.com/api/Users/', jsonDatas)
        .success(function (data) {
          if (data.status == "success") {
            $location.path('/users');
          }
        })
    }

    $scope.deleteU=function(id)
  }]);
