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

// Manejo de errores
request.onerror = event => {
    // Sólo mostramos el error en consola
    console.log('DB error:', event.target.error)
};

// Insertar elementos en la base de datos
request.onsuccess = event => {

    // Localizamos el request de inserción y lo almacenamos en una variable
    const db = event.target.result;

    // Elemento que queremos añadir a la base de datos
    const heroesData = [
        {id: '1111', heroe: 'Spiderman', mensaje: 'Aquí su amigo Spiderman'},
        {id: '2222', heroe: 'Ironman', mensaje: 'Aquí en mi nuevo Mark 50'}
    ];

    // Creamos una transacción para poder insertar la lista en el espacio heroes
    const heroesTransaction = db.transaction('heroes', 'readwrite');

    // esta transacción podría fallar, por lo que manejamos el error
    heroesTransaction.onerror = event => {
        // mostramos en pantalla el error de guardado
        console.log('Error guardando:', event.target.error)
    };

    // En caso de que todo esté correcto, informamos sobre el éxito de la transacción
    heroesTransaction.oncomplete = event => {
        console.log('Transacción hecha', event);
    };

    // Esta variable guarda la ubicación donde se van a guardar los datos
    const heroesStore = heroesTransaction.objectStore('heroes');

    // Barremos nuestro registro para incorporar los elementos de uno en uno
    for (let heroe of heroesData) {
        heroesStore.add(heroe);
    };

    // En caso de que los elementos se hayan añadido a la base de datos correctamente
    heroesStore.onsuccess = event => {
        console.log('Nuevo elemento agregado a a BD');
    };
};