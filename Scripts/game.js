//Variables globales
const cuerpoApp = document.getElementById("cuerpo-app");
const zonaNombre = document.getElementById("texto-nombre");
const zonaTexto = document.getElementById("texto-juego");
const zonaRespuesta = document.getElementById("respuesta-cultura");
const respuestaContainer = document.getElementById("respuesta-id");

const rondasPorPartida = 35;//Establece el numero de rondas que se juegan por partida
const tiposPruebas = 8;//Esta variable nos indica cuantos tipos diferentes de pruebas existen en el juego
/*------------------------------------------------------------------------------------------
Cada tipo de prueba esta asignada a un numero, lo que se usa en metodos como siguiente ronda
pruebas = 0              pruebas -> 20       Miguel Miguel Miguel Mimi Miguel Mimi Hugo Mimi Hugo Hugo
generales = 1            generales -> 13 (+1)
eleccion = 2 Amarillo    elegir -> 3 (+1)
duelos = 3 Rosa          duelos -> 3 (+1)     Miguel y Mimi - Mimi y Hugo - Mimi y Miguel - Miguel y Hugo
castigos = 4 Negro       castigos -> 3 (+1)   Hugo
preguntas = 5            preguntas -> 5 (+1)  Mimi Hugo
cultura = 6  Azul Oscuro cultura -> 1 (+1)
beberxbeber = 7          beberxbeber -> 2 (+1)
TOTAL = 8
AHORA MISMO SE JUEGAN 50 RONDAS PERO SE JUEGA UNA RONDA MAS DE CADA TIPO DE PRUEBA DE LAS QUE TENEMOS ESTIPULADAS, LO QUE HACE QUE ALGUNAS RONDAS DE ALGO NO SE JUEGUEN, LE DA ALGO DE ALEATORIEDAD AL JUEGO Y A MI ME GUSTA, NO SERÍA MUY DIFICIL DE ARREGLAR SI QUEREMOS, TIENE QUE VER CON LOS IF's QUE HAY DENTRO DE LOS IF DE CADA TIPO DE PRUEBA
picante = 8, para que este activado tendria que haber un boolean y el numero de cada pregunta por ronda ser distinto para incluir estas y que salgan bastante
-------------------------------------------------------------------------------------------*/

let contadorRondas;

let contadorPruebas = 0;
let contadorGenerales = 0;
let contadorEleccion = 0;
let contadorDuelos = 0;
let contadorCastigos = 0;
let contadorPreguntas = 0;
let contadorCultura = 0;
let contadorBeberxbeber = 0;
let contadorCaliente = 0;

let arrayJugadores = [];
const MODO_CALIENTE = localStorage.getItem('caliente');

const diceImages = [
    "../Images/dice/dice-01.svg",
    "../Images/dice/dice-02.svg",
    "../Images/dice/dice-03.svg",
    "../Images/dice/dice-04.svg",
    "../Images/dice/dice-05.svg",
    "../Images/dice/dice-06.svg",
]

let pruebas = ["Di un recuerdo con cada uno de los aquí presentes y brinda por los buenos momentos", 
"Bebe el máximo de suspensos que hayas tenido, si es ninguno te solidarizas y bebes con el que más suspensos tiene", 
"Sube una historia con una encuesta y si gana la opción que elegiste reparte 3 tragos si pierdes bebe 3", 
"Tienes 3 esquivas, eso quiere decir que podrás saltarte 3 veces que te toque beber hasta el final de esta partida", 
"Sigue la canción que este sonando si no te la sabes bebe 3", 
"Si has tenido sexo esta semana reparte 2 tragos si llevas meses sin hacerlo bebe 2",
"Reparte 3 tragos si tienes el vaso en la mano",
"Si no has cenado y vas a salir de fiesta reparte 2 tragos y así retrasamos que tus amigos te tengan que cuidar",
"Si piensas que alguno de los jugadores suele poner excusas para no salir con el grupo repartele 3 tragos por sapo",
"Si esta es tu cuarta copa o más reparte 5 tragos",
"Si conoces de hace poco a alguno de los jugadores haced un brindis",
"Nombra 5 DJ's, si lo consigues repartes 2 si no bebes 1",
"Por turnos decid calles del monopoly, el que repita o se quede sin ideas bebe 1 trago",
"Di el nombre de tres bachatas o bebe 1 trago",
"Di el nombre de 5 streamers que no sean IBAI, AURONPLAY o RUBIUS, si fallas bebes 4 tragos",
"Tira un dado y reparte el número que te salga en forma de tragos",
"Deberán darte un beso en la mejilla, por cada persona que lo haga beberás 1 trago", 
"Todo el que quiera podrá darte un azote, si te niegas bebes 5 y si no beberás 1 trago por cada persona que te haya dado", 
"Reparte 2 tragos  si estás planeando un viaje, si es con alguien que esté aquí que beba 2", 
"Pregúntale algo profundo al de tu derecha",
"Por orden decid títulos de películas cuyo nombre solo lo forme una palabra, tu empiezas. El que repita o se quede sin ideas bebe 3 tragos",
"Puedes agregar, modificar o eliminar una regla",
"¡QUE EL CALENDARIO TE ACOMPAÑE! Por cada mes de este año que lleves soltero bebe un trago",
"Si has tenido COVID-19 bebe 2, si nunca lo has tenido reparte 2 tragos", 
"Di como conociste a cada uno y brinda por ello", 
"Reparte 3 tragos si llevas una prenda rosa, verde o naranja", 
"Reparte 1 trago por cada accesorio que lleves, piercings, tattoos, pendientes y pulseras (cuentan una vez cada uno)", 
"Bebe un trago por cada año que lleves sin montar en Bicicleta, a partir de hoy puedes montar y evitar beber la próxima vez, recuerda que montar en bici nunca se olvida", 
"Reparte dos tragos si estás apuntado a la autoescuela", 
"Bebe 2 tragos si la canción que está sonando no te gusta", 
"Te toca recitar el inicio de llamado de emergencia, si no te lo sabes bebe 3, si te lo sabes reparte 6", 
"Reparte 4 tragos", 
"Bebe 2 tragos", 
"Bebe un trago por cada hermano o hermana que tengas",
"Si has tenido que cancelar algunas vacaciones/viaje por culpa del COVID bebe 2, si es con alguien de los aquí presentes brindad para ahogar las penas",
"Bebe 2 si alguna vez has robado",
"23 preguntas. El juego consiste en que deberás pensar en una persona (famosa o no) que todos los presentes conozcan. El resto entre todos podrán hacer 23 preguntas (tus respuestas pueden ser únicamente SI, NO o A VECES) para tratar de adivinar a esa persona. Si aciertan bebes tres, de lo contrario el resto bebe 1 cada uno", 
"Bebe 2 tragos si tienes un secreto con alguien de los aquí presentes",
"Llama a una persona del sexo opuesto y dile que te gustaría tener una cita con su madre/padre",
"Llama a una persona de tu elección, el resto de jugadores deben decidir cual será la temática de la llamada, esta debe durar dos minutos sin que te pillen la broma, si lo consigues tendrás 20 tragos para repartir",
"Hazte una foto haciendo la peineta y mándasela a quien digan tus amigos, si te niegas bebe 5 si lo haces reparte 5", 
"Cuenta un sueño erótico que hayas tenido, reparte 3", 
"Haz 10 sentadillas y reparte 4 tragos", 
"Haz 10 flexiones y reparte 4 tragos",
"Eres el francotirador de la fiesta, cuando quieras podrás disparar a otro jugador que beberá un tragp y se convertirá en el nuevo francotirador (guiñándole el ojo sin que el resto de jugadores se entere. Si te pillan serás de nuevo el francotirador y debes beber un trago).",
"Cuenta un chiste, si nadie se ríe bebe 4 tragos, si alguien se ríe bebe 2", 
"Imita a un animal con mímica el primero que lo adivine podrá repartir 5", 
"Enseña tu foto más vergonzosa si te niegas bebe 3", 
"Cántale una canción a la persona que tienes a tu derecha, si te niegas bebe 3", 
"Te deberán insultar durante 10 segundos en lo que tomas 4 sorbos", 
"Canciones encadenadas. El jugador comienza cantando una canción y cuando quiera parará, el jugador de su izquierda deberá cantar una canción con la última palabra dicha por tí y así hasta que uno repita o se quede sin ideas",
"Haz una pose ridícula y deja que tus amigos te hagan una foto, si te niegas bebes 4",
"Debes interpretar una canción únicamente dando palmas, si nadie lo acierta beberás 2 tragos. Si alguien lo acierta repartirá junto a tí 4 tragos a una única persona",
"Eres Athos, elige a un Porthos y a un Aramis, seréis los tres mosqueteros de aquí a diez minutos (pausar el contador cuando no estéis jugando o para ir al baño), cada vez que uno beba por vuestro juramento deberéis beber los tres a la voz de todos para uno y uno para todos. Un trago de mas por cada fallo.",
"Eres indiana jones, el resto esconderá sus pertenencias (llaves y cartera) por la sala en la que estéis, tú te irás para no verlo, tendrás un minuto desde que te avisen para encontrarlo. Por cada uno que encuentres repartes 3, por cada una que no encuentres bebes 2",
"Recita un padre nuestro completo, si lo sabes reparte 3 en nombre de Cristo, si no bebe 1 por ateo.",
"Eres la cenicienta, si son mas de las 00 bebes 4, si es antes de las 00 reparte 2.",
"Bebe un trago por cada año que llevas diciendo que te ibas a sacar el carné de conducir",
"Di cuáles son todas las fichas del Monopoly clásico, si lo consigues reparte 4",
"Reparte 2 tragos por cada pulsera que lleves si no tienes ninguna bebe 2",
"Haz con mímica una película, quién lo adivine repartirá 5",
"Haz el ruido de animal que el resto diga y además bebe 2",
"Patata Caliente: Debéis poner un temporizador de un minuto y medio y el jugador que ha salido deberá adivinar el número católicos en EEUU (los que llevan el tiempo que lo miren). El que adivina puede decir tantos números como quiera hasta dar con el correcto pero los demás jugadores solo le podrán decir más o menos. Si lo consigues repartes 10",
"Habla con acento (el que quieras) y nos cuentas de qué trata la última serie que has visto. Añade palabras propias de ese acento para ver quién es capaz de adivinar de qué serie se trata, ese jugador repartirá 2 tragos",
/*SUPERPODERES*/
"Eres Spider-Man, puedes esquivar 10 tragos que te toquen, además puedes hacer uso de tus telarañas para salvar a cualquiera de los tragos que le mande otro jugador (obviamente se restarán de tu total de 10)",
"Eres la Barbie de la fiesta, todos te quieren y harán lo que quieras durante 5 minutos, si alguien se niega a hacer lo que le mandes beberá 1 trago cada vez que se niegue.",
/*ADIVINAR COSAS CON EMOTICONOS*/
"👶🍼👔💼 Adivina la película. Si fallas bebes 2, si aciertas los repartes.",
"👨‍🦲🏎💨 Adivina la película. Si fallas bebes 1 y si lo aciertas repartes 2",
"🧙‍♂💍💍🗡🐲 Adivina la película y si lo aciertas reparte 2. Pista: J.R.R. Tolkien",
"🤖🔄🚕 Adivina la película o beberás 1 trago",
"🕷🕸🤷 Adivina el superhéroe o bebe 2",
"🔎🐟 Adivina la película o bebe 2, si aciertas los repartes",
/*CANCIONES, POR SI NECESITAN UNA CATEGORIA A PARTE LAS SEPARO*/
"Y si te digo que el resto nos mira... Continúalo (las 6 palabras siguientes) correctamente o bebe 3 tragos ya que ella She dont Give A Fo",
"Aunque pierda esta gente se va a llenar de orgullo... Completa la barra o bebe 1 trago.",
"Te cambió siendo mejor que ella, Continúalo correctamente o bebe 2 tragos",
"Atrévete-te-te, salte del... Continúalo (las 5 palabras siguientes)",
"Antes era un pobre infeliz, ahora no soy... Completa la barra y si lo haces bien reparte 2",
"Una perra (mmm) sorprendente (uh)... Añade 5 palabras o bebe 1",
"Cuéntame, Tu despedida para mí fue dura... Completa la barra o bebe 1",
"Cada vez me importas menos Pues olvido cuando () Aunque sienta que me muero () () () () Medicina alternativa Tu () en mi (). Completa las palabras que faltan o bebe 2 tragos (cada () es una palabra).",
"Quiero rayos de sol () en la () y ver como se pone () () () y morena. Rellena los paréntesis con la palabra que corresponde y bebe un trago por cada uno que hayas fallado.",
"Antes que te vayas dame un beso... Añade las siguientes 6 palabras o bebe 2 tragos pero si aciertas reparte 2."
];

