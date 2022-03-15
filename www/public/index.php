<?php
    include_once '../api/auth/Auth.php';
    include_once '../api/html/HTML.php';

    $MODULES = ['entete', 'nav', 'map', "pied"];
    foreach ($MODULES as $m) HTML::module($m);