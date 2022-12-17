const menubtn = document.getElementById("btn-menu");

function abrirMenu() {
    document.getElementById("menu-lateral").style.width = "30vw";
}

function cerrarMenu() {
    document.getElementById("menu-lateral").style.width = "0vw";
}

menubtn.addEventListener("click", abrirMenu);