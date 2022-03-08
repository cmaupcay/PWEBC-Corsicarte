function nav_clique_popup_ouvrir(e) 
{
    $("section#" + e.target.id).css("opacity", 100);
    $("section#" + e.target.id).css("visibility", "visible");
}
function nav_clique_popup_fermer(e) 
{
    let cible = e.target.getAttribute("for");
    $("section#" + cible).css("opacity", 0);
    $("section#" + cible).css("visibility", "hidden");
}

function nav_charger()
{
    // Le titre et le logo du footer ont la même fonction de clique.
    $("header div#conteneur-titre h1#titre, footer div#credits ul li#corse").click(function() {
        window.open("https://www.visit-corsica.com/");
    });

    $("header div#conteneur-nav nav ul li#aide").click(nav_clique_popup_ouvrir);
    $("section#aide div#fenetre #fermer").click(nav_clique_popup_fermer);

    $("header div#conteneur-nav nav ul li#infos").click(nav_clique_popup_ouvrir);
    $("section#infos div#fenetre #fermer").click(nav_clique_popup_fermer);

    // Petite promo
    $("footer div#credits ul li#prost").click(function() {
        window.open("https://github.com/Arpharnator");
    })
    $("footer div#credits ul li#mauperon").click(function() {
        window.open("https://github.com/tensaiji");
    })
}