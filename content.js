


window.initMap = initMap;

/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
function initMap() {
  const token = '6086969047:AAG9RlsqrusNHjqBMmR2Cp4W1WikjksEfQU'; // Replace with your Telegram bot token
  const chatId = '-1001821689872'; // Replace with the chat ID of the user or group you want to send the message to
  const message = '[workncoffee]' 
  fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${message}`)

  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.61315, lng: -58.37723 },
    zoom: 13,
    mapTypeControl: false,
  });
  const card = document.getElementById("pac-card");
  const input = document.getElementById("pac-input");
  const biasInputElement = document.getElementById("use-location-bias");
  const strictBoundsInputElement = document.getElementById("use-strict-bounds");
  const options = {
    fields: ["formatted_address", "geometry", "name", "opening_hours", "formatted_phone_number"],
    strictBounds: false,
    types: ["establishment"],
  };

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);

  const autocomplete = new google.maps.places.Autocomplete(
    input,
    options
  );

  // Bind the map's bounds (viewport) property to the autocomplete object,
  // so that the autocomplete requests use the current map bounds for the
  // bounds option in the request.
  autocomplete.bindTo("bounds", map);

  const infowindow = new google.maps.InfoWindow();
  const infowindowContent = document.getElementById("infowindow-content");

  infowindow.setContent(infowindowContent);

  const marker = new google.maps.Marker({
    map,
    anchorPoint: new google.maps.Point(0, -29),
  });

  autocomplete.addListener("place_changed", () => {
    infowindow.close();
    marker.setVisible(false);

    const place = autocomplete.getPlace();
    
    



    if (!place.geometry || !place.geometry.location) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert(
        "No details available for input: '" + place.name + "'"
      );
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }

    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
    infowindowContent.children["place-name"].textContent = place.name;
    

    const formated_name = (place.name).replace(".","")
    const index = place.formatted_address.indexOf(', ', 0);
    const formated_street = (place.formatted_address.substring(0, index)).replace(".","")


    const openingHours = place.opening_hours;
    let openingHoursText = "";
    if (openingHours) {
      openingHoursText += openingHours.weekday_text.join("\n");
    } else {
      openingHoursText += "Not available";
    }

    if (place.formatted_phone_number) {
      const phone = (place.formatted_phone_number).replace(/^0/, '+54 ');
    } else {
      const phone = "No Disponible";
    }

    // const phone = (place.formatted_phone_number).replace(/^0/, '+54 ');;






    window.myFunction(formated_name,formated_street,openingHoursText,phone);

    infowindowContent.children["place-address"].textContent =
      place.formatted_address;
    infowindow.open(map, marker);
  });
}




if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  // dark mode
  var theme = 'dark'
}
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
  // dark mode
  var theme = 'light'
}

if (theme == 'light') {
  document.querySelector("html").classList = "light";
}
else if (theme == 'dark') {
  document.querySelector("html").classList = "dark";
}

var os = navigator.userAgent;


if (os.includes('iPhone') || os.includes('Android')) {
  var sistema = 'mobile';
}
// else if (os.includes('Android')) {
//   var sistema = 'android';
// }
else if(navigator.userAgent.indexOf("Chrome") > -1 ||
  navigator.userAgent.indexOf("Safari") > -1 ||
  navigator.userAgent.indexOf("Opera") > -1 ||
  navigator.userAgent.indexOf("Firefox") > -1 ||
  navigator.userAgent.indexOf("Macintosh") > -1) {
  var sistema = 'web'  
}
let system = document.getElementById('html')
system.classList.add(sistema);



document.getElementById("filtro_provinces").addEventListener("change", filterTable);
document.getElementById("filtro_cities").addEventListener("change", filterTable);



function filterTable() {
  var inputProvince = document.getElementById("filtro_provinces");
  var inputCity = document.getElementById("filtro_cities");
  var filterProvince = inputProvince.value.toUpperCase();
  var filterCity = inputCity.value.toUpperCase();
  
  var table = document.getElementById("cafe-data");


  if (filterProvince !== "") {
    // A selection has been made
    inputCity.disabled = false;
    for (var i = 0; i < table.rows.length; i++) {
      var row = table.rows[i];
      row.cells[4].style.display = "table-cell";
      row.cells[5].style.display = "none";
      row.cells[3].style.display = "table-cell";
    }
  }
  if (filterProvince !== "" && filterCity !== "") {
    for (var i = 0; i < table.rows.length; i++) {
      var row = table.rows[i];
      if (row.cells.length > 4) {
          row.cells[4].style.display = "none";
      }
    }
  }
  

  

  const rows = document.querySelectorAll("#cafe-data tbody tr");
  let anyRowDisplayed = false; // Flag to check if any row is displayed

  for (var i = 0; i < rows.length; i++) {
      var province = rows[i].getElementsByTagName("td")[5].textContent.toUpperCase();
      var city = rows[i].getElementsByTagName("td")[4].textContent.toUpperCase();
      var provinceMatch = province === filterProvince;

      // Check if filterCity is not selected or if the city matches
      var cityMatch = !filterCity || city === filterCity;

      if (!(provinceMatch && cityMatch)) {
          rows[i].style.display = "none";
      } else {
          rows[i].style.display = ""; // Show the row
          anyRowDisplayed = true; // Set the flag to true
      }
  }

  const tableHead = document.querySelector("#cafe-data thead");
  const tableBody = document.querySelector("#cafe-data tbody");

  // Check if any row is displayed
  if (anyRowDisplayed) {
      tableHead.style.display = ""; // Show the table header
      tableBody.style.display = ""; // Show the table body
  } else {
      tableHead.style.display = "none"; // Hide the table header
      tableBody.style.display = "none"; // Hide the table body
      alert('No se encontraron cafeterias en este lugar.\nIr a la sección "Añadir nueva cafetería" para agregar un nuevo lugar.');
  }

  
  
  
  

}



function showAllRows() {

  var inputProvince = document.getElementById("filtro_provinces");
  var inputCity = document.getElementById("filtro_cities");

  inputProvince.value = "";
  inputCity.value = "";
  inputCity.disabled = true;
  
  var table = document.getElementById("cafe-data");
  const tableHead = document.querySelector("#cafe-data thead");
  const tableBody = document.querySelector("#cafe-data tbody");
  tableHead.style.display = "";
  tableBody.style.display = "";
  table.style.display = "";

  // Loop through all rows in the table
  for (var i = 0; i < table.rows.length; i++) {
    var row = table.rows[i];
    row.style.display = "table-row"
    // Loop through all cells (td elements) in the row
    for (var j = 0; j < row.cells.length; j++) {
      var cell = row.cells[j];
   
      if (j === 3) {
        cell.style.display = "none"; // Hide the cell
      } else {
        cell.style.display = "table-cell"; // Show the other cells
      }
    }
  }
  
}




var provinces = [  { name: "Buenos Aires", value: "Buenos Aires" },  { name: "Catamarca", value: "Catamarca" },  { name: "Chaco", value: "Chaco" },  { name: "Chubut", value: "Chubut" },  { name: "Ciudad de Buenos Aires", value: "Ciudad de Buenos Aires" },  { name: "Córdoba", value: "Córdoba" },  { name: "Corrientes", value: "Corrientes" },  { name: "Entre Ríos", value: "Entre Ríos" },  { name: "Formosa", value: "Formosa" },  { name: "Jujuy", value: "Jujuy" },  { name: "La Pampa", value: "La Pampa" },  { name: "La Rioja", value: "La Rioja" },  { name: "Mendoza", value: "Mendoza" },  { name: "Misiones", value: "Misiones" },  { name: "Neuquén", value: "Neuquén" },  { name: "Río Negro", value: "Río Negro" },  { name: "Salta", value: "Salta" },  { name: "San Juan", value: "San Juan" },  { name: "San Luis", value: "San Luis" },  { name: "Santa Cruz", value: "Santa Cruz" },  { name: "Santa Fe", value: "Santa Fe" },  { name: "Santiago del Estero", value: "Santiago del Estero" },  { name: "Tierra del Fuego, Antártida e Islas del Atlántico Sur", value: "Tierra del Fuego, Antártida e Islas del Atlántico Sur" },  { name: "Tucumán", value: "Tucumán" }];
var select = document.getElementById("provinces");
for (var i = 0; i < provinces.length; i++) {
  var option = document.createElement("option");
  option.value = provinces[i].value;
  option.text = provinces[i].name;
  select.appendChild(option);
}


function showCities() {  
  // Create an object that maps each province to an array of its top 5 cities
  var topCitiesByProvince = {
    "Buenos Aires": [ "Adolfo Alsina", "Adolfo Gonzales Chaves", "Alberti", "Almirante Brown", "Arrecifes", "Avellaneda", "Ayacucho", "Azul", "Bahía Blanca", "Balcarce", "Baradero", "Benito Juárez", "Berazategui", "Berisso", "Bolívar", "Bragado", "Branden", "Campana", "Cañuelas", "Capitán Sarmiento", "Carlos Casares", "Carlos Tejedor", "Carmen de Areco", "Castelli", "Chacabuco", "Chascomús", "Chivilcoy", "Colón", "Coronel Dorrego", "Coronel Pringles", "Coronel Rosales", "Coronel Suarez", "Daireaux", "Dolores", "Ensenada", "Escobar", "Esteban Echeverría", "Exaltación de la Cruz", "Ezeiza", "Florentino Ameghino", "General Alvarado", "General Alvear", "General Arenales", "General Belgrano", "General Guido", "General La Madrid", "General Las Heras", "General Lavalle", "General Madariaga", "General Paz", "General Pinto", "General Pueyrredón", "General Rodríguez", "General San Martín", "General Viamonte", "General Villegas", "Guaminí", "Hipólito Yrigoyen", "Hurlingham", "Ituzaingó", "José C. Paz", "Junín", "La Costa", "La Matanza", "La Plata", "Lanús", "Laprida", "Las Flores", "Leandro N. Alem", "Lincoln", "Lobería", "Lobos", "Lomas de Zamora", "Luján", "Magdalena", "Maipú", "Malvinas Argentinas", "Mar Chiquita", "Marcos Paz", "Mercedes", "Merlo", "Monte", "Moreno", "Navarro", "Necochea", "Nueve de Julio", "Olavarría", "Patagones", "Pehuajó", "Pellegrini", "Pergamino", "Pila", "Pilar", "Pinamar", "Presidente Perón", "Puan", "Punta Indio", "Quilmes", "Ramallo", "Rauch", "Rivadavia", "Rojas", "Roque Pérez", "Saavedra", "Saladillo", "Salliqueló", "Salto", "San Andrés de Giles", "San Antonio de Areco", "San Bernardo", "San Cayetano", "San Fernando", "San Isidro", "San Miguel", "San Nicolás", "San Pedro", "San Vicente", "Suipacha", "Tandil", "Tapalqué", "Tigre", "Tordillo", "Tornquist", "Trenque Lauquen", "Tres Arroyos", "Tres de Febrero", "Tres Lomas", "Veinticinco de Mayo", "Vicente López", "Villa Gesell", "Villarino", "Zárate" ],
    "Ciudad de Buenos Aires": [ "Agronomía", "Almagro", "Balvanera", "Barracas", "Belgrano", "Boedo", "Caballito", "Chacarita", "Coghlan", "Colegiales", "Constitución", "Flores", "Floresta", "La Boca", "Liniers", "Mataderos", "Monte Castro", "Montserrat", "Nueva Pompeya", "Núñez", "Palermo", "Parque Avellaneda", "Parque Chacabuco", "Parque Chas", "Parque Patricios", "Puerto Madero", "Recoleta", "Retiro", "Saavedra", "San Cristóbal", "San Nicolás", "San Telmo", "Vélez Sársfield", "Versalles", "Villa Crespo", "Villa del Parque", "Villa Devoto", "Villa Gral. Mitre", "Villa Lugano", "Villa Luro", "Villa Ortúzar", "Villa Pueyrredón", "Villa Real", "Villa Riachuelo", "Villa Santa Rita", "Villa Soldati", "Villa Urquiza"],
    "Catamarca": ["San Fernando del Valle de Catamarca", "Andalgalá", "Belén", "Santa María", "Recreo", "Tinogasta", "Fiambalá", "Mutquín", "Saujil", "Los Altos"],
    "Chaco": ["Resistencia", "Barranqueras", "Fontana", "Presidencia Roque Sáenz Peña", "Villa Ángela", "Charata", "Tres Isletas", "Las Breñas", "Machagai", "General San Martín"],
    "Chubut": ["Comodoro Rivadavia", "Trelew", "Puerto Madryn", "Esquel", "Rawson", "Gaiman", "Dolavon", "Epuyén", "Tecka", "El Hoyo"],
    "Córdoba": ["Córdoba", "Río Cuarto", "Villa Carlos Paz", "Alta Gracia", "Bell Ville", "Villa María", "San Francisco", "Río Tercero", "Jesús María", "La Falda"],
    "Corrientes": ["Corrientes", "Goya", "Curuzú Cuatiá", "Esquina", "Mercedes", "Santo Tomé", "Bella Vista", "Paso de los Libres", "Sauce", "San Luis del Palmar"],
    "Entre Ríos": ["Paraná", "Concordia", "Gualeguaychú", "Gualeguay", "Villaguay", "Chajarí", "La Paz", "Victoria", "Diamante", "Crespo"],
    "Formosa": ["Formosa", "Clorinda", "Pirane", "Ingeniero Juárez", "Las Lomitas", "El Colorado", "General Belgrano", "Comandante Fontana", "San Martin 2", "Laguna Naineck"],
    "Jujuy": ["San Salvador de Jujuy", "Palpalá", "San Pedro de Jujuy", "La Quiaca", "Humahuaca", "Libertador General San Martín", "Perico", "Abra Pampa", "El Carmen", "Tilcara"],
    "La Pampa": ["Santa Rosa", "General Pico", "Toay", "Realicó", "General Acha", "Victorica", "Guatraché", "Lonquimay", "Eduardo Castex", "25 de Mayo"],
    "La Rioja": ["La Rioja", "Chilecito", "Famatina", "Villa Unión", "Aimogasta", "Chamical", "Chepes", "Anillaco", "Olta", "Villa Castelli"],
    "Mendoza": ["Mendoza", "San Rafael", "Godoy Cruz", "Las Heras", "Luján de Cuyo", "Maipú", "Malargüe", "General Alvear", "Tunuyán", "Rivadavia"],
    "Misiones": ["Posadas", "Eldorado", "Oberá", "Puerto Rico", "Aristóbulo del Valle", "San Vicente", "Leandro N. Alem", "Jardín América", "Montecarlo", "Garupá"],
    "Neuquén": ["Neuquén", "San Martín de los Andes", "Zapala", "Cutral Có", "Chos Malal", "Plottier", "Junín de los Andes", "Villa La Angostura", "Aluminé", "Loncopué"],
    "Río Negro": ["Viedma", "Bariloche", "General Roca", "Cipolletti", "Ingeniero Jacobacci", "San Antonio Oeste", "Allen", "El Bolsón", "Catriel", "Choele Choel"],
    "Salta": ["Salta", "Cafayate", "San Ramón de la Nueva Orán", "Tartagal", "Joaquín V. González", "General Güemes", "Metán", "Rosario de la Frontera", "Orán", "San Antonio de los Cobres"],
    "San Juan": ["San Juan", "Rawson", "Chimbas", "Santa Lucía", "Caucete", "Zonda", "San Martín", "25 de Mayo", "Angaco", "Pocito"],
    "San Luis": ["San Luis", "Villa Mercedes", "Merlo", "Quines", "La Punta", "Naschel", "Candelaria", "Luján", "Santa Rosa de Conlara", "Tilisarao"],
    "Santa Cruz": ["Río Gallegos", "El Calafate", "Puerto Deseado", "Caleta Olivia", "Pico Truncado", "Las Heras", "28 de Noviembre", "Perito Moreno", "Gobernador Gregores", "Los Antiguos"],
    "Santa Fe": ["Rosario", "Santa Fe", "Venado Tuerto", "Rafaela", "Reconquista"],
    "Santiago del Estero": ["Santiago del Estero", "La Banda", "Termas de Río Hondo", "Fernández", "Añatuya", "Frías", "Loreto", "Suncho Corral", "Clodomira", "Quimilí"],
    "Tierra del Fuego": ["Ushuaia", "Río Grande", "Tolhuin"],
    "Tucumán": ["San Miguel de Tucumán", "Yerba Buena", "Tafí Viejo", "Famaillá", "Banda del Río Salí", "Aguilares", "Concepción", "Lules", "Monteros", "Alberdi"]
  };

  // Get the selected province
  var province = document.getElementById("provinces").value;
  // Get the cities dropdown element
  var cities = document.getElementById("cities");
  // Remove any existing options
  cities.innerHTML = "";

  // Add a default placeholder option
  var defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  defaultOption.text = "-";
  cities.add(defaultOption);

  // Add the top 5 cities for the selected province
  if (province in topCitiesByProvince) {
    var topCities = topCitiesByProvince[province];
    for (var i = 0; i < topCities.length; i++) {
        var option = document.createElement("option");
        option.value = topCities[i];
        option.text = topCities[i];
        cities.add(option);
    }
  }
  // add more else if blocks for the other provinces and their cities
}




var provincia = [  { name: "Buenos Aires", value: "Buenos Aires" },  { name: "Catamarca", value: "Catamarca" },  { name: "Chaco", value: "Chaco" },  { name: "Chubut", value: "Chubut" },  { name: "Ciudad de Buenos Aires", value: "Ciudad de Buenos Aires" },  { name: "Córdoba", value: "Córdoba" },  { name: "Corrientes", value: "Corrientes" },  { name: "Entre Ríos", value: "Entre Ríos" },  { name: "Formosa", value: "Formosa" },  { name: "Jujuy", value: "Jujuy" },  { name: "La Pampa", value: "La Pampa" },  { name: "La Rioja", value: "La Rioja" },  { name: "Mendoza", value: "Mendoza" },  { name: "Misiones", value: "Misiones" },  { name: "Neuquén", value: "Neuquén" },  { name: "Río Negro", value: "Río Negro" },  { name: "Salta", value: "Salta" },  { name: "San Juan", value: "San Juan" },  { name: "San Luis", value: "San Luis" },  { name: "Santa Cruz", value: "Santa Cruz" },  { name: "Santa Fe", value: "Santa Fe" },  { name: "Santiago del Estero", value: "Santiago del Estero" },  { name: "Tierra del Fuego, Antártida e Islas del Atlántico Sur", value: "Tierra del Fuego, Antártida e Islas del Atlántico Sur" },  { name: "Tucumán", value: "Tucumán" }];
var select = document.getElementById("filtro_provinces");
for (var i = 0; i < provincia.length; i++) {
  var option = document.createElement("option");
  option.value = provincia[i].value;
  option.text = provincia[i].name;
  select.appendChild(option);
}
function filtros() {
  var topCitiesByProvince = {
    "Buenos Aires": [ "Adolfo Alsina", "Adolfo Gonzales Chaves", "Alberti", "Almirante Brown", "Arrecifes", "Avellaneda", "Ayacucho", "Azul", "Bahía Blanca", "Balcarce", "Baradero", "Benito Juárez", "Berazategui", "Berisso", "Bolívar", "Bragado", "Branden", "Campana", "Cañuelas", "Capitán Sarmiento", "Carlos Casares", "Carlos Tejedor", "Carmen de Areco", "Castelli", "Chacabuco", "Chascomús", "Chivilcoy", "Colón", "Coronel Dorrego", "Coronel Pringles", "Coronel Rosales", "Coronel Suarez", "Daireaux", "Dolores", "Ensenada", "Escobar", "Esteban Echeverría", "Exaltación de la Cruz", "Ezeiza", "Florentino Ameghino", "General Alvarado", "General Alvear", "General Arenales", "General Belgrano", "General Guido", "General La Madrid", "General Las Heras", "General Lavalle", "General Madariaga", "General Paz", "General Pinto", "General Pueyrredón", "General Rodríguez", "General San Martín", "General Viamonte", "General Villegas", "Guaminí", "Hipólito Yrigoyen", "Hurlingham", "Ituzaingó", "José C. Paz", "Junín", "La Costa", "La Matanza", "La Plata", "Lanús", "Laprida", "Las Flores", "Leandro N. Alem", "Lincoln", "Lobería", "Lobos", "Lomas de Zamora", "Luján", "Magdalena", "Maipú", "Malvinas Argentinas", "Mar Chiquita", "Marcos Paz", "Mercedes", "Merlo", "Monte", "Moreno", "Navarro", "Necochea", "Nueve de Julio", "Olavarría", "Patagones", "Pehuajó", "Pellegrini", "Pergamino", "Pila", "Pilar", "Pinamar", "Presidente Perón", "Puan", "Punta Indio", "Quilmes", "Ramallo", "Rauch", "Rivadavia", "Rojas", "Roque Pérez", "Saavedra", "Saladillo", "Salliqueló", "Salto", "San Andrés de Giles", "San Antonio de Areco", "San Cayetano", "San Fernando", "San Isidro", "San Miguel", "San Nicolás", "San Pedro", "San Vicente", "Suipacha", "Tandil", "Tapalqué", "Tigre", "Tordillo", "Tornquist", "Trenque Lauquen", "Tres Arroyos", "Tres de Febrero", "Tres Lomas", "Veinticinco de Mayo", "Vicente López", "Villa Gesell", "Villarino", "Zárate" ],
    "Ciudad de Buenos Aires": [ "Agronomía", "Almagro", "Balvanera", "Barracas", "Belgrano", "Boedo", "Caballito", "Chacarita", "Coghlan", "Colegiales", "Constitución", "Flores", "Floresta", "La Boca", "Liniers", "Mataderos", "Monte Castro", "Montserrat", "Nueva Pompeya", "Núñez", "Palermo", "Parque Avellaneda", "Parque Chacabuco", "Parque Chas", "Parque Patricios", "Puerto Madero", "Recoleta", "Retiro", "Saavedra", "San Cristóbal", "San Nicolás", "San Telmo", "Vélez Sársfield", "Versalles", "Villa Crespo", "Villa del Parque", "Villa Devoto", "Villa Gral. Mitre", "Villa Lugano", "Villa Luro", "Villa Ortúzar", "Villa Pueyrredón", "Villa Real", "Villa Riachuelo", "Villa Santa Rita", "Villa Soldati", "Villa Urquiza"],
    "Catamarca": ["San Fernando del Valle de Catamarca", "Andalgalá", "Belén", "Santa María", "Recreo", "Tinogasta", "Fiambalá", "Mutquín", "Saujil", "Los Altos"],
    "Chaco": ["Resistencia", "Barranqueras", "Fontana", "Presidencia Roque Sáenz Peña", "Villa Ángela", "Charata", "Tres Isletas", "Las Breñas", "Machagai", "General San Martín"],
    "Chubut": ["Comodoro Rivadavia", "Trelew", "Puerto Madryn", "Esquel", "Rawson", "Gaiman", "Dolavon", "Epuyén", "Tecka", "El Hoyo"],
    "Córdoba": ["Córdoba", "Río Cuarto", "Villa Carlos Paz", "Alta Gracia", "Bell Ville", "Villa María", "San Francisco", "Río Tercero", "Jesús María", "La Falda"],
    "Corrientes": ["Corrientes", "Goya", "Curuzú Cuatiá", "Esquina", "Mercedes", "Santo Tomé", "Bella Vista", "Paso de los Libres", "Sauce", "San Luis del Palmar"],
    "Entre Ríos": ["Paraná", "Concordia", "Gualeguaychú", "Gualeguay", "Villaguay", "Chajarí", "La Paz", "Victoria", "Diamante", "Crespo"],
    "Formosa": ["Formosa", "Clorinda", "Pirane", "Ingeniero Juárez", "Las Lomitas", "El Colorado", "General Belgrano", "Comandante Fontana", "San Martin 2", "Laguna Naineck"],
    "Jujuy": ["San Salvador de Jujuy", "Palpalá", "San Pedro de Jujuy", "La Quiaca", "Humahuaca", "Libertador General San Martín", "Perico", "Abra Pampa", "El Carmen", "Tilcara"],
    "La Pampa": ["Santa Rosa", "General Pico", "Toay", "Realicó", "General Acha", "Victorica", "Guatraché", "Lonquimay", "Eduardo Castex", "25 de Mayo"],
    "La Rioja": ["La Rioja", "Chilecito", "Famatina", "Villa Unión", "Aimogasta", "Chamical", "Chepes", "Anillaco", "Olta", "Villa Castelli"],
    "Mendoza": ["Mendoza", "San Rafael", "Godoy Cruz", "Las Heras", "Luján de Cuyo", "Maipú", "Malargüe", "General Alvear", "Tunuyán", "Rivadavia"],
    "Misiones": ["Posadas", "Eldorado", "Oberá", "Puerto Rico", "Aristóbulo del Valle", "San Vicente", "Leandro N. Alem", "Jardín América", "Montecarlo", "Garupá"],
    "Neuquén": ["Neuquén", "San Martín de los Andes", "Zapala", "Cutral Có", "Chos Malal", "Plottier", "Junín de los Andes", "Villa La Angostura", "Aluminé", "Loncopué"],
    "Río Negro": ["Viedma", "Bariloche", "General Roca", "Cipolletti", "Ingeniero Jacobacci", "San Antonio Oeste", "Allen", "El Bolsón", "Catriel", "Choele Choel"],
    "Salta": ["Salta", "Cafayate", "San Ramón de la Nueva Orán", "Tartagal", "Joaquín V. González", "General Güemes", "Metán", "Rosario de la Frontera", "Orán", "San Antonio de los Cobres"],
    "San Juan": ["San Juan", "Rawson", "Chimbas", "Santa Lucía", "Caucete", "Zonda", "San Martín", "25 de Mayo", "Angaco", "Pocito"],
    "San Luis": ["San Luis", "Villa Mercedes", "Merlo", "Quines", "La Punta", "Naschel", "Candelaria", "Luján", "Santa Rosa de Conlara", "Tilisarao"],
    "Santa Cruz": ["Río Gallegos", "El Calafate", "Puerto Deseado", "Caleta Olivia", "Pico Truncado", "Las Heras", "28 de Noviembre", "Perito Moreno", "Gobernador Gregores", "Los Antiguos"],
    "Santa Fe": ["Rosario", "Santa Fe", "Venado Tuerto", "Rafaela", "Reconquista"],
    "Santiago del Estero": ["Santiago del Estero", "La Banda", "Termas de Río Hondo", "Fernández", "Añatuya", "Frías", "Loreto", "Suncho Corral", "Clodomira", "Quimilí"],
    "Tierra del Fuego": ["Ushuaia", "Río Grande", "Tolhuin"],
    "Tucumán": ["San Miguel de Tucumán", "Yerba Buena", "Tafí Viejo", "Famaillá", "Banda del Río Salí", "Aguilares", "Concepción", "Lules", "Monteros", "Alberdi"]
  };

  // Get the selected province
  var province = document.getElementById("filtro_provinces").value;
  // Get the cities dropdown element
  var cities = document.getElementById("filtro_cities");
  // Remove any existing options
  cities.innerHTML = "";

  // Add a default placeholder option
  var defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  defaultOption.text = "-";
  cities.add(defaultOption);

  // Add the top 5 cities for the selected province
  if (province in topCitiesByProvince) {
    var topCities = topCitiesByProvince[province];
    for (var i = 0; i < topCities.length; i++) {
        var option = document.createElement("option");
        option.value = topCities[i];
        option.text = topCities[i];
        cities.add(option);
    }
  }
}




var noise_description = document.getElementById("box-noise");
noise_description.addEventListener("click", noise_desc);
function noise_desc() 
{
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
}
const elementToChange = document.getElementById("box-noise");
// Add an event listener to change the cursor on hover
elementToChange.addEventListener("mouseover", () => {
  elementToChange.classList.add("hand-pointer");
});
// Remove the "hand-pointer" class when the mouse leaves the element
elementToChange.addEventListener("mouseout", () => {
  elementToChange.classList.remove("hand-pointer");
});



var wifi_description = document.getElementById("box-wifi");
wifi_description.addEventListener("click", wifi_desc);
function wifi_desc() 
{
    var modal = document.getElementById("myModal2");
    modal.style.display = "block";
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
}
const elementToChange2 = document.getElementById("box-wifi");
// Add an event listener to change the cursor on hover
elementToChange2.addEventListener("mouseover", () => {
  elementToChange2.classList.add("hand-pointer");
});
// Remove the "hand-pointer" class when the mouse leaves the element
elementToChange2.addEventListener("mouseout", () => {
  elementToChange2.classList.remove("hand-pointer");
});



var info_description = document.getElementById("info_wifi");
info_description.addEventListener("click", info_desc);
function info_desc() 
{
    var modal = document.getElementById("info_modal");
    modal.style.display = "block";
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
}
const elementToChange3 = document.getElementById("info_wifi");
// Add an event listener to change the cursor on hover
elementToChange3.addEventListener("mouseover", () => {
  elementToChange3.style.cursor = "help";
});

// Remove the "help" pointer when the mouse leaves the element
elementToChange3.addEventListener("mouseout", () => {
  elementToChange3.style.cursor = "default";
});




var info_description2 = document.getElementById("info_ruido");
info_description2.addEventListener("click", info_desc2);
function info_desc2() 
{
    var modal = document.getElementById("info_modal2");
    modal.style.display = "block";
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
}
const elementToChange4 = document.getElementById("info_ruido");
// Add an event listener to change the cursor on hover
elementToChange4.addEventListener("mouseover", () => {
  elementToChange4.style.cursor = "help";
});

// Remove the "help" pointer when the mouse leaves the element
elementToChange4.addEventListener("mouseout", () => {
  elementToChange4.style.cursor = "default";
});










function maps_search(placeName) {
  // Replace spaces in the placeName with '+' signs
  const query = placeName.replace(/\s+/g, '+');
  // Construct the Google Maps search URL
  const googleMapsURL = `https://www.google.com/maps/search/?api=1&query=${query}`;
  // Open a new window or tab with the Google Maps URL
  window.open(googleMapsURL, '_blank');
  placeName = "";
}


