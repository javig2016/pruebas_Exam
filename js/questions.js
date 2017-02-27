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

 //Corrección cuando se pulsa el botón del formulario
 formElement.onsubmit=function(){
    inicializar();
    //Corregir pregunta 1 texto
    corregirTXT(formElement.getElementsByClassName("texto")[0].value, answer1_txt, "Pregunta 1: Correcta", "Pregunta 1: Incorrecta, la respuesta correcta es: " + answer1_txt);
    //Corregir pregunt 2 radio
    corregirRadio(formElement.programa, 
    answer2_rad, "Pregunta 2: Correcta",
    "Pregunta 2: Incorrecta, la respuesta correcta es: ", "programa");
    //Corregir pregunta 3 texto
    corregirTXT(formElement.getElementsByClassName("texto")[1].value, 
    answer3_txt, "Pregunta 3: Correcta", 
    "Pregunta 3: Incorrecta, la respuesta correcta es: " + answer3_txt);
    //Corregir pregunta 4 select
    corregirSelect(formElement.getElementsByTagName("select")[0], 
    answer4_sel, "Pregunta 4: Correcta", 
    "Pregunta 4: Incorrecta, la respuesta correcta es: ");
    //Corregir pregunta 5 radio
    corregirRadio(formElement.programa, 
    answer5_rad, "Pregunta 5: Correcta",
    "Pregunta 5: Incorrecta, la respuesta correcta es: ", "interferencia");
    //Corregir pregunta 6 select
    corregirSelect(formElement.getElementsByTagName("select")[1], 
    answer6_sel, "Pregunta 6: Correcta", 
    "Pregunta 6: Incorrecta, la respuesta correcta es: ");
    //Corregir pregunta 7 checkbox
    corregirCheckbox(formElement.elementos, 
    answer7_check, "Pregunta 7: Correcta",
    "Pregunta 7: Incorrecta, las respuestas correctas son: ", "elementos");
    //Corregir pregunta 8 multiple
    corregirMultiple(formElement.getElementsByTagName("select")[2], 
    answer8_mul, "Pregunta 8: Correcta",
    "Pregunta 8: Incorrecta, las respuestas correctas son: ");
    //Corregir pregunta 9 checkbox
    corregirCheckbox(formElement.exportar, 
    answer9_check, "Pregunta 9: Correcta",
    "Pregunta 9: Incorrecta, las respuestas correctas son: ", "exportar");
    //Corregir pregunta 10 multiple
    corregirMultiple(formElement.getElementsByTagName("select")[3], 
    answer10_mul, "Pregunta 10: Correcta",
    "Pregunta 10: Incorrecta, las respuestas correctas son: ");
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
 var opciones; //Cantidad de opciones que tendrán los diferentes tipos de preguntas con esta posibilidad
 var optionsRadio = []; //Opciones radio del XML
 var select_opciones = []; //Multiples opciones de select
 var answers_checkbx; //Respuestas múltiples de modalidad checkbox
 var answer_multiple; //Respuestas múltiples de modadalidad multiple

 //Pregunta 1 texto
  pregunta_XML = xmlDoc.getElementsByTagName("title")[0].innerHTML;
  pregunta_HTML = document.getElementById("preg001");
  corregirTXT(pregunta_HTML, pregunta_XML);
  answer1_txt = xmlDoc.getElementById("preg001").getElementsByTagName("answer")[0].innerHTML;

 //Pregunta 2 radio
  pregunta_XML = xmlDoc.getElementsByTagName("title")[1].innerHTML;
  pregunta_HTML = document.getElementById("preg002");
  radio_HTML = document.getElementsByClassName("radio")[0];
  opciones = xmlDoc.getElementById("preg002").getElementsByTagName("option").length;
  for(i = 0; i < opciones; i++)  {
    optionsRadio[i] = xmlDoc.getElementById("preg002").getElementsByTagName("option")[i].innerHTML;
  }
  ponerDatosCheckboxHtml(pregunta_HTML, pregunta_XML, radio_HTML, optionsRadio, "programa", "radio");
  answer2_rad = parseInt(xmlDoc.getElementById("preg002").getElementsByTagName("answer")[0].innerHTML);
  optionsRadio = [];

 //Pregunta 3 texto
  pregunta_XML = xmlDoc.getElementsByTagName("title")[2].innerHTML;
  pregunta_HTML = document.getElementById("preg003");
  corregirTXT(pregunta_HTML, pregunta_XML);
  answer3_txt = xmlDoc.getElementById("preg003").getElementsByTagName("answer")[0].innerHTML;

 //Pregunta 4 select
  pregunta_XML = xmlDoc.getElementsByTagName("title")[3].innerHTML;
  pregunta_HTML = document.getElementById("preg004");
  select_HTML = document.getElementsByTagName("select")[0];
  opciones = xmlDoc.getElementById("preg004").getElementsByTagName("option").length;
  for(i = 0; i < opciones; i++) {
    select_opciones[i] = xmlDoc.getElementById("preg004").getElementsByTagName("option")[i].innerHTML;
  }
  ponerDatosSelectHtml(pregunta_HTML, pregunta_XML, select_HTML, select_opciones);
  answer4_sel = parseInt(xmlDoc.getElementById("preg004").getElementsByTagName("answer")[0].innerHTML);

 //Pregunta 5 radio
  pregunta_XML = xmlDoc.getElementsByTagName("title")[4].innerHTML;
  pregunta_HTML = document.getElementById("preg005");
  radio_HTML = document.getElementsByClassName("radio")[1];
  opciones = xmlDoc.getElementById("preg005").getElementsByTagName("option").length;
  for(i = 0; i < opciones; i++)  {
    optionsRadio[i] = xmlDoc.getElementById("preg005").getElementsByTagName("option")[i].innerHTML;
  }
  ponerDatosCheckboxHtml(pregunta_HTML, pregunta_XML, radio_HTML, optionsRadio, "interferencia", "radio");
  answer5_rad = parseInt(xmlDoc.getElementById("preg005").getElementsByTagName("answer")[0].innerHTML);
  optionsRadio = [];

 //Pregunta 6 select
  pregunta_XML = xmlDoc.getElementsByTagName("title")[5].innerHTML;
  pregunta_HTML = document.getElementById("preg006");
  select_HTML = document.getElementsByTagName("select")[1];
  opciones = xmlDoc.getElementById("preg006").getElementsByTagName("option").length;
  for(i = 0; i < opciones; i++) {
    select_opciones[i] = xmlDoc.getElementById("preg006").getElementsByTagName("option")[i].innerHTML;
  }
  ponerDatosSelectHtml(pregunta_HTML, pregunta_XML, select_HTML, select_opciones);
  answer6_sel = parseInt(xmlDoc.getElementById("preg006").getElementsByTagName("answer")[0].innerHTML);
  
 //Pregunta 7 checkbox
  pregunta_XML = xmlDoc.getElementsByTagName("title")[6].innerHTML;
  pregunta_HTML = document.getElementById("preg007");
  checkbox_HTML = document.getElementsByClassName("checkbox")[0];
  opciones = xmlDoc.getElementById("preg007").getElementsByTagName("option").length;
  for(i = 0; i < opciones; i++) {
    optionsRadio[i] = xmlDoc.getElementById("preg007").getElementsByTagName("option")[i].innerHTML;
  }
  ponerDatosCheckboxHtml(pregunta_HTML, pregunta_XML, checkbox_HTML, optionsRadio, "elementos", "checkbox");
  answers_checkbx = xmlDoc.getElementById("preg007").getElementsByTagName("answer").length;
  for(i = 0; i < answers_checkbx; i++)  {
    answer7_check[i] = parseInt(xmlDoc.getElementById("preg007").getElementsByTagName("answer")[i].innerHTML);
  }
  optionsRadio = [];

 //Pregunta 8 multiple
  pregunta_XML = xmlDoc.getElementsByTagName("title")[7].innerHTML;
  pregunta_HTML = document.getElementById("preg008");
  select_HTML = document.getElementsByTagName("select")[2];
  opciones = xmlDoc.getElementById("preg008").getElementsByTagName("option").length;
  for(i = 0; i < opciones; i++)  {
    select_opciones[i] = xmlDoc.getElementById("preg008").getElementsByTagName("option")[i].innerHTML;
  }
  ponerDatosSelectHtml(pregunta_HTML, pregunta_XML, select_HTML, select_opciones);
  answer_multiple = xmlDoc.getElementById("preg008").getElementsByTagName("answer").length;
  for(i = 0; i < answer_multiple; i++)
  {
    answer8_mul[i] = parseInt(xmlDoc.getElementById("preg008").getElementsByTagName("answer")[i].innerHTML);
  }

  //Pregunta 9 checkbox
  pregunta_XML = xmlDoc.getElementsByTagName("title")[6].innerHTML;
  pregunta_HTML = document.getElementById("preg009");
  checkbox_HTML = document.getElementsByClassName("checkbox")[1];
  opciones = xmlDoc.getElementById("preg009").getElementsByTagName("option").length;
  for(i = 0; i < opciones; i++) {
    optionsRadio[i] = xmlDoc.getElementById("preg009").getElementsByTagName("option")[i].innerHTML;
  }
  ponerDatosCheckboxHtml(pregunta_HTML, pregunta_XML, checkbox_HTML, optionsRadio, "exportar", "checkbox");
  answers_checkbx = xmlDoc.getElementById("preg009").getElementsByTagName("answer").length;
  for(i = 0; i < answers_checkbx; i++)  {
    answer9_check[i] = parseInt(xmlDoc.getElementById("preg009").getElementsByTagName("answer")[i].innerHTML);
  }
  optionsRadio = [];
 
 //Pregunta 10 multiple
  pregunta_XML = xmlDoc.getElementsByTagName("title")[7].innerHTML;
  pregunta_HTML = document.getElementById("preg010");
  select_HTML = document.getElementsByTagName("select")[3];
  opciones = xmlDoc.getElementById("preg010").getElementsByTagName("option").length;
  for(i = 0; i < opciones; i++)  {
    select_opciones[i] = xmlDoc.getElementById("preg010").getElementsByTagName("option")[i].innerHTML;
  }
  ponerDatosSelectHtml(pregunta_HTML, pregunta_XML, select_HTML, select_opciones);
  answer_multiple = xmlDoc.getElementById("preg010").getElementsByTagName("answer").length;
  for(i = 0; i < answer_multiple; i++)
  {
    answer10_mul[i] = parseInt(xmlDoc.getElementById("preg010").getElementsByTagName("answer")[i].innerHTML);
  }

}

