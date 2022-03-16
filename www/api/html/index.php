<?php
include_once  __DIR__ . '/HTML.php';
include_once  __DIR__ . '/../API.php';

function controle(array $arguments) : bool
{
    header('Content-Type: text/html');
    if (count($arguments) === 2)
    {
        $type = $arguments[HTML::API_TYPE];
        $cible = $arguments[HTML::API_CIBLE];
        if ($type === HTML::POPUP)
            return HTML::popup($cible);
    }
    return false;
}

API::appel($_GET, "controle");