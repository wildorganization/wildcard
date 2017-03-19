appControllers.controller('homeCtrl', function ($scope, $mdBottomSheet, $timeout, $state,$stateParams, $ionicHistory, $http, appConst, Services, $ionicLoading, $localStorage, $mdToast) {

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

  // For show Grid Bottom Sheet.
  $scope.showGridBottomSheet = function ($event) {
    $mdBottomSheet.show({
      templateUrl: 'ui-grid-bottom-sheet-template',
      targetEvent: $event,
      scope: $scope.$new(false),
    });
  };// End of showGridBottomSheet.

  $scope.sugestoes = [];

  $scope.$on('$ionicView.enter', function(){
    $ionicLoading.show();

    Services.webServiceCallGetById(appConst.services.get_sugestoes, $localStorage.usuario.id_usuario, 0).then(function(sugestao) {
          $scope.sugestoes = sugestao.data;
    });

    $ionicLoading.hide();


  });

});

appControllers.controller('buscaCtrl', function ($scope, $timeout, $state,$stateParams, $ionicHistory, $http, appConst, Services, $ionicLoading, $localStorage, $mdToast) {

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
  $scope.logoPadrao = 'img/60.jpeg';

  $scope.busca = {};
  $scope.eventos = [];
  $scope.pessoas = [];
  $scope.grupos = [];
  $scope.locais = [];


    $ionicLoading.show();

    Services.webServiceCallGetById(appConst.services.get_eventos, $stateParams.objeto.interesse, 0).then(function(busca) {
      for (var i = 0; i < busca.data.length; i++) {
        $scope.eventos.push(busca.data[i]);
      }
    });

    Services.webServiceCallGetById(appConst.services.get_pessoas, $stateParams.objeto.interesse, 0).then(function(busca) {
      for (var i = 0; i < busca.data.length; i++) {
        $scope.pessoas.push(busca.data[i]);
      }
    });

    Services.webServiceCallGetById(appConst.services.get_grupos, $stateParams.objeto.interesse, 0).then(function(busca) {
      for (var i = 0; i < busca.data.length; i++) {
        $scope.grupos.push(busca.data[i]);
      }
    });

    Services.webServiceCallGetById(appConst.services.get_empresas, $stateParams.objeto.interesse, 0).then(function(busca) {
      for (var i = 0; i < busca.data.length; i++) {
        $scope.locais.push(busca.data[i]);
      }
    });

    $ionicLoading.hide();

});