let generales = ["Si tus fiestas favoritas son en las que se escucha Reggaeton reparte 2, si eres de Electrónica (EDM) reparte 4, si solo te gusta el Techno/Rock/Heavy/Indie... bebe 2",
"Mirar todos hacia abajo y a la de tres mira a alguien si coincides bebes 2", 
"El primero en decir la hora reparte 3 tragos",
"El porcentaje de batería más alto bebe 1 tragos", 
"El porcentaje de batería más bajo bebe 2 tragos",
"El último en haber mantenido relaciones sexuales reparte 3 tragos",
"Los que lleven reloj beben 1 trago",
"Por turnos decid nombres de jugadores de futbol, el que repita o se quede sin ideas beberá 2 tragos",
"Nombres de discotecas a menos de 40 km, el que repita o se quede sin ideas que beba 2 tragos",
"Nombres de artistas que han actuado en tu zona/ciudad, el que repita o se quede sin ideas bebe 2 tragos",
"El último en ponerse en pie bebe dos tragos, si estaís ya de pie será el último en saltar",
"Reoarte 3 tragos todo aquel que esté jugando a más de 40km de su casa",
"Todo el que tenga frío que beba 3 tragos para entrar en calor",
"Las personas que fumen beberán un trago por cada cigarro que tengan",
"Por turnos tirad un dado, el que saque el número más bajo beberá el número que haya sacado y se elimina, el resto sigue jugando hasta que solo queda uno en pie",
"El más peludo reparte 5, todos votan",
"El último en haber vomitado por culpa del alcohol reparte 5 por asqueroso",
"Los gafotas beben tantos tragos como dioptrias tengan",
"De aquí al final del juego debéis hablaros entre vosotros únicamente mediante preguntas, ¿Lo habéis entendido?",
"Decir todos una canción y añadirla a la cola",
"Decid superpoderes que sean muy útiles tanto en tu trabajo como en la cama, el que repita o se quede sin ideas bebe 1 trago",
"Si tienes Spotify gratis bebe 2 por pobre, si lo tienes de pago reparte 2, si lo tienes pirata reparte 1 por pícaro",
"Los que tienen Amazon Prime reparten 1 trago, si pides con el de un familiar no cuenta",
"Di tu Pokémon favorito, si coincides con otro bebéis 2 tragos",
"Di tu Saga de películas favoritas si coincides con otro bebe 2 tragos",
"Olvidonas... Decid frases cutres para ligar, el que se quede sin ideas o repita bebe 2. A por ello fornicadores",
"Decid refranes populares. El que se quede sin ideas bebe 3 tragos. Empieza el lector de esta prueba",
"Hola vaqueros alcohólicos, ahora todos tendréis un revólver cargado con tantas balas como copas llevéis en el día de hoy. Cada bala que disparéis hará que beba la persona a la que apuntes un trago. Úsenlas bien.",
"Jugar a chinitos entre todos y al que le toque repartirá la suma total de dedos (no vale sacar más de 5 dedos)",
"Móviles al centro de la mesa boca arriba y con sonido, por cada mensaje a cualquiera bebereis un trago por cada uno",
"Si has fantaseado con la mami o el papi de algún amigo bebe 2 tragos",
"Esta es para los viejos. Por cada uno de los siguientes recursos que hayas usado beberás un trago: Ares, eMule, ElRinconDelVago, Tuenti, Megaupload",
"Esta es para los viejos V2. Por cada uno de los siguientes recursos que hayas usado beberás un trago: Musical.ly, Messenger, Playfulbet, JuegosJuegos.com, Flappy Bird",
"Si has fantaseado con un profesor bebe 2 tragos",
"Los que mezclan con Coca-Cola o Fanta sois gente de bien,si lo haces con marcas blancas toma 2 sorbos",
"Reparte 5 si eres un guerrero y mañana trabajas",
"Si tu pizza favorita es la barbacoa bebe 1, si es la carborana bebe 2, si te gusta la pizza con piña bebe 5",
"Bebed 2 tragos si estás jugando antes de salir de fiesta, si no invitad a más personas y montarla vosotros",
"Los aburridos que hayan dicho bajar la música o los sordos que dicen de subirla beben 3 tragos",
"Votad al más mentiroso, el elegido beberá 2",
"El último que haya llegado bebe 2 tragos",
"El más alto por jirafa reparte 2",
"Todos deberán elegir entre cara o cruz, tira una moneda si has fallado bebe 2 tragos aciertas reparte 1", 
"Si prefieres kebab reparte 2, si eres de durum reparte 1.",
"El más bajo bebe 2, tapón",
"El más inteligente bebe 2",
"Cosas que echamos de menos de la infancia o que eran mejores en ese tiempo, el que repita o se quede sin ideas que beba 2 tragos para volver a la niñez",
"Qué recibe mayor número de búsquedas en Google: Obesidad o Divorcios. Cada cual diga su respuesta y luego busquen la respuesta. Los que han fallado beben",
"¿Quién va mejor vestido/a hoy, la persona de tu izquierda o de tu derecha? Mójate y cada cual beberá un trago por cada persona que le haya dicho que viste mejor (como mucho puedes beber dos en esta ronda asi que no te quejes)",
"Reparte 2 tragos si has ido a más de 4 conciertos",
"Beber 2 tragos si alguna vez saliste en un periódico o televisión",
"Repartid 2 por cada libro que te hayas leído este año, nombrando título y autor",
"El más vacilón beberá el número de tragos como jugadores estén jugando, todos votan",
"2 mentiras y una verdad. Cada jugador dirá dos mentiras y una verdad sobre él/ella a la persona de su derecha, esta tendrá que detectar cuál es la verdad. Si pillan tu verdad bebes 1 trago, si no lo beberá la otra persona",
"Los menores reparten 2",
"DROGACICTOS, Sí has fumado María bebe 1, polen 2, si es hachís 3, si es algo más duro reparte 5",
"Bebe por cada vez que hayas pedido/comprado comida basura esta semana",
"Si bebes ron reparte 1, si es whisky bebe 2, si es Vodka reparte 3, si es Ginebra bebe 4",
"Si echas de menos o conoces el almirante ron del estudiante  bebe 2 tragos en su honor",
"Decir equipos de la liga española, el que se quede sin ideas bebe 2 tragos",
"Decir actores famosos, el que se quede sin ideas bebe 2 tragos",
"Decir actrices famosas, el que se quede sin ideas bebe 2 tragos",
"Por turnos nombrad raperos famosos, el que se quede sin ideas bebe 4 tragos",
"Mujeres sexys, el que se quede sin ideas bebe 1",
"Decir ciudades de España, el que se quede sin ideas bebe 2 tragos",
"Si el creador de la playlist que está sonando está aquí reparte 3, si no estáis escuchando ninguna Bebed todos y hay que ir pensando en crearse una, de nada",
"Bebe 3 tragos si tienes hora para irte a casa o tienes pensado irte antes de las 4, si alguien miente y no bebe en esta prueba pero se va antes de las cuatro el próximo día deberá empezar con hidalgo",
"De aquí hasta el final del juego prohibido pronunciar SI o NO, un trago por cada falta.",
"Cuales son las mejores promesas? Que todo el mundo responda, solo los que sepan cómo continua la frase podrán repartir 5 tragos.",
"Bebe si te ha gustado la BZRP Session #23 de Paulo Londra.",
"Un trago por cada una de vuestras conquistas en Tinder",
"El mas agarrado respecto al dinero bebe 2, todos votan.",
"Cambio de música gente, que cada uno añada una canción a la cola que sea de un género distinto al que soléis poner de fiesta normalmente",
"A los que les encantan los dias de lluvia beben",
"A la de tres digan todos el artista que está sonando o uno de ellos, el que falle bebe. Si no tienen música bebed todos panda de amargados",
"3 verdades, digan tres frases sobre el jugador de su derecha (si se conocen mucho no valen cosas obvias), deben intentar que todas sean verdad, el propio jugador juzgará, por cada frase falsa beberás, por cada una verdadera beberá él.",
"Tomense una foto señores, nada de beber por ahora. Haced alguna pose ridícula o graciosa no seáis aburridos/as.",
"El más rapero bebe, todos votan",
"Bebe 2 tragos si nunca has ido a una discoteca", 
"Votad al más cocinitas, este beberá 2",
"Los que más fiestas se hayan pegado juntos reparten 1 trago cada uno",
"Bebe 2 tragos por cada suspenso en el último trimestre", 
"Reparte 1 trago por cada billete que tengas en la cartera, si no tienes ninguno además beberás 2", 
"Bebe en tragos el segundo dígito de puntos que lleve tu equipo en liga", 
"Bebe 2 tragos si hoy dijiste HOY NO BEBO",
"La persona más guapa de las que están jugando bebe, todos votan",
"Dos tragos para el/la que mejor viste, todos votan",
"Los Otakus a los que les gusta el Anime beben (están exentos a los que les gusten Animes del tipo Doraemon, Inazuma Eleven o Dragon Ball)",
"Época de la NBA Pre-Jordan, todos los que tengan las zapatillas blancas serán multados con un trago.",
"Nunca es tarde para decir lo siento, si algunos de los presentes están enfadados y quieren hacer las paces es el momento, si sucede brindaremos por ello",
"Estáis en El Concilio de Elrond (El señor de los Anillos), quedan anulados todos los castigos y normas que había hasta el momento, además brindaréis en honor a Tolkien.",
"Desde aquí hasta el final de la partida el primero en decir pepino al acabar una canción repartirá 1 trago.",
"Buenas artistas. Debéis formar parejas (si sois impares un grupo de tres). Uno será el artista y otro el ojeador. Los artistas deberán agruparse lejos de los ojeadores y decidir entre ellos qué dibujará cada uno (cada uno algo diferente). Una vez hecho estó os volvéis a juntar y cada uno con su pareja tendrá 1 minuto para adivinar que está dibujando su artista. Si adivina el resto de parejas beberán un trago",
"¿Quién es el más MDLR? El elegido Reparte 3",
"Cuatro nueves son capaces de dar 100 como resultado. ¿Cómo? El primero que responda correctamente reparte tantos tragos como personas haya jugando.",
"¡ADIVINANZA! Son doce señoras con medias, pero sin zapatos. ¿De quiénes se trata? El primero en responder correctamente (sin hacer trampas) que reparta 4 tragos."
];

