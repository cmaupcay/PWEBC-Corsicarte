<?php
include_once  __DIR__ . '/../Favoris.php';
include_once  __DIR__ . '/../../API.php';

function ajouter(array $arguments) : bool
{
    header('Content-Type: application/json');
    if (isset($arguments[Auth::ID], $arguments[Favoris::LAT], $arguments[Favoris::LNG]))
    {
        $rep = [
            Auth::SUCCES => Favoris::ajouter($arguments[Auth::ID], $arguments[Favoris::LAT], $arguments[Favoris::LNG])
        ];
        print(json_encode($rep));
        return true;
    }
    return false;
}

API::appel($_POST, "ajouter");