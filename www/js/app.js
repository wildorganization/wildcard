window.globalVariable = {
    color: {
        appPrimaryColor: "#000",
        facebookColor: "#3C5C99",
        googlePlusColor: "#D73D32",
        instagramColor: "#517FA4",
    },
    startPage: {
        url: "/app/inicio",
        state: "app.inicio"
    },
    message: {
        errorMessage: "Houve um erro técnico. Tente Novamente."
    }
};

angular.module('starter', ['ionic','ngIOS9UIWebViewPatch', 'declarations','starter.controllers', 'starter.services', 'ngMaterial', 'ngMessages', 'ngCordova', 'ngStorage'])
    .run(function ($ionicPlatform, $cordovaSQLite, $rootScope, $ionicHistory, $state, $mdDialog, $mdBottomSheet) {

        function getDefaultStyle() {
            return "" +
                ".material-background-nav-bar { " +
                "   background-color        : " + appPrimaryColor + " !important; " +
                "   border-style            : none;" +
                "}" +
                ".md-primary-color {" +
                "   color                     : " + appPrimaryColor + " !important;" +
                "}";
        }

        function initialRootScope() {
            $rootScope.appPrimaryColor = appPrimaryColor;// Add value of appPrimaryColor to rootScope for use it to base color.
            $rootScope.isAndroid = ionic.Platform.isAndroid();// Check platform of running device is android or not.
            $rootScope.isIOS = ionic.Platform.isIOS();// Check platform of running device is ios or not.
        };

        function hideActionControl() {
            $mdBottomSheet.cancel();
            $mdDialog.cancel();
        };

        $rootScope.customStyle = getDefaultStyle();

        $ionicPlatform.ready(function () {
            ionic.Platform.isFullScreen = true;
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

            initialRootScope();

            //Checking if view is changing it will go to this function.
            $rootScope.$on('$ionicView.beforeEnter', function () {
                //hide Action Control for android back button.
                hideActionControl();
            });
        });

    })

    .config(function ($ionicConfigProvider, $stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider, $mdColorPalette) {

        $ionicConfigProvider.spinner.icon("android");
        $ionicConfigProvider.views.swipeBackEnabled(false);

        $mdIconProvider
            .icon('facebook', 'img/icons/facebook.svg')
            .icon('twitter', 'img/icons/twitter.svg')
            .icon('mail', 'img/icons/mail.svg')
            .icon('message', 'img/icons/message.svg')
            .icon('share-arrow', 'img/icons/share-arrow.svg')
            .icon('more', 'img/icons/more_vert.svg');

        //Cores
        $mdThemingProvider
            .theme('default')
            .primaryPalette('orange')
            .accentPalette('deep-orange');

        appPrimaryColor = $mdColorPalette[$mdThemingProvider._THEMES.default.colors.primary.name]["500"];

        $stateProvider
            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu/html/menu.html",
                controller: 'menuCtrl'
            })
            .state('app.inicio', {
                url: "/inicio",
                params:{
                    isAnimated:true
                },
                views: {
                    'menuContent': {
                        templateUrl: "templates/inicio/inicio.html",
                        controller: 'inicioCtrl'
                    }
                }
            })
            .state('app.login', {
              url: "/login",
              params:{
                isAnimated:true
              },
              views: {
                'menuContent': {
                  templateUrl: "templates/login/login.html",
                  controller: 'loginCtrl'
                }
              }
            })
            .state('app.cadastro', {
              url: "/cadastro",
              params:{
                isAnimated:true
              },
              views: {
                'menuContent': {
                  templateUrl: "templates/login/cadastro.html",
                  controller: 'cadastroCtrl'
                }
              }
            })
            .state('app.home', {
              url: "/home",
              params:{
                isAnimated:true,
                objeto: null
              },
              views: {
                'menuContent': {
                  templateUrl: "templates/home/home.html",
                  controller: 'homeCtrl'
                }
              }
            })
          .state('app.busca', {
            url: "/busca",
            params:{
              isAnimated:true,
              objeto: null
            },
            views: {
              'menuContent': {
                templateUrl: "templates/home/busca.html",
                controller: 'buscaCtrl'
              }
            }
          })
          .state('app.locais', {
            url: "/locais",
            params:{
              isAnimated:true,
              objeto: null
            },
            views: {
              'menuContent': {
                templateUrl: "templates/locais/locais.html",
                controller: 'locaisCtrl'
              }
            }
          })
          .state('app.eventos', {
            url: "/eventos",
            params:{
              isAnimated:true,
              objeto: null
            },
            views: {
              'menuContent': {
                templateUrl: "templates/eventos/evento.html",
                controller: 'eventosCtrl'
              }
            }
          })
          .state('app.usuario', {
            url: "/usuario",
            params:{
              isAnimated:true,
              objeto: null
            },
            views: {
              'menuContent': {
                templateUrl: "templates/pessoas/pessoa.html",
                controller: 'usuariosCtrl'
              }
            }
          })
          .state('app.grupo', {
            url: "/grupo",
            params:{
              isAnimated:true,
              objeto: null
            },
            views: {
              'menuContent': {
                templateUrl: "templates/grupos/grupo.html",
                controller: 'grupoCtrl'
              }
            }
          })
          .state('app.forum', {
            url: "/forum",
            params:{
              isAnimated:true,
              objeto: null
            },
            views: {
              'menuContent': {
                templateUrl: "templates/grupos/forum.html",
                controller: 'forumCtrl'
              }
            }
          })
          .state('app.amigos', {
            url: "/amigos",
            params:{
              isAnimated:true
            },
            views: {
              'menuContent': {
                templateUrl: "templates/amigos/amigos.html",
                controller: 'amigosCtrl'
              }
            }
          })
          .state('app.favoritos', {
            url: "/favoritos",
            params:{
              isAnimated:true
            },
            views: {
              'menuContent': {
                templateUrl: "templates/favoritos/favoritos.html",
                controller: 'favoritosCtrl'
              }
            }
          })
        .state('app.perfil', {
          url: "/perfil",
          params:{
            isAnimated:true
          },
          views: {
            'menuContent': {
              templateUrl: "templates/usuario/perfil-usuario.html",
              controller: 'perfilUsuarioCtrl'
            }
          }
        })
          .state('app.interessesInicio', {
            url: "/interessesInicio",
            params:{
              isAnimated:true
            },
            views: {
              'menuContent': {
                templateUrl: "templates/login/interesses.html",
                controller: 'AppCtrl'
              }
            }
          })
          .state('app.novolocal', {
            url: "/novolocal",
            params:{
              isAnimated:true
            },
            views: {
              'menuContent': {
                templateUrl: "templates/locais/novo-local.html",
                controller: 'novoLocalCtrl'
              }
            }
          })
          .state('app.interesselocal', {
            url: "/interesselocal",
            params:{
              isAnimated:true
            },
            views: {
              'menuContent': {
                templateUrl: "templates/locais/interesse-local.html",
                controller: 'interesseLocalCtrl'
              }
            }
          })
          .state('app.novoevento', {
            url: "/novoevento",
            params:{
              isAnimated:true
            },
            views: {
              'menuContent': {
                templateUrl: "templates/eventos/novo-evento.html",
                controller: 'novoEventoCtrl'
              }
            }
          })
          .state('app.interesseevento', {
            url: "/interesseevento",
            params:{
              isAnimated:true
            },
            views: {
              'menuContent': {
                templateUrl: "templates/eventos/interesse-evento.html",
                controller: 'interesseEventoCtrl'
              }
            }
          });

        //Use $urlRouterProvider.otherwise(Url);
        $urlRouterProvider.otherwise(window.globalVariable.startPage.url);

    })

    .factory('Services', function($http, $rootScope, $timeout, $localStorage, $ionicLoading, $q, appConst, $mdToast) {

  $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
  return {

    webServiceCallPost: function(data, action) {
      var deferred = $q.defer();

      return $.ajax({
        type: "POST",
        url: appConst.serviceUrl.service + action,
        crossDomain: true,
        dataType: "json",
        data: data,
        timeout: 2000000,
        async: true,
        success: function(response) {
          deferred.resolve();
        },
        error: function(xhr) {
          $ionicLoading.hide();
          if (xhr.status == 0) {
            $mdToast.show({controller: 'toastController',templateUrl: 'toast.html',hideDelay: 800,position: 'top',locals: {
              displayOption: {
                title: "Erro de conexão, tente novamente!"
              }}});
          } else if (xhr.status == 404) {
            $mdToast.show({controller: 'toastController',templateUrl: 'toast.html',hideDelay: 800,position: 'top',locals: {
              displayOption: {
                title: "Erro de conexão, tente novamente!"
              }}});
          } else {
            $mdToast.show({controller: 'toastController',templateUrl: 'toast.html',hideDelay: 800,position: 'top',locals: {
              displayOption: {
                title: "Erro de conexão, tente novamente!"
              }}});
          }
        },
        beforeSend: function() {},
        complete: function() {}
      });
    },

    webServiceLogin: function(data, action) {
      var deferred = $q.defer();

      return $.ajax({
        type: "POST",
        url: appConst.serviceUrl.service + action,
        crossDomain: true,
        dataType: "json",
        data: data,
        timeout: 20000,
        async: true,
        success: function(response) {
          deferred.resolve();
        },
        error: function(xhr) {
          $ionicLoading.hide();
          if (xhr.status == 0) {
            $mdToast.show({controller: 'toastController',templateUrl: 'toast.html',hideDelay: 800,position: 'top',locals: {
              displayOption: {
                title: "Erro de conexão, tente novamente!"
              }}});
          } else if (xhr.status == 404) {
            $mdToast.show({controller: 'toastController',templateUrl: 'toast.html',hideDelay: 800,position: 'top',locals: {
              displayOption: {
                title: "Erro de conexão, tente novamente!"
              }}});
          } else {
            $mdToast.show({controller: 'toastController',templateUrl: 'toast.html',hideDelay: 800,position: 'top',locals: {
              displayOption: {
                title: "Erro de conexão, tente novamente!"
              }}});
          }
        },
        beforeSend: function() {},
        complete: function() {}
      });
    },

    webServiceCallGet: function(action) {
      return $http.get(appConst.serviceUrl.service + action).then(function(response) {
        return response;
      });
    },

    webServiceCallGetById: function(action, data, data2) {

      if (data2 == 0){
        return $http.get(appConst.serviceUrl.service + action + "/id/" + data).then(function(response) {
          return response;
        });
      }else{
        return $http.get(appConst.serviceUrl.service + action + "/id/" + data + "/idd/" + data2).then(function(response) {
          return response;
        });
      }
    }
  }
})

    .directive('ngEnter', function () {
    return function (scope, element, attrs) {
      element.bind('keydown keypress', function (event) {
        if(event.which === 13) {
          scope.$apply(function (){
            scope.$eval(attrs.ngEnter, {$event:event});
          });
          event.preventDefault();
        }
      });
    };
  })

     .controller('AppCtrl', AppCtrl);

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
              id_usuario: $localStorage.usuario.id_usuario
            };

            Services.webServiceCallPost(dados, 'appusers/add_interesses').then(function (response) {

            });
          }

          $scope.navigateTo('app.home');

          $ionicLoading.hide();
        };


      };

