<?php
include '../dbConnection/DBConnection.php';
include './Project.php';


class ProjectRepository
{
    private $dbConnection;
    private $tableName;

    function __construct()
    {
        $this->dbConnection = new DBConnection();
        $this->tableName = 'Projects';
    }

    function createNewProject($data)
    {
        $project = new Project(
            serialize($data->name),
            serialize($data->description),
            serialize($data->info),
            $data->year,
            $data->webPage,
            $data->isStar,
            $data->isBlocked,
            $data->clientId,
            serialize($data->categoryIds),
            $data->projectFolder,
            $data->thumbnail,
            $data->largeThumbnail,
            $data->cover,
            serialize($data->images),
            serialize($data->videos),
            $data->orderNumber
        );

        $conn = $this->dbConnection->makeConnection();

        $sql = "INSERT INTO {$this->tableName} (name, description, info, year, webPage, isStar, isBlocked, clientId, categoryIds, projectFolder, thumbnail, largeThumbnail, cover, images, videos, orderNumber)
VALUES ('John', 'Doe', 'john@example.com')";

        if ($conn->query($sql) === TRUE) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }

        $conn->close();
    }

    function updateProject($projectId)
    {

    }

    function deleteProject($projectId)
    {

    }

    function getProjects($query)
    {

    }
}