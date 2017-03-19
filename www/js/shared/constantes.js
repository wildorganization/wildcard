"use strict";
angular.module('declarations', [])
  .constant('appConst', {
  'serviceUrl': {
    "service": 'http://192.168.43.124/backfindup/index.php/rest/',
    "service_login": "http://192.168.43.124/backfindup/index.php/rest/usuarios/",
    "imagens": 'http://192.168.43.124/backfindup/uploads/'
  },
  'services': {
    "login": "appusers/login",
    "get_sugestoes": "busca/sugestoes",
    "get_eventos": "busca/busca_eventos",
    "get_pessoas": "busca/busca_usuarios",
    "get_grupos": "busca/busca_grupos",
    "get_empresas": "busca/busca_empresas",
    "get_foruns": "busca/busca_forun_interno",
    "get_eventosf": "busca/busca_evento_interno",
    "get_usuariosg": "busca/busca_evento_interno",
    "get_mensagemf": "busca/busca_msg_forum",
    "post_cadastra_usuario": "appusers/add",
    "post_cadastra_local": "cadastros/add_local",
    "post_cadastra_evento": "cadastros/add_evento",
    "forgot_password": "forgot_password",
    "put_perfil": "appusers/update_user"
  }
});
