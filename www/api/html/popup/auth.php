<?php include_once __DIR__ . '/../../auth/Auth.php'; ?>
    <!-- Popup Auth -->
            <div id="formulaires" class="vues">
                <div id="vue-connexion">
                    <h2>Connexion</h2>
                    <form class="auth" method="post">
                        <label for="<?= Auth::ID ?>">Identifiant</label>
                        <input type="text" name="<?= Auth::ID ?>" id="<?= Auth::ID ?>" required>
                        <label for="<?= Auth::MDP ?>">Mot de passe</label>
                        <input type="password" name="<?= Auth::MDP ?>" id="<?= Auth::MDP ?>" required>
                        <p id="erreur"><i></i></p>
                        <input type="button" name="connexion" id="connexion" value="Se connecter">
                    </form>
                    <form class="auth" method="post">
                        <input type="button" name="inscription-aff" id="inscription-aff" value="S'inscrire">
                    </form>
                </div>
                <div id="vue-inscription">
                    <h2>Inscription</h2>
                    <form class="auth" method="post">
                        <label for="<?= Auth::ID ?>">Identifiant</label>
                        <input type="text" name="<?= Auth::ID ?>" id="<?= Auth::ID ?>" required>
                        <label for="<?= Auth::MDP ?>">Mot de passe</label>
                        <input type="password" name="<?= Auth::MDP ?>" id="<?= Auth::MDP ?>" required>
                        <input type="password" name="<?= Auth::MDP ?>-2" id="<?= Auth::MDP ?>-2" required>
                        <p id="erreur"><i></i></p>
                        <input type="button" name="inscription" id="inscription" value="S'inscrire">
                    </form>
                    <form class="auth" method="post">
                        <input type="button" name="connexion-aff" id="connexion-aff" value="Se connecter">
                    </form>
                </div>
            </div>

            <div id="profil" class="vues">
                <div id="vue-profil">
                    <h2>Votre profil</h2>
                    <h4 id="<?= Auth::ID ?>"></h4>
                    <form class="auth" method="post">
                        <input type="button" name="deconnexion" id="deconnexion" value="Se déconnecter">
                    </form>
                </div>
            </div>