import * as nav from "./nav.js";
import * as map from "./map.js";
import * as auth from "./auth.js";

function charger()
{
    nav.charger();
    auth.charger();
    // Chargement de la map après le chargement de la page.
    $.ready(map.charger);
}
$(charger);