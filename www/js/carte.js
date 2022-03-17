const CARTE = L.map('carte');
const NOMINATIM = "https://nominatim.openstreetmap.org/";
const NOMINATIM_FORMAT = "json";
const NOMINATIM_EMAIL = "clement.mauperon@etu.u-paris.fr";
const NOMINATIM_LANG = "fr";

// OUTILS
const INFOS = "section#page #carte-infos #infos-m";
const INFOS_DEF = "<i>Sélectionner un point pour obtenir plus de détails.</i>";
var INFOS_ACTIVE = undefined;
function effacer_infos() 
{
    $(INFOS).html(INFOS_DEF);
    INFOS_ACTIVE = undefined;
}
function infos(e)
{
    let infos = $(INFOS);
    if (e.latlng === INFOS_ACTIVE) { effacer_infos(); }
    else
    {
        INFOS_ACTIVE = e.latlng;
        infos.html("<i>Résoulution de l'adresse...</i>");
        $.ajax({
            type: "GET",
            dataType: "json",
            url: NOMINATIM + '/reverse',
            data: {
                format: NOMINATIM_FORMAT,
                email: NOMINATIM_EMAIL,
                "accept-language": NOMINATIM_LANG,
                lat: e.latlng.lat,
                lon: e.latlng.lng
            },
            success: (retour) => {
                let adresse = retour.display_name.split(', ');
                for (let i = 0; i < 4; i++) { adresse.pop(); } // Suppression des régions (Corse, France métropolitaine), du pays et du code postal (rajouté ensuite).
                infos.html(adresse.join(', ') + (!!retour.address.postcode ? ' (' + retour.address.postcode + ')' : ''));
            },
            error: (err) => {
                infos.html("<i>Impossible de résoudre l'adresse du point (" + err.status + ").");
            }
        });
    }

}
function charger_outils_carte()
{
    effacer_infos(); // Affichage de la valeur par défaut.
}

// CONTENU
const ICONE_TAILLE = [32, 32];
function points_api(groupe, url, titre, icone, contenu, geo)
{
    $.ajax({
        type: "GET",
        dataType: "json",
        url: url,
        success: (retour) => {
        retour.records.forEach(ligne => {
                let c = contenu(ligne.fields);
                let g = geo(ligne.fields);
                let t = titre(ligne.fields);
                if (!!c && !!g && !!t)
                {
                    let m = L.marker(g, {
                        icon: L.icon({
                            iconUrl: "../img/icones/" + icone + ".png",
                            iconSize: ICONE_TAILLE
                        })
                    });
                    m.on('click', infos);
                    m.bindPopup(L.popup({
                        closeButton: false,
                        closeOnClick: false
                    }).setContent(c)).on('remove', effacer_infos);
                    m.bindTooltip(t);
                    groupe.addLayer(m);
                }
            });
        },
        error: (retour) => { console.error(retour); }
    });

}

// Hôtels / Restaurants
const API_HR = "https://www.data.corsica/api/records/1.0/search/?dataset=hotelscorse2017&rows=453";
const ICONE_HR = "hr";
function points_hr(groupe) 
{
    points_api(
        groupe,
        API_HR,
        (e) => { return e.enseigne; },
        ICONE_HR,
        (e) => {
            return "<b>" + e.enseigne + "</b><br><i>" + e.classification_tourinfrance + '<br>' + e.categorie + "</i>" ;
        },
        (e) => { return e.geoloc; }
    );
}
// Patrimoine naturel
const API_NAT = "https://www.data.corsica/api/records/1.0/search/?dataset=patrimoine-naturel-corse&rows=252";
const ICONE_NAT = "nat";
function points_nat(groupe) 
{
    points_api(
        groupe,
        API_NAT,
        (e) => { return e.nom; },
        ICONE_NAT,
        (e) => {
            return "<b>" + e.nom + "</b><br><i>" + e.lieu + "<br>" + (e.categorie ? e.categorie : 'Non classé') + "</i>" ;
        },
        (e) => { return e.localisation; }
    );
}
// Patrimoine culturel
const API_CULT = "https://www.data.corsica/api/records/1.0/search/?dataset=patrimoine-culturel-points-dinterets-en-corse&rows=403";
const ICONE_CULT = "cult";
function points_cult(groupe) 
{
    points_api(
        groupe,
        API_CULT,
        (e) => { e.nom; },
        ICONE_CULT,
        (e) => {
            return "<b>" + e.nom + "</b><br><i>" + e.lieu + "<br>" + (e.categorie ? e.categorie : 'Non classé') + "</i>" ;
        },
        (e) => { return e.localisation; }
    );
}

function charger_contenu_carte()
{
    // POINTS
    let points = L.markerClusterGroup({
        showCoverageOnHover: false
    });
    CARTE.addLayer(points, {
        chunkedLoading: true
    });
    points_hr(points);
    points_nat(points);
    points_cult(points);
}

// CARTE
const ZOOM_MIN = 8;
function charger_carte()
{
    // Paramètrage de la carte via Nominatim.
    $.ajax({
        type: "GET",
        dataType: "json",
        url: NOMINATIM + "search",
        data: {
            format: NOMINATIM_FORMAT,
            email: NOMINATIM_EMAIL,
            q: "corse",
        },
        success: (retour) => {
            CARTE.setView([retour[0].lat, retour[0].lon], ZOOM_MIN);
            CARTE.setMaxBounds(L.latLngBounds(
                [Number(retour[0].boundingbox[1]) + 0.14, Number(retour[0].boundingbox[3]) + 0.4],
                [Number(retour[0].boundingbox[0]) - 0.15, Number(retour[0].boundingbox[2]) - 0.5]
            ));
        },
        error: (erreur) => { console.error(erreur); }
    });
    // Chargement des carreaux depuis OpenStreetMap.
    L.tileLayer(
        'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
        {
            // attribution: '&copy; : <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ',
            minZoom: ZOOM_MIN
        }
    ).addTo(CARTE);
    L.control.scale().addTo(CARTE);

    charger_outils_carte();
    charger_contenu_carte();
}
$(charger_carte);