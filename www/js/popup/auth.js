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
    if (verifier())
    {
        $("div.vues#profil").css("display", "initial");
        $("div#vue-profil #id").html($.cookie(ID_COOKIE));
        // Bouttons
        $("form.auth input#deconnexion").click((e) => { deconnexion(); e.stopImmediatePropagation(); });
    }
    else
    {
        $("div.vues#formulaires").css("display", "initial");
        // Entrées
        $("form.auth input#id").keyup(valider_id);
        $("form.auth input#mdp").keyup(valider_mdp);
        $("form.auth input#mdp-2").keyup(revalider_mdp);

        // Bouttons
        $("form.auth input#inscription").click((e) => { inscription(); e.stopImmediatePropagation(); });
        $("form.auth input#connexion").click((e) => { connexion(); e.stopImmediatePropagation(); });

        // Vues
        $("div#vue-connexion form.auth input#inscription-aff").click(() => {
            echanger_vues("div#vue-connexion", "div#vue-inscription");
        });
        $("div#vue-inscription form.auth input#connexion-aff").click(() => {
            echanger_vues("div#vue-inscription", "div#vue-connexion");
        });
    }
});