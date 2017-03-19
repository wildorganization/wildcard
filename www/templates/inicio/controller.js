// Controller of dashboard.
appControllers.controller('inicioCtrl', function ($scope, $timeout, $state,$stateParams, $ionicHistory) {
  
  $scope.isAnimated =  $stateParams.isAnimated;

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
  
  $scope.goToSetting = function () {
    $state.go("app.dashboardSetting");
  };// End goToSetting.

});
