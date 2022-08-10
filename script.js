/*---------------------------------------------------DESARROLLADO POR YAZMIN ILAMA CASTRO PARA PROYECTOS DE ORACLE------------------------------------------------------------------------------------------*/
/***********************************************************************************************************************************************************************************************************/

var botonIniciar = document.querySelector("#start");
var btnNuevo = document.querySelector("#nuevo");
var palabra ;
var words = ['martillo','playa','Luna','Programador','oracle','raqueta','rayo','radar','murcielago','Oceano','dos','agudo','hola','españa',
'voleibol','reloj','elasticidad','escenario','isosceles','ingenieria','hormiga','yiguirro','xaxofon','zopilote','cine','kayak','kiwi',
'ketchup','karate','uña','leña','yate','yogur','araña','vegetales','whisky','Taiwan','waffle','web','quetzal','ukelele','uva','ola','ovni',
'tucan','tortilla','toyota','tractor','ruleta','flor','martillo','adaptacion','playa','fila','bmw','mazda','tucson','lamborghini','jeep','paris','pikachu',
'rompecabezas','gym','helicoptero','luxemburgo','meñique'];//almacenar palabras
var cant_Errores = 0;
var cant_Aciertos = 0;
var btn_Letras = document.querySelectorAll(".letras");
var source; //cambiar de imagenes
var imagen = document.getElementById('imagen');
var resultado = document.querySelector("#resultado");
var cantidadPalabras ;
var valor_Azar ;

//funcion para tomar palabras aleatorias
function palabrasAleatoria( num_min, num_max){
    var amplitud_palabras = num_max - num_min;
    valor_Azar = Math.floor(Math.random()*amplitud_palabras) + num_min;
    return valor_Azar;
}
//iniciar juego
function iniciar (event){
    imagen.src = 'imagenes/img0.png';
    botonIniciar.disabled = false;
    cant_Aciertos=0;
    cant_Errores=0;
    var parrafo = document.querySelector("#palabraAdividar");
    parrafo.innerHTML = " ";
    cantidadPalabras = words.length;
    valor_Azar = palabrasAleatoria(0,cantidadPalabras);
    palabra = words[valor_Azar].toUpperCase();
    var cant_Espacios = palabra.length;
    for(var i = 0; i<btn_Letras.length; i++){
        btn_Letras[i].disabled = false;
        botonIniciar.disabled = true;
        btnNuevo.disabled = false;
        btnNuevaPalabra.disabled=false;
    }
    for (let i = 0; i <cant_Espacios; i++) {
        var span = document.createElement('span');
        parrafo.appendChild(span);
    }
}
//selecionar letras
for(var i = 0; i<btn_Letras.length; i++){
    btn_Letras[i].addEventListener("click",click_letras);
    
}
function click_letras(event){
    var boton = event.target; //cual de todas las letras llamo
    boton.disabled = true;
    var letra = boton.innerHTML.toUpperCase();
    var acerto = false;
    var span = document.querySelectorAll("#palabraAdividar span");
    for (let i = 0 ; i< palabra.length; i++) {
        if (letra == palabra[i]) {
            span[i].innerHTML = letra;
            cant_Aciertos++; 
            acerto = true;
        }
        
    }
    //cambio de imagenes
    if (acerto == false) {
        cant_Errores ++;
        source = `imagenes/img${cant_Errores}.png`;
        imagen = document.getElementById('imagen');
        imagen.src = source;
    }
    if(cant_Errores == 7 ){
        Swal.fire({
            icon: 'error',
            title: 'Game Over!',
            text: 'La palabra era: '+palabra,
        
        })
        game_over();
    }else if(cant_Aciertos == palabra.length){
        Swal.fire(
            'Good job!',
            'Word guessed!',
            'success'
        );
        game_over();
    }
    console.log("la letra "+ letra+  " en la palabra " +palabra+" existe "+acerto);
}
//funcion para saber cuando pierde
function  game_over(){
    for(var i = 0; i<btn_Letras.length; i++){
        btn_Letras[i].disabled = true;
    }
    botonIniciar.disabled = false;
    btnNuevo.disabled = true;
}
botonIniciar.addEventListener("click",iniciar); //boton para iniciar e juego

//Boton para cambiar de palabra 
btnNuevo.addEventListener("click",function(){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, change word!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Successful!',
                'You have a new word.',
                'success'
            )
            iniciar();
        }
    })
});
// variables y funciones  para popUp 
//validar el ingreso de solo letras y no numeros
function validarLetras(e){
    let key = e.keyCode || e.which;
    let teclado = String.fromCharCode(key).toLowerCase();
    let caracteres = "abcdefghijklnmpoqrstvwxyzñ";
    let caracterEspecial = "8-37-38-46-164";
    let tecladoEspecial = false;
    for(let i in caracterEspecial){
        if(key==caracterEspecial[i]){
            tecladoEspecial = true;
            break;
        }
    }
    if(caracteres.indexOf(teclado)==-1 && !tecladoEspecial){
        return false;
    }
}
//limite de caracteres por palabras
function numeroCaracter(numValido){
    if(numValido.length >10){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Character maximum 10!',
        })
        return false;
    }else{
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Added word',
            showConfirmButton: false,
            timer: 1500
        })
        return true;
    }
}
//Boton para agregar una nueva palabra
var btnNuevaPalabra = document.querySelector("#nuevaPalabra"),
    overlay = document.querySelector(".overlay"),
    popUp = document.querySelector(".popUp"),
    btnCerrar = document.querySelector(".btn-Cerrar-popUp"),
    btnGuardar = document.querySelector("#nuevas");

// Activar la ventana modal
btnNuevaPalabra.addEventListener("click",function(){
    overlay.classList.add('active');
    popUp.classList.add('active');
});
//Guardar palabras
btnGuardar.addEventListener("click",function(e){
    var nueva = document.querySelector(".nuevaPalabras").value;
    var form = document.querySelector("#formulario");
    if(nueva.length == 0 || /^\s+$/.test(nueva)){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Do not leave empty flieds!',
        })
    }else if(numeroCaracter(nueva) == false){
        form.reset();
    }else{
        words.push(nueva);
        form.reset();
        iniciar();
    }
});
//Cerrar venta modal
btnCerrar.addEventListener("click",function(){
    overlay.classList.remove('active');
    popUp.classList.remove('active');

});
//iniciar el fin de juego
game_over();
