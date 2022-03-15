var NAV_POPUP = "section#popup";
var NAV_POPUP_FENETRE = "section#popup div#fenetre";
function popup_fermer() 
{
    $(NAV_POPUP).css("opacity", 0);
    $(NAV_POPUP).css("visibility", "hidden");
    $(NAV_POPUP_FENETRE).empty();
}
function popup_ouvrir(e)
{
    let popup = e.target.id;
    $.ajax({
        type: "GET",
        url: "../api/html/?type=popup&cible=" + popup,
        success: function(retour) 
        { 
            $(NAV_POPUP_FENETRE).html(retour);
            $(NAV_POPUP_FENETRE + " #fermer").click(popup_fermer);
        }
    });
    $(NAV_POPUP).css("opacity", 100);
    $(NAV_POPUP).css("visibility", "visible");
}

export function charger()
{
    // Le titre et le logo du footer ont la même fonction de clique.
    $("header div#conteneur-titre h1#titre, footer div#credits ul li#corse").click(function() {
        window.open("https://www.visit-corsica.com/");
    });
    // Application des actions aux éléments du menu de navigation.
    $("header div#conteneur-nav nav ul li").click(popup_ouvrir);

    // Inscription
    // TODO fonction clique

    // Petite promo
    $("footer div#credits ul li#prost").click(function() {
        window.open("https://github.com/Arpharnator");
    })
    $("footer div#credits ul li#mauperon").click(function() {
        window.open("https://github.com/tensaiji");
    })
}