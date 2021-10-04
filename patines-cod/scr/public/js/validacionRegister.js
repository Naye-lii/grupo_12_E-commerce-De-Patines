window.addEventListener("load", function(){
let registerForm =  document.querySelector("form.login-form");

registerForm.addEventListener("submit", function(e){

    let errores = [];

    let campoNombre = document.querySelector('#nombre');
    let campoApellido = document.querySelector('#apellido');
    let campoEmail =  document.querySelector('#email');
    let campoPassword =  document.querySelector('#password');

    if (campoNombre.value.length == 0){
        errores.push("El campo de nombre deberá estar completo");
    } else if (campoNombre.value.length < 2){
        errores.push("El campo de nombre deberá al menos 2 carácteres");
    }
    if(campoApellido.value.length == 0){
        errores.push("El campo de apellido deberá estar completo");
    } else if (campoApellido.value.length < 2){
        errores.push("El campo de apellido deberá al menos 2 carácteres");  
    }
    if(campoEmail.value.length == 0){
        errores.push("El campo de e-mail deberá estar completo");
    } 
    if(campoPassword.value.length == 0){
        errores.push("El campo de contraseña deberá estar completo");
    }
        else if (campoPassword.value.length < 8){
            errores.push("El campo de contraseña deberá al menos 8 carácteres");  
        }
    if (errores.length > 0){
        e.preventDefault();
        let ulErrores = document.querySelector('div.alert-sec-tableColor li')
        ulErrores.innerHTML += `<h3 class="alert">`+ "Listado de errores:" + `</h3>` 
        for(let i = 0; i < errores.length; i++){
        ulErrores.innerHTML += `<ul class="alert"><i class="fas fa-times-circle"></i>` + " " + errores[i] + "</ul>"
        }
    }
})
})