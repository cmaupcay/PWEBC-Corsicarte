<?php
include_once  __DIR__ . '/Auth.php';
include_once  __DIR__ . '/../API.php';

function verif(array $arguments) : bool
{
    header('Content-Type: application/json');
    $rep = [
        Auth::SUCCES => (Auth::verifier_auth($_SERVER['REMOTE_ADDR']) !== false)
    ];
    print(json_encode($rep));
    return true;
}

API::appel($_POST, "verif");