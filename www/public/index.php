<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>corsicarte</title>

    <?php
        include_once '../sys/HTML.php';
        HTML::ecrire_scripts();
        HTML::ecrire_style();
    ?>

</head>
<body>
    <header>
        <div id="conteneur-titre">
            <h1 id="titre"><span>Corsica</span>rte</h1>
        </div>
        <div id="conteneur-nav">
            <nav>
                <ul>
                    <li id="aide">Aide</li>
                    <li id="infos">Infos</li>
                </ul>
            </nav>
        </div>
    </header>
    
    <section id="page">
        <h1>jello</h1>
    </section>

    <footer>
        <div id="credits">
            <ul>
                <li id="prost">Clément PROST</li>
                <li id="corse">
                    <img src="<?= HTML::WWW ?>img/nav/corsica.png" alt="Logo de visit-corsica.com">
                </li>
                <li id="mauperon">Clément MAUPERON</li>
            </ul>
        </div>
    </footer>
</body>
</html>