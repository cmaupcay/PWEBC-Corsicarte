const ID_COOKIE = "id";
function identifie() { return !!$.cookie(ID_COOKIE); }

function erreur(msg) 
{ $("form.auth p#erreur").html(msg); } 

const ID_MIN = 3;
const ID_MAX = 32;
const ID_REGEX = /^[a-zA-Z0-9_]*$/;
var ID_VALIDE = false;
function valider_id()
{
    let id = $(this).val();
    if (id.length == 0) erreur("");
    else if (id.length < ID_MIN || id.length > ID_MAX) { erreur("L'identifiant doit faire entre " + ID_MIN + " et " + ID_MAX + " caractères."); }
    else if (ID_REGEX.test(id))
    {
        ID_VALIDE = true;
        ID = id;
        erreur("");
        return;
    }
    else erreur("L'identifiant doit contenir uniquement des caractères alphanumériques.")
    ID_VALIDE = false;
}

const MDP_MIN = 7;
const MDP_MAX = 256;
var MDP_VALIDE = false;
function valider_mdp()
{
    let mdp = $(this).val();
    if (mdp.length == 0) erreur("");
    else if (mdp.length < MDP_MIN || mdp.length > MDP_MAX) { erreur("Le mot de passe doit faire entre " + MDP_MIN + " et " + MDP_MAX + " caractères."); }
    else
    {
        MDP_VALIDE = true;
        erreur("");
        return;
    }
    MDP_VALIDE = false;
}

var MDP2_VALIDE = false;
function revalider_mdp()
{
    let mdp = $("#vue-inscription form.auth input#mdp").val();
    let mdp2 = $("#vue-inscription form.auth input#mdp-2").val();
    if (mdp.length == 0 || mdp2.length == 0) erreur("");
    else if (mdp == mdp2)
    {
        MDP2_VALIDE = true;
        erreur("");
        return
    }
    else erreur("Les mots de passe ne correspondent pas.");
    MDP2_VALIDE = false;
}

function effacer_formulaires()
{
    erreur("");
    $("form.auth input[type=text], form.auth input[type=password]").val("");
}

const AUTH_API = "../api/auth/";
function inscription()
{   
    $(this).prop("disabled", true);
    if (ID_VALIDE && MDP_VALIDE && MDP2_VALIDE)
    {
        $.ajax({
            type: "POST",
            dataType: "json",
            url: AUTH_API + "inscription.php",
            data: {
                id: $("#vue-inscription form.auth input#id").val(),
                mdp: $("#vue-inscription form.auth input#mdp").val()
            },
            success: (retour) => {
                if (retour.succes)
                {
                    ID_VALIDE = false;
                    MDP_VALIDE = false;
                    MDP2_VALIDE = false;
                    effacer_formulaires();
                    $("#vue-inscription form.auth input#connexion-aff").click();
                }
                else { erreur(retour.msg); }
            },
            error: (err) => { erreur("Impossible de procéder à l'inscription : " + err.status); },
            complete: () => { $(this).prop("disabled", false); }
        });
    }
    else { erreur("Veuillez compléter le formulaire."); }
}

function connexion()
{
    $(this).prop("disabled", true);
    if (ID_VALIDE && MDP_VALIDE)
    {
        let id = $("#vue-connexion form.auth input#id").val();
        $.ajax({
            type: "POST",
            dataType: "json",
            url: AUTH_API + "connexion.php",
            data: {
                id: id,
                mdp: $("#vue-connexion form.auth input#mdp").val()
            },
            success: (retour) => {
                if (retour.succes)
                {
                    $.cookie(ID_COOKIE, id, { expires: 14, path: '/', domain: 'localhost', secure: true });
                    ID_VALIDE = false;
                    MDP_VALIDE = false;
                    $("section#popup #fermer").click();
                }
                else { erreur(retour.msg); }
            },
            error: (err) => { erreur("Impossible de procéder à la connexion : " + err.status) },
            complete: () => { $(this).prop("disabled", false); }
        });
    }
    else { erreur("Veuillez compléter le formulaire."); }
}

function deconnexion()
{
    $(this).prop("disabled", true);
    $.ajax({
        type: "GET",
        dataType: "json",
        url: AUTH_API + "deconnexion.php",
        success: (retour) => {
            if (retour.succes)
            {
                $.cookie(ID_COOKIE, null, { expires: 0, path: '/', domain: 'localhost', secure: true });
                $("section#popup #fermer").click();
            }
            else { console.error("Impossible d'opérer la déconnexion."); }
        },
        error: (err) => { erreur("Impossible de procéder à la déconnexion : " + err.status) },
        complete: () => { $(this).prop("disabled", false); }
    });
}

function verifier()
{
    let verifie = false;
    if (identifie())
    {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: AUTH_API + "verif.php",
            success: (retour) => {
                verifie = retour.succes;
                if (!verifie) $.cookie(ID_COOKIE, null, { expires: 0, path: '/', domain: 'localhost', secure: true });
            },
            error: (err) => { erreur("Impossible de procéder à la vérification : " + err.status) }
        });
    }
    return verifie;
}