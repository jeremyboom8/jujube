<?php
require_once(dirname(dirname(__FILE__)) . '/model/card.model.php');

class Jujube {
    protected $_db;

    public function __construct() {
        $this->_db = new CardModel();
    }

    private function answerRequest(Array $answer) {
        $janswer = json_encode($answer);
        echo $janswer;
    }

    public function getRandomCard(){
        $card = $this->_db->getRandom();
        $this->answerRequest($card);
    }

    public function getCard($id) {
        $card = $this->_db->getCard($id);
        $this->answerRequest($card);
    }
}
?>

