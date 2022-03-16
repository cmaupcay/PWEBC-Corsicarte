<?php
include_once  __DIR__ . '/Auth.php';
include_once  __DIR__ . '/../API.php';

function connexion(array $arguments) : bool
{
    header('Content-Type: application/json');
    if (isset($arguments[Auth::ID]) && isset($arguments[Auth::MDP]))
    {
        $id = $arguments[Auth::ID];
        $mdp = $arguments[Auth::MDP];
        $rep = [
            Auth::SUCCES => false
        ];

        if (Auth::inscire_auth($id, $mdp, $_SERVER['REMOTE_ADDR'])) 
            $rep[Auth::SUCCES] = true;
        else $rep[Auth::MSG] = "Identifiants incorrects.";

        print(json_encode($rep));
        return true;
    }
    return false;
}

API::appel($_POST, "connexion");