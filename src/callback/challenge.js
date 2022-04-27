let XMLHttprequestRequest = require('xmlhttprequest').XMLHttpRequest;//se invoca de nuevio XMLHttpRequest para llamar instancias mas adelante.
let API = 'https://rickandmortyapi.com/api/character/';//api que estamos llamando

function fetchData(url_api, callback){
    let xhttp = new XMLHttprequestRequest(); //se llama la instancia. Eso es creado por Microsoft. con el metodo new llamamos la instancia.
    xhttp.open('GET', url_api, true);//llamado a la url para abrirla con .open. donde 'GET' es el llamado que trae la informacion, llama la url, el tercer valor indica que se maneja de forma asincrona. Esta es una buena practica pero no es estrictamente necesario. 
    xhttp.onreadystatechange = function(event){//Aqui escucho este llamado. Con onreadystatechange se "si este cambio sucede", para proceder a la funcion que tendra, en este caso, un parametro del evento en el navegador.
     if(xhttp.readyState === 4){ //busca que el estado sea 4, lo cual identifica que esta listo para la siguiente etapa
         if(xhttp.status === 200){ //Aqui busca que sea 200 para mostrar que se ha ejecutado correctamente la peticion
             callback(null, JSON.parse(xhttp.responseText))//null es el error que podemos esperar y despues biene el JSON porque necesitamos una llamada en texto y lo transformamos para poder usarlo. 
         } else {//else en caso de que no tengamos el resultado esperado. Es una buena practica
             const error = new Error('Error ' + url_api)
             return callback(error,null)//Como es un call back, primer parametro es el error, y despues la solucion, pero al no tener solucion al ser este el final del proceso con el error, viene el valor null.
         }
        }   
    }
    xhttp.send();//aqui se envia la solicitud. 
}

//Ahora vienen los llamados a nuestras funciones y callbacks
fetchData(API, function(error1, data1){//en esta funcion recibe primero el error y despues los datos resultantes por que es un callback
    if (error1) return console.error(error1);//validacion para manejar errores. Si hay error va a retornarlo
    fetchData(API + data1.results[0].id, function (error2, data2){//Sin funcionma, llamamos fetchData de nuevo, con la primera respuesta, la cual sera data1, y de este obtengo su ID. Despues de esto sigo con otro callback que me traera el siguiente dato.
        if (error2) return console.error(error2);//atrapa el error
        fetchData(data2.origin.url, function (error3, data3){//viene nuestro siguiente dato.
            if (error3) return console.error(error3);//atrapamos posibles errores.
            console.log(data1.info.count);//imprimos resultado de las peticiones. 
            console.log(data2.name);
            console.log(data3.dimension);
        });
    });
});


