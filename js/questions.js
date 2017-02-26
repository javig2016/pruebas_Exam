var formElement=null;
var answer1_txt=null;

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
  var preguntaXML;
  // Elemento HTML donde va la pregunta
  var preguntaHTML; //pregunta_HTML
 

  //Pregunta 1 tipo texto
  preguntaXML = xmlDoc.getElementsByTagName("title")[0].innerHTML;
  preguntaHTML = document.getElementById("preg001");
  ponerDatosInputHtml(preguntaXML, preguntaHTML);
  answer1_txt = xmlDoc.getElementById("preg001").getElementsByTagName("answer")[0].innerHTML;
}

//****************************************************************************************************
//implementación de la corrección


function inicializar()
{
  document.getElementById('').innerHTML = "";
  nota=0;
}


//****************************************************************************************************
// poner los datos recibios en el HTML
function ponerDatosInputHtml(objetoHTML, objetoXML){
  objetoHMTL.innerHTML = objetoXML;
}



//****************************************************************************************************
//Gestionar la presentación de las respuestas
