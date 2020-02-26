/*controles*/
/*KDMR-05/02/20: Se añadio rutas de liberias del servidor; además de restringuir para moviles
  KDMR-17/02/20: Cambio de version (contiene temporizador, ebug y nueva libreria SCORM)
*/

var idObjetivo = 0;
var aciertos=0;
/* Creado por Adib Abud el 22/01/15. */
var colores = ["0F0","00F","FF0","0FF","F00","F0F","F80","08F","0F0","00F","FF0","0FF","30A","320","315","388","240","010","0F3"];
var bloqueOriginal;
var elemnto =[0];
var domino=[];
var global=0;
var compara=0;
var dominiotexto=0;
var colorArray=[]
var numCartasResueltas = 0;
var cartaActiva = null;
var condicion= 0;
var current= null;
var mensaje="";
var countdownTimer = 0;
var tiempo;
$(document).ready(function(){
    iniciar();
    console.log("READYA");

    iniciaAmbienteScorm  (ambSCORM, barraSCORM, idObjetivo);
})

//window.addEventListener("load", iniciar, false);
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function iniciar(){
    $("#mododebug").hide();
  if (window.parent.data_crm) {
       debug = true;
       activarson = true;
       tempo = true;
       rendirse = true;
       separador = true;
   }
  if (window.name=="movil") {
        esMobil = true;
    }
    else {
        esMobil = isMobile();
    }
    $("#prohibido").hide();
    // isMobile();
    if (esMobil){
        $(".row").hide();
        $("#prohibido").show();
        $("p").hide();
        $("h2").hide();
    }
    crearcartas();
    crearMemorama();
    bloqueOriginal = document.getElementById("bloqueCartas").innerHTML;
    conteo();

    //Retro
    //Fin Retro
}

function conteo(){
    if(rendirse==true){
        document.getElementById("pasar").style.display="";
    }

    if(idioma=="ENG"){
        document.getElementById("revisar").value="Close Cards";
        document.getElementById("revisarcont").value="Continue";
        document.getElementById("pasar").value="I give up";
        document.getElementById("botonCerrarRetroplus").value="Play Again";
    }else if(idioma=="ESP"){
        document.getElementById("revisar").value="Voltear cartas";
        document.getElementById("revisarcont").value="Continuar";
        document.getElementById("pasar").value="Me rindo";
        document.getElementById("botonCerrarRetroplus").value="Jugar de nuevo";
        document.getElementById("btn-iniciar").value="Iniciar";
    }
    if(tempo == true){
        document.getElementById("Parte1").disabled = true;
    }
    var retroFinal = document.getElementById("retroFinal");
    retroFinal.addEventListener("click", quitarRetro, false);
    document.getElementById("botonCerrarRetroplus").addEventListener("click", quitarRetro, false);

    retroFinal.style.display = "none";

    document.getElementById("pasar").addEventListener("click", function(){
        if(vidmaster==true){   auxmaster2=window.domino[1];
            auxmaster2.pause();
            domino.pop();
            domino.pop();
    }
    elemnto.pop();
    elemnto.pop();
    global=0;
        var testElements = document.getElementsByClassName('cuadrito cerrado');
        var testDivs = Array.prototype.filter.call(testElements, function(testElement){
            return testElement.nodeName === 'DIV';
        });
        for(var i=0; i<testDivs.length;i++){
            testDivs[i].className="cuadritoHecho abierto";
            testDivs[i].style.border = "4px solid #010"  ;
        }
        document.getElementById("revisar").style.display="none";
        document.getElementById("revisarcont").style.display="none";
        document.getElementById("pasar").style.display="none";
        document.getElementById("botonCerrarRetroplus").style.display="";
        var final= rutas.length;

        if(idioma=="ENG"){
            for(var n=0;n<retroCal2.length;n++){
                if(aciertos >= retroCal2[n].LimInf && aciertos <= retroCal2[n].LimSup){
                mensaje=retroCal2[n].Mensaje;
                }}
        }
        if(idioma=="ESP"){

            for(var j=0;j<retroCal.length;j++){
                console.log(aciertos);

                if(aciertos >= retroCal[j].LimInf && aciertos <= retroCal[j].LimSup){
                mensaje=retroCal[j].Mensaje;
                }}
        }
        console.log(mensaje);


          // if(idioma=="ESP"){
          //   swal({
          //       title: "Resultado",
          //       text: mensaje+" tienes "+aciertos+" de "+final,
          //       confirmButtonText: "Aceptar",
          //       type: "info",
          //       button: "Aceptar",
          //     });
          // }
          //SWAL ME RINDO
                if(idioma=="ENG"){
                    swal({
                   title: "Result",
                   text: mensaje+" you have "+aciertos+" of "+final,
                   confirmButtonText: "Aceptar",
                   type: "info",
                   button: "Ok",
                 });
                 }else if(idioma=="ESP"){
                   swal({
                       title: "Resultado",
                       text: mensaje+" tienes "+aciertos+" de "+final,
                       confirmButtonText: "Aceptar",
                       type: "info",
                       button: "Aceptar",
                     });
                 } //ESP

         // if (ambSCORM) {
         //    //califica SCORM
         //    if (parent.conectividadSCORM === undefined) {
         //      console.log("Actividad en documento, es con try");
         //      try {
         //        conectividadSCORM.calificarObjetivo(idObjetivo, aciertos, final, 0);   // envia los datos a la base de datos
         //        conectividadSCORM.finalizarObjetivo(idObjetivo);                              // finaliza la actividad en estatus passed
         //        conectividadSCORM.salvar();                                                      // confirma que lo anteriormente realizado es válido
         //        if (barraSCORM) {conectividadSCORM.actualizarBarra()}                             // actualiza al nuevo estatus la barra de avance
         //        conectividadSCORM.verificarEstado();                                             // coloca status de la leccion en completed si cumple los requisitos}
         //      } catch(e){
         //      console.warn("Error al calificar en conectividadSCORM");
         //      }
         //    }
         //    else {
         //      console.log("Actividad en frame, es con parent");
         //      parent.conectividadSCORM.calificarObjetivo(idObjetivo, aciertos, final, 0); // envia los datos a la base de datos
         //      parent.conectividadSCORM.finalizarObjetivo(idObjetivo);                                  // finaliza la actividad en estatus passed
         //      parent.conectividadSCORM.salvar();                                                    // confirma que lo anteriormente realizado es válido
         //      if (barraSCORM) {parent.conectividadSCORM.actualizarBarra()}                         // actualiza al nuevo estatus la barra de avance
         //      parent.conectividadSCORM.verificarEstado();                                           // coloca status de la leccion en completed si cumple los requisitos
         //    }
         //    //fin califica SCORM
         //  }
         guardaCalificacionScorm (ambSCORM, barraSCORM, idObjetivo, aciertos, final);
        aciertos=0; //tempo lee aciertos
        console.log(testDivs);
    });


 function quitarRetro(){
    document.getElementById("bloqueCartas").innerHTML = bloqueOriginal;
    cartaActiva=null;
  crearMemorama();
  iniciarTempo();
  conteo();

}

}

