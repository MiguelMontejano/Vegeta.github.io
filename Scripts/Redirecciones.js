const redirigirHome = () =>{
    arrayJugadores = JSON.parse(localStorage.getItem('partida'));

    if(arrayJugadores.length < 2){
        alert('El número mínimo de jugadores son 2. Por favor añade un jugador más.')
    } else {
        window.location.href = "Home.html";
    }

}

const redirigirSetup = () =>{
    window.location.href = "Setup.html";

}

const redirigirSetupIndex = () => {
    window.location.href = "./Html/Setup.html";
}