/*Estas tienen que mantener este formato porque al final se les añade una cantidad de tragos random de manera automática*/
let eleccion = ["Papi gavi o Xokas \nla minoría bebe", 
"Ibai o Auronplay \nla minoría bebe", 
"Anuel o Bad Bunny \nla minoría bebe", 
"Cr7 o Messi \nla minoría bebe", 
"Duki o Paulo \nla minoría bebe", 
"Mamá o papá si no puedes elegir bebe 2 por buen hijo \nla minoría bebe",
"Que tus padres te vean manteniendo relaciones o ver a tus padres teniendo relaciones \nla minoría bebe", 
"Pasar un año a 40º o pasar un año a -10º;\nla minoría bebe", 
"Tener el cuello como una jirafa o tener la nariz como un elefante \nla minoría bebe", 
"Tener 3 piernas o tener 3 brazos \nla minoría bebe", 
"Pasar 5 años en la cárcel o 10 años en coma \nla minoría bebe", 
"No cambiarte la ropa en 1 mes o no ducharte en 1 mes \nla minoría bebe", 
"No llevar nunca más ropa interior o solo poder llevar ropa interior usada \nla minoría bebe", 
"Ser pobre junto al amor de tu vida o ser multimillonario sin conocer el amor \nla minoría bebe", 
"Saber qué día morirás o saber de qué morirás \nla minoría bebe", 
"Hablar como Yoda o respirar como Darth Vader \nla minoría bebe", 
"Poder volar o poder leer la mente \nla minoría bebe", 
"Poder volver al pasado o poder saber el futuro \nla minoría bebe", 
"Ganar 50.000 euros ahora mismo o que cada día te den 5 euros \nla minoría bebe", 
"No salir nunca de tu ciudad o salir pero no poder volver nunca más \nla minoría bebe",
"Rubias/os o morenas/os \nla minoría bebe",
"Bad Gyal o La Zowi \nla minoría bebe",
"Becky G o Natti Natasha \nla minoría bebe",
"Vegetta777 o Willy \nla minoría bebe", 
"Rafa Nadal o Federer \nla minoría bebe", 
"David broncano o Pablo Motos\nla minoría bebe", 
"Hitler o Stalin\nla minoría bebe", 
"Reggaeton o electrónica\nla minoría bebe", 
"Amador Rivas o Antonio recio\nla minoría bebe", 
"Apple o Microsoft\nla minoría bebe", 
"Capitán América o Iron man \nla minoría bebe", 
"Madrid o Barsa \nla minoría bebe", 
"Discoteca o casa/calle \nla minoría bebe", 
"Picina o playa \nla minoría bebe",
"Bad Bunny es el mejor reggaetonero de la actualidad. Voten SI o NO. La minoría bebe",
"¿Escuchas las sesiones de BZRP aunque no conozcas al artista? La minoría bebe",
"Pizza o hamburguesa \nla minoría bebe", 
"Comida China o Mexicana \nla minoría bebe", 
"FMS España o FMS argentina \nla minoría bebe", 
"Fútbol o Baloncesto \nla minoría bebe", 
"Patatas gajo o Patatas normales \nla minoría bebe", 
"Cerveza o refresco \nla minoría bebe", 
"Frío o calor \nla minoría bebe", 
"El juego del calamar o la casa de papel\n la minoría bebe",
"Ver fútbol o jugar al fútbol\n la minoría bebe",
"Tortilla de patata con o sin cebolla\n la minoría bebe",
"Piratas del Caribe o Harry Potter\n la minoría bebe",
"Películas o Series\n la minoría bebe",
"Burger King o Mc Donalds\n la minoría bebe",
"¿Con condón o sin condón?\n la minoría bebe",
"¿Tragar o Escupir?\n la minoría bebe",
"¿Se sale hoy de caza?\n la minoría bebe"
];

