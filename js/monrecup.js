window.onload = function () {

    //function getAllUrlParams() {
    function getUrlParameter(parameter) {
        parameter = parameter.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?|&]' + parameter.toLowerCase() + '=([^&#]*)');
        var results = regex.exec('?' + document.location.href.toLowerCase().split('?')[1]);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    let demande = document.getElementsByName("demande")[0];
    let nom = document.getElementsByName("nom")[0];
    let prenom = document.getElementsByName("prenom")[0];
    let courriel = document.getElementsByName("mail")[0];
    let message = document.getElementsByName("message")[0];
    let photo = document.getElementsByName("photo")[0];

    demande.innerText = "votre demande concerne : " + getUrlParameter("demande");
    nom.innerText = "votre nom : " + getUrlParameter("nom");
    prenom.innerText = "votre prénom : " + getUrlParameter("prenom");
    courriel.innerText = "votre mail : " + getUrlParameter("mail");
    message.innerText = "votre message : " + getUrlParameter("message");
    photo.innerText = "La photo choisie : " + getUrlParameter("photo");

}