//****************************************************************************************************
//Implementación de la corrección

function corregirTXT(valor, correcto, mAcierto, mFallo) {
  if (valor.toLowerCase() == correcto.toLowerCase()) {
   darRespuestaHtml(mAcierto);
   nota +=1;
  }
  else {
   darRespuestaHtml(mFallo);
  }
}


function corregirRadio(radio, correcto, mAcierto, mFallo, atributo) {
  var r = -1;
  for(i = 0; i < radio.length; i++) {
    if(radio[i].checked) {
      r = i;
      break;
    }
  }
  if(r == correcto) {
    mostrarCorreccion(mAcierto);
    nota += 1;
  }
  else {
    darRespuestaHtml(mFallo + document.getElementById(atributo+correcto).innerHTML);
  }
}


function corregirSelect(seleccion, correcto, mAcierto, mFallo) {
  if (seleccion.value == correcto) {
   darRespuestaHtml(mAcierto);
   nota +=1;
  }
  else darRespuestaHtml(mFallo + seleccion[correcto].innerHTML);
}




function corregirCheckbox(checkbox, correctas, mensajeOK, mensajeError, atributo)
{
  var respuestas = [];
  var texto_correctas = [];
  // este for es para imprimir luego el mensaje de error
  for(i = 0; i < correctas.length; i++)
  {
    // select[correctas[i]].innerHTML = formElement.getElementsByTagName("select")[2][res_dbz5_mul[i]].innerHTML
    texto_correctas[i] = document.getElementById(atributo+correctas[i]).innerHTML;
  }
  // esto es para recoger las respuestas que ha marcado el usuario
  for(j = 0; j < checkbox.length; j++)
  {
    // si tenemos una opcion seleccionada, la guardamos dentro de una array de respuestas
    if(checkbox[j].checked)
    {
      respuestas[respuestas.length] = j;
    }
  }
  // si las arrays no son iguales, dara mensaje de error
  if(respuestas.length == correctas.length)
  {
    for(k = 0; k < respuestas.length; k++)
    {
      // si las respuestas son iguales, no saltara el break
      if(respuestas[k] != correctas[k])
      {
        darRespuestaHtml(mensajeError + texto_correctas.join(", "));
        break;
      }
      darRespuestaHtml(mensajeOK);
    }
  }
  else
  {
    darRespuestaHtml(mensajeError + texto_correctas.join(", "));
  }
}


