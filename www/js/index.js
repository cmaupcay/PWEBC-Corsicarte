import * as nav from "./nav.js";
import * as map from "./map.js";

function charger()
{
    nav.charger();
    // Chargement de la map après le chargement de la page.
    $.ready(map.charger);
}
$(charger);