let duelos = ["Poner una alarma cada uno, cuando suene el otro se bebe la mitad de lo que tenga en ese momento", 
"El primer jugador es Thanos y el segundo es Iron man, cuando Thanos quiera podrá  chasquear los dedos y todos deberán beber la mitad de su vaso pero Iron Man puede detenerlo, bebiéndose junto a Thanos lo que les quede en el vaso o no sacrificarse por los suyos", 
"Deberán bailar un vals o bachata, si lo hacen reparten 10 tragos entre los dos",
"Pares y nones, el que pierda bebe 2",
"Juego de compenetración. Ambos jugadores deberán decir un número a la vez que esté entre el 1 y el 10, si coinciden reparten 10 tragos entre los dos si no coincide beben 2 tragos cada uno",
"Concurso de flexiones entre los jugadores, el que gane hará beber al otro 5 tragos.",
"Alejaos del resto de jugadores y cread una seña/código/palabra que deberéis hacer durante la partida sin que el resto de jugadores os pille dicha seña. Por cada vez que lo consigáis el resto beberá un trago, si os pillan cada uno deberéis beber 10 tragos. Cuando acabe la partida deberéis decir al resto cuál era la seña",
"Sois Chip y Chop. Por cada vez que uno de los dos hable el otro deberá beber 1 trago. Esta prueba dura 10 minutos así que por vustro bien cronometadlo.",
"Cambio de roles. Los jugadores intercambian sus nombres durante esta partida y lo que le corresponda beber a cada uno se le transferirá al otro y viceversa.",
"Ambos jugadores vais a beber un chupito, espero que esté bueno la verdad.",
"Los jugadores jugarán al juego de señalar, existen cuatro direcciones (arriba, abajo, izquierda y derecha), a la cuenta de tres uno de los jugadores apuntará en una dirección y el otro deberá mirar a una dirección distinta a la que apunta el dedo, si lo consigue apuntará él y el otro jugador deberá hacer lo mismo, el primero que se equivoque bebe 5",
"Jugad a piedra papel o tijera, al mejor de tres, el que pierda bebe 4",
"El primer jugador es Romeo y el segundo Julieta. Julieta en muestra de su amor beberá en lugar de Romeo hasta el final de la partida. A cambio, Romeo se tomará todo lo que le quede en el vaso al final de la partida lleno de tristeza por su Julieta.",
"Batalla de rimas entre los jugadores, no os cortéis si no sabéis hacerlo, esto es para echarse unas risas",
"Buscad lo siguiente en YT: juego douglas costa dybala. Echad una partida entre los dos y que el resto haga de juez, el que pierda bebe 2",
"El lazarillo de Tormes. Preparad un circuito con obstáculos. El segundo jugador será ciego asi que vendadle los ojos. Deberá recorrer el circuito siguiendo las indicaciones de su compañero sin fallar. Si lo consiguen podrán hacer que otro jugador beba la mitad de lo que queda en su vaso. Si no lo conseguís beberéis entre los dos lo equivalente a medio vaso (1/4 cada uno)",
"Pulso chino entre los jugadores. El perdedor bebe 3 tragos",
"Pulso clásico entre los jugadores, el que gane hará que el otro jugador beba 4 tragos. ",
"El primer jugador deberá coger al segundo como una princesa, si no puede con él/ella deberá beber 4 tragos para ponerse más fuerte.",
"El jugador que salte más alto de los dos hará beberse al otro 2 tragos.",
"Pulso vasco entre los jugadores. El perdedor bebe 3. Si no aceptáis bebed 1 trago y seguimos jugando"
];

let castigos = ["Cambiaros todos de sitio, deberá ser durante toda la noche, el que no quiera Debera tomarse medio vaso", 
"Deberás elegir quién comprará los hielos el próximo día que juegueis a HOY NO BEBO  y además 2  tragos todos", 
"Habla como Xokas/Gallego durante 10 minutos, el resto controladlo, un trago por cada falta",
"Habla como si tuvieses retraso durante 5 minutos, un trago por cada falta",
"HABLA GRITANDO!!! DURANTE 7 MINUTOS, UN TRAAAAGO POR CADA FALTA!!",
"Eres Eminem, habla rimando durante 10 rondas, un trago por cada falta.",
"Habla como Mourinho durante 5 minutos.",
"Adivina el porcentaje de batería de alguno de los jugadores (un intento por cada uno), si lo consigues repartes 10 tragos si no beberás 5",
"Déjale el móvil al jugador de tu derecha durante 2 minutos en los que puede hacer lo que quiera, si no aceptas bebe 5 tragos",
"Deberás decir todo lo que se te pase por la cabeza, es decir no debes parar de hablar. Este castigo dura 5 rondas. Por cada falta un trago",
"Ronda de collejas, cada jugador te va a dar una colleja con la fuerza que considere, lo sentimos mucho.",
"En honor a Jack Sparrow, bebe un chupito directamente de la botella, esta prueba no te la puedes saltar de ninguna manera",
"Eres Bizarrap, busca una gorra y unas gafas y póntelas hasta que el resto de jugadores diga, si no encuentras tapate con lo que pilles.",
"Hola jugón, estoy encantadísimo de comunicarte que vas a exagerar todo lo que digas durante 10 ronditas. El resto vigilad que será un trago por cada falta.",
"De aquí al final del juego deberás acabar tus frases con algo que no tenga sentido.",
"No podrás parpadear durante 1 minuto",
"Llamar por teléfono a un familiar o amigo y hacerle una falsa confesión acordada por el grupo, si se la cree reparte 10 si no beberás 5",
"Eres Moisés, así que de aquí al final del juego podrás abrir en dos los mares y hacer que todo el mundo reduzca su vaso a la mitad",
"Elimina 5 aplicaciones de tu teléfono o bebe 10 tragos",
"Todos deberéis dirigiros hacia quién habléis de manera despectiva. Daros caña un rato y un trago por cada falta.",
"2 Minutos sin apoyar el vaso en la mesa",
"Publica en la red social que quieras algo con temática elegida por el resto. Si es Instagram puedes subir una historia, si prefieres puedes poner un tweet, eso es elección tuya.",
"Si tu vaso está a menos de la mitad debes acabarlo, el resto comprobadlo",
"De aquí al final de la partida vas a hablar únicamente utilizando la vocal que decida el resto. Un trago por cada falta",
"De aquí a 5 rondas hablarás en tercera persona sobre ti mismo. Por ejemplo Julían en lugar de decir quiero agua debe decir Julian dice que quiere agua. Un trago por cada fallo"
];

let preguntas = ["¿Qué es lo último de lo que te arrepientes? Tienes la oportunidad de enmendarlo si es posible (Por atreverte reparte 4 tragos)", 
"Cuál es tú película favorita, un trago por cada uno que la haya visto",
"¿Cuál es tu videojuego favorito, si otro de los presentes lo ha jugado bebe 1 trago?", 
"Bebe si te gustaría que no estuviese alguien de los aquí presentes",
"Si supieras cuándo vas a morir, ¿cambiarías tu forma de vivir? Bebe 1",
"¿Qué es lo que más miedo te da? Bebe 2",
"¿Tienes algún miedo que no le hayas contado a nadie? Si es así bebe 2",
"Si pudieras pedir un deseo ahora mismo, ¿cuál sería? Bebe 2",
"¿Cuántas veces has comido verdura esta semana? Si es menos de 3 bebe 3 tragos",
"Si fueses un animal… ¿cuál serías? Reparte los tragos que acuerdes con el resto en función de lo alpha que sea ese animal",
"¿Quién te ha influenciado más en la vida? Bebe 2",
"¿Cuál es tu canción favorita? Responde y ponedla para que todo el mundo la disfrute",
"¿En qué momento de tu vida has pasado más vergüenza? Si hay pruebas muéstralas y además bebe 1", 
"Si solo pudieras escuchar a un cantante o grupo durante el resto de tu vida, ¿cuál sería? Si a alguno no le gusta que beba un trago", 
"Si no hubiera leyes durante un día... ¿qué 3 cosas harías con mayor prioridad? bebe 2, si te has pasado demasiado bebe 5 y vuelve al mundo real", 
"Si pudieras ser un famoso durante un día, ¿qué famoso serías? Bebe 1", 
"¿Con quién de los aquí presentes harías un trío? Brindad por ello",
"¿Quién de los aquí presentes dirías que es el más fuerte? Brinda con él con 2 traguitos",
"¿Dónde te irías con los aquí presentes a pasar unos días? Todos beben 2",
"¿Qué es lo que más te aburre? Bebe 1 para animarte",
"Qué es lo más loco que has hecho por un chico/a?", 
"¿Di qué es lo que menos te gusta de la persona de tu izquierda?", 
"¿Cuenta cuál es la cosa más infantil que todavía haces?", 
"Si pudieras cambiar tu vida durante un día por la de alguno de los otros jugadores, ¿Quién sería? Bebe 2 tragos", 
"Cuenta la historia de algo que hayas hecho tras consumir alcohol y que luego te arrepentiste, reparte 2 tragos", 
"Di cuál es el apodo más vergonzoso que has tenido y bebe 2 tragos",
"¿Cuál es la historia más vergonzosa en donde has vomitado? Reparte 2",
"¿Has llorado viendo alguna película, cuál? Nadie bebe en esta ronda.",
"Si solo pudieses llevar un conjunto de ropa puesto ¿Cuál sería?",
"¿Cuántas veces has ido a mear hoy? Bebe una vez por cada una",
"¿Cuál es tu serie de televisión preferida? Si alguien la ha visto que beba",
"¿Qué comida no probarías jamás? Bebe 2 si a alguno de los aquí presentes le encanta esa comida",
"Por 10.000€ ¿Chuparías el pene/vagina de la persona de tu derecha?. Si la respuesta es sí brinda con esa persona y empezad a plantearlo",
"¿Quién sería la última de las personas presentes que dejarías que cocinase para tí? Brindad por ello ambos",
"Si te abrieses Onlyfans ¿Qué precio pondrías teniendo en cuenta que subirías fotos desnudo/a? Si alguno de los presentes pagaría por verte que beba 1 trago"
];

