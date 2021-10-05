window.addEventListener("load", function(){
// Validación para editar categoría

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

})