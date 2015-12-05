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
    public function getRandom($location = NULL, $category = NULL) {
        $params = array();
        $sql = 'SELECT * FROM card WHERE 1=1';
        if ($location !== NULL) {
            $sql .= ' AND country_id = :location';
            $params['location'] = $location;
        }
        if ($category !== NULL) {
            $sql .= ' AND category_id = :category';
            $params['category'] = $category;
        }
        $sql .= ' ORDER BY RAND() LIMIT 1';


        $stmt = $this->_db->prepare($sql);
        $stmt->execute($params);
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