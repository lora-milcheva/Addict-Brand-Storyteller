<?php


class Project
{
    public $_id;
    public $name;
    public $description;
    public $info;
    public $year;
    public $webPage;
    public $isStar;
    public $isBlocked;
    public $clientId;
    public $categoryIds;
    public $projectFolder;
    public $thumbnail;
    public $largeThumbnail;
    public $cover;
    public $images;
    public $videos;
    public $orderNumber;

    function __construct($name,
                         $description,
                         $info,
                         $year,
                         $webPage,
                         $isStar,
                         $isBlocked,
                         $clientId,
                         $categoryIds,
                         $projectFolder,
                         $thumbnail,
                         $largeThumbnail,
                         $cover,
                         $images,
                         $videos,
                         $orderNumber)
    {
        $this->name = $name;
        $this->description = $description;
        $this->info = $info;
        $this->year = $year;
        $this->webPage = $webPage;
        $this->isStar = $isStar;
        $this->isBlocked = $isBlocked;
        $this->clientId = $clientId;
        $this->categoryIds = $categoryIds;
        $this->projectFolder = $projectFolder;
        $this->thumbnail = $thumbnail;
        $this->largeThumbnail = $largeThumbnail;
        $this->cover = $cover;
        $this->images = $images;
        $this->videos = $videos;
        $this->orderNumber = $orderNumber;
    }
}

