function main() {
  console.log("En main()....")

  //-- Acceso al objeto con la imagen
  var img = document.getElementById('imagesrc')

  //-- Acceso al objeto con el canvas
  var canvas = document.getElementById('display');

  //-- Acceso al deslizador
  deslizador_R = document.getElementById('deslizador_R')
  deslizador_G = document.getElementById('deslizador_G')
  deslizador_B = document.getElementById('deslizador_B')
  boton_Gris = document.getElementById('Grises')
  //-- Valor del deslizador
  range_value_R = document.getElementById('range_value_R')
  range_value_G = document.getElementById('range_value_G')
  range_value_B = document.getElementById('range_value_B')


  //-- Se establece como tamaño del canvas el mismo
  //-- que el de la imagen original
  canvas.width = img.width;
  canvas.height = img.height;

  //-- Obtener el contexto del canvas para
  //-- trabajar con el
  var ctx = canvas.getContext("2d");

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);

  //-- Funcion de retrollamada del deslizador
  deslizador_R.oninput = () => {
    //-- Mostrar el nuevo valor del deslizador
    range_value_R.innerHTML = deslizador_R.value

    //-- Situar la imagen original en el canvas
    //-- No se han hecho manipulaciones todavia
    ctx.drawImage(img, 0,0);

    //-- Obtener la imagen del canvas en pixeles
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //-- Obtener el array con todos los píxeles
    var data = imgData.data

    //-- Obtener el umbral de rojo del desliador
    umbral_R = deslizador_R.value

    //-- Filtrar la imagen según el nuevo umbral
    // -- Y mantiene los otros umbrales
    for (var i = 0; i < data.length; i+=4) {
      if (data[i] > umbral_R){
        data[i] = umbral_R;
      }
      if (data[i+1] > deslizador_G.value){
        data[i+1] = deslizador_G.value;
      }
      if (data[i+2] > deslizador_B.value){
        data[i+2] = deslizador_B.value;
      }
    }

    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
  }
  deslizador_G.oninput = () => {

    range_value_G.innerHTML = deslizador_G.value

    ctx.drawImage(img, 0,0);

    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    var data = imgData.data

    umbral_G = deslizador_G.value

    for (var i = 0; i < data.length; i+=4) {
      if (data[i+1] > umbral_G){
        data[i+1] = umbral_G;
      }
      if (data[i] > deslizador_R.value){
        data[i] = deslizador_R.value;
      }
      if (data[i+2] > deslizador_B.value){
        data[i+2] = deslizador_B.value;
      }
    }

    ctx.putImageData(imgData, 0, 0);
  }

  deslizador_B.oninput = () => {

    range_value_B.innerHTML = deslizador_B.value

    ctx.drawImage(img, 0,0);

    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    var data = imgData.data

    umbral_B = deslizador_B.value

    for (var i = 0; i < data.length; i+=4) {
      if (data[i+2] > umbral_B){
        data[i+2] = umbral_B;
      }
      if (data[i] > deslizador_R.value){
        data[i] = deslizador_R.value;
      }
      if (data[i+1] > deslizador_G.value){
        data[i+1] = deslizador_G.value;
      }
    }

    ctx.putImageData(imgData, 0, 0);
  }
  boton_Gris.onclick =()=>{
    ctx.drawImage(img, 0,0);

    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imgData.data
    deslizador_R.value = 255;
    deslizador_G.value = 255;
    deslizador_B.value = 255;
    range_value_R.innerHTML = deslizador_R.value
    range_value_G.innerHTML = deslizador_G.value
    range_value_B.innerHTML = deslizador_B.value

    for (var i = 0; i < data.length; i+=4) {

        brillo = (3 * data[i] + 4 * data[i+1] + data[i+2])/8
        data[i] = brillo;
        data[i+1] = brillo;
        data[i+2] = brillo;
      }
      ctx.putImageData(imgData, 0, 0);
  }

}