let cultura = [
{question: "Número de habitantes de Grecia, si te acercas 1.000.000 arriba o abajo te libras de beber si no bebe 3", answer: "10,64 millones (2021)"},
{question: "Cita los elementos de la primera columna empezando por la izquierda de la tabla periódica, si te lo sabes reparte 5, si no te lo sabes bebe 2", answer: "Litio (Li), Sodio (Na), Potasio (K), Rubidio (Rb), Cesio (Cs) y Francio (Fr)"},
{question: "¿A qué elemento corresponde el símbolo K?, si lo sabes reparte 6", answer: "Potasio"},
{question: "¿En qué año llegó Cristóbal Colón a América?, si fallas bebes 3", answer: "En el año 1492"},
{question: "Nombra 5 superhéroes, si fallas bebes un trago por cada uno que no hayas sabido decir", answer: "Ejemplos: Spider-Man, Iron-Man, Hulk, Thor, Batman, Superman, Flash..."},
{question: "¿Cuál es la edad media de los habitantes de España (2 años arriba/abajo)? Si aciertas repartes 3, si no te los bebes", answer: "44.1 años a 1 de enero de 2022"},
{question: "¿Cuántos mundiales posee la selección argentina? Si aciertas reparte 2 tragos si no los bebes", answer: "3 mundiales"},
{question: "¿Qué significan las siglas FIFA?, si no lo sabes deberás beber 4 tragos", answer: "Fédération Internationale de Football Association"},
{question: "¿En que se especializa la cartografía?, bebe 2 tragos si fallas y 4 si te ha costado hasta entender la palabra", answer: "La cartografía es la ciencia encargada de estudiar y elaborar mapas"},
{question: "¿Cuál es el país más extenso del mundo?, si aciertas reparte 3 tragos", answer: "Rusia"},
{question: "¿Cuál es el nombre del himno nacional Francés?, reparte 4 tragos si aciertas o bebe 1 si fallas", answer: "La Marsellesa"},
{question: "¿Qué es más pequeño, un átomo o una molécula?, 3 tragos en juego", answer: "La molécula es más pequeña"},
{question: "¿A qué país pertenece la ciudad de Varsovia?, si aciertas no beberás 2", answer: "Varsovia es la capital de Polonia"},
{question: "¿Cuál es el hogar de los dioses nórdicos? Si aciertas repartes 2. \nPISTA: Thor, Vengadores...", answer: "Asgard"},
{question: "¿Cuál es el equipo con más champions? Reparte 2 tragos si aciertas", answer: "Real Madrid C.F. con 14 champions"},
{question: "¿Cómo se llama el fundador de Zara? Si fallas bebes 1.", answer: "Amancio Ortega"},
{question: "¿Cuál es la capital de Islandia? Reparte 5 si sabes la respuesta", answer: "Reikiavik"},
{question: "¿De qué año a qué año transcurrió la Segunda Guerra Mundial?, si aciertas reparte 1, si fallas bébelo", answer: "1 sept 1939 – 2 sept 1945"},
{question: "¿Quién es el autor del cuadro La Última Cena?", answer: "Leonardo Da Vinci"},
{question: "¿Cuál es el océano más grande de La Tierra?, 2 tragos en juego", answer: "El océano Pacífico"},
{question: "¿Cuántos colores tiene la bandera de Bulgaria? Si has acertado reparte 3", answer: "3 colores (blanco, verde y rojo)"},
{question: "¿Cuántos colores tiene la bandera de Chile? Si has acertado reparte 3", answer: "3 colores (azul, blanco y rojo)"},
{question: "¿Cuál es el río más largo del mundo? Si has fallado bebe 2", answer: "Amazonas"},
{question: "¿A qué compositor clásico pertenecen los nocturnos para piano? Si aciertas reparte 2", answer: "Frédéric Chopin"},
{question: "Ordena estos sucesos cronológicamente: Ataque a Pearl Harbor, Caída estrepitosa de Wall Street, Toma de Francia por parte de Htiler, Guerra de Vietnam. reparte 4 si aciertas.", answer: "Caida de Wall Street (1929) - Toma de Francia (1940) - Ataque Pearl Harbor (1941) - Guerra de Vietnam (1955)"},
{question: "¿Cuántos estados tiene integrados Estados Unidos? Si respondes bien reparte 4", answer: "Hay 50 estados en EEUU"},
{question: "¿Cuántos años duró la guerra de los 100 años? Si fallas bebes 1, si respondes bien reparte 3", answer: "116 años"},
{question: "¿Cuál fue la primera película que apareció de Disney? Si respondes bien reparte 3", answer: "Blancanieves"},
{question: "¿Quién promulgó la frase Hoy Dios ha muerto? Reparte 2 si lo aciertas", answer: "Friedrich Nietzsche"},
{question: "Quién separó en dos las aguas en la biblia. Bebe 2 si fallas para rellenas tus mares.", answer: "Moisés"},
{question: "¿Cuál es el edificio más alto del mundo? 2 tragos a repartir si aciertas", answer: "Burj Khalifa"},
{question: "Cita una de las tres películas con más premios Óscar de la historia o bebe 2 tragos.\nPISTA: 11 Óscars", answer: "Titanic, Ben-Hur y El Señor de los Anillos: el retorno del Rey"},
{question: "¿Cuál de estas no es una de las siete maravillas del mundo moderno? Coliseo Romano, Petra, Faro de Alejandría, Taj Mahal. Si fallas bebes 2.", answer: "El faro de Alejandría no pertenece al mundo moderno"},
{question: "¿Cuál es el planeta más grande del Sistema Solar? Si fallas bebe 2 tragos gigantes como planetas.", answer: "Júpiter"},
{question: "¿Cuál es el animal representado en la Vara de Asclepio/Esculapio. Símbolo de la medicina? 3 tragos que repartes si aciertas galeno.", answer: "La Serpiente"},
{question: "¿Cuál es la película más taquillera de la historia? Reparte 4 si aciertas.", answer: "Avatar"},
{question: "¿Cuántas notas musicales existen? Bebe 1 si has fallado.", answer: "7 notas básicas (12 si contamos las alteraciones)"},
{question: "Ordena estás películas de menos a más premios Óscar: Star Wars: Episodio IV. - La La Land - Mary Poppins - Ben Hur. Si aciertas repartirás 4 tragos", answer: "Mary Poppins (5 Oscars) La La Land (6 Oscars) Star Wars: Episodio IV (7 Oscars), Ben-Hur (11 Oscars)"},
{question: "Ordena estás películas de menos a más premios Óscar: Braveheart. - Algunos Hombres Buenos - El silencio de los corderos - El Padrino: parte II. Si fallas bebe 1 y si aciertas reparte 4.", answer: "Algunos Hombres Buenos (0 Oscars) - Braveheart (5 Oscars) - El Silencio de los Corderos (5 Oscars) - El Padrino: Parte II (6 Oscars)"},
{question: "Estos personajes pertenecen a una de las siguientes categorías (Deporte, Medicina, Arte Clásico, Cine). Clasifícalos de manera correcta y reparte tantos tragos como aciertos hayas tenido: Louis Pasteur, Idris Elba, Sean Penn, Tiziano, Ciro Immobile.", answer: "Louis Pasteur (Medicina), Idris Elba (Cine), Sean Penn (Cine), Tiziano (Arte clásico), Ciro Immobile (Deporte)"},
{question: "Estos personajes pertenecen a una de las siguientes categorías (Deporte, Medicina, Arte Clásico, Cine). Clasifícalos de manera correcta y reparte tantos tragos como aciertos hayas tenido: Andrew Robertson, Hipócrates, James Stewart, Sigmund Freud, El Greco.", answer: "Andrew Robertson (Deporte), Hipócrates (Medicina), James Stewart (Cine), Sigmund Freud (Medicina), El Greco (Arte clásico)"},
{question: "Cuál es el nombre del autor español de las obras La casa de Bernarda Alba y Bodas de Sangre que murió fusilado tras la Guerra Civil Española. reparte 3 si lo aciertas.", answer: "Federico García Lorca"}
];

