<?php


require_once 'inc/flight/Flight.php';
require_once 'inc/jujube/controller/card.class.php';
require_once 'inc/jujube/lib/template.class.php';

$myJujube = new Jujube();

Flight::route('/', function() {
	$tpl = new Template();
	$tpl->load('index.html');
	$tpl->render();
});


/*************** API **************/
Flight::route('GET /card', function() use ($myJujube) {
	$myJujube->getRandomCard();
});

Flight::route('GET /card/@id', function($id) use ($myJujube) {
	$myJujube->getCard($id);
});

Flight::route('GET /card/@id/similar', function($id) use ($myJujube) {
	$myJujube->getSimilarCards($id);
});

Flight::route('GET /card/(@location(/@category))', function($location, $category) use ($myJujube) {
	$myJujube->getRandomCard($location, $category);
});



Flight::map('notFound', function(){
    // Handle error
    $request = Flight::request();
    print_r($request);
});



Flight::start();


?>
