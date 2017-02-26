var formElement=null;
var answer1_txt=null;
var answer2_rad=null;
var answer3_txt=null;
var answer4_sel=null;
var answer5_rad=null;
var answer6_sel=null;
var answer7_check = [];
var answer8_mul= [];
var answer9_check = [];
var answer10_mul= [];
var nota = 0;  //nota de la prueba sobre 10 puntos (tenemos 10  preguntas)

//**************************************************************************************************** 
//Después de cargar la página (onload) se definen los eventos sobre los elementos entre otras acciones.
window.onload = function(){ 

 //Se carga el formulario
 formElement=document.getElementById("examen");

 //LEER XML de xml/preguntas.xml
 var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   gestionarXml(this);
  }
 };
 xhttp.open("GET", "xml/questions.xml", true);
 xhttp.send();

 //Corrección al apretar el botón
 formElement.onsubmit=function(){
    inicializar();
    corregirTexto();
    corregirCheckbox();
    presentarNota();   
    return false;
 }
}

//****************************************************************************************************
// Recuperamos los datos del fichero XML xml/questions.xml
// xmlDOC es el documento leido XML. 
function gestionarXml(datosXml){
  //Parse XML a  xmlDoc
var xmlDoc = datosXML.responseXML;
  // Llamar a pregunta XML
  var tituloInput; //pregunta_XML
  // Elemento HTML donde va la pregunta
  var pregunta_HTML; //pregunta_HTML
 

  //Pregunta 1 tipo texto
  tituloInput = xmlDoc.getElementsByTagName("title")[0].innerHTML;
  ponerDatosInputHtml(tituloInput);
  answer1_txt = xmlDoc.getElementById("preg001").getElementsByTagName("answer")[0].innerHTML;



 

}

//****************************************************************************************************
//implementación de la corrección

function corregirTexto(valor, correcto, mensajeAcierto, mensajeFallo){
  if (valor.toLowerCase() == correcto.toLowerCase()) {
   darRespuestaHtml(mensajeAcierto);
   nota +=1;
  }
  else {
   darRespuestaHtml(mensajeFallo);
  }
}



//****************************************************************************************************
// poner los datos recibios en el HTML
function ponerDatosInputHtml(pregunta){
  document.getElementbyID("tituloInput").innerHTML= pregunta;
}



//****************************************************************************************************
//Gestionar la presentación de las respuestas
function darRespuestaHtml(solucion){
 var p = document.createElement("p");
 var node = document.createTextNode(solucion);
 p.appendChild(node);
 document.getElementById('resultadosDiv').appendChild(p);
}

function presentarNota(){
   darRespuestaHtml("Nota: "+nota+" puntos sobre 10");
}

function inicializar(){
   document.getElementById('resultadosDiv').innerHTML = "";
   nota=0.0;
}