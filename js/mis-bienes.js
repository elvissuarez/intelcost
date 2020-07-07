/**
 * Arreglo que devuelve las opciones de filtro para los resultados y trae la informacion del archivo data
 */
function getMisBienes() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      pintaMisBienes(JSON.parse(this.responseText));
    }
  };
  xhttp.open("GET", "services/get_my_data.php", true);
  xhttp.send();
}

/**
 * Pinta mis bienes desde el query a la DB
 * @param {*} arr_bienes
 */
function pintaMisBienes(arr_bienes) {
  let tab1 = document.getElementById("tabs-2");
  let url_base = document.URL.replace("#", "");
  divider = tab1.querySelectorAll(".divider:last-child")[0];
  let divBien = '<div id="mis-bienes">';
  arr_bienes.forEach((element) => {
    divBien += '<div class="bienes" id="bien-id-' + element.id + '">';
    divBien += '<div class="column-left">';
    divBien += '<img src="' + url_base + 'img/home.jpg" alt="" />';
    divBien += '</div> <div class = "column-right">';
    divBien += '<div class = "bien-info">';
    divBien +=
      '<div class = "bien-row"><div class = "bien-label">Direccion</div> <div class = "bien-data">' +
      element.direccion +
      "</div></div>";
    divBien +=
      '<div class = "bien-row"><div class = "bien-label">Ciudad</div> <div class = "bien-data">' +
      element.ciudad +
      "</div></div>";
    divBien +=
      '<div class = "bien-row"><div class = "bien-label">Teléfono</div> <div class = "bien-data">' +
      element.telefono +
      "</div></div>";
    divBien +=
      '<div class = "bien-row"><div class = "bien-label">Código Postal</div> <div class = "bien-data">' +
      element.codigo_postal +
      "</div></div>";
    divBien +=
      '<div class = "bien-row"><div class = "bien-label">Tipo</div> <div class = "bien-data">' +
      element.tipo +
      "</div></div>";
    divBien +=
      '<div class = "bien-row"><div class = "bien-label">Precio</div> <div class = "bien-data">' +
      element.precio +
      "</div></div>";
    divBien += "</div> </div>";
    divBien += '</div> <div class = "divider" > </div>';
  });
  divBien += "</div>";
  divider.insertAdjacentHTML("afterend", divBien);
}

getMisBienes();
