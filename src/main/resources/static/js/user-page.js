$(document).ready(function () {
    var buttonMagazine = document.getElementById("userMagazineBtn");
    var buttonUser = document.getElementById("userInfoBtn");

    var divUser = document.getElementById("userPanelDiv");

    var userDiv = document.getElementById("user-panel");
    var userMagazineDiv = document.getElementById("user-magazine-panel");

    userDiv.style.display = "none";

    $(document).delegate('#userMagazineBtn', 'click', function () {
        buttonMagazine.className = "nav-link active btn btn-lg btn-primary btn-block text-left";
        buttonUser.className = "nav-link mt-2 btn btn-lg text-primary btn-block text-left";

        userDiv.style.display = "none";
        userMagazineDiv.style.display = "block";
        divUser.append(userMagazineDiv);
    });

    $(document).delegate('#userInfoBtn', 'click', function () {
        buttonMagazine.className = "nav-link btn btn-lg text-primary btn-block text-left";
        buttonUser.className = "nav-link active mt-2 btn btn-lg btn-primary btn-block text-left";

        userMagazineDiv.style.display = "none";
        userDiv.style.display = "block";
        divUser.append(userDiv);
    });

});