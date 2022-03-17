const redirigirHome = () =>{
    window.location.href = "Home.html";
}

const redirigirSetup = () =>{
    var sPath = window.location.pathname;
    var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
    if(sPage == "index.html"){
        window.location.href = "Html/Setup.html";
    }
    else{
        window.location.href = "Setup.html";
    }
    
}