let beberxbeber = ["Reparte 5 tragos si eres el que  siempre lleva a la gente de tu grupo en coche", 
"Bebed tantos tragos como número de mes hayáis nacido cada uno",
"Repartid cada uno el segundo dígito de los minutos de la hora que sea actualmente",
"Gira una botella y al que apunte el tapón deberá beber un chupito",
"Todos beben 2 tragos",
"Ronda de ruleta de chupitos (un chupito de alcohol y el resto agua), si te pillan disimulando que te ha tocado el de alcohol beberás otros 3 tragos para disimular mejor",
"Prefieres Tobbey Mcguire, Andrew Garfield o Tom Holland, lector espera a las respuestas, si tu favorito es Tom 5 tragos, si es Tobbey 3 tragos si es Andrew 1 trago , lo reconocemos somos muy fans", 
"Un brindis por todos los que no están, os echamos de menos", 
"TODOS REPARTEN 2 TRAGOS",
"Prohibido decir las palabras FUMAR, HIELO, BAÑO y PALABROTAS (en general), hasta el final de la partida",
"Silencio todo el mundo, comienza el juego de las bodas, todos podeis hacer una propuesta de matrimonio a otro jugador, este podrá aceptarla o no, si la rechaza deberás beber 2 tragos para ahogar las penas, si acepta debeis besaros (pico) y el resto beberá 5 tragos",
];

let calientes = ["Cuenta un sueño erótico que hayas tenido, reparte 2 tragos", 
"Dale un beso a otra persona del grupo, en la parte del cuerpo que prefieras, si se niega esa persona bebe 5",
"¿Qué es lo más raro con lo que te has masturbado? Puede ser un objeto, un vídeo, una escena en tu mente...",
"Besa el cuello de la persona de tu derecha, en caso de que se niegue beberá 3 tragos",
"Besa el cuello de la persona de tu izquierda, en caso de que se niegue beberá 3 tragos",
"¿Que sentiste la primera que practicaste sexo oral?",
"Bebe un trago si hay alguna persona jugando con la que te gustaría FXXXXR",
"Toca los genitales de la persona de tu derecha, si se niega beberá 2 tragos",
"Toca los genitales de la persona de tu izquierda, si se niega beberá 2 tragos",
"EL jugador la madre que esté más buena bebe 1, todos votan",
"Enseñad como vais de depilados/as, el que más pelo tenga que beba",
"Dale un pico a la persona de tu derecha, si se niega beberá 4 tragos",
"Dale un pico a la persona de tu izquierda, si se niega beberá 4 tragos",
"Dale un pico a la persona que tengas enfrente, si se niega beberá 4 tragos",
"Beso con lengua a la persona del sexo opuesto que tengas más cerca hacia tu derecha, si se niega 2 tragos",
"Beso con lengua a la persona del sexo opuesto que tengas más cerca hacia tu izquierda, si se niega 2 tragos",
"Responde prueba o verdad picante, el resto de jugadores te pondrá la prueba o pregunta correspondiente",
"Debes quitarte una prenda o beber 4 tragos.",
"Ronda de yo nunca caliente, empiezas tú.",
"¿Dejarías que tu pareja se acostase con otro/a si te ofrecieran 1 millón de euros", 
"Si te perdieras en una isla desierta, ¿a quien te llevarías, a tu pareja o a un amigo?", 
"¿Has ido alguna vez a una playa nudista? Si no has ido con quién irías de los aquí presentes", 
"¿Te gusta tener relaciones íntimas en lugares públicos? Reparte 2 tragos", 
"¿Alguna vez te has enorollado con varias personas en una misma noche? Bebe 2 tragos", 
"¿Cuál es tu sitio favorito para tener relaciones? Reparte 2 tragos", 
"Si una persona a la que estás conociendo te confiesa ser bisexual, ¿Te parecería atractivo o más bien al contrario? Bebe 2", 
"¿Qué harías si pillases a tu pareja masturbándose? Bebe 2",
"Debes quitarle una prenda a la persona que esté a tu izquierda, si se niega bebe 5 tragos.",
"Debes quitarle una prenda a la persona que esté a tu derecha, si se niega bebe 5 tragos.",
"Concurso de calzoncillos entre los hombres, el jugador que lleve los más bonitos bebe 3, las chicas votan",
"Concurso de sujetadores entre las chicas, la chica que lleve el más bonito bebe 3, los hombres votan",
"Concurso de tangas entre las chicas, la chica que lleve el más bonito bebe 3, los hombres votan",
"¿Quién es la última persona en el mundo con la que tendrías sexo oral si no hubiese más remedio?",
"Deberás ponerte debajo de la mesa, y mientras el resto continua jugando podrás acariciar donde quieras a los jugadores, ellos deben manterse serios, en caso de que pillen a alguno, deberá beber un chupito de alcohol puro y ponerse debajo de la mesa. Esta prueba dura hasta el final del juego.",
"Todo el mundo vota dos personas presentes que crea que formen la mejor pareja de la sala, la pareja  elegida deberá encerrarse durante 5 minutos en una habitación, en caso de que uno de los dos se niegue, que ambos beban 6 tragos",
"Colocaros de manera intercalada chico y chica (en la medida de lo posible) y pasaros un hielo con la boca.",
"Acariciale los genitales a la persona del sexo opuesto que tengas más cerca, en caso de haber varias, el grupo elige a cuál",
"Colocaros de manera intercalada chico y chica (en la medida de lo posible), y pasaros una carta con la boca hasta completar el círculo, si se le cae a una persona solo/a que beba 3 tragos, si se cae mientras os la pasais entre dos, besaos"
];

//Funciones
const leerDB = () => {
    contadorRondas = 0; //Al inicio lo establezco en cero
    zonaNombre.innerHTML = '';
    zonaTexto.innerHTML = ''; //Siempre que trabajamos con innerHtml tenemos que empezar con el string vacio
    //Ahora vamos a leer lo que viene del local storage y lo voy a almacenar en mi array para poder ir eligiendo a cada turno los jugadores
    arrayJugadores = JSON.parse(localStorage.getItem('partida')); //lo parseo de nuevo ya que es un JSON cuando esta almacenado

    if(arrayJugadores === null || arrayJugadores.length === 0 || arrayJugadores.length === 1) { //Redireccionamos al setup si solo hay un jugador o si no hay ninguno
        arrayJugadores = [];
        window.location.href = "../index.html";
    }
    else{ //Existe algo en el local storage
        
        zonaTexto.innerHTML += `<div class="seccion-texto" id="texto-juego">
        <div>La partida está a punto de empezar, haz click en el texto o pulsa espacio cuando esté preparado</div>
        </div>`

    }

}

