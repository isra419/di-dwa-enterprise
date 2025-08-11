<?php
    require_once __DIR__ . "/../vendor/autoload.php";

    use App\DiDwaEnterprise\Application;
    $app = Application::getInstance();
    $app->run();
    //Everything works smoothly, no errors