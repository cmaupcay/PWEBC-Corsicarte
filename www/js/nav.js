function nav_clique_aide()
{
    alert("// TODO Aide");
}
function nav_clique_infos()
{
    alert("// TODO Bibliothèques et APIs");
}

function nav_charger()
{
    // Le titre et le logo du footer ont la même fonction de clique.
    $("header div#conteneur-titre h1#titre, footer div#credits ul li#corse").click(function() {
        window.open("https://www.visit-corsica.com/");
    });

    $("header div#conteneur-nav nav ul li#aide").click(nav_clique_aide);
    $("header div#conteneur-nav nav ul li#infos").click(nav_clique_infos);

    // Petite promo
    $("footer div#credits ul li#prost").click(function() {
        window.open("https://github.com/Arpharnator");
    })
    $("footer div#credits ul li#mauperon").click(function() {
        window.open("https://github.com/tensaiji");
    })
}