function corregirMultiple(multi, correcto, mAcierto, mFallo) {
  var r = [];
  var correctas = [];
  for(i = 0; i < correcto.length; i++) {
    correctas[i] = multi[correcto[i]].innerHTML;
  }
  for(j = 0; j < multi.length; j++)
  {
    if(multi[j].selected)
    {
      r[r.length] = j;
    }
  }
  if(r.length == correcto.length)
  {
    for(k = 0; k < r.length; k++)
    {
      if(r[k] != correcto[k])
      {
        darRespuestaHtml(meFallo + correctas.join(", "));
        break;
      }
      darRespuestaHtml(mAcierto);
    }
  }
  else
  {
    darRespuestaHtml(mFallo + correctas.join(", "));
  }
}


//****************************************************************************************************
// poner los datos recibios en el HTML
function corregirTXT(texto_HTML, texto_XML) {
  texto_HTML.innerHTML = texto_XML;
}


function ponerDatosSelectHtml(texto_HTML, texto_XML, sect_HTML, sect_opciones) {
  texto_HTML.innerHTML = texto_XML;
  var option;
  for (i = 0; i < sect_opciones.length; i++) { 
    option = document.createElement("option");
    option.text = sect_opciones[i];
    option.value = i;
    sect_HTML.options.add(option);
  }  
}


function ponerDatosCheckboxHtml(texto_HTML, texto_XML, checkboxHTML, checkboxOpciones, atributo, tipo) {
  texto_HTML.innerHTML = texto_XML;
  var input;
  var label;
  for (i = 0; i < checkboxOpciones.length; i++) {
    input = document.createElement("input");
    label = document.createElement("label");
    label.innerHTML = checkboxOpciones[i];
    label.setAttribute("for", atributo+i)
    input.type = tipo;
    input.name = atributo;
    input.id = atributo+i;
    checkboxHTML.appendChild(input);
    checkboxHTML.appendChild(label);
    checkboxHTML.appendChild(document.createElement("br"));
  }
}


//****************************************************************************************************
//Gestionar la presentación de las respuestas
function darRespuestaHtml(r) {
 var p = document.createElement("p");
 var node = document.createTextNode(r);
 p.appendChild(node);
 document.getElementById("resultados").appendChild(p);
}


function presentarNota() {
  darRespuestaHtml("Nota: "+nota+" puntos sobre 10");
}


function inicializar() {
   document.getElementById("resultados").innerHTML = "";
   nota = 5;
}