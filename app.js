// indexedDB: Reforzamiento
/*
Vamos a crear manualmente la base de datos local. Es muy poco intuitivo pero es necesario
conocerlo. Más adelante crearemos la base de datos con librerías de teceros

Es poco intuitivo porque los request y los listeners los debemos manejar manualmente,
lo cual es muy tedioso
*/

// Creamos una variable que almacena la base de datos
const request = window.indexedDB.open('mi-database', 1);

// Se actualiza la base de datos cuando se crea por primera vez o se sube la versión
// Se recomienda subir de versión sólo cuando sea absolutamente necesario
request.onupgradeneeded = event => {

    console.log('Actualización de la BD');

    // Localizamos el request de actualización y lo almacenamos en una variable
    const db = event.target.result;

    // Debemos crear una llave para manejar los registros en la base de datos
    db.createObjectStore('heroes', {
        keyPath: 'id'
    });

};

