// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyCpOsFAE4YRUxXEQaXUwbkZ4-S-MBpMVdc",
    authDomain: "proyectoprueba-a2c71.firebaseapp.com",
    projectId: "proyectoprueba-a2c71",
  });
  
  var db = firebase.firestore();


  //Add clients info (post)
  function guardar(){
    var names = document.getElementById('names').value;
    var date = document.getElementById('date').value;
    var civilStatus = document.getElementById('cStatus').value;
    var status = document.getElementById('active').value
    db.collection("users").add({
        Nombre: names,
        Nacimiento: date,
        EstadoCivil: civilStatus,
        EstadoCliente: status,

    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById('names').value = '';
        document.getElementById('date').value = '';
        document.getElementById('cStatus').value = '';
        document.getElementById('active').value = '';

    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });

  }

  //Read Values (Get)

  var clients = document.getElementById('clients')
  db.collection("users").onSnapshot((querySnapshot) => {
    clients.innerHTML = ''; 
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        clients.innerHTML += ` 
        <tr>
        <th scope="row">${doc.id}</th>
        <td>${doc.data().Nombre}</td>
        <td>${doc.data().Nacimiento}</td>
        <td>${doc.data().EstadoCivil}</td>
        <td>${doc.data().EstadoCliente}</td>
        <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().Nombre}','${doc.data().Nacimiento}','${doc.data().EstadoCivil}','${doc.data().EstadoCliente}')">Editar</button></td>
        </tr>
        `
    });
});


// delete Values

function eliminar(id){
    db.collection("users").doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}


//Edit Values
function editar(id , nombre , fecha , estadoC , actividad ){

    document.getElementById('names').value = nombre;
    document.getElementById('date').value = fecha;
    document.getElementById('cStatus').value = estadoC;
    document.getElementById('active').value = actividad;
    var boton = document.getElementById('button');
    boton.innerHTML = 'Editar';


    boton.onclick = function(){
        var fireEdit = db.collection("users").doc(id);
        // Set the "capital" field of the city 'DC'

        var nombre = document.getElementById('names').value;
        var fecha = document.getElementById('date').value;
        var estadoC = document.getElementById('cStatus').value;
        var actividad = document.getElementById('active').value;

        return fireEdit.update({
            Nombre: nombre,
            Nacimiento: fecha,
            EstadoCivil: estadoC,
            EstadoCliente: actividad,
        })
        .then(() => {
            console.log("Document successfully updated!");
            boton.innerHTML = 'Guardar';
            document.getElementById('names').value = '';
            document.getElementById('date').value = '';
            document.getElementById('cStatus').value = '';
            document.getElementById('active').value = '';
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }
}





