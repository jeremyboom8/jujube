<?php
require_once('db.model.php');

class CardModel extends DBModel {

    public function __construct() {
        $this->_table = 'card';
        parent::__construct();
    }

    public function getRandom() {
        $sql = 'SELECT * FROM card ORDER BY RAND() LIMIT 1';

        $stmt = $this->_db->prepare($sql);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$row) {
            $row = array();
        }
        return $row;
    }

    public function getCard($id) {
        $sql = 'SELECT * FROM card WHERE id = :id LIMIT 1';
        $stmt = $this->_db->prepare($sql, array(':id' => $id));
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$row) {
            $row = array();
        }
        return $row;
    }
}
?>