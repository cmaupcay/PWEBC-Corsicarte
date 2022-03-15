<?php
    include_once '../api/auth/Auth.php';
    include_once '../api/html/HTML.php';

    // TODO utiliser API via javascript
    Auth::recevoir_auth();
    $u = Auth::verifier_auth();

    $MODULES = ['entete', 'nav', 'map', "pied"];
    foreach ($MODULES as $m) HTML::module($m);