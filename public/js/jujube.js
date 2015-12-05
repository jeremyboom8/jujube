window.jujube = window.jujube || {};


jujube.init = function init() {
    // set up jquery ajax
    $.ajaxSetup({
        url: 'http://jujube.mybluemix.net'
    });
};

(function initializer() {
    'use strict';
    jujube.init();
})();
