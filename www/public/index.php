<?php
    include_once '../sys/Auth.php';
    include_once '../sys/HTML.php';

    include 'module/entete.php';

    Auth::recevoir_auth();
    $u = Auth::verifier_auth();
    if (!$u)
    {     
        include 'module/popup/aide.php';
        include 'module/popup/infos.php';
    
        include 'module/nav.php';

        include 'module/map.php';
    }
    else
    {
        include 'module/popup/auth.php';

        include 'module/nav.php';

        // Remplissage de la page
        print('<section id="page"></section>');
    }

    include 'module/pied.php';