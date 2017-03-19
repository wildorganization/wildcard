appControllers.controller('perfilUsuarioCtrl', function ($scope, $timeout, $state,$stateParams, $ionicHistory, $http, appConst, Services, $ionicLoading, $localStorage, $mdToast) {

  $scope.navigateTo = function (stateName) {
    $timeout(function () {
      if ($ionicHistory.currentStateName() != stateName) {
        $ionicHistory.nextViewOptions({
          disableAnimate: false,
          disableBack: false
        });
        $state.go(stateName);
      }
    }, ($scope.isAnimated  ? 300 : 0));
  }; // End of navigateTo.

  $scope.dadosperfil = {};

  $scope.dadosperfil.nome = $localStorage.usuario.nome;
  $scope.dadosperfil.login = $localStorage.usuario.login;
  $scope.dadosperfil.email = $localStorage.usuario.email;
  $scope.dadosperfil.descricao = $localStorage.usuario.descricao;
  $scope.dadosperfil.cidade = $localStorage.usuario.cidade;

  $scope.updatePerfil = function() {

    var dados = {
      id_usuario: $localStorage.usuario.id_usuario,
      nome: $scope.dadosperfil.nome,
      login: $scope.dadosperfil.login,
      senha: $scope.dadosperfil.senha,
      email: $scope.dadosperfil.email,
      descricao: $scope.dadosperfil.descricao,
      cidade: $scope.dadosperfil.cidade
    };

    //Atualizar usuario
    Services.webServiceCallPost(dados, appConst.services.put_perfil).then(function (response) {
      $ionicLoading.show();
      if (response.error.message == "invalid_json") {
        $mdToast.show({controller: 'toastController',templateUrl: 'toast.html',hideDelay: 800,position: 'top',
          locals: {
            displayOption: {
              title: "Erro, tente novamente!"
            }
          }
        });
      }else if (response.error.message == "login_exist") {
        $mdToast.show({controller: 'toastController',templateUrl: 'toast.html',hideDelay: 800,position: 'top',
          locals: {
            displayOption: {
              title: "Login diferente do cadastrado!"
            }
          }
        });
      } else if (response.error.message == "perfil_atualizado") {
        $mdToast.show({
          controller: 'toastController', templateUrl: 'toast.html', hideDelay: 800, position: 'top',
          locals: {
            displayOption: {
              title: "Perfil atualizado com sucesso!"
            }
          }
        });
      }

      $ionicLoading.hide();
    });

  };


});
