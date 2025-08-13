<?php
    namespace App\DiDwaEnterprise;


    class DefaultController extends Controller
    {
        public function landingPage() {
            echo $this->twig->render("home.html.twig", ["alias" => "Keys"]);
        }

        public function errorPage() {
            echo $this->twig->render("404.html.twig");
        }

        public function dashboard() {
            echo $this->twig->render("dashboard.html.twig", [
                "adminName" => "Admin",
                "activeMenu" => "products",
                "products" => [
                    [
                        "name" => "Cassava",
                        "price" => "GH50-500",
                        "type" => "Quantity",
                        "discount" => "10% off",
                        "imageColor" => "#c2a180"
                    ],
                    [
                        "name" => "Lettuce",
                        "price" => "GH10-100",
                        "type" => "Amount",
                        "discount" => null,
                        "imageColor" => "#9ee28a"
                    ]
                ]
            ]);
        }
    }