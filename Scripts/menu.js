const menubtn = document.getElementById("btn-menu");
const itemsMenuOpener = document.getElementById("item-menu-opener");

function abrirMenu() {
    document.getElementById("menu-lateral").style.width = "30vw";
}

function cerrarMenu() {
    document.getElementById("menu-lateral").style.width = "0vw";
}

function abrirMenuItems() {
    document.getElementById("menu-items").style.width = "auto";
    document.getElementById("menu-items").style.paddingRight = "2vw";
}

function cerrarMenuItems() {
    document.getElementById("menu-items").style.width = "0vw";
    document.getElementById("menu-items").style.paddingRight = "0vw";
}

menubtn.addEventListener("click", abrirMenu);
itemsMenuOpener.addEventListener("click", abrirMenuItems);