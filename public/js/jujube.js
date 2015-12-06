window.jujube = window.jujube || {};


jujube.settings = {
    location: '1',
    category: '1',
    baseUrl: window.location.href,
    idleTimer: 3, // seconds
    isDebug: true
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
    if (window.location.href.indexOf('mybluemix') > (-1)) {
        this.settings.isDebug = false;
    }

    /*
        doenst work for me
        $('body').mousemove(self.updateIdle.call(self));
        $('body').bind('touchmove',self.updateIdle.call(self));
        document.addEventListener('touchmove', function jsTouchMove(e) {
            e.preventDefault();
            var touch = e.touches[0];
            window.console.log(touch.pageX + ' - ' + touch.pageY);
        }, false);*/
    $('#navToSettings').bind('click touchstart', function bindClickSettings(e) { self.showView(e, 'settings'); });
    $('#navToInfoCard').bind('click touchstart', function bindClickInfo(e) { self.showView(e, 'infoCard'); });
};

jujube.updateIdle = function updateIdle() {
    window.console.log('Tracker');
    this.timer.lastAction = new Date();
};

jujube.getRandomCard = function getRandomCard() {
    $.ajax({
        url: this.settings.baseUrl + 'card/' + this.settings.location + '/' + this.settings.category,
        success: this.showCardInfo
    });
};

jujube.showCardInfo = function showCardInfo(response) {
    window.console.log('showCardInfo:', response);
    var card = $('#infoCard');
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
    if (diff > this.settings.idleTimer && $('#infoCard').is(':visible')) {
        this.timer.lastAction = new Date();
        this.getRandomCard();
    }
};

jujube.showView = function showView(e, which) {
    e.preventDefault();
    window.console.log('showView(' + which + ')');
    $('.view').hide('slow', function onCompleteHideViews() {
        $('#' + which).show('slow');
    });
};

(function initializer() {
    'use strict';
    jujube.init();
})();
