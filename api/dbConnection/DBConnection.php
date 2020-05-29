<?php


class DBConnection
{
    protected $server;
    protected $user;
    protected $pass;
    protected $db;

    public $conn;

    function __construct()
    {
        $this->server = 'localhost';
        $this->user = "username";
        $this->pass = "password";
        $this->db = 'addilaby-addictDb';
    }


    function makeConnection()
    {
        // Create connection
        $this->conn = new mysqli($this->server, $this->user, $this->pass, $this->db);

        // Check connection
        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
        echo "Connected successfully";

        return $this->conn;
    }
}