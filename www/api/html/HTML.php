<?php
abstract class HTML
{
    private static function importer(string $type, string $nom) : bool
    { 
        str_replace(['.', '\\'], '', $type);
        str_replace(['.', '\\'], '', $nom);
        $fichier = __DIR__ . '/' . $type . '/' . $nom . '.php';
        if (file_exists($fichier))
        {
            include $fichier;
            return true;
        }
        return false;
    }

    private const MODULE = "module";
    public static function module(string $nom) : bool
    { return self::importer(self::MODULE, $nom); }

    public const POPUP = "popup";
    public static function popup(string $nom) : bool
    { return self::importer(self::POPUP, $nom); }

    public const API_TYPE = "type";
    public const API_CIBLE = "cible";
};