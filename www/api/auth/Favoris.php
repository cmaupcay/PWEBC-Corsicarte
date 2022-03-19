<?php
include_once  __DIR__ . '/Auth.php';

abstract class Favoris
{
    private const DOSSIER = __DIR__ . "/data/f/";

    const LAT = "lat";
    const LNG = "lng";

    private static function lire(string $hash_id) : ?array
    {
        $fichier = self::DOSSIER . $hash_id;
        if (file_exists($fichier))
            return json_decode(file_get_contents($fichier));
        return null;
    }
    private static function ecrire(string $hash_id, array $contenu) : bool
    {
        $fichier = self::DOSSIER . $hash_id;
        return file_put_contents($fichier, json_encode($contenu)) !== false;
    }

    public static function creer(string $hash_id) : bool
    {
        $fichier = self::DOSSIER . $hash_id;
        if (!file_exists($fichier))
        {
            $fichier = fopen($fichier, 'w');
            if ($fichier)
            {
                fwrite($fichier, json_encode([]));
                fclose($fichier);
                return true;
            }
        }
        return false;
    }

    public static function liste_favoris(string $id): ?array
    { return self::lire(Auth::hash($id)); }

    private static function index_favori(string $id, float $lat, float $lng) : ?int
    {
        $json = self::lire(Auth::hash($id));
        if ($json !== null)
        {
            foreach ($json as $i => $fav)
            {
                if (
                    is_array($fav) && count($fav) === 2
                    && $fav[0] === $lat && $fav[1] === $lng
                ) return $i;
            }
        }
        return null;
    }
    public static function est_favori(string $id, float $lat, float $lng) : bool
    { return self::index_favori($id, $lat, $lng) !== null; }

    public static function ajouter(string $id, float $lat, float $lng) : bool
    {
        if (!self::est_favori($id, $lat, $lng))
        {
            $id = Auth::hash($id);
            $json = self::lire($id);
            $json[] = [$lat, $lng];
            return self::ecrire($id, $json);
        }
        return false;
    }

    public static function supprimer(string $id, float $lat, float $lng) : bool
    {
        $index = self::index_favori($id, $lat, $lng);
        if ($index !== null)
        {
            $id = Auth::hash($id);
            $json = self::lire($id);
            $dernier = count($json) - 1;
            $json[$index] = $json[$dernier];
            unset($json[$dernier]);
            return self::ecrire($id, $json);
        }
        return false;
    }
}