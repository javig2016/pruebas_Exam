var formElement=null;
var answer1_txt=null;
var respuestaSelect=null;
var respuestasCheckbox = [];
var nota = 0;  //nota de la prueba sobre 3 puntos (hay 3 preguntas)

//**************************************************************************************************** 
//Después de cargar la página (onload) se definen los eventos sobre los elementos entre otras acciones.
window.onload = function(){ 

 //CORREGIR al apretar el botón
 formElement=document.getElementById("examen");
 formElement.onsubmit=function(){
   inicializar();
   corregirNumber();
   corregirSelect();
   corregirCheckbox();
   presentarNota();   
   return false;
 }
 
 //LEER XML de xml/preguntas.xml
 var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   gestionarXml(this);
  }
 };
 xhttp.open("GET", "xml/questions.xml", true);
 xhttp.send();
}

//****************************************************************************************************
// Recuperamos los datos del fichero XML xml/preguntas.xml
// xmlDOC es el documento leido XML. 
function gestionarXml(dadesXml){
 var xmlDoc = dadesXml.responseXML; //Parse XML to xmlDoc
 var pregunta_XML; //Acceder a la pregunta del archivo XML
 var pregunta_HTML; //Donde se ha de colocar la pregunta en el HTML

 //pregunta 1
  pregunta_XML = xmlDoc.getElementsByTagName("title")[0].innerHTML;
  pregunta_HTML = document.getElementById("preg001");
  ponerDatosInputHtml(pregunta_HTML, pregunta_XML);
  answer1_txt = xmlDoc.getElementById("preg001").getElementsByTagName("answer")[0].innerHTML;
}
//****************************************************************************************************
//implementación de la corrección



//****************************************************************************************************
// poner los datos recibios en el HTML
function ponerDatosInputHtml(elementoHTML, elementoXML)
{
  elementoHTML.innerHTML = elementoXML;
}


//****************************************************************************************************
//Gestionar la presentación de las respuestas

function inicializar()
{
  document.getElementById('').innerHTML = "";
  nota=0;
}