window.jujube = window.jujube || {};


jujube.settings = {
    location: '1',
    category: '1',
    baseUrl: 'http://localhost/',
    idleTimer: 15 // seconds
};

jujube.timer = {};

jujube.setLocation = function setLocation() {};
jujube.setCategory = function setCategory() {};

jujube.init = function init() {
    // set up jquery ajax
    $.ajaxSetup({
        // url: 'http://jujube.mybluemix.net'
        dataType: 'json'
    });
    var self = this;

    jujube.timer.lastAction = new Date();
    jujube.timer.loadRandom = window.setInterval(function loadRandomfn() {
        window.console.log('-->');
        self.checkIdle.call(self);
    }, self.settings.idleTimer * 1000);
};

jujube.getRandomCard = function getRandomCard() {
    $.ajax({
        url: this.settings.baseUrl + 'card/' + this.settings.location + '/' + this.settings.category,
        success: this.showCardInfo
    });
};

jujube.showCardInfo = function showCardInfo(response) {
    window.console.log('showCardInfo:', response);
    var card = $('#wrapper');
    card.find('.banner').attr('src', response['img_url']);
    card.find('#title, .person_name').html(response.title);
    card.find('.copy').html(response.text);
    jujube.getSimilarCard(response.id);
};

jujube.getSimilarCard = function getSimilarCard(id) {
    $.ajax({
        url: this.settings.baseUrl + 'card/'
    });
};

jujube.checkIdle = function checkIdle() {
    var diff = (new Date()) - this.timer.lastAction;
    if (diff > this.settings.idleTimer) {
        this.timer.lastAction = new Date();
        this.getRandomCard();
    }
};


(function initializer() {
    'use strict';
    jujube.init();
})();
