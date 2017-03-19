"use strict";
appServices.factory('Services', function($http, $rootScope, $timeout, $ionicLoading, $q, appConst) {

  $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
  return {

    webServiceCallPost: function(data, action) {
      var deferred = $q.defer();
      if (navigator.connection.type != "none") {
        return $.ajax({
          type: "POST",
          url: appConst.serviceUrl.service + action,
          crossDomain: true,
          dataType: "json",
          data: data,
          timeout: 2000000,
          async: true,
          success: function(response) {
            deferred.resolve();
          },
          error: function(xhr, ajaxOptions, thrownError) {
            $ionicLoading.hide();
            if (xhr.status == 0) {
              window.plugins.toast.showShortBottom("Erro");
            } else if (xhr.status == 404) {
              window.plugins.toast.showShortBottom("Erro");
            } else {
              window.plugins.toast.showShortBottom("Erro");
            }
          },
          beforeSend: function() {},
          complete: function() {}
        });
      } else {
        window.plugins.toast.showShortBottom("Erro");
        $ionicLoading.hide();
        var response1 = [{
          "data": []
        }, {
          "response": {
            "message": "Erro",
            "status": 0
          }
        }];
        return $http.get('').then(function(response) {
          return response1;
        });
      }
    },

    forgotPasswordService: function(data, action) {
      var deferred = $q.defer();
      if (navigator.connection.type != "none") {
        return $.ajax({
          type: "POST",
          url: appConst.serviceUrl.service_login + action,
          crossDomain: true,
          dataType: "json",
          data: data,
          timeout: 20000,
          async: true,
          success: function(response) {
            deferred.resolve();
          },
          error: function(xhr, ajaxOptions, thrownError) {
            $ionicLoading.hide();
            if (xhr.status == 0) {
              window.plugins.toast.showShortBottom("Erro");
            } else if (xhr.status == 404) {
              window.plugins.toast.showShortBottom("Erro");
            } else {
              window.plugins.toast.showShortBottom("Erro");
            }
          },
          beforeSend: function() {},
          complete: function() {}
        });
      } else {
        window.plugins.toast.showShortBottom("Erro");
        $ionicLoading.hide();
        var response1 = [{
          "data": []
        }, {
          "response": {
            "message": "Erro",
            "status": 0
          }
        }];
        return $http.get('').then(function(response) {
          return response1;
        });
      }
    },

    webServiceCallGet: function(action) {
      return $http.get(appConst.serviceUrl.service + action).then(function(response) {
        return response;
      });
    }
  }
});
