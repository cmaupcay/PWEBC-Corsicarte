<?php
include_once  __DIR__ . '/../Favoris.php';
include_once  __DIR__ . '/../../API.php';

function liste(array $arguments) : bool
{
    header('Content-Type: application/json');
    if (isset($arguments[Auth::ID]))
    {
        print(json_encode(Favoris::liste_favoris($arguments[Auth::ID])));
        return true;
    }
    return false;
}

API::appel($_POST, "liste");