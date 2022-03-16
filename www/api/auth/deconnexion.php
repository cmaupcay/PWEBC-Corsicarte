<?php
include_once  __DIR__ . '/Auth.php';
include_once  __DIR__ . '/../API.php';

function deconnexion(array $arguments) : bool
{
    header('Content-Type: application/json');
    $rep = [
        Auth::SUCCES => Auth::deconnexion($_SERVER['REMOTE_ADDR'])
    ];
    print(json_encode($rep));
    return true;
}

API::appel($_POST, "deconnexion");