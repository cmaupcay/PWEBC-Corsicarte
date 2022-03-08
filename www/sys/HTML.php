<?php

abstract class HTML
{
    /** URL absolu de la racine WWW. */
    public const WWW = "/pwebc/www/";

    // JS
    /** Dossier des fichiers JavaScript (relatif au dossier WWW). */
    private const JS_DOSSIER = "../js";
    /** Liste des fichiers à écrire au chargement de la page (l'ordre indique l'ordre d'écriture). */
    private const JS_FICHIERS = ["nav", "map", "index"];
    /**
     * Ecriture des scripts JS distants et locaux sur la page HTML.
     */
    public static function ecrire_scripts()
    {
        // Distants
        print('<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>'); // jQuery
        print(' <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
        integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
        crossorigin=""></script>'); // Leaflet JS
        // Locaux
        print("<script>");
        $ns = count(self::JS_FICHIERS);
        foreach (self::JS_FICHIERS as $fichier)
            print(file_get_contents(self::JS_DOSSIER . "/" . $fichier . ".js"));
        print("</script>");
    }

    // CSS
    /** Dossier des fichiers CSS (relatif au dossier WWW). */
    private const CSS_DOSSIER = "../style";
    /**
     * Ecriture des feuilles de style CSS sur la page HTML.
     */
    public static function ecrire_style()
    {
        // Distants
        print('<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossorigin=""/>'); // Leaflet CSS
        // Locaux
        print("<style>");
        print(file_get_contents(self::CSS_DOSSIER . '/style.css'));
        print("</style>");
    }
};