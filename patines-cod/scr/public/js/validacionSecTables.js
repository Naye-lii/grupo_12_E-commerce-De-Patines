window.addEventListener("load", function(){

    // Validación para añadir marca

    let formBrand = document.querySelector("form.brandCreate-form");
    
    formBrand.addEventListener("submit", function(e){
        let errores = [];

        let campoMarca = document.querySelector("#brand");

        if (campoMarca.value.length == 0){
            errores.push("El campo de marca deberá estar completo");
        }
        else if (campoMarca.value.length < 2){
            errores.push("El campo deberá tener 2 o más carácteres");
        }
        if (errores.length > 0){
            e.preventDefault();
            let ulErrores = document.querySelector('div.alert-sec-tableBrand')
            for(let i = 0; i < errores.length; i++){
            ulErrores.innerHTML += `<ul><i class="fas fa-times-circle"></i>` + " " + errores[i] + "</ul>"
            }
        } else{

        }
});

// Validación para añadir categoría

let formCategory = document.querySelector("form.categoryCreate-form");
    
    formCategory.addEventListener("submit", function(e){

        let errores = [];

        let campoCategoria = document.querySelector("#category");

        if (campoCategoria.value.length == 0){
            errores.push("El campo de categoría deberá estar completo")
        }
        else if (campoCategoria.value.length < 2){
            errores.push("El campo deberá tener 2 o más carácteres")
        }
        if (errores.length > 0){
            e.preventDefault();
            let ulErrores = document.querySelector('div.alert-sec-tableCategory')
            for(let i = 0; i < errores.length; i++){
            ulErrores.innerHTML += `<ul><i class="fas fa-times-circle"></i>` + " " + errores[i] + "</ul>"
            }
        }
});

// Validación para añadir color

let formColor = document.querySelector("form.categoryColor-form");
    
    formColor.addEventListener("submit", function(e){

        let errores = [];

        let campoColor = document.querySelector("#color");

        if (campoColor.value.length == 0){
            errores.push("El campo de color deberá estar completo")
        }
        else if (campoColor.value.length < 2){
            errores.push("El campo deberá tener 2 o más carácteres")
        }
        if (errores.length > 0){
            e.preventDefault();
            let ulErrores = document.querySelector('div.alert-sec-tableColor')
            for(let i = 0; i < errores.length; i++){
            ulErrores.innerHTML += `<ul><i class="fas fa-times-circle"></i>` + " " + errores[i] + "</ul>"
            }
        }
});

})

