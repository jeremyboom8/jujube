<?php
/**
 * @brief Provides an abstraction to interact with the database
 * @details [long description]
 *
 */
class DBModel{
    protected $_db;
    protected $_table;
    /**
     * @brief Creates a connection to the database
     * @details [long description]
     * @return none
     */
    public function __construct() {
        try {
            $this->_db = new PDO('mysql:dbname=ad_093873b365c679d;host=us-cdbr-iron-east-03.cleardb.net', 'b5f42214e1a47d', '5f51a870');
            $this->_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        catch (PDOException $e) {
            echo 'Connection failde: ' . $e->getMessage();
        }
    }
}
?>