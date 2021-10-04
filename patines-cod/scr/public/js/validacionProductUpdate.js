window.addEventListener("load", function(){

    let precio = document.querySelectorAll("input#precio")[0];

    //solo escribir numeros en precio
    precio.addEventListener("keypress", function(e){
        console.log("Precioooo")
        if ( isNaN( this.value + String.fromCharCode(e.charCode) )) {
            console.log("not a number")
            e.preventDefault();
            return false
        }
    });

    precio.addEventListener("paste", function(e){
        console.log("kesesto?")
        e.preventDefault();
    });

    //solo permitir escribir numeros en cantidad
    let cantidad = document.querySelectorAll(".login-data-cantidad");

    var array = [...cantidad]; // converts NodeList to Array
    array.forEach(cantidad => {

        cantidad.addEventListener("keypress", function(e){
            console.log("Cantidaaaaad")
            if ( isNaN( this.value + String.fromCharCode(e.charCode) )) {
                console.log("not a number")
                e.preventDefault();
                return false
            }
        });
    
        cantidad.addEventListener("paste", function(e){
            console.log("kesesto?")
            e.preventDefault();
        });

    });

    let formulario = document.querySelector("form.login-form");

    //validaciones al enviar el formulario
    formulario.addEventListener("submit", function(e){

        let errores = [];

        let nombre = document.querySelector("input#productName");
        let precio = document.querySelector("input#precio");
        let descripcion = document.querySelector("#des");

        if(nombre.value==""){
            errores.push("Se debe ingresar el nombre del producto")
        } else if (nombre.value.length <5){
            errores.push("El nombre debe tener al menos 5 caracteres")
        };

        if(precio.value==""){
            errores.push("Se debe ingresar el precio")
        }

        if(descripcion.value.length <20){
            errores.push("Se debe ingresar una descripción de al menos 20 caracteres")
        }

        if(errores.length >0){
            e.preventDefault();

            let icono = "fas fa-times-circle";
            let ulErrores = document.querySelector("div.alert");
            for(let i=0; i<errores.length; i++){
                ulErrores.innerHTML += "<i class=" + icono + "></i>" + errores[i]
            }
        }
        
    });
    
})