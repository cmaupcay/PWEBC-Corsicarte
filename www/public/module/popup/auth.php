
    <!-- Popup Connexion -->
    <section id="auth" class="popup">
        <div></div>
        <div id="fenetre">
            <div id="contenu">
                <h2 id="bibliotheques">Connexion</h2>
                <form id="auth" method="post">
                    <label for="<?= Auth::I_ID ?>">Identifiant</label>
                    <input type="text" name="<?= Auth::I_ID ?>" id="<?= Auth::I_ID ?>" required>
                    <label for="<?= Auth::I_MDP ?>">Mot de passe</label>
                    <input type="password" name="<?= Auth::I_MDP ?>" id="<?= Auth::I_MDP ?>" required>

                    <input type="submit" name="<?= Auth::I_CONNEXION ?>" id="<?= Auth::I_CONNEXION ?>" value="Se connecter">
                    <input type="submit" name="<?= Auth::I_INSCRIPTION ?>" id="<?= Auth::I_INSCRIPTION ?>" value="S'inscrire">
                </form>
            </div>
        </div>
        <div></div>
    </section>