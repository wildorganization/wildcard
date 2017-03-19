appControllers.controller('amigosCtrl', function ($scope, $timeout, $state,$stateParams, $ionicHistory) {

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
   $scope.pessoas = [
    {
      imagem : imagePath,
      usuario: 'Michell Zamboti',
      idade: '21 Anos',
      cidade: 'Última vez online: 45 min'
    },
    {
      imagem : imagePath,
      usuario: 'Igor Zamboti',
      idade: '21 Anos',
      cidade: 'Online'
    }
  ];


});// End of device information Controller.