const siguienteRonda = () => {
    
    console.log(contadorRondas);

    zonaNombre.innerHTML = '';
    zonaTexto.innerHTML = ''; //Siempre que trabajamos con innerHtml tenemos que empezar con el string vacio
    zonaRespuesta.innerHTML = '';
    
    if(contadorRondas <= rondasPorPartida) {
        if (MODO_CALIENTE === 'activado') {
            //En las pruebas de tipo general no debe salir nombre, y en las de duelo deben salir dos nombres
            let randomTipo = Math.floor(Math.random()*tiposPruebas);
            //console.log("tipo de la prueba: "+randomTipo)
            
            if(randomTipo == 0){ //pruebas
                if(contadorPruebas <= 6){  
                    contadorRondas++; //Sumo uno al contador de rondas
                    contadorPruebas++;
                    let objetoRonda = seleccionarJugador(1);
                    let jugadorRonda = objetoRonda.jugador
                    let personaje = objetoRonda.personaje

                    let randomPrueba = Math.floor(Math.random()*pruebas.length);
                    let juegoRonda = pruebas[randomPrueba];

                    document.body.style.backgroundColor = "#118ab2";
                
                    /*Que me devuelva la imagen el metodo que me devuelve el jugador, en un objeto que tenga un atributo que sea el araay jugaodres y otro que sean las imagenes*/

                    zonaNombre.innerHTML += `<div class="jugador-cara" style="background-image:url(../Images/${personaje});"></div>
                    <div class="seccion-nombre" id="texto-nombre">
                    <h1>${jugadorRonda}</h1>
                    </div>`
                
                    zonaTexto.innerHTML += `<div class="seccion-texto" id="texto-juego">
                    <div>${juegoRonda}</div>
                    </div>`
        
                    pruebas.splice(randomPrueba, 1);//Para que en una misma partida no salga dos veces la misma prueba
                }
                else{
                    siguienteRonda();
                }

                
            }
            
            if(randomTipo == 1){ //generales
                if(contadorGenerales <= 6){ 
                    contadorRondas++; //Sumo uno al contador de rondas
                    contadorGenerales++;
                    let randomGeneral = Math.floor(Math.random()*generales.length);
                    let juegoRonda = generales[randomGeneral];

                    document.body.style.backgroundColor = "#118ab2";
                    
                    zonaTexto.innerHTML += `<div class="seccion-texto" id="texto-juego">
                    <div>${juegoRonda}</div>
                    </div>`
        
                    generales.splice(randomGeneral, 1);//Para que en una misma partida no salga dos veces la misma prueba
                }
                else{
                    siguienteRonda();
                }

            }
            
            if(randomTipo == 3){ //duelos
                if(contadorDuelos <= 3){ 
                    contadorRondas++; //Sumo uno al contador de rondas
                    contadorDuelos++;
                    let objetoRonda = seleccionarJugador(2);
                    let jugadorRonda = objetoRonda.jugador
                    let personaje = objetoRonda.personaje
                    let randomDuelo = Math.floor(Math.random()*duelos.length);
                    let juegoRonda = duelos[randomDuelo];

                    document.body.style.backgroundColor = "#ef476f";

                    zonaNombre.innerHTML += `<div class="caras-duelos">
                    <div class="jugador-cara" style="background-image:url(../Images/${personaje[0]});"></div>
                    <div class="jugador-cara" style="background-image:url(../Images/${personaje[1]});"></div>
                    </div>
                    <div class="seccion-nombre" id="texto-nombre">
                    <h1>${jugadorRonda[0]} y ${jugadorRonda[1]}</h1>
                    </div>`
        
                    zonaTexto.innerHTML += `<div class="seccion-texto" id="texto-juego">
                    <div>${juegoRonda}</div>
                    </div>`
        
                    duelos.splice(randomDuelo, 1);//Para que en una misma partida no salga dos veces la misma prueba
                }
                else{
                    siguienteRonda();
                }
                
            }
            
            if(randomTipo == 4){ //castigos
                if(contadorCastigos <= 2){ 
                    contadorRondas++; //Sumo uno al contador de rondas
                    contadorCastigos++;
                    let objetoRonda = seleccionarJugador(1);
                    let jugadorRonda = objetoRonda.jugador
                    let personaje = objetoRonda.personaje
                    let randomCastigo = Math.floor(Math.random()*castigos.length);
                    let juegoRonda = castigos[randomCastigo];

                    document.body.style.backgroundColor = "#222222";
                
                    zonaNombre.innerHTML += `<div class="jugador-cara" style="background-image:url(../Images/${personaje});"></div>
                    <div class="seccion-nombre" id="texto-nombre">
                    <h1>${jugadorRonda}</h1>
                    </div>`
                
                    zonaTexto.innerHTML += `<div class="seccion-texto" id="texto-juego">
                    <div>${juegoRonda}</div>
                    </div>`
        
                    castigos.splice(randomCastigo, 1);//Para que en una misma partida no salga dos veces la misma prueba
                }
                else{
                    siguienteRonda();
                }
                
            }
            
            if(randomTipo == 5){ //preguntas
                if(contadorPreguntas <= 3){ 
                    contadorRondas++; //Sumo uno al contador de rondas
                    contadorPreguntas++;
                    let objetoRonda = seleccionarJugador(1);
                    let jugadorRonda = objetoRonda.jugador
                    let personaje = objetoRonda.personaje
                    let randomPregunta = Math.floor(Math.random()*preguntas.length);
                    let juegoRonda = preguntas[randomPregunta];

                    document.body.style.backgroundColor = "#118ab2";
                
                    zonaNombre.innerHTML += `<div class="jugador-cara" style="background-image:url(../Images/${personaje});"></div>
                    <div class="seccion-nombre" id="texto-nombre">
                    <h1>${jugadorRonda}</h1>
                    </div>`
        
                    zonaTexto.innerHTML += `<div class="seccion-texto" id="texto-juego">
                    <div>${juegoRonda}</div>
                    </div>`
        
                    preguntas.splice(randomPregunta, 1);//Para que en una misma partida no salga dos veces la misma prueba
                }
                else{
                    siguienteRonda();
                }

            }

            if(randomTipo === 2 || randomTipo === 6 || randomTipo === 7){ //caliente
                if(contadorCaliente <= 15){ 
                    contadorRondas++; //Sumo uno al contador de rondas
                    contadorCaliente++;
                    let objetoRonda = seleccionarJugador(1);
                    let jugadorRonda = objetoRonda.jugador
                    let personaje = objetoRonda.personaje
                    let randomCaliente = Math.floor(Math.random()*calientes.length);
                    let juegoRonda = calientes[randomCaliente];

                    document.body.style.backgroundColor = "#f5259e";
                
                    zonaNombre.innerHTML += `<div class="jugador-cara" style="background-image:url(../Images/${personaje});"></div>
                    <div class="seccion-nombre" id="texto-nombre">
                    <h1>${jugadorRonda}</h1>
                    </div>` 
                
                    zonaTexto.innerHTML += `<div class="seccion-texto" id="texto-juego">
                    <div>${juegoRonda}</div>
                    </div>`
        
                    calientes.splice(randomCaliente, 1);//Para que en una misma partida no salga dos veces la misma prueba
                }
                else{
                    siguienteRonda();
                }  
            }

        } else {
            //En las pruebas de tipo general no debe salir nombre, y en las de duelo deben salir dos nombres
            let randomTipo = Math.floor(Math.random()*tiposPruebas);
            //console.log("tipo de la prueba: "+randomTipo)

            if(randomTipo == 0){ //pruebas
                if(contadorPruebas <= 8){  
                    contadorRondas++; //Sumo uno al contador de rondas
                    contadorPruebas++;
                    let objetoRonda = seleccionarJugador(1);
                    let jugadorRonda = objetoRonda.jugador
                    let personaje = objetoRonda.personaje

                    let randomPrueba = Math.floor(Math.random()*pruebas.length);
                    let juegoRonda = pruebas[randomPrueba];

                    document.body.style.backgroundColor = "#118ab2";
                
                    /*Que me devuelva la imagen el metodo que me devuelve el jugador, en un objeto que tenga un atributo que sea el araay jugaodres y otro que sean las imagenes*/

                    zonaNombre.innerHTML += `<div class="jugador-cara" style="background-image:url(../Images/${personaje});"></div>
                    <div class="seccion-nombre" id="texto-nombre">
                    <h1>${jugadorRonda}</h1>
                    </div>`
                
                    zonaTexto.innerHTML += `<div class="seccion-texto" id="texto-juego">
                    <div>${juegoRonda}</div>
                    </div>`
        
                    pruebas.splice(randomPrueba, 1);//Para que en una misma partida no salga dos veces la misma prueba
                }
                else{
                    siguienteRonda();
                }

                
            }

            if(randomTipo == 1){ //generales
                if(contadorGenerales <= 8){ 
                    contadorRondas++; //Sumo uno al contador de rondas
                    contadorGenerales++;
                    let randomGeneral = Math.floor(Math.random()*generales.length);
                    let juegoRonda = generales[randomGeneral];

                    document.body.style.backgroundColor = "#118ab2";
                    
                    zonaTexto.innerHTML += `<div class="seccion-texto" id="texto-juego">
                    <div>${juegoRonda}</div>
                    </div>`
        
                    generales.splice(randomGeneral, 1);//Para que en una misma partida no salga dos veces la misma prueba
                }
                else{
                    siguienteRonda();
                }

            }

            if(randomTipo == 2){ //eleccion
                if(contadorEleccion <= 2){ 
                    contadorRondas++; //Sumo uno al contador de rondas
                    contadorEleccion++;
                    let randomTragos = Math.floor((Math.random()*3)+1); //Sumandole uno evito que salgan cero tragos
                    let randomEleccion = Math.floor(Math.random()*eleccion.length);
                    let randomConvencer = Math.random() < 0.25
                    
                    let juegoRonda = eleccion[randomEleccion];

                    document.body.style.backgroundColor = "#ffd166";
                
                    if(randomConvencer === true){ //Una de cada 4 veces saldrá lo de convencer
                        zonaTexto.innerHTML += `<div class="seccion-texto" id="texto-juego">
                        <div>${juegoRonda}, ${randomTragos} tragos. Una vez se haya votado la minoría podrá argumentar para
                        llevar a la mayoría a su terreno. En caso de conseguirlo la nueva minoría beberá lo que toque</div>
                        </div>`

                    }else{
                        zonaTexto.innerHTML += `<div class="seccion-texto" id="texto-juego">
                        <div>${juegoRonda}, ${randomTragos} tragos</div>
                        </div>`
                    }

                    eleccion.splice(randomEleccion, 1);//Para que en una misma partida no salga dos veces la misma prueba
                }
                else{
                    siguienteRonda();
                }
                
            }

            if(randomTipo == 3){ //duelos
                if(contadorDuelos <= 5){ 
                    contadorRondas++; //Sumo uno al contador de rondas
                    contadorDuelos++;
                    let objetoRonda = seleccionarJugador(2);
                    let jugadorRonda = objetoRonda.jugador
                    let personaje = objetoRonda.personaje
                    let randomDuelo = Math.floor(Math.random()*duelos.length);
                    let juegoRonda = duelos[randomDuelo];

                    document.body.style.backgroundColor = "#ef476f";

                    zonaNombre.innerHTML += `<div class="caras-duelos">
                    <div class="jugador-cara" style="background-image:url(../Images/${personaje[0]});"></div>
                    <div class="jugador-cara" style="background-image:url(../Images/${personaje[1]});"></div>
                    </div>
                    <div class="seccion-nombre" id="texto-nombre">
                    <h1>${jugadorRonda[0]} y ${jugadorRonda[1]}</h1>
                    </div>`
        
                    zonaTexto.innerHTML += `<div class="seccion-texto" id="texto-juego">
                    <div>${juegoRonda}</div>
                    </div>`
        
                    duelos.splice(randomDuelo, 1);//Para que en una misma partida no salga dos veces la misma prueba
                }
                else{
                    siguienteRonda();
                }
                
            }

            if(randomTipo == 4){ //castigos
                if(contadorCastigos <= 4){ 
                    contadorRondas++; //Sumo uno al contador de rondas
                    contadorCastigos++;
                    let objetoRonda = seleccionarJugador(1);
                    let jugadorRonda = objetoRonda.jugador
                    let personaje = objetoRonda.personaje
                    let randomCastigo = Math.floor(Math.random()*castigos.length);
                    let juegoRonda = castigos[randomCastigo];

                    document.body.style.backgroundColor = "#222222";
                
                    zonaNombre.innerHTML += `<div class="jugador-cara" style="background-image:url(../Images/${personaje});"></div>
                    <div class="seccion-nombre" id="texto-nombre">
                    <h1>${jugadorRonda}</h1>
                    </div>`
                
                    zonaTexto.innerHTML += `<div class="seccion-texto" id="texto-juego">
                    <div>${juegoRonda}</div>
                    </div>`
        
                    castigos.splice(randomCastigo, 1);//Para que en una misma partida no salga dos veces la misma prueba
                }
                else{
                    siguienteRonda();
                }
                
            }

            if(randomTipo == 5){ //preguntas
                if(contadorPreguntas <= 3){ 
                    contadorRondas++; //Sumo uno al contador de rondas
                    contadorPreguntas++;
                    let objetoRonda = seleccionarJugador(1);
                    let jugadorRonda = objetoRonda.jugador
                    let personaje = objetoRonda.personaje
                    let randomPregunta = Math.floor(Math.random()*preguntas.length);
                    let juegoRonda = preguntas[randomPregunta];

                    document.body.style.backgroundColor = "#118ab2";
                
                    zonaNombre.innerHTML += `<div class="jugador-cara" style="background-image:url(../Images/${personaje});"></div>
                    <div class="seccion-nombre" id="texto-nombre">
                    <h1>${jugadorRonda}</h1>
                    </div>`
        
                    zonaTexto.innerHTML += `<div class="seccion-texto" id="texto-juego">
                    <div>${juegoRonda}</div>
                    </div>`
        
                    preguntas.splice(randomPregunta, 1);//Para que en una misma partida no salga dos veces la misma prueba
                }
                else{
                    siguienteRonda();
                }

            }

            if(randomTipo == 6){//cultura
                if(contadorCultura <= 2){ 
                    contadorRondas++; //Sumo uno al contador de rondas
                    contadorCultura++;

                    zonaRespuesta.classList.remove("respuesta-descubierta"); //elimino la clase descubierta si la hay en la respuesta para que no se me muestren todas una vez se ha mostrado la primera

                    let objetoRonda = seleccionarJugador(1);
                    let jugadorRonda = objetoRonda.jugador
                    let personaje = objetoRonda.personaje
                    let randomCultura = Math.floor(Math.random()*cultura.length);
                    let juegoRonda = cultura[randomCultura].question;
                    let respuestaRonda = cultura[randomCultura].answer;

                    document.body.style.backgroundColor = "#0068c9";
                
                    zonaNombre.innerHTML += `<div class="jugador-cara" style="background-image:url(../Images/${personaje});"></div>
                    <div class="seccion-nombre" id="texto-nombre">
                    <h1>${jugadorRonda}</h1>
                    </div>` 
                
                    zonaTexto.innerHTML += `<div class="seccion-texto" id="texto-juego">
                    <div>${juegoRonda}</div>
                    </div>`

                    zonaRespuesta.innerHTML += `<div class="respuesta-container" id="respuesta-id">Respuesta: ${respuestaRonda}</div>`
        
                    cultura.splice(randomCultura, 1);//Para que en una misma partida no salga dos veces la misma prueba
                }
                else{
                    siguienteRonda();
                }

                
            }

            if(randomTipo == 7){ //beberxbeber
                if(contadorBeberxbeber <= 3){ 
                    contadorRondas++; //Sumo uno al contador de rondas
                    contadorBeberxbeber++;
                    let randomBeber = Math.floor(Math.random()*beberxbeber.length);
                    let juegoRonda = beberxbeber[randomBeber];

                    document.body.style.backgroundColor = "#06d6a0";
                
                    zonaTexto.innerHTML += `<div class="seccion-texto" id="texto-juego">
                    <div>${juegoRonda}</div>
                    </div>`
        
                    beberxbeber.splice(randomBeber, 1);//Para que en una misma partida no salga dos veces la misma prueba
                }
                else{
                    siguienteRonda();
                }
                
            }
        }


       
    } else {

        contadorRondas = 0;//Reinicio el contador de rondas
        window.location.href = "../index.html";

    }
    
}