function crearcartas(){

    if (rutas.length >= 41){
        rutas.splice(40,1);
        }
        if (rutas.length >= 41){
            rutas.splice(40,1);
            }
            if(rutas.length!=rutas.length){
                alert("las parejas no son iguales, revisar");
            }

var contenedor1=document.getElementById("Parte1");
var contenedor2=document.getElementById("Parte2");
var elemento;
var elemento2;
var elemento3;
var elemento4;
var videocontrol;
var audiocontrol;
var audioimagen;
var imagencontrol;
var parte;
var cont=1;
var vid;
var aud;
var parr;
var imgjpg=0;
var imgpng=0;
var imgjpeg=0;
var auxmaster2;
var vidmpeg=0;
var soundmp3=0;

//ciclo impares
for(var i=1;i<=rutas.length;i++){

    if(cont==1){
        parte="par"+i;
        vid="vid"+i;
        aud="aud"+i;
        datover=1;
        cont++;
    }
    else{
        parte="par"+i;
        vid="vid"+i;
        aud="aud"+i;
        datover=i+(i-1);
    }
    dominiotexto=0;
    imgjpg=rutas[i-1][0].indexOf("jpg");
    imgjpeg=rutas[i-1][0].indexOf("jpeg");
    imgpng=rutas[i-1][0].indexOf("png");
    vidmpeg=rutas[i-1][0].indexOf("mp4");
    soundmp3=rutas[i-1][0].indexOf("mp3");

    console.log(i-1);
    console.log(imgjpg);

    colorArray.push(getRandomColor());
    elemento=document.createElement('div');
    elemento.className="contenedorCarta "+parte;
    elemento.setAttribute('data-respuesta',parte);
    elemento.setAttribute('style','width:'+anchocarta+'px; height:'+altocarta+'px;');


    //video
    if(vidmpeg!=-1){
        elemento.setAttribute('onclick',"video('"+vid+"',"+datover+")");
    }
    //audio
    if(soundmp3!=-1){
        elemento.setAttribute('onclick',"sonido('"+aud+"',"+datover+")");
    }



    contenedor1.appendChild(elemento);

    elemento2=document.createElement('div');
    elemento2.className="cuadrito cerrado";
    elemento2.setAttribute('style','width:'+(anchocarta)+'px; height:'+(altocarta)+'px;');
    if(debug == true){
        $("#mododebug").show();
        elemento2.setAttribute('style','width:'+anchocarta+'px; height:'+altocarta+'px;'+ 'border: 5px solid '+colorArray[i-1]);
    }else{
        elemento2.setAttribute('style','width:'+anchocarta+'px; height:'+altocarta+'px;');
    }

    elemento.appendChild(elemento2);

    elemento3=document.createElement('div');
    elemento3.className="caraRespuesta parte1";
    if(imgjpg!=-1|| imgjpeg!=-1||imgpng!=-1 || vidmpeg!=-1 ||soundmp3!=-1){
    elemento3.setAttribute('style','width:100%;')
    }
    elemento2.appendChild(elemento3);

    elemento4=document.createElement('div');
    elemento3.appendChild(elemento4);


    //si es video
    if(vidmpeg!=-1){
    videocontrol=document.createElement('video');
    videocontrol.setAttribute('src',rutas[i-1][0]);
    videocontrol.setAttribute('id',''+vid+'');
    videocontrol.setAttribute('width','80%');
    videocontrol.setAttribute('height','80%');
    elemento4.appendChild(videocontrol);
    dominiotexto=1;
    }
    //si es audio
    if(soundmp3!=-1){

    audiocontrol=document.createElement('audio');
    audiocontrol.setAttribute('id',''+aud+'');
    audiocontrol.setAttribute('src',rutas[i-1][0]);
    audiocontrol.setAttribute('type','audio/mpeg');
    audiocontrol.setAttribute('preload','preload');
    elemento4.appendChild(audiocontrol);

    audioimagen=document.createElement('img');
    audioimagen.setAttribute('src',imagentapa);
    audioimagen.setAttribute('style','width: 80%;');
    elemento4.appendChild(audioimagen);
    dominiotexto=1;
}
    //si es imagen
if(imgjpg!=-1|| imgjpeg!=-1||imgpng!=-1){
    imagencontrol=document.createElement('img');
    imagencontrol.setAttribute('src',rutas[i-1][0]);
    imagencontrol.setAttribute('style','width: 80%;');
    elemento4.appendChild(imagencontrol);
    dominiotexto=1;
}
    //si es texto
    if(dominiotexto==0){
        if(imgjpg==-1|| imgjpeg==-1||imgpng==-1||vidmpeg==-1||soundmp3==-1){
            parr=document.createElement('p');
            parr.className="parri";
            parr.setAttribute('style','width:80%;');
            parr.innerHTML=rutas[i-1][0];
            elemento3.appendChild(parr);


        }
    }


    elemento5=document.createElement('div');
    elemento5.className="caraTapa cubridor parte1";
    elemento2.appendChild(elemento5);
}


//ciclo pares
for(var j=1;j<=rutas.length;j++){
        parte="par"+j;
        vid="vid2"+j;
        aud="aud2"+j;
        datover=j*2;
        dominiotexto=0;
        imgjpg=rutas[j-1][1].indexOf("jpg");
        imgjpeg=rutas[j-1][1].indexOf("jpeg");
        imgpng=rutas[j-1][1].indexOf("png");
        vidmpeg=rutas[j-1][1].indexOf("mp4");
        soundmp3=rutas[j-1][1].indexOf("mp3");

    elemento=document.createElement('div');
    elemento.className="contenedorCarta "+parte;
    elemento.setAttribute('data-respuesta',parte);
    elemento.setAttribute('style','width:'+anchocarta+'px; height:'+altocarta+'px;');


    //video
    if(vidmpeg!=-1){
        elemento.setAttribute('onclick',"video('"+vid+"',"+datover+")");
    }
    if(soundmp3!=-1){
        elemento.setAttribute('onclick',"sonido('"+aud+"',"+datover+")");
    }



    //separador de divs
    if(separador==true){
        contenedor2.appendChild(elemento);
    }else{
        contenedor1.appendChild(elemento);
    }
    //audio


    elemento2=document.createElement('div');
    elemento2.className="cuadrito cerrado";
    if(debug == true){
        console.log("ENTRO")
        elemento2.setAttribute('style','width:'+anchocarta+'px; height:'+altocarta+'px;'+ 'border: 5px solid '+colorArray[j-1]);
    }else{
        elemento2.setAttribute('style','width:'+anchocarta+'px; height:'+altocarta+'px;');
    }

    elemento.appendChild(elemento2);

    elemento3=document.createElement('div');


    if(separador==true){
        elemento3.className="caraRespuesta parte2";
    }else{
        elemento3.className="caraRespuesta parte1";
    }
    if(imgjpg!=-1|| imgjpeg!=-1||imgpng!=-1 || vidmpeg!=-1 ||soundmp3!=-1){
        elemento3.setAttribute('style','width:100%;')
        }

    elemento2.appendChild(elemento3);

    elemento4=document.createElement('div');
    elemento3.appendChild(elemento4);
    //si es video
    if(vidmpeg!=-1){
    videocontrol=document.createElement('video');
    videocontrol.setAttribute('src',rutas[j-1][1]);
    videocontrol.setAttribute('id',''+vid+'');
    videocontrol.setAttribute('width','80%');
    videocontrol.setAttribute('height','80%');
    elemento4.appendChild(videocontrol);
    dominiotexto=1;
    }
    //si es audio
    if(soundmp3!=-1){

    audiocontrol=document.createElement('audio');
    audiocontrol.setAttribute('id',''+aud+'');
    audiocontrol.setAttribute('src',rutas[j-1][1]);
    audiocontrol.setAttribute('type','audio/mpeg');
    audiocontrol.setAttribute('preload','preload');
    elemento4.appendChild(audiocontrol);

    audioimagen=document.createElement('img');
    audioimagen.setAttribute('src','./imagenes/bocina.png');
    audioimagen.setAttribute('style','width: 80%;');
    elemento4.appendChild(audioimagen);
    dominiotexto=1;
} //si es imagen
if(imgjpg!=-1|| imgjpeg!=-1||imgpng!=-1){
    imagencontrol=document.createElement('img');
    imagencontrol.setAttribute('src',rutas[j-1][1]);
    imagencontrol.setAttribute('style','width: 80%;');
    elemento4.appendChild(imagencontrol);
    dominiotexto=1;
}

    //si es texto
    if(dominiotexto==0){
        if(imgjpg==-1|| imgjpeg==-1||imgpng==-1||vidmpeg==-1||soundmp3==-1){
            parr=document.createElement('p');
            parr.className="parri";
            parr.setAttribute('style','width:80%;');
            parr.innerHTML=rutas[j-1][1];
            elemento3.appendChild(parr);

        }
    }

    elemento5=document.createElement('div');

   if(separador==true){
    elemento5.className="caraTapa cubridor parte2";
   }else{
    elemento5.className="caraTapa cubridor parte1";
   }

    elemento2.appendChild(elemento5);

}



}

