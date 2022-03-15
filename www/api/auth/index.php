<?php
include_once  __DIR__ . '/Auth.php';
include_once  __DIR__ . '/../API.php';

function api(array $arguments) : bool
{
    // TODO API Authentification
    return false;
}

API::appel($_GET, "api");