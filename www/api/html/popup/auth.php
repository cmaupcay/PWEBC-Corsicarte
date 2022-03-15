<?php include_once __DIR__ . '/../../auth/Auth.php'; ?>
    <!-- Popup Connexion -->
            <div id="vue-connexion">
                <h2>Connexion</h2>
                <form class="auth" method="post">
                    <label for="<?= Auth::ID ?>">Identifiant</label>
                    <input type="text" name="<?= Auth::ID ?>" id="<?= Auth::ID ?>" required>
                    <label for="<?= Auth::MDP ?>">Mot de passe</label>
                    <input type="password" name="<?= Auth::MDP ?>" id="<?= Auth::MDP ?>" required>

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
                    <label for="<?= Auth::MDP ?>">Répéter le mot de passe</label>
                    <input type="password" name="<?= Auth::MDP ?>-2" id="<?= Auth::MDP ?>-2" required>

                    <input type="button" name="inscription" id="inscription" value="S'inscrire">
                </form>
                <form class="auth" method="post">
                    <input type="button" name="connexion-aff" id="connexion-aff" value="Se connecter">
                </form>
            </div>
            <script src="../js/auth.js" type="module"></script>