function deactivarCartas(){
    for(i of obtenerCartas()){
        i.removeEventListener("click", alClicCarta);
    }
}

function obtenerCartas(){
    return document.body.querySelectorAll(".cuadrito");
}

function activarCartas(){
    for(i of obtenerCartas()){
        i.addEventListener("click", alClicCarta, false);
    }
}

function invertirCarta(carta){
    if(carta.className == "cuadrito abierto"){
        carta.className = "cuadrito cerrado";
    } else if(carta.className == "cuadrito cerrado"){
        carta.className = "cuadrito abierto";
    }
}


function alClicCarta(e){

        console.log("click: ", e.currentTarget.parentNode.getAttribute("data-respuesta"));
        invertirCarta(e.currentTarget);
        if(cartaActiva === null){
            cartaActiva = e.currentTarget;
            cartaActiva.removeEventListener("click", alClicCarta);
        } else {
            if(e.currentTarget.parentNode.getAttribute("data-respuesta") === cartaActiva.parentNode.getAttribute("data-respuesta")){
                console.log("son correctas");
                current2= e.currentTarget;
                aciertos++;
                console.log("Aciertos al clik"+aciertos);
                cartaActiva.removeEventListener("click", alClicCarta);
                cartaActiva.className = e.currentTarget.className = "cuadritoHecho abierto";

                if(debug){
                    cartaActiva.style.border = e.currentTarget.style.border = "2px solid #" + colorArray[numCartasResueltas++];
                }else{
                    cartaActiva.style.border = e.currentTarget.style.border = "2px solid #" + colores[numCartasResueltas++];
                }

                if(activarson == true){
                    audioBien.play();
                }
                document.getElementById("retroincorrecta").style.display = "none";
                document.getElementById("retrocorrecta").style.display = "block";

                document.getElementById("revisar").style.display = "none";
                document.getElementById("revisarcont").style.display = "";
                deactivarCartas();

                if(obtenerCartas().length === 0){
                    var final= rutas.length;
                    document.getElementById("botonCerrarRetroplus").style.display="";
                    document.getElementById("revisar").style.display="none";
                    document.getElementById("revisarcont").style.display="none";
                    document.getElementById("pasar").style.display="none";
                    try {
                        tiempo = ((minutes * 60) + seg) - (seconds % 60)
                        clearInterval(countdownTimer);
                        console.log("TIEMPOOO: "+tiempo);
                    }
                    catch(e){

                    }
                    if(idioma=="ENG"){
                      swal({
                         title: "Result",
                         text: "Great job you have "+aciertos+" of "+final,
                         confirmButtonText: "Aceptar",
                         type: "info",
                         button: "Ok",
                        });
                   }else if(idioma=="ESP"){
                     swal({
                        title: "Resultado",
                        text: "Buen trabajo tienes "+ aciertos +" de "+final,
                        confirmButtonText: "Aceptar",
                        type: "info",
                        button: "Aceptar",
                     });
              }//español

              if(tempo){
                console.log("bote1")
                if((tiempo) >= 60){//Cuando el tiempo es mayor a un minuto se ocupa el siguiente formato de salida
                d = Number(tiempo-seconds);
                var m = Math.floor(d % 3600/60);
                var s = Math.floor(d % 3600 % 60);
                var mDisplay = m > 0 ? m + (m == 1 ? " minutos " : " minutos, ") : "";
                var sDisplay = s > 0 ? s + (s == 1 ? " segundos" : " segundos") : "";

                swal({
                title: "Resultado",
                text: "Buen trabajo " + aciertos +" de "+final+" en "+ mDisplay + sDisplay,
                confirmButtonText: "Aceptar",
                type: "info",
                button: "Aceptar",
                });
                }else{
                  swal({
                  title: "Resultado",
                  text: "Buen trabajo " +aciertos+" de "+final+" en "+ tiempo + " segundos",
                  confirmButtonText: "Aceptar",
                  type: "info",
                  button: "Aceptar",
                  });
                }//else tiempo

            }//tempo

                  // if (ambSCORM) {
                  //   //califica SCORM
                  //   if (parent.conectividadSCORM === undefined) {
                  //     console.log("Actividad en documento, es con try");
                  //     try {
                  //       conectividadSCORM.calificarObjetivo(idObjetivo, aciertos, final, 0);   // envia los datos a la base de datos
                  //       conectividadSCORM.finalizarObjetivo(idObjetivo);                              // finaliza la actividad en estatus passed
                  //       conectividadSCORM.salvar();                                                      // confirma que lo anteriormente realizado es válido
                  //       if (barraSCORM) {conectividadSCORM.actualizarBarra()}                             // actualiza al nuevo estatus la barra de avance
                  //       conectividadSCORM.verificarEstado();                                             // coloca status de la leccion en completed si cumple los requisitos}
                  //     } catch(e){
                  //     console.warn("Error al calificar en conectividadSCORM");
                  //     }
                  //   }
                  //   else {
                  //     console.log("Actividad en frame, es con parent");
                  //     parent.conectividadSCORM.calificarObjetivo(idObjetivo, aciertos, final, 0); // envia los datos a la base de datos
                  //     parent.conectividadSCORM.finalizarObjetivo(idObjetivo);                                  // finaliza la actividad en estatus passed
                  //     parent.conectividadSCORM.salvar();                                                    // confirma que lo anteriormente realizado es válido
                  //     if (barraSCORM) {parent.conectividadSCORM.actualizarBarra()}                         // actualiza al nuevo estatus la barra de avance
                  //     parent.conectividadSCORM.verificarEstado();                                           // coloca status de la leccion en completed si cumple los requisitos
                  //   }
                  //   //fin califica SCORM
                  // }

                      aciertos=0;
                      elemnto.pop();
                      elemnto.pop();
                      global=0;            }
            } else {
                  condicion=1;
                  if (activarson == true){

                audioMal.play();
                }
                current = e.currentTarget;
                document.getElementById("retrocorrecta").style.display = "none";
                document.getElementById("retroincorrecta").style.display = "block";
                deactivarCartas();

            }
        }
    }



