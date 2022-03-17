const POPUP_DIV = "section#popup";
const POPUP_DIV_FENETRE = POPUP_DIV + " div#fenetre";
const POPUP_DIV_CONTENU = POPUP_DIV_FENETRE + " div#contenu";
const POPUP_JS_DOSSIER = "../js/popup/";
function popup_fermer() 
{
    $(POPUP_DIV).css("opacity", 0);
    $(POPUP_DIV).css("visibility", "hidden");
    setTimeout(() => { $(POPUP_DIV_CONTENU).empty(); }, 500);
}
function popup_charger(nom)
{
    $.ajax({
        type: "GET",
        dataType: "html",
        url: "../api/html/?type=popup&cible=" + nom,
        success: function(retour) 
        { 
            $(POPUP_DIV_CONTENU).html(retour);
            $(POPUP_DIV_FENETRE + " #fermer").click(popup_fermer);
            // Chargement du script associé.
            $.ajax({
                type: "GET",
                url: POPUP_JS_DOSSIER + nom + ".js",
                // ATTENTION : il s'agit d'une injection de script, un message est donc affiché en console.
                success: function(js) { eval(js); }
            });
        }
    });
}
function popup_ouvrir(id)
{
    popup_charger(id);
    $(POPUP_DIV).css("opacity", 100);
    $(POPUP_DIV).css("visibility", "visible");
}

function lien(cible) { $(cible).click(function() { window.open($(this).attr("href")); }); }

function charger()
{
    // Le titre et le logo du footer ont la même fonction de clique.
    lien("header div#conteneur-titre h1#titre, footer div#credits ul li#corse");
    // Application des actions aux éléments du menu de navigation.
    $("header div#conteneur-nav nav ul li").click(function(e) { popup_ouvrir(e.target.id); });
    // Petite promo
    lien("footer div#credits ul li#prost, footer div#credits ul li#mauperon");
}
$(charger)