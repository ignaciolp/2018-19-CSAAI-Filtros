function main() {

  var img = document.getElementById('imagesrc')
  var canvas = document.getElementById('display');

  deslizador_R = document.getElementById('deslizador_R')
  deslizador_G = document.getElementById('deslizador_G')
  deslizador_B = document.getElementById('deslizador_B')

  range_value_R = document.getElementById('range_value_R')
  range_value_G = document.getElementById('range_value_G')
  range_value_B = document.getElementById('range_value_B')

  boton_Gris = document.getElementById('Grises')

  canvas.width = img.width;
  canvas.height = img.height;

  var ctx = canvas.getContext("2d");

  ctx.drawImage(img, 0,0);

  function RGB(){

      range_value_R.innerHTML = deslizador_R.value
      range_value_G.innerHTML = deslizador_G.value
      range_value_B.innerHTML = deslizador_B.value

      ctx.drawImage(img, 0,0);

      imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      data = imgData.data

      umbral_R = deslizador_R.value
      umbral_G = deslizador_G.value
      umbral_B = deslizador_B.value

      for (var i = 0; i < data.length; i+=4) {
        if (data[i] > umbral_R){
          data[i] = umbral_R;
        }
        if (data[i+1] > umbral_G){
          data[i+1] = umbral_G;
        }
        if (data[i+2] > umbral_B){
          data[i+2] = umbral_B;
        }
      }
  }

  function gris(){

    for (var i = 0; i < data.length; i+=4) {
        brillo = (3 * data[i] + 4 * data[i+1] + data[i+2])/8
        data[i] = brillo;
        data[i+1] = brillo;
        data[i+2] = brillo;
      }
  }

  deslizador_R.oninput = () => {
    RGB()
    ctx.putImageData(imgData, 0, 0);
  }

  deslizador_G.oninput = () => {
    RGB()
    ctx.putImageData(imgData, 0, 0);
  }

  deslizador_B.oninput = () => {
    RGB()
    ctx.putImageData(imgData, 0, 0);
  }

  boton_Gris.onclick =()=>{
    gris()
      ctx.putImageData(imgData, 0, 0);
  }
}
