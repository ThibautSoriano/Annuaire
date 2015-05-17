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

    if ($routeParams.userId) {
      $routeParams.userId = $routeParams.userId.substr(1);
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + $routeParams.userId)
        .success(function (data) {
          if (data.status == "success") {
            $scope.currentUser = data.data;
            $scope.currentUser.email = $scope.currentUser.email;
            $scope.currentUser.website = $scope.currentUser.website;
          }
        });
    }


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

    $scope.deleteU=function(id) {

      $http.delete('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + id)
        .success(function (data) {
          if (data.status == "success") {
            $location.path('/users');
          }
        })
    }


    $scope.editU=function(id, nomM, prenomM, emailM, websiteM) {

      var datas = new Object();

      datas.name = nomM;
      datas.surname = prenomM;
      datas.email = emailM;
      datas.website = websiteM;

      var jsonDatas = JSON.stringify(datas);

      $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + id, jsonDatas)
        .success(function (data) {
          if (data.status == "success") {
            $location.path('/users');
          }
        })
    }

  }]);
