window.addEventListener("load", function(){
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