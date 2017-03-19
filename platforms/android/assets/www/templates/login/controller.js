appControllers.controller('cadastroCtrl', function ($scope, $timeout, $state,$stateParams, $ionicHistory, $http, appConst, Services, $ionicLoading, $localStorage, $mdToast) {

  $scope.navigateTo = function (stateName) {
    $timeout(function () {
      if ($ionicHistory.currentStateName() != stateName) {
        $ionicHistory.nextViewOptions({
          disableAnimate: false,
          disableBack: true
        });
        $state.go(stateName);
      }
    }, ($scope.isAnimated  ? 300 : 0));
  }; // End of navigateTo.

  $scope.dadoscadastro = {};

  $scope.salvaCadastro = function () {

    $ionicLoading.show();

    var dados = {
      nome: $scope.dadoscadastro.nome,
      cidade: $scope.dadoscadastro.cidade,
      login: $scope.dadoscadastro.usuario,
      email: $scope.dadoscadastro.email,
      senha: $scope.dadoscadastro.senha,
      sexo: $scope.dadoscadastro.sexo
    };

    Services.webServiceCallPost(dados, appConst.services.post_cadastra_usuario).then(function(response) {
      $ionicLoading.hide();
      if (response.error.message == "invalid_json") {
        $mdToast.show({controller: 'toastController',templateUrl: 'toast.html',hideDelay: 800,position: 'top',
          locals: {
            displayOption: {
              title: "Houve um erro, tente novamente!"
            }
          }
        });
      }else if (response.error.message == "require_login") {
        $mdToast.show({controller: 'toastController',templateUrl: 'toast.html',hideDelay: 800,position: 'top',
          locals: {
            displayOption: {
              title: "Usuário inválido!"
            }
          }
        });
      }else if (response.error.message == "require_email") {
        $mdToast.show({controller: 'toastController',templateUrl: 'toast.html',hideDelay: 800,position: 'top',
          locals: {
            displayOption: {
              title: "E-mail em branco!"
            }
          }
        });
      }else if (response.error.message == "require_senha") {
        $mdToast.show({controller: 'toastController',templateUrl: 'toast.html',hideDelay: 800,position: 'top',
          locals: {
            displayOption: {
              title: "Senha inválida!"
            }
          }
        });
      }else if (response.error.message == "usuario_registrado") {

        $mdToast.show({controller: 'toastController',templateUrl: 'toast.html',hideDelay: 800,position: 'top',
          locals: {
            displayOption: {
              title: "Usuário já existe!"
            }
          }
        });
      }else if (response.error.message == "ok") {

        $mdToast.show({controller: 'toastController',templateUrl: 'toast.html',hideDelay: 800,position: 'top',
          locals: {
            displayOption: {
              title: "Cadastrado com sucesso!"
            }
          }
        });

        $scope.navigateTo('app.login');
      }
    });
  };

});// End of device information Controller.

appControllers.controller('loginCtrl', function ($scope, $timeout, $state,$stateParams, $ionicHistory, $http, appConst, Services, $ionicLoading, $localStorage, $mdToast) {

  $scope.navigateTo = function (stateName) {

  }; // End of navigateTo.

  $scope.dadoslogin = {};

  $scope.signIn = function() {
    $ionicLoading.show();

    var dados = {
      login: $scope.dadoslogin.login,
      senha: $scope.dadoslogin.senha
    };

    $localStorage.usuario = {};

    Services.webServiceLogin(dados, appConst.services.login).then(function(response) {
      $ionicLoading.hide();

      if (response.error == "incorrect_login" || typeof response.error !== "undefined") {
        $mdToast.show({controller: 'toastController',templateUrl: 'toast.html',hideDelay: 800,position: 'top',
          locals: {
            displayOption: {
              title: "Verifique os dados informados!"
            }
          }
        });
      }else if (response.error == "require_email" || typeof response.error !== "undefined") {
        $mdToast.show({controller: 'toastController',templateUrl: 'toast.html',hideDelay: 800,position: 'top',
          locals: {
            displayOption: {
              title: "E-mail Inválido!"
            }
          }
        });
      } else if (response.error == "require_password" || typeof response.error !== "undefined") {
        $mdToast.show({controller: 'toastController',templateUrl: 'toast.html',hideDelay: 800,position: 'top',
          locals: {
            displayOption: {
              title: "Senha Inválida!"
            }
          }
        });
      }else if (response.error == "invalid_json" || typeof response.error !== "undefined") {
        $mdToast.show({controller: 'toastController',templateUrl: 'toast.html',hideDelay: 800,position: 'top',
          locals: {
            displayOption: {
              title: "Campos em branco!"
            }
          }
        });
      }else {

        angular.extend($localStorage.usuario, response);

        if ($localStorage.usuario.interesses == 0){
          $scope.loginRedirect('app.interessesInicio');
        }else{
          $scope.loginRedirect('app.home');
        }

      }
    });
  };

  $scope.loginRedirect = function(statename) {
    $timeout(function () {
      if ($ionicHistory.currentStateName() != statename) {
        $ionicHistory.nextViewOptions({
          disableAnimate: false,
          disableBack: true
        });
        $state.go(statename);
      }
    }, ($scope.isAnimated  ? 300 : 0));
  };




});// End of device information Controller.

appControllers.controller('interessesInicioCtrl', function ($q, filterFilter, $scope, $timeout, $state,$stateParams, $ionicHistory, $http, appConst, Services, $ionicLoading, $localStorage, $mdToast) {

  $scope.navigateTo = function (stateName) {

  }; // End of navigateTo.

  





});// End of device information Controller.
