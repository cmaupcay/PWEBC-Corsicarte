function echanger_vues(active, cible)
{
    let contenu = $("section#popup div#fenetre div#contenu");
    let vue_active = $(active);
    let vue_cible = $(cible);
    
    effacer_formulaires();

    contenu.css("overflow-y", "hidden");
    vue_active.css("opacity", 0);
    vue_active.css("visibility", "hidden");
    vue_cible.css("display", "initial");
    setTimeout(() => {
        vue_active.css("display", "none")
        contenu.css("overflow-y", "auto");
        vue_cible.css("opacity", 100);
        vue_cible.css("visibility", "visible");
    }, 500);
}

$(() => {
    let btn_fermer = $("section#popup #fermer");

    if (verifier())
    {
        $("div.vues#profil").css("display", "initial");
        $("div#vue-profil #id").html($.cookie(ID_COOKIE));
        // Bouttons
        let btn_deconnexion = $("form.auth input#deconnexion");
        btn_deconnexion.click((e) => {
            deconnexion(btn_deconnexion, btn_fermer);
            e.stopImmediatePropagation();
        });
    }
    else
    {
        $("div.vues#formulaires").css("display", "initial");

        // Sélection des élements
        let entree_inscription_id = $("div#vue-inscription form.auth input#id");
        let entree_inscription_mdp = $("div#vue-inscription form.auth input#mdp");
        let btn_inscription = $("div#vue-inscription form.auth input#inscription");
        let btn_inscription_connexion = $("div#vue-inscription form.auth input#connexion-aff");
        
        let entree_inscription_mdp2 = $("div#vue-inscription form.auth input#mdp-2");
        let entree_connexion_id = $("div#vue-connexion form.auth input#id");
        let entree_connexion_mdp = $("div#vue-connexion form.auth input#mdp");
        let btn_connexion = $("div#vue-connexion form.auth input#connexion");
        let btn_connexion_inscription = $("div#vue-connexion form.auth input#inscription-aff");

        // BOUTONS
        btn_inscription.click((e) => {
            inscription(btn_inscription, entree_inscription_id, entree_inscription_mdp, btn_inscription_connexion);
            e.stopImmediatePropagation();
        });
        btn_connexion.click((e) => {
            connexion(btn_connexion, entree_connexion_id, entree_connexion_mdp, btn_fermer);
            e.stopImmediatePropagation();
        });
        // Changement entre connexion et inscription.
        btn_connexion_inscription.click(() => {
            echanger_vues("#vue-connexion", "#vue-inscription");
        });
        btn_inscription_connexion.click(() => {
            echanger_vues("#vue-inscription", "#vue-connexion");
        });

        // ENTREES
        // Identifiant
        entree_inscription_id.keyup((e) => {
            valider_id(entree_inscription_id);
        });
        entree_connexion_id.keyup((e) => {
            valider_id(entree_connexion_id);
        });
        // Mot de passe
        entree_connexion_mdp.keyup((e) => {
            if (e.keyCode === 13) btn_connexion.click();
            else valider_mdp(entree_connexion_mdp);
        });
        entree_inscription_mdp.keyup((e) => {
            valider_mdp(entree_inscription_mdp);
        });
        entree_inscription_mdp2.keyup((e) => {
            if (e.keyCode === 13) btn_inscription.click();
            else revalider_mdp(entree_inscription_mdp, entree_inscription_mdp2);
        });
    }
});