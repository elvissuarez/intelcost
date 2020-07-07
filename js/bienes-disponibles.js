/**
 * Arreglo que devuelve las opciones de filtro para los resultados y trae la informacion del archivo data
 * @param {*} filtro
 */
function getBienesDisponibles(filtro) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      pintaBienesDisponibles(JSON.parse(this.responseText).sort(), filtro);
      if (filtro["selects"]) {
        getFiltrosDeBusqueda(JSON.parse(this.responseText).sort());
      }
    }
  };
  xhttp.open("GET", "data-1.json", true);
  xhttp.send();
}

/**
 * Pinta Todos los bienes desde el Json basado en el filtro
 * @param {*} arr_bienes
 * @param {*} filtro
 */
function pintaBienesDisponibles(arr_bienes, filtro) {
  let tab1 = document.getElementById("tabs-1");
  // modificar el titulo de la pestaña
  tab1.getElementsByTagName("h5")[0].innerHTML = filtro["title"];
  let url_base = document.URL.replace("#", "");
  divider = tab1.querySelectorAll(".divider:last-child")[0];
  let divBien = '<div id="search-results">';
  arr_bienes.forEach((element) => {
    let pintarUnElemento = pintarElemento(element, filtro);
    if (pintarUnElemento) {
      divBien += '<div class="bienes" id="bien-id-' + element.Id + '">';
      divBien += '<div class="column-left">';
      divBien += '<img src="' + url_base + 'img/home.jpg" alt="" />';
      divBien += '</div> <div class = "column-right">';
      divBien += '<div class = "bien-info">';
      divBien +=
        '<div class = "bien-row"><div class = "bien-label">Direccion</div> <div class = "bien-data">' +
        element.Direccion +
        "</div></div>";
      divBien +=
        '<div class = "bien-row"><div class = "bien-label">Ciudad</div> <div class = "bien-data">' +
        element.Ciudad +
        "</div></div>";
      divBien +=
        '<div class = "bien-row"><div class = "bien-label">Teléfono</div> <div class = "bien-data">' +
        element.Telefono +
        "</div></div>";
      divBien +=
        '<div class = "bien-row"><div class = "bien-label">Código Postal</div> <div class = "bien-data">' +
        element.Codigo_Postal +
        "</div></div>";
      divBien +=
        '<div class = "bien-row"><div class = "bien-label">Tipo</div> <div class = "bien-data">' +
        element.Tipo +
        "</div></div>";
      divBien +=
        '<div class = "bien-row"><div class = "bien-label">Precio</div> <div class = "bien-data">' +
        element.Precio +
        "</div></div>";
      divBien += '<button type="button" class="guardar-bien" data=\'' +
        JSON.stringify(element) + '\'>Guardar</button>';
      divBien += "</div> </div>";
      divBien += '</div> <div class = "divider" > </div>';
    }
  });
  divBien += "</div>";
  divider.insertAdjacentHTML("afterend", divBien);
  almacenarBienOnClick();
}

/**
 * Completa los campos de seleccion de ciudad y tipo
 * @param {*} arr_bienes
 */
function getFiltrosDeBusqueda(arr_bienes) {
  let ciudades = [];
  let tipos_vivienda = [];
  arr_bienes.forEach((element) => {
    ciudades[element.Ciudad] = element.Ciudad;
    tipos_vivienda[element.Tipo] = element.Tipo;
  });
  // add ciudades
  let select_ciudades = document.getElementById("selectCiudad");
  let ciudades_sort = Object.keys(ciudades).sort();
  for (const [key, ciudad] of Object.entries(ciudades_sort)) {
    let option_ciudad = document.createElement("option");
    option_ciudad.text = ciudad;
    option_ciudad.value = ciudad;
    select_ciudades.add(option_ciudad);
  }
  // add tipos de Vivienda
  let select_tipos = document.getElementById("selectTipo");
  let tipos_vivienda_sort = Object.keys(tipos_vivienda).sort();
  for (const [key, tipo] of Object.entries(tipos_vivienda_sort)) {
    let option_tipo = document.createElement("option");
    option_tipo.text = tipo;
    option_tipo.value = tipo;
    select_tipos.add(option_tipo);
  }
}

/**
 * Funcion que permite repintar los resultados basado en busqueda
 */
function aplicarFiltros() {
  document.getElementById("formulario").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let response = await fetch("services/filter.php", {
      method: "POST",
      body: formData,
    });
    let result = await response.json();
    document.getElementById("formulario").reset();
    let clear_results = document.getElementById("search-results");
    clear_results.querySelectorAll("*").forEach((n) => n.remove());
    clear_results.remove();
    // Pinta nuevamente los resultados basado en la busqueda
    getBienesDisponibles(result);
    // Establecer filtro por defecto despues de enviar el formulario
    setFiltroDefault(result);
  });
}

/**
 * Define si el elemento se puede pintar basado en los filtros aplicados
 * @param {*} elemento
 * @param {*} filtro
 */
function pintarElemento(elemento, filtro) {
  if (filtro["todo"]) {
    return true;
  } else {
    pintar = true;
    if (filtro["ciudad"] !== "" && filtro["ciudad"] !== elemento.Ciudad) {
      pintar = pintar && false;
    }
    if (filtro["tipo"] !== "" && filtro["tipo"] !== elemento.Tipo) {
      pintar = pintar && false;
    }
    if (filtro["precio"] !== "") {
      let precio = filtro["precio"].split(";");
      let min = precio[0];
      let max = precio[1];
      let elementoPrecio = parseInt(elemento.Precio.replace(/[^0-9.-]+/g, ""));
      if (elementoPrecio < min || elementoPrecio > max) {
        pintar = pintar && false;
      }
    }
    return pintar;
  }
  return false;
}

/**
 * Establece los valores por defecto despues de enviar el formulario
 * @param {*} filtro
 */
function setFiltroDefault(filtro){
  if (filtro['ciudad'] !== "") {
    let ciudad = document.getElementById('selectCiudad');
    ciudad.value = filtro['ciudad'];
  }
  if (filtro['tipo'] !== "") {
    let tipo = document.getElementById('selectTipo');
    tipo.value = filtro['tipo'];
  }
  let precio = document.getElementById('rangoPrecio');
  precio.value = filtro['precio'];
}

/**
 * Funcion que permite almacenar los bienes cuando se da click en el boton
 */
function almacenarBienOnClick() {
  let botones = document.getElementsByClassName("guardar-bien");
  for (var i = 0; i < botones.length; i++) {
    botones[i].addEventListener('click', async function (event) {
      event.stopPropagation();
      event.preventDefault();
      formData = this.getAttribute('data');
      let response = await fetch("services/save_data.php", {
        method: "POST",
        body: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      });
      let result = await response.json();
      alert(result.message);
      actualizarMisBienes();
    });
  }
}

/**
 * Funcion que permite repintar los resultados de mis bienes
 */
function actualizarMisBienes() {
  let clear_results = document.getElementById("mis-bienes");
  if (clear_results) {
    clear_results.querySelectorAll("*").forEach((n) => n.remove());
    clear_results.remove();
    // Pinta nuevamente los resultados basado en la busqueda
    getMisBienes();
  }
}

let $filtro_inicial = [];
$filtro_inicial["title"] = "TODOS LOS BIENES";
$filtro_inicial["todo"] = true;
$filtro_inicial["selects"] = true;
getBienesDisponibles($filtro_inicial);
aplicarFiltros();
