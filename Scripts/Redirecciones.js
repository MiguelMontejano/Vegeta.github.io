const redirigirHome = () =>{
    arrayJugadores = JSON.parse(localStorage.getItem('partida'));

    if(arrayJugadores.length < 2){
        alert('El número mínimo de jugadores son 2. Por favor añade un jugador más.')
    } else {
        window.location.href = "Home.html";
    }

}

const redirigirSetup = () =>{
    var sPath = window.location.pathname;
    var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
    if(sPage == "index.html"){
        window.location.href = "./Html/Setup.html";
    }
    else{
        window.location.href = "Setup.html";
    }
    
}