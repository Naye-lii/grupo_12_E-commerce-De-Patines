window.addEventListener("load", function(){
let btnSumbit = qs('#submit-btn-register');
let inputNombre = qs('#nombre');
let registerForm = qs("form.register-form");

btnSumbit.addEventListener("click", function(e) {
    e.preventDefault();
    let errores = [];

    if(inputNombre.value.length < 1){
       errores.name = 'Este campo debe estar completo';
       console.log('errores front');
    } else {
    registerForm.submit();
    }
});
})