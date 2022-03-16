<?php

abstract class Auth
{
    private const DOSSIER_U = __DIR__ . '/data/u/';
    private const DOSSIER_S = __DIR__ . '/data/s/';
    private const ALGO_HASH = 'sha256';

    const ID = 'id';
    const MDP = 'mdp';
    const MSG = 'msg';
    const SUCCES = "succes";

    private static function _hash(string $data)
    { return hash(self::ALGO_HASH, $data); }

    public static function existe_u(string $id) : bool
    {
        $id = self::_hash($id);
        $fichier_u = self::DOSSIER_U . $id;
        return file_exists($fichier_u);
    }

    public static function nouveau_u(string $id, string $mdp) : bool
    {
        if ($id === '' || $mdp === '') return false;
        $id = self::_hash($id);
        $fichier_u = self::DOSSIER_U . $id;
        if (!file_exists($fichier_u))
        {
            $fichier_u = fopen($fichier_u, 'w');
            if ($fichier_u)
            {
                fwrite($fichier_u, self::_hash($mdp));
                fclose($fichier_u);
                return true;
            }
        }
        return false;
    }

    public static function supprimer_u(string $id, string $adresse) : bool
    {
        $id = self::_hash($id);
        $fichier_u = self::DOSSIER_U . $id;
        if (file_exists($fichier_u))
        {
            $suppression = unlink($fichier_u);
            if ($_SESSION[self::ID] == $id) self::deconnexion($adresse);
            return $suppression;
        }
        return false;
    }

    public static function inscire_auth(string $id, string $mdp, string $adresse) : bool
    {
        $fichier_u = self::DOSSIER_U . self::_hash($id);
        if (file_exists($fichier_u) && file($fichier_u)[0] == self::_hash($mdp))
        {
            $fichier_s = self::DOSSIER_S . self::_hash($adresse);
            $fichier_s = fopen($fichier_s, 'w');
            if ($fichier_s)
            {
                fwrite($fichier_s, self::_hash($id));
                fclose($fichier_s);
                return true;
            }
        }
        return false;
    }

    public static function deconnexion(string $adresse) : bool
    {
        $fichier_s = self::DOSSIER_S . self::_hash($adresse);
        if (file_exists($fichier_s)) 
        {
            unlink($fichier_s);
            return true;
        }
        return false;
    }

    public static function verifier_auth(string $adresse)
    {
        $fichier_s = self::DOSSIER_S . self::_hash($adresse);
        if (file_exists($fichier_s))
            return file($fichier_s);
        return false;
    }
}
