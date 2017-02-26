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

 //Corrección
 formElement.onsubmit=function(){
    inicializar();
    //Corregir pregunta 1
    corregirTexto(formElement.getElementsByClassName("texto")[0].value,
    answer1_txt, "Pregunta1: Correcta", 
    "Pregunta1: Incorrecta, la respuesta correcta es: " + answer1_txt);
    //Corregir pregunta 3
    corregirTexto(formElement.getElementsByClassName("texto")[1].value, 
    answer3_txt, "Pregunta3: Correcta", 
    "Pregunta3: Incorrecta, la respuesta correcta es: " + answer3_txt);
    //Corregir pregunta 4
    corregirSelectSimple(formElement.getElementsByTagName("select")[0], 
    answer4_sel, "Pregunta4: Correcta", 
    "Pregunta4: Incorrecta, la respuesta correcta es: ");
    //Corregir pregunta 6
    corregirSelectSimple(formElement.getElementsByTagName("select")[0], 
    answer6_sel, "Pregunta6: Correcta", 
    "Pregunta6: Incorrecta, la respuesta correcta es: ");
    corregirCheckbox();
    presentarNota();   
    return false;
 }
}

//****************************************************************************************************
// Recuperamos los datos del fichero XML xml/preguntas.xml
// xmlDOC es el documento leido XML. 
function gestionarXml(datosXml){
 var xmlDoc = datosXml.responseXML; //Parse XML a xmlDoc
 var pregunta_XML; //Acceder a la pregunta del archivo XML
 var pregunta_HTML; //Donde se ha de colocar la pregunta en el HTML
 var radio_HTML; //Obtener los datos de esta pregunta del HTML de esta modalidad
 var select_HTML; //Obtener los datos de la pregunta del HTML de esta modalidad
 var checkbox_HTML; //Obtener los datos de la pregunta del HMTL de esta modalidad
 var opciones; //Las opciones que tendrán los diferentes tipos de preguntas con esta posibilidad
 var optionsRadio = []; //Opciones radio del XML
 var select_opciones = []; //Multiples opciones de select
 var answers_checkbx; //Respuestas múltiples de modalidad checkbox
 var answer_multiple; //Respuestas múltiples de modadalidad multiple

 //Pregunta 1
  pregunta_XML = xmlDoc.getElementsByTagName("title")[0].innerHTML;
  pregunta_HTML = document.getElementById("preg001");
  ponerDatosInputHtml(pregunta_HTML, pregunta_XML);
  answer1_txt = xmlDoc.getElementById("preg001").getElementsByTagName("answer")[0].innerHTML;


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
