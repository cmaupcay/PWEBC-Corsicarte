<?php
include_once  __DIR__ . '/Auth.php';
include_once  __DIR__ . '/../API.php';

function inscription(array $arguments) : bool
{
    header('Content-Type: application/json');
    if (isset($arguments[Auth::ID]) && isset($arguments[Auth::MDP]))
    {
        $id = $arguments[Auth::ID];
        $mdp = $arguments[Auth::MDP];
        $rep = [
            Auth::SUCCES => false
        ];

        if (Auth::existe_u($id)) $rep[Auth::MSG] = "Cet identifiant est déjà utilisé.";
        else if (Auth::nouveau_u($id, $mdp)) $rep[Auth::SUCCES] = true;
        else $rep[Auth::MSG] = "Impossible de créer votre compte...";

        print(json_encode($rep));
        return true;
    }
    return false;
}

API::appel($_POST, "inscription");