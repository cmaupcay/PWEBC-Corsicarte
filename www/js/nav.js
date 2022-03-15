var DIV_POPUP = "section#popup";
var DIV_POPUP_FENETRE = DIV_POPUP + " div#fenetre";
var DIV_POPUP_CONTENU = DIV_POPUP_FENETRE + " div#contenu";
function popup_fermer() 
{
    $(DIV_POPUP).css("opacity", 0);
    $(DIV_POPUP).css("visibility", "hidden");
    setTimeout(() => { $(DIV_POPUP_CONTENU).empty(); }, 500);
}
function popup_ouvrir(e)
{
    let popup = e.target.id;
    $.ajax({
        type: "GET",
        url: "../api/html/?type=popup&cible=" + popup,
        success: function(retour) 
        { 
            $(DIV_POPUP_CONTENU).html(retour);
            $(DIV_POPUP_FENETRE + " #fermer").click(popup_fermer);
        }
    });
    $(DIV_POPUP).css("opacity", 100);
    $(DIV_POPUP).css("visibility", "visible");
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