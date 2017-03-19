appControllers.controller('eventosCtrl', function ($scope, $timeout, $state,$stateParams, $ionicHistory, $http, appConst, Services, $ionicLoading, $localStorage, $mdToast) {

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

  $scope.nomeEvento = $stateParams.objeto.nome;
  $scope.descricaoEvento = $stateParams.objeto.descricao;
  $scope.fotoEvento = $stateParams.objeto.imagem;


  $scope.dados = [
    {
      number: $stateParams.objeto.data,
      options: {
        icon: 'fa-calendar'
      }
    },
    {
      number: $stateParams.objeto.horario,
      options: {
        icon: 'fa-calendar'
      }
    },
    {
      number: $stateParams.objeto.endereco,
      options: {
        icon: 'fa-map-marker'
      }
    },
    {
      number: $stateParams.objeto.cidade,
      options: {
        icon: 'fa-map-marker'
      }
    },
    {
      number: $stateParams.objeto.valor_ingresso,
      options: {
        icon: 'fa-money'
      }
    }
  ];
});


appControllers.controller('novoEventoCtrl', function ($scope, $timeout, $state,$stateParams, $ionicHistory, $http, appConst, Services, $ionicLoading, $localStorage, $mdToast) {

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

  $scope.dadoscadastro = {};

  $scope.salvaCadastro = function () {

    $ionicLoading.show();

    var dados = {
      nome: $scope.dadoscadastro.nome,
      descricao: $scope.dadoscadastro.descricao,
      horario: $scope.dadoscadastro.horario,
      endereco: $scope.dadoscadastro.endereco,
      cidade: $scope.dadoscadastro.cidade,
      data: $scope.dadoscadastro.data,
      valor_ingresso: $scope.dadoscadastro.valor_ingresso
    };

    Services.webServiceCallPost(dados, appConst.services.post_cadastra_evento).then(function(response) {
      $ionicLoading.hide();
      if (response.error.message == "invalid_json") {
        $mdToast.show({controller: 'toastController',templateUrl: 'toast.html',hideDelay: 800,position: 'top',
          locals: {
            displayOption: {
              title: "Houve um erro, tente novamente!"
            }
          }
        });
      }else{
        $localStorage.eventonovo = response.error.message;
        $mdToast.show({controller: 'toastController',templateUrl: 'toast.html',hideDelay: 800,position: 'top',
          locals: {
            displayOption: {
              title: "Cadastrado com sucesso!"
            }
          }
        });

        $scope.navigateTo('app.interesseevento');

      }
    });
  };
});// End of device information Controller.

appControllers.controller('interesseEventoCtrl', AppCtrl);

function AppCtrl($q, filterFilter, Services, $scope, $localStorage, $ionicLoading, $mdToast) {
  var vm = this;

  vm.selectedItem = null;
  vm.searchText = null;
  vm.selectedFoods = [];
  vm.transformChip = transformChip;
  var foodArray = [];

  vm.querySearchDeferred = querySearchDeferred;

  Services.webServiceCallGet('busca/interesses').then(function(busca) {
    for (var i = 0; i < busca.data.length; i++) {
      foodArray.push(busca.data[i]);
    }
  });

  function transformChip(chip) {
    if (angular.isObject(chip)) {
      return chip;
    }
  }

  function querySearchDeferred(query) {
    var deferred = $q.defer();

    setTimeout(function() {

      if (query) {
        deferred.resolve(filterFilter(foodArray, query));
      } else {
        deferred.reject([{tag: 'Sem'}]);
      }
    }, 200);
    return deferred.promise;
  }


  $scope.salvaInteresses = function () {


    var interesse = [
      {id_interesse: '1'},
      {id_interesse: '2'},
      {id_interesse: '3'}
    ];



    $ionicLoading.show();

    for (var i = 0; i < interesse.length; i++) {
      var dados = {
        id_evento: interesse[i].id_evento,
        id_empresa: $localStorage.eventonovo
      };

      Services.webServiceCallPost(dados, 'cadastros/add_interesse_evento').then(function (response) {
        
      });
    }
    
    $scope.navigateTo('app.home');

    $ionicLoading.hide();
  };

};
