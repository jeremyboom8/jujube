<?php
die('testing');

require_once 'inc/flight/Flight.php';
require_once 'inc/jujube/controller/card.class.php';

$myJujube = new Jujube();

Flight::route('/', function(){
    echo file_get_contents('sindex.html');
});

Flight::route('GET /card', function() use ($myJujube) {
	$myJujube->getRandomCard();
});

Flight::route('GET /card/@id', function($id) use ($myJujube) {
	$myJujube->getCard($id);
});

Flight::map('notFound', function(){
    // Handle error
    $request = Flight::request();
    print_r($request);
});



Flight::start();


?>
