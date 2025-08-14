<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('App');
})->name('home');

Route::get('/about', function() {
    return Inertia::render('About');
})->name('about');

Route::get('/contact', function() {
    return Inertia::render('ContactUs');
})->name('contact');

Route::get("/signup",  function() {
    return Inertia::render('SignUp');
})->name('signup');

Route::get("/login", function() {
    return Inertia::render('Login');
})->name('login');

Route::get("/order", function() {
    return Inertia::render('MyOrder');
})->name('order');