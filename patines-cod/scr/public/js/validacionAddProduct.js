window.addEventListener("load", function(){

    let nombre = document.querySelector("input#productName");

    nombre.addEventListener("blur", e => {
        if(nombre.value == ""){
            alert("Debe llenar el campo Nombre del producto");
        }else if(nombre.value.length < 5 ){
            alert("El campo Nombre de producto debe tener almenos 5 caracteres");
        }
    }) 

    let precio = document.querySelector("input#precio");

    precio.addEventListener("blur", e => {
        if(precio.value == ""){
            alert("Debe llenar el campo Precio");
        }
    })                      
    
    let cantidad = document.querySelector("imput#cantidad");

    cantidad.addEventListener("blur", (e) => {
        if (cantidad.value == ""){
            alert("Debe llenar el campo Cantidad disponible")
        }
    })
    
    
    
})