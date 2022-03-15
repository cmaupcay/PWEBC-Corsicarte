function echanger_vues(active, cible)
{
    let contenu = $("section#popup div#fenetre div#contenu");
    let vue_active = $(active);
    let vue_cible = $(cible);

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
    $("form.auth input#inscription-aff").click(() => {
        echanger_vues("div#vue-connexion", "div#vue-inscription");
    });
    $("form.auth input#connexion-aff").click(() => {
        echanger_vues("div#vue-inscription", "div#vue-connexion");
    });
});