function toggleHours(element) {
  const row = element.parentElement.parentElement;
  const hs = row.querySelector('#hs');
  const tdElement = element.closest('td'); // Find the closest <td> element
  // Get all elements with the same IDs ('address' and 'hs') in the document
  const allElements = document.querySelectorAll('#address, #hs, #phone');
  // Loop through all address and hs elements and hide them except the ones in the current row
  allElements.forEach(function (element) {
    if (element !== hs) {
      element.style.display = 'none';
    }
  });
  if (hs.style.display === 'none') {
    hs.style.display = 'block';
    // Set the width to 50% when showing the hidden content
    tdElement.style.width = '25%';
  } else {
    hs.style.display = 'none';
    // Reset the width when hiding the content
    tdElement.style.width = '';
  }
}



function toggleMap(element) {
  const row = element.parentElement.parentElement;
  const hs = row.querySelector('#address');
  const tdElement = element.closest('td'); // Find the closest <td> element
  // Get all elements with the same IDs ('address' and 'hs') in the document
  const allElements = document.querySelectorAll('#address, #hs, #phone');
  // Loop through all address and hs elements and hide them except the ones in the current row
  allElements.forEach(function (element) {
    if (element !== hs) {
      element.style.display = 'none';
    }
  });
  if (hs.style.display === 'none') {
    hs.style.display = 'block';
    // Set the width to 50% when showing the hidden content
    tdElement.style.width = '20%';
  } else {
    hs.style.display = 'none';
    // Reset the width when hiding the content
    tdElement.style.width = '';
  }
}


