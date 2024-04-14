var btn_cargar = document.getElementById('btn_cargar_usuarios'),
    error_box = document.getElementById('error_box'),
    tabla = document.getElementById('tabla'),
    loader = document.getElementById('loader');

var usuario_nombre,
    usuario_edad,
    usuario_pais,
    usuario_correo;

function cargarUsuarios(){

        // Crear el encabezado de la tabla usando template literals
        var encabezado = `
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>País</th>
            <th>Correo</th>
        </tr>
    `;
    tabla.innerHTML = encabezado;

    var peticion = new XMLHttpRequest();
    peticion.open('GET','php/leer-datos.php');

    loader.classList.add('active');


    peticion.onload = function(){
      var datos = JSON.parse(peticion.responseText);
      
      if(datos.error){
        error_box.classList.add('active');
      }else{
        for(var i = 0; i< datos.length; i++){
            var elemento = document.createElement('tr');
            elemento.innerHTML += ("<td>" + datos[i].id + "</td>");
            elemento.innerHTML += ("<td>" + datos[i].nombre + "</td>");
            elemento.innerHTML += ("<td>" + datos[i].edad + "</td>");
            elemento.innerHTML += ("<td>" + datos[i].pais + "</td>");
            elemento.innerHTML += ("<td>" + datos[i].correo + "</td>");
            tabla.appendChild(elemento);
        }
      }
    }

    peticion.onreadystatechange = function(){
        if(peticion.readyState == 4 && peticion.status == 200){
            loader.classList.remove('active');
        }
    }

    peticion.send();
}

function agregarUsuarios(e){
    e.preventDefault();

    var peticion = new XMLHttpRequest();
    peticion.open('POST', 'php/insertar-usuario.php');

    var usuario_nombre = formulario.nombre.value.trim();
    var usuario_edad = parseInt(formulario.edad.value.trim());
    var usuario_pais = formulario.pais.value.trim();
    var usuario_correo = formulario.correo.value.trim();

    if(formulario_valido()){

        error_box.classList.remove('active');
        var parametros = 'nombre='+ usuario_nombre + '&edad='+ usuario_edad + '&pais='+ usuario_pais+ '&correo='+usuario_correo;

        peticion.setRequestHeader("Content-type","application/x-www-form-urlencoded");

        loader.classList.add('active');

        peticion.onload = function(){
            cargarUsuarios();
            formulario.nombre.value = '';
            formulario.edad.value = '';
            formulario.pais.value = '';
            formulario.correo.value = '';
        }

        peticion.onreadystatechange = function(){
            if(peticion.readyState == 4 && peticion.status == 200){
                loader.classList.remove('active');
            }
        }

        peticion.send(parametros);
    }else{
        error_box.classList.add('active');
        error_box.innerHTML = 'Por favor completa el formulario correctamente';
    }

}

btn_cargar.addEventListener('click', function(){
    cargarUsuarios();
});

formulario.addEventListener('submit', function(e){
    agregarUsuarios(e);
});

function formulario_valido(){
    if(usuario_nombre == ''){
        return false;
    }else if(usuario_pais = ''){
        return false;
    }else if(usuario_correo == ''){
        return false;
    }
    return true;
}