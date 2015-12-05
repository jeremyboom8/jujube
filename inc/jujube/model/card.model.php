<?php
require_once('db.model.php');

class CardModel extends DBModel {

    public function __construct() {
        $this->_table = 'card';
        parent::__construct();
    }

    /**
     * @brief Gets a random card from the database
     * @details [long description]
     * @return array
     */
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

    /**
     * @brief Gets a specific card from the database
     * @details [long description]
     *
     * @param  [description]
     * @return array
     */
    public function getCard($id) {
        $sql = 'SELECT * FROM card WHERE id = :id LIMIT 1';
        $stmt = $this->_db->prepare($sql);
        $stmt->execute(array(':id' => $id));
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$row) {
            $row = array();
        }
        return $row;
    }
}
?>