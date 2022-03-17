<?php
    include_once '../api/auth/Auth.php';
    include_once '../api/html/HTML.php';

    $MODULES = ['entete', 'nav', 'carte', "pied"];
    foreach ($MODULES as $m) HTML::module($m);