function togglePhone(element) {
  const row = element.parentElement.parentElement;
  const hs = row.querySelector('#phone');
  const tdElement = element.closest('td'); // Find the closest <td> element
  // Get all elements with the same IDs ('address' and 'hs') in the document
  const allElements = document.querySelectorAll('#address, #hs, #phone');
  // Loop through all address and hs elements and hide them except the ones in the current row
  allElements.forEach(function (element) {
    if (element !== hs) {
      element.style.display = 'none';
    }
  });
  if (hs.style.display === 'none') {
    hs.style.display = 'block';
    // Set the width to 50% when showing the hidden content
    tdElement.style.width = '20%';
  } else {
    hs.style.display = 'none';
    // Reset the width when hiding the content
    tdElement.style.width = '';
  }
}




document.getElementById("mensajeForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

  // Obtener los valores de los campos
  var nombre = document.getElementById("usuario").value;
  var texto = document.getElementById("texto").value;

  // Puedes realizar acciones con los valores aquí, como enviarlos a un servidor o mostrarlos en la página
  alert("Mensaje enviado correctamente");
  // console.log("Nombre: " + nombre + "\nMensaje: " + texto);

  const token = '6086969047:AAG9RlsqrusNHjqBMmR2Cp4W1WikjksEfQU'; // Replace with your Telegram bot token
  const chatId = '-1001821689872'; // Replace with the chat ID of the user or group you want to send the message to
  const message = (nombre) + ' - ' + (texto) ; // Replace with the message you want to send
  // console.log(message)
  fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${message}`)
              .then(response => {
                if (response.ok) {
                  console.log('Message sent successfully!');
                } else {
                  console.error('Failed to send message.');
                }
              })
              .catch(error => {
                console.error('Error sending message:', error);
              });


  // Limpia los campos después de enviar el formulario
  document.getElementById("nombre").value = "";
  document.getElementById("texto").value = "";
});




// const userLanguageCode = navigator.language;
// const languageNames = new Intl.DisplayNames([navigator.language], { type: 'language' });
// const userLanguageName = languageNames.of(userLanguageCode);

// console.log(`The user's preferred language is: ${userLanguageName} (${userLanguageCode})`);




function makePhoneCall(phoneNumber) {
  // Use the tel: URI scheme to trigger a phone call
  window.location.href = "tel:" + phoneNumber;
}

