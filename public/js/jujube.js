window.jujube = window.jujube || {};


jujube.settings = {
    location: 'default',
    category: 'all',
    base_url: 'http://localhost/'
};

jujube.setLocation = function setLocation() {};
jujube.setCategory = function setCategory() {};

jujube.init = function init() {
    // set up jquery ajax
    $.ajaxSetup({
        // url: 'http://jujube.mybluemix.net'
        dataType: 'json'
    });
};

jujube.getRandomCard = function getRandomCard() {
    $.ajax({
        url: this.settings.base_url + 'card/' + this.settings.location + '/' + this.settings.category,
        success: function getRandomCardSuccess(response) {window.console.log('Response:', response);}
    });
};

(function initializer() {
    'use strict';
    jujube.init();
})();
