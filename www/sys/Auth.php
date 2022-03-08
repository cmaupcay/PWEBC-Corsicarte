<?php

abstract class Auth
{
    private const DOSSIER_U = __DIR__ . '/id/u/';
    private const DOSSIER_S = __DIR__ . '/id/s/';
    private const ALGO_HASH = 'sha256';

    const I_ID = 'id';
    const I_MDP = 'mdp';

    const I_DECO = 'deco'; // Deconnexion
    const I_CONNEXION = 'connexion'; // Identifiant du boutton de connexion
    const I_INSCRIPTION = 'inscription'; // Identifiant du boutton d'inscription

    private static function _hash($data)
    { return hash(self::ALGO_HASH, $data); }

    static function existe_u($id)
    {
        $id = self::_hash($id);
        $fichier_u = self::DOSSIER_U . $id;
        return file_exists($fichier_u);
    }

    static function nouveau_u($id, $mdp)
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

    static function supprimer_u($id)
    {
        $id = self::_hash($id);
        $fichier_u = self::DOSSIER_U . $id;
        if (file_exists($fichier_u))
        {
            $suppression = unlink($fichier_u);
            if ($_SESSION[self::I_ID] == $id) self::_deconnexion();
            return $suppression;
        }
        return false;
    }

    private static function _inscire_auth($id, $mdp)
    {
        $fichier_u = self::DOSSIER_U . self::_hash($id);
        if (file_exists($fichier_u) && file($fichier_u)[0] == self::_hash($mdp))
        {
            $fichier_s = self::DOSSIER_S . self::_hash($_SERVER['REMOTE_ADDR']);
            $fichier_s = fopen($fichier_s, 'w');
            if ($fichier_s)
            {
                fwrite($fichier_s, self::_hash($id));
                fclose($fichier_s);
            }
        }
    }

    private static function _deconnexion()
    {
        $fichier_s = self::DOSSIER_S . self::_hash($_SERVER['REMOTE_ADDR']);
        if (file_exists($fichier_s)) unlink($fichier_s);
    }

    static function verifier_auth()
    {
        $fichier_s = self::DOSSIER_S . self::_hash($_SERVER['REMOTE_ADDR']);
        if (file_exists($fichier_s))
            return file($fichier_s)[0];
        return false;
    }

    static function recevoir_auth()
    {
        // Deconnexion
        if (isset($_POST[self::I_DECO]))
            self::_deconnexion();
        // Connexion
        if (isset($_POST[self::I_ID]) && isset($_POST[self::I_MDP]) && isset($_POST[self::I_FORM]))
            self::_inscire_auth($_POST[self::I_ID], $_POST[self::I_MDP]);
    }

    static function bouton_deconnexion()
    {
        print("<br><form method=\"post\"><input type=\"submit\" class=\"erreur\" name=\"" . self::I_DECO . "\" value=\"Deconnexion\"></form>\n");
    }
}