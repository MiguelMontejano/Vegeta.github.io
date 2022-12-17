const modal = document.getElementById("VentanaModal");
const ayuda = document.getElementById("btn-ayuda");
const cruzPopUp = document.getElementById("cerrar-pop-up");

const mostrarPopUp = () => {
    modal.style.display ="block";
}

const cerrarPopUp = () => {
    modal.style.display ="none";
}

window.onclick = function(event) {
    //console.log(event.target);
    if (event.target == modal) {
      modal.style.display = "none";
    }
}

ayuda.addEventListener("click", mostrarPopUp);

cruzPopUp.addEventListener("click", cerrarPopUp);