const seleccionarJugador = (numeroJugadores) => {//Esta funcion selecciona tantos jugadores como se le indique por parametro, se ejecuta arriba en donde se inserta en la zona por eso los prints a veces muestran que el array tiene elementos que quizas no deberian verse
    let jugadoresRonda = [];
    let imagenesRonda = []
    for (let i = 0; jugadoresRonda.length < numeroJugadores; i++) {
        randomJugador = Math.floor(Math.random()*arrayJugadores.length);
        
        if(jugadoresRonda.includes(arrayJugadores[randomJugador].nombre) === false){   
            imagenesRonda.push(arrayJugadores[randomJugador].personaje)
            jugadoresRonda.push(arrayJugadores[randomJugador].nombre);
        }

    }
    
    return {
        jugador: jugadoresRonda, 
        personaje: imagenesRonda
    }
}

const descubrirRespuesta = () => {
    zonaRespuesta.classList.add("respuesta-descubierta");
}

const lanzarDado = () => {
    const diceNumber = Math.floor(Math.random() * 6);

    document.getElementById("dado-img").classList.add("dice-shaking");
    setTimeout(function(){
        document.getElementById("dado-img").classList.remove("dice-shaking");
    }, 500);

    document.getElementById("dado-img").setAttribute("src", diceImages[diceNumber]);
}

//Event Listener
document.addEventListener('DOMContentLoaded', leerDB) //Este evento se genera cuando el DOM esta cargado

zonaNombre.addEventListener('click', siguienteRonda);
zonaTexto.addEventListener('click', siguienteRonda);

zonaRespuesta.addEventListener('click', descubrirRespuesta);

document.body.onkeyup = function(e){
    if(e.keyCode == 32){ //Espacio
        siguienteRonda();
    }
}

/*
FIXME:
Comprobar que salen preguntas de todos los tipos que antes no tenia bien programado eso y en los diferentes ifs accedia a arrays de otro tipo


TODO:

Mirar bien que sustituye a path en firefox o Opera (aqui parece que funciona con path sin cambiar nada) y tal para que funcione lo de sumar copas y eliminar jugadores, lo tengo en un marcador del portatil

importante incluir los contradores de las rondas que ha salido cada tipo de prueba y
asi limitar la aparicion de los distintos tipos de pruebas que tenemos -> IMPORTANTE
Para esto es interesante que se sumen las rondas dentro de los if de cada prueba y que tengan otra condicion
que sea que el numero de rondas que ha salido ese juego es menor que el contador

decidir si los castigos se acaban con una pantalla (mas esfuerzo programando pero queda mejor, no se mentiene entre partidas) o se especifica las rondas
en el texto (peor esteticamente pero se mantiene entre partidas)

una forma que se me ocurre de saber los virus/castigos que se tienen activos es teniendo un array de objetos de
ese tipo que tenga un atributo nombre del jugador, otro titulo del virus y otro rondas activo, empieza en un random y disminuira
en cada comprobacion que sera cada ronda, cuando llegue a cero se pone un mensaje de que se ha pasado el virus de lo que sea

Seccion sobre nosotros en el menu y algo en lo que se indique que el juego no incita a beber ni nada

Manera de controlar que no se venga de la nada a la pantalla del juego, si no que tienes que pasar por la de setup

pop-up o ventana modal (no se puede interactuar con lo de detras hasta que se cierre con las instrucciones bien explicadas cuando se clique en la interrogacion)

A lo mejor para el modo caliente es bueno idea tener varios arrays, rollo calientes generales, calientes retos...

/ ------------------------------------------------------------------------------------------------------------------------------------------------------ /

HECHO:

Hacer que cada vez que sale una prueba no pueda salir, puedo hacer un splice -> HECHO

seleccionar un jugador podria ser un metodo propio con un return -> HECHO

en las de elegir entre dos un numero random entre 1 y tres para determinar los tragos que se van a beber -> HECHO

Boton que lleve a la pantalla del juego desde la de setup -> HECHO
*/