<?php

class Template {
    private $_tpl;
    private $_baseUrl;
    private $_replace;

    public function __construct() {
        $this->_baseUrl = sprintf(
            "%s://%s%s",
            isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' ? 'https' : 'http',
            $_SERVER['SERVER_NAME'],
            $_SERVER['REQUEST_URI']
        );
        $this->_replace = array(
            'BASEURL' => $this->_baseUrl
        );
    }

    public function load($path) {
        $filePath = dirname(dirname(dirname(dirname(__FILE__)))) . '/public/';
        if (substr($path, strlen($path) - 4) == 'html'){
            $filePath .= 'html';
        }
        else if (substr($path, strlen($path) - 3) == 'css') {
            $filePath .= 'css';
        }
        $filePath .= '/' . $path;

        if (!file_exists($filePath)) {
            die('File does not exist: ' . $filePath);
        }
        $this->_tpl = file_get_contents($filePath);
        return true;
    }

    public function render() {
        foreach ($this->_replace as $original => $replacement) {
            $this->_tpl = str_replace('{%' . $original . '%}', $replacement, $this->_tpl);
        }
        echo $this->_tpl;
    }
}
?>