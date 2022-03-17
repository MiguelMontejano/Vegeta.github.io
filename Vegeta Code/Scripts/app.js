/*Para añadir nuevos persobajes sería ponerlo en el html en el select, con el campo value que sea el nombre de la imagen y su extension*/

//Variables globales
const presentacion = document.getElementById("presentacion");
const formularioUI = document.getElementById('formulario');
const checkboxCaliente =  document.getElementById('checkboxCaliente');
const listaJugadoresUI = document.getElementById('contenedor-tarjetas');
let arrayJugadores = [];

let pruebas = [];
 
//Funciones
const crearJugador = (nombre, personaje) => {
    let jugador = {
        nombre: nombre,
        vasos: 0,
        personaje: personaje //Fondo del jugador, en el event listener de submit se recoge el valor del campo select que tiene el nombre la imagen con su extension en el value
    }

    arrayJugadores.push(jugador);

    return jugador;
}

const guardarDB = () => {

    localStorage.setItem('partida', JSON.stringify(arrayJugadores)) //Pasarlo a JSON es necesario porque no podemos guardar sino un array solo de texto

    leerDB();//Asi cada vez que guardmos pintamos el jugador
}

const leerDB = () => {
    listaJugadoresUI.innerHTML = ''; //Siempre que trabajamos con innerHtml tenemos que empezar con el string vacio
    
    //Leo como se encuentra el modo caliente al cargar el DOM que es cuando se ejecuta esta función
    modoCaliente = localStorage.getItem('caliente');
    //Pongo el checkbox como debe ir segun se quedo guardado
    if(modoCaliente === "activado"){
        checkboxCaliente.checked = true;
    }else{
        checkboxCaliente.checked = false;
    }


    //Ahora vamos a leer lo que viene del local storage y lo voy a ir pintando hacia abajo
    arrayJugadores = JSON.parse(localStorage.getItem('partida')); //lo parseo de nuevo ya que es un JSON cuando esta almacenado

    if(arrayJugadores === null){
        arrayJugadores = [];
    }else{ //Existe algo en el local storage
        arrayJugadores.forEach(element => { //Cuando se añade el fondo se establece aqui la ruta relativa (siguiente linea)
            listaJugadoresUI.innerHTML += `<div class="tarjetas-jugador" style="background-image:url(../Images/${element.personaje});"> 
            <div class="nombre-tarjeta">${element.nombre}</div>
            <div class="iconos-vasos">
            <i class="fas fa-cocktail"></i>
            <div class="vasos-tarjeta">${element.vasos}</div>
            </div>
            <div class="iconos-abajo">
            <i class="fas fa-plus"></i>
            <i class="fas fa-times cruz-tarjetas"></i>
            </div>
        </div>`
        });

    }

}

const eliminarDB = (nombre) => {
    let indexArray;
    //Vamos a comprobar este jugador con lo que tenemos almacenado
    arrayJugadores.forEach((elemento, index) => {

        if(elemento.nombre === nombre){
            indexArray = index;
        }

    });

    arrayJugadores.splice(indexArray,1);//splice es para eliminar elementos, es el contrario a push, el segundo parametro indica cuantos elementos queremos borrar
    guardarDB(); //No hace falta leer despues ya que la propia funcion guardar lee
}

const editarDB = (nombre) => {
    let indexArray;
    //Vamos a comprobar este jugador con lo que tenemos almacenado
    arrayJugadores.forEach((elemento, index) => {

        if(elemento.nombre === nombre){
            indexArray = index;
        }

    });

    arrayJugadores[indexArray].vasos++;

    guardarDB();
}

//Event Listener

formularioUI.addEventListener('submit', (e) => {

    e.preventDefault(); //Con esto evitamos que se nos refresque el sitio web o que se haga cualquier evento
    let jugadorUI = document.getElementById('jugador').value;
    let personajeUI = document.getElementById('personaje').value;
    
    if(jugadorUI.length > 22){
        alert("El nombre introducido es demasiado largo, como mucho debe tener 22 caracteres.");
    }
    else{
        crearJugador(jugadorUI, personajeUI);
        guardarDB();
    }

    formularioUI.reset(); //Para vaciar el input una vez se da al boton
});

checkboxCaliente.addEventListener('change', (e) => {
    e.preventDefault();
    if(checkboxCaliente.checked){
        console.log("caliente activado");
        localStorage.setItem('caliente', "activado")
    }else{
        console.log("caliente desactivado");
        localStorage.setItem('caliente', "desactivado")
    }
});

document.addEventListener('DOMContentLoaded', leerDB) //Este evento se genera cuando el DOM esta cargado



listaJugadoresUI.addEventListener('click', (e) => {
    e.preventDefault();//Para que nuestro sitio haga solo lo que nosotros queremos en estas lineas de codigo

    /*console.log(e);
    console.log(e.path[2].childNodes[1].innerHTML);
    console.log(e.target.className);*/

    if(e.target.className === 'fas fa-times cruz-tarjetas' || e.target.className === 'fas fa-plus'){
        let texto = e.path[2].childNodes[1].innerHTML;
        if(e.target.className === 'fas fa-times cruz-tarjetas'){
        //Ahora eliminamos de lo guardado en el localStorage
        eliminarDB(texto);
        }

        if(e.target.className === 'fas fa-plus'){
        //Editamos la informacion del jugador
        editarDB(texto);
        }

    }

});

window.onload = function() {
    presentacion.innerHTML = ''; //Reseteo lo que pone en el texto de presentacion
    let anteriorURL = document.referrer;
    if(anteriorURL.includes("Home.html")){
        presentacion.innerHTML = 'La partida ha terminado, ¡Actualiza los vasos de cada jugador!';
    }
    else{
        presentacion.innerHTML = 'Bienvenidos a todos, esperamos que lo estéis pasando bien, vamos a animar la fiesta un poquito';
    }
};



/*En vez lo que tengo es buena idea que el form sea como el del video con un unico
input y otro con mas y menos para indicar los cubatas,ya vere como hacer que se pueda variar esa cantidad
de cubatas pero creo que haria el juego mas unico y a nuestro estilo ya que es mas facil
contabilizar los vasos que los tragod que haria falta papel olo que sea*/ 