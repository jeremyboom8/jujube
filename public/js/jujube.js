window.jujube = window.jujube || {};

/**
 * App Settings
 */
jujube.settings = {
    location: '1',
    category: '1',
    baseUrl: window.location.href,
    idleTimer: 15, // seconds
    isDebug: true
};

jujube.timer = {};
jujube.rightAnswer; // stores the right answer, horrible design.. I know... 10mins left
jujube.setLocation = function setLocation() {};
jujube.setCategory = function setCategory() {
    this.showView(undefined, 'infoCard');
};

jujube.init = function init() {
    // set up jquery ajax
    $.ajaxSetup({
        // url: 'http://jujube.mybluemix.net'
        dataType: 'json'
    });
    var self = this;

    jujube.timer.lastAction = new Date();
    if (typeof jujube.timer.loadRandom !== 'undefined') {
        clearInterval(jujube.timer.loadRandom);
    }
    jujube.timer.loadRandom = window.setInterval(function loadRandomfn() {
        window.console.log('-->');
        self.checkIdle.call(self);
    }, self.settings.idleTimer * 1000);
    if (window.location.href.indexOf('mybluemix') > (-1)) {
        this.settings.isDebug = false;
    }

    jujube.getRandomCard();
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
    $('#settings .selector').bind('click touchstart', function bindClickCategories(e) { self.setCategory(e); })
    $('#swap').bind('click touchstart', function bindClickSwap(e) { self.showView(e, 'swap'); });
};

/**
 * @brief Updates the timer to cycle through random cards
 * @see jujube.checkIdle
 * @details [long description]
 * @return [description]
 */
jujube.updateIdle = function updateIdle() {
    window.console.log('Tracker');
    this.timer.lastAction = new Date();
};

/**
 * @brief Requests a random card from the server using the category and location set.
 * @details [long description]
 * @return [description]
 */
jujube.getRandomCard = function getRandomCard() {
    $.ajax({
        url:        this.settings.baseUrl + 'card/' + this.settings.location + '/' + this.settings.category,
        success:    this.showCardInfo
    });
};

/**
 * @brief Updates the InfoCard with data fetched from the server
 * @details [long description]
 *
 * @param  [description]
 * @return [description]
 */
jujube.showCardInfo = function showCardInfo(response) {
    var card = $('#infoCard');
    card.find('.banner').attr('src', response.imgUrl);
    card.find('#title, .person_name').html(response.title);
    card.find('.copy').html(response.text);
    jujube.getSimilarCard(response.id);
};

jujube.getSimilarCard = function getSimilarCard(id) {
    $.ajax({
        url:        this.settings.baseUrl + 'card/' + id + '/similar',
        success:    this.showSimilarCards
    });
};

/**
 * @brief Requests a new info card only if its time and user is viewing a card
 * @details [long description]
 * @return [description]
 */
jujube.checkIdle = function checkIdle() {
    var diff        = (new Date()) - this.timer.lastAction,
        isVisible   = $('#infoCard').is(':visible'),
        isTime      = diff > this.settings.idleTimer;

    if (isTime && isVisible) {
        this.timer.lastAction = new Date();
        this.getRandomCard();
    }
};

/**
 * @brief Updates the infoCard with the similar cards
 * @details [long description]
 *
 * @param  [description]
 * @return [description]
 */
jujube.showSimilarCards = function showSimilarCards(response) {
    // We only have 4 spaces
    var currentSimilar,
        picSelector,
        titleSelector;

    for (var i = 3; i >= 0; i--) {
        if (response.length > 0) {
            currentSimilar = response.pop();
        }
        picSelector     = '#infoCard .bottom .selector_pic:eq(' + i + ')';
        titleSelector   = '#infoCard .bottom .selector_title:eq(' + i + ')';
        $(picSelector).html('<img src="' + currentSimilar.imgUrl + '">');
        $(titleSelector).html(currentSimilar.title);
    };
};

/**
 * @brief Switches between diffeerent views
 * @details [long description]
 *
 * @param h [description]
 * @return [description]
 */
jujube.showView = function showView(e, which) {
    window.console.log('showView(e, ' + which + ')');
    if (typeof e !== 'undefined') {
        e.preventDefault();
    }
    var self = this,
        isQuestionVisible = $('#question').is(':visible'),
        isInfoCardVisible = $('#infoCard').is(':visible'),
        isSettingsVisible = $('#settings').is(':visible');
    window.console.log('showView(' + which + ') -> ', isQuestionVisible, isInfoCardVisible, isSettingsVisible);

    if (which == 'swap') {
        if (isInfoCardVisible || isSettingsVisible) {
            $.ajax({
                url:        this.settings.baseUrl + 'card/' + this.settings.location + '/' + this.settings.category,
                success:    function showQuestion(response) { self.showQuestion.call(self, response); }
            });
            $('.view').hide('slow', function onCompleteHideViews() {
                $('#question').show();
            });
        } else {
            $('.view').hide('slow', function onCompleteHideViews() {
                $('#infoCard').show();
            });
        }
    } else {
        $('.view').hide('slow', function onCompleteHideViews() {
            $('#' + which).show();
        });
    }

};

jujube.showQuestion = function showQuestion(response) {
    window.console.log(response);
    var card = $('#question'),
        self = this;
    this.rightAnswer = response;
    card.find('.banner').attr('src', response.imgUrl);
    card.find('#title, .person_name').html(response.title);
    card.find('.copy').html(response.text);
    $.ajax({
        url:        this.settings.baseUrl + 'card/' + response.id + '/similar',
        success:    function showQuestionSuccess(response) { self.showPossibleAnswers.call(self, response); }
    });
};

jujube.showPossibleAnswers = function showPossibleAnswers(response) {
    // We only have 4 spaces
    var currentSimilar,
        picSelector,
        titleSelector;

    for (var i = 3; i >= 0; i--) {
        if (response.length > 0) {
            currentSimilar = response.pop();
        }
        picSelector     = '#question .bottom .selector_pic:eq(' + i + ')';
        titleSelector   = '#question .bottom .selector_title:eq(' + i + ')';
        $(picSelector).html('<img src="' + currentSimilar.imgUrl + '">');
        $(titleSelector).html(currentSimilar.title);
    };
    // Fugly but no time
    picSelector     = '#question .bottom .selector_pic:eq(0)';
    titleSelector   = '#question .bottom .selector_title:eq(0)';
    $(picSelector).html('<img src="' + this.rightAnswer.imgUrl + '">');
    $(titleSelector).html(this.rightAnswer.title);

};

jujube.showWrongAnswer = function showWrongAnswer() {
    alert('Ooooopppsss....');
};

jujube.showRightAnswer = function showRightAnswer() {
    alert('Goodie!');
};

(function initializer() {
    'use strict';
    $('.ui-loader').hide();
    jujube.init();
})();
