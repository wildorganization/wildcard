appControllers.controller('grupoCtrl', function ($scope, $timeout, $state,$stateParams, $ionicHistory, $http, appConst, Services, $ionicLoading, $localStorage, $mdToast) {

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

  $scope.nomeGrupo = $stateParams.objeto.nome;
  $scope.descricaoGrupo = $stateParams.objeto.descricao;
  $scope.fotoGrupo = $stateParams.objeto.imagem;

  var imagePath = 'img/60.jpeg';
  $scope.forum = [];

  $scope.eventos = [];

  $scope.pessoas = [];

  $ionicLoading.show();
  Services.webServiceCallGetById(appConst.services.get_foruns, $stateParams.objeto.id_grupo, 0).then(function(busca) {
    for (var i = 0; i < busca.data.length; i++) {
      $scope.forum.push(busca.data[i]);
    }
  });

  Services.webServiceCallGetById(appConst.services.get_eventosf, $stateParams.objeto.id_grupo, 0).then(function(busca) {
    for (var i = 0; i < busca.data.length; i++) {
      $scope.eventos.push(busca.data[i]);
    }
  });

  Services.webServiceCallGetById(appConst.services.get_usuariosg, $stateParams.objeto.id_grupo, 0).then(function(busca) {
    for (var i = 0; i < busca.data.length; i++) {
      $scope.pessoas.push(busca.data[i]);
    }
  });

  $ionicLoading.hide();


});// End of device information Controller.



appControllers.controller('forumCtrl', function ($scope, $timeout, $state,$stateParams, $ionicHistory, $http, appConst, Services, $ionicLoading, $localStorage, $mdToast) {

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

  $scope.msgs = [];
  $scope.caminhoImagem = appConst.serviceUrl.imagens;
  $scope.nomeForum = $stateParams.objeto.titulo_topico;
  $scope.descricaoForum = $stateParams.objeto.descricao;

  $scope.$on('$ionicView.enter', function(){
    $ionicLoading.show();

    Services.webServiceCallGetById(appConst.services.get_mensagemf, $stateParams.objeto.id_forum, 0).then(function(msg) {
      for (var i = 0; i < msg.data.length; i++) {
        $scope.msgs.push(msg.data[i]);
      }
    });

    $ionicLoading.hide();


  });


});// End of device information Controller.

