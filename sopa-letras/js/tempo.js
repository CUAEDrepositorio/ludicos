    $(document).ready(function(){
      if(tempo== true){
    $("#solve").hide();
    $("#again").hide();
    $("#Palabras").hide();
    $(".puzzleSquare").attr('disabled','disabled');
    $("#btn-iniciar").click(function(){
      temporizador();
    $("#solve").show();
    $("#again").show();
    $("#Palabras").show();
    $(".puzzleSquare").removeAttr('disabled');
    $("#btn-iniciar").hide();
      });
    }//if
    else{
      $("#btn-iniciar").hide();  
    }
    
    });
  

    function temporizador(){
    console.log("tempo")
    var seconds = minutes * 60 ; //número de segundos a contar
    function secondPassed() {
      var minutes = Math.round((seconds - 30)/60); //calcula el número de minutos
      var remainingSeconds = seconds % 60; //calcula los segundos
      //si los segundos usan sólo un dígito, añadimos un cero a la izq
      if (remainingSeconds < 10) { 
        remainingSeconds = "0" + remainingSeconds; 
      } 
      document.getElementById('countdown').innerHTML = minutes + ":" + remainingSeconds; 
      if (seconds == 0) { 
        clearInterval(countdownTimer);
        $(".puzzleSquare").removeAttr('disabled'); 
        //document.getElementById('countdown').innerHTML = "ACABO EL TIEMPO"; 
          var final=words.length;
          $('.puzzleSquare').addClass('complete');
          swal({
            title: "Se acabo el tiempo \n",
            text: "Obtuviste "+ aciertos + " de "+ final,
            confirmButtonText: "Aceptar",
            type: "info",
            button: "Aceptar",
          });
      } else { 
        seconds--; 
      } 
    } //secondPassed
      var countdownTimer = setInterval(secondPassed, 1000);
    return;
    }//temporizador 