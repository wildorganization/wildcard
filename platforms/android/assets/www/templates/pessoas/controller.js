appControllers.controller('usuariosCtrl', function ($scope, $timeout, $state,$stateParams, $ionicHistory, $http, appConst, Services, $ionicLoading, $localStorage, $mdToast) {

  $scope.navigateTo = function (stateName, objectData) {

    $timeout(function () {
      if ($ionicHistory.currentStateName() != stateName) {
        $ionicHistory.nextViewOptions({
          disableAnimate: false,
          disableBack: false
        });

        $state.go(stateName, {
          objeto: objectData
        });
      }
    }, ($scope.isAnimated  ? 300 : 0));
  }; // End of navigateTo.

  $scope.caminhoImagem = appConst.serviceUrl.imagens;
  $scope.nomeUsuario = $stateParams.objeto.nome;
  $scope.descricaoUsuario = $stateParams.objeto.descricao;
  $scope.loginUsuario = $stateParams.objeto.login;
  $scope.emailUsuario = $stateParams.objeto.email;
  $scope.cidadeUsuario = $stateParams.objeto.cidade;
  $scope.fotoUsuario = $stateParams.objeto.imagem;

});
