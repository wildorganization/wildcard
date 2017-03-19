appControllers.controller('favoritosCtrl', function ($scope, $timeout, $state,$stateParams, $ionicHistory) {

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

  var imagePath = 'img/60.jpeg';

  $scope.eventos = [
    {
      titulo: 'Campeonato de Xadrez',
      local: 'Volta Redonda'
    },
    {
      titulo: 'Encontro de Motoqueiros',
      local: 'Volta Redonda'
    }


  ];

  $scope.locais = [
    {
      imagem : imagePath,
      usuario: 'Sonox Centro Auditivo',
      cidade: 'Volta Redonda'
    },
    {
      imagem : imagePath,
      usuario: 'Barão Choperia',
      cidade: 'Volta Redonda'
    }
  ];

  $scope.grupos = [
    {
      imagem : imagePath,
      usuario: 'Grupo FOA',
      cidade: 'Volta Redonda'
    },
    {
      imagem : imagePath,
      usuario: 'Clube de Cartas',
      cidade: 'Volta Redonda'
    }
  ];


});// End of device information Controller.
