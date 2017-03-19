appControllers.controller('locaisCtrl', function ($scope, $timeout, $state,$stateParams, $ionicHistory, $http, appConst, Services, $ionicLoading, $localStorage, $mdToast) {

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
  $scope.topo = $stateParams.objeto.imagem;
  $scope.nomeLocal = $stateParams.objeto.nome;
  $scope.descricaoLocal = $stateParams.objeto.descricao;


  $scope.phones = [
    {
      number: $stateParams.objeto.telefone,
      options: {
        icon: 'fa-phone-square'
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
      number: $stateParams.objeto.email,
      options: {
        icon: 'fa-envelope'
      }
    },
    {
      number: $stateParams.objeto.horario_funcionamento,
      options: {
        icon: 'fa-clock-o'
      }
    }
  ];
});// End of device information Controller.


appControllers.controller('novoLocalCtrl', function ($scope, $timeout, $state,$stateParams, $ionicHistory, $http, appConst, Services, $ionicLoading, $localStorage, $mdToast) {

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
      horario_funcionamento: $scope.dadoscadastro.horario_funcionamento,
      endereco: $scope.dadoscadastro.endereco,
      cidade: $scope.dadoscadastro.cidade,
      email: $scope.dadoscadastro.email,
      telefone: $scope.dadoscadastro.telefone
    };

    Services.webServiceCallPost(dados, appConst.services.post_cadastra_local).then(function(response) {
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
        $localStorage.localnovo = response.error.message;
        $mdToast.show({controller: 'toastController',templateUrl: 'toast.html',hideDelay: 800,position: 'top',
          locals: {
            displayOption: {
              title: "Cadastrado com sucesso!"
            }
          }
        });

        $scope.navigateTo('app.interesselocal');

      }
    });
  };
});// End of device information Controller.

appControllers.controller('interesseLocalCtrl', AppCtrl);

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
        id_interesse: interesse[i].id_interesse,
        id_empresa: $localStorage.localnovo
      };

      Services.webServiceCallPost(dados, 'cadastros/add_interesse_local').then(function (response) {
        
      });
    }
    
    $scope.navigateTo('app.home');

    $ionicLoading.hide();
  };

};
