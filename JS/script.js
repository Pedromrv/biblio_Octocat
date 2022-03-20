let apiKey = "******"; // API KEY
let fecha = "2016-03-13";
let divID = "col4";

function pushToHTML(datos, tipo) {
let contenido;

// Column calc
if (divID === "col4") {
    divID = "col1";
} else if (divID === "col1") {
    divID = "col2";
} else if (divID === "col2") {
    divID = "col3";
} else if (divID === "col3") {
    divID = "col4";
}

// Modificando el HTML
if (tipo === true) {
    // Create card
    contenido = '<div class="panel panel-default"><div class="panel-body">';
    contenido += '<p><strong> #' + datos.rank + ' ' + datos.title + '</strong><p>';

    // Verifing book card
    if (datos.book_image) {
        contenido += '<img class="caratula" src="' + datos.book_image + '">';
    }

    contenido += '<p><i>Semanas en la lista: ' + datos.weeks_on_list + '</i></p>';
    contenido += '<p>' + datos.description + '</p>';
    contenido += '<a href="' + datos.amazon_product_url + '" target="_blank" class="btn btn-warning">Comprar en Amazon <span class="glyphicon glyphicon-play-circle" aria-hidden="true"></span></a>';
    contenido += '</div></div>';

    // Updating html
    document.getElementById(divID).innerHTML += contenido;

} else {

    // Create card structure
    contenido = '<div class="panel panel-default"><div class="panel-body" data-encoded="' + datos.list_name_encoded + '">';
    contenido += '<h4>' + datos.display_name + '</h4><hr>';
    contenido += '<ul><li>El más Antiguo: ' + datos.oldest_published_date + '</li>';
    contenido += '<li>Nuevo: ' + datos.newest_published_date + '</li>';
    contenido += '<li>Frec. Actualización: ' + capitalizeIt(datos.updated) + '</li></ul>';
    contenido += '<a class="btn btn-default">Info <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></a>';
    contenido += '</div></div>';

    // Updating HTML
    document.getElementById(divID).innerHTML += contenido;

    }
}

// Convierte WEEKLY en Weekly
function capitalizeIt(texto) {
return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

// Reset HTML and askAPI
function returnIndex() {
document.getElementById("col1").innerHTML = "";
document.getElementById("col2").innerHTML = "";
document.getElementById("col3").innerHTML = "";
document.getElementById("col4").innerHTML = "";
askAPI("http://api.nytimes.com/svc/books/v3/lists/names.json?api-key=" + apiKey, false);


}

// Api management
function askAPI(url, tema) {
fetch(url)
.then(function(response){
    document.getElementById("cargando").style.display = 'none';
    return response.json();
})
.then(function(datos){
    if (tema) {
        if (datos.results.length !== null && datos.results.length !== 0) {
            // Restore html
            document.getElementById("col1").innerHTML = "";
            document.getElementById("col2").innerHTML = "";
            document.getElementById("col3").innerHTML = "";
            document.getElementById("col4").innerHTML = "";

            // Style                   
            document.getElementById("back-boton").style.display = 'block';
            document.getElementById("titulo_lista").innerHTML = datos.results.display_name;

            // Update html
            for (var i = 0; i < datos.results.books.length; i++) {
                pushToHTML(datos.results.books[i], true);
            }

            // Counter reseting
            divID = "col4";
        }
    } else {
        // Style
        document.getElementById("titulo_lista").innerHTML = '';
        document.getElementById("back-boton").style.display = 'none';

        // Update html
        for (var i = 0; i < datos.results.length; i++) {
            pushToHTML(datos.results[i]);
        }

        // Event
        document.getElementById("row-contenido").addEventListener('click', function(evento) {
            var elemento = evento.target || evento.srcElement;
            var lista = elemento.parentNode.getAttribute("data-encoded");
            askAPI("http://api.nytimes.com/svc/books/v3/lists/" + fecha + "/" + lista + ".json?api-key=" + apiKey, true);
        });

        // Counter reseting
        divID = "col4";
    }

})
.catch(function(error){
            // Estilos
        document.getElementById("cargando").style.display = 'none';
        document.getElementById("error-ajax").style.display = 'block';
        document.getElementById("row-contenido").innerHTML = '<img src="https://cdn0.iconfinder.com/data/icons/call-center-and-service/32/36-404_error-512.png">';
        console.log("ERROR!: ",error);
})
}
            

// Running Api
askAPI("http://api.nytimes.com/svc/books/v3/lists/names.json?api-key=" + apiKey, false);

// Event
document.getElementById("back-boton").addEventListener('click', returnIndex);