function crearMemorama(){

    // if (ambSCORM) {
    //     //Inicio carga SCORM
    //     if (parent.conectividadSCORM === undefined) {
    //       console.log("Actividad en documento, es con try");
    //       try {
    //         var conexion = conectividadSCORM.conectarYComenzar();
    //         console.log("actividad:: -> ", conexion);
    //         conectividadSCORM.iniciarObjetivo(idObjetivo);           // inicializa la actividad
    //         if (barraSCORM) {conectividadSCORM.actualizarBarra()}    // actualiza la barra de avance
    //         conectividadSCORM.salvar();                              // guarda el status
    //       } catch(e){
    //       console.warn("Error con conectividad SCORM");
    //       }
    //     }
    //     else {
    //       console.log("Actividad en frame, es con parent");
    //       if (parent.document.readyState === "complete"){
    //         iniciarSCORM();
    //         console.log("ya había cargado");
    //       }
    //       else {
    //         console.log("agregó listener");
    //         parent.addEventListener("load", function(){
    //           iniciarSCORM();
    //         });
    //       }
    //       function iniciarSCORM(){
    //         var conexion = parent.conectividadSCORM.conectarYComenzar();
    //         console.log("actividad:: -> ", conexion);
    //         parent.conectividadSCORM.iniciarObjetivo(idObjetivo);          // inicializa la actividad
    //         if (barraSCORM) {parent.conectividadSCORM.actualizarBarra()}   // actualiza la barra de avance
    //         parent.conectividadSCORM.salvar();                             // guarda el status
    //       }
    //     }
    //
    //   }//Fin Scorm




    var audioBien = document.getElementById('audioRetroBien');
    var audioMal = document.getElementById('audioRetroMal');

    revolverCartas();
    activarCartas();
    function revolverCartas(){
        var lista = document.getElementById("Parte1");
        for (var i = lista.children.length; i >= 0; i--) {
            lista.appendChild(lista.children[Math.random() * i | 0]);
        }
        if(separador==true){
            lista = document.getElementById("Parte2");
            for (var i = lista.children.length; i >= 0; i--) {
                lista.appendChild(lista.children[Math.random() * i | 0]);
            }
            document.getElementById("Parte2").className="col-md-6 colx";
            document.getElementById("Parte1").className="col-md-6 colx";
        }else{
            document.getElementById("Parte2").style.display="none";
            document.getElementById("Parte1").className="col-md-12 colx";
        }

    }//fin revolver cartas




        //función revisar: elimina las cartas levantadas
        document.getElementById("revisar").addEventListener("click", function(e){
            if (condicion == 1){

                    document.getElementById("retroincorrecta").style.display = "none";
                    elemnto.pop();
                    elemnto.pop();
                    global=0;

                resetear2cartas(cartaActiva,current);
                cartaActiva = null;

            }
        });

         //funcion continuar: permite al usuario seguir sin destapar las cartas levantadas
        document.getElementById("revisarcont").addEventListener("click", function(e){
                current2.removeEventListener("click", alClicCarta);
                    global=0;
                    audioBien.pause();
                    audioBien.currentTime = 0;
                    console.log("hola locotito");
                    if(vidmaster==true){
                        auxmaster2=window.domino[1];
                        auxmaster2.pause();
                        domino.pop();
                        domino.pop();
                    }


                    cartaActiva = null;
                    document.getElementById("revisar").style.display = "";
                    document.getElementById("revisarcont").style.display = "none";
                    document.getElementById("retrocorrecta").style.display = "none";
                    activarCartas();
                    });


                    function resetear2cartas(carta1, carta2){
                        if(vidmaster==true){
                        auxmaster2=window.domino[1];
                        auxmaster2.pause();
                        domino.pop();
                        domino.pop();
                    }

                    carta1.className = carta2.className = "cuadrito cerrado";
                    activarCartas();
                    condicion=0;

                    document.getElementById("revisar").removeEventListener("click", function(e){
                        if (condicion == 1){

                                document.getElementById("retroincorrecta").style.display = "none";


                            deactivarCartas();
                            resetear2cartas(cartaActiva,current);

                            cartaActiva = null;

                        }
                        else{

                        }

                    });
                }



}


function isMobile(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      console.log('Esto es un dispositivo móvil');
      //jq321("#NoMovil").removeClass("ocultar").addClass("mostrar");
      return true;
    }
}
