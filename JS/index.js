$(document).ready(function () {
    if(localStorage.getItem("currentUser")) {
        open("./home.html", "_self");
    } else {
        open("./auth.html", "_self");
    }
});