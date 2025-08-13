<?php
    declare(strict_types=1);

    namespace App\DiDwaEnterprise;

    use Phroute\Phroute\RouteCollector;
    use Phroute\Phroute\Dispatcher;

    class ApplicationRouter
    {
        private Dispatcher $dispatcher;
        private DefaultController $defaultController;

        public function __construct() {
            $router = new RouteCollector();
            $this->defaultController = new DefaultController();
            
            $router->get("/", function() {
                $this->defaultController->landingPage();
            });

            $router->get("/dashboard", function() {
                $this->defaultController->dashboard();
            });

            $this->dispatcher = new Dispatcher($router->getData());
        }

        public function getDispatcher(): Dispatcher {
            return $this->dispatcher;
        }
    }