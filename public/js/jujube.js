window.jujube = window.jujube || {};


jujube.settings = {
    location: '1',
    category: '1',
    baseUrl: 'http://localhost/'
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

};


(function initializer() {
    'use strict';
    jujube.init();
})();
