
//array para guardar los mensajes de error
function Validacion() {
    this.invalidos = [];
    this.comprobacionesDeValidez = [];
}

Validacion.prototype = {
    agregarInavalido: function (mensaje) {
        this.invalidos.push(mensaje);
    },
    devolverInvalido: function() {
        return this.invalidos.join('. \n');
    },
    comprobarValidez: function(input) {

        //Iteramos sombre todas las condiciones del input para el correo.
        for (var i = 0; i < comprobacionesDeValidez.length; i++) {

            var noValido = comprobacionesDeValidez[i].noValido(input);

            if (noValido) {
                //Si no valido es true añadimos los mensajes de invalidez al array y marcamos el elemento con la clase invalid.
                this.agregarInavalido(comprobacionesDeValidez[i].mensajesInvalidez);
                comprobacionesDeValidez[i].elemento.classList.add('invalid');
                comprobacionesDeValidez[i].elemento.classList.remove('valid');
            } else {
                comprobacionesDeValidez[i].elemento.classList.remove('invalid');
                comprobacionesDeValidez[i].elemento.classList.add('valid');
            }
        }
    }
};

//array para todos los checks  del correo.
var comprobacionesDeValidez = [
    {
        noValido: function (input) {
            //si la condicion se cumple input devuelve true.
            return input.value.length < 3;
        },
        mensajesInvalidez: 'Debe ser como minimo de 3 carácteres',
        elemento: document.querySelector('label[for="correo"] li:nth-child(1)')
    },
    {
        noValido: function (input) {
            var caracteresNoPermitidos = input.value.match(/[^a-zA-Z0-9]/g);
            //Si se cumple caracteresPermitidos devuelve True si no False.
            return caracteresNoPermitidos ? true : false;
        },
        mensajesInvalidez: 'Debe ser como minimo de 3 carácteres',
        elemento: document.querySelector('label[for="correo"] li:nth-child(2)')
    }
]

//Recuperamos la información de los inputs y le asignamos la propiedad de validación.
var correoInput = document.getElementById('correo');
var numeroUnoInput = document.getElementById('numeroUno');
var numeroDosInput = document.getElementById('numeroDos');

correoInput.Validacion = new Validacion();
correoInput.Validacion.comprobacionesDeValidez = comprobacionesDeValidez;

numeroUnoInput.Validacion = new Validacion();
numeroUnoInput.Validacion.comprobacionesDeValidez = comprobacionesDeValidez;

numeroDosInput.Validacion = new Validacion();
numeroDosInput.Validacion.comprobacionesDeValidez = comprobacionesDeValidez;


//Se recuperan todos los inputs del formulario
var respuestasDelFormulario = document.querySelectorAll('input:not(type="submit")');
//Se itera sobre ellos y a cada uno se le añade un "listener" y se ejecuta la validación.
for  (var i = 0; i < respuestasDelFormulario.length; i++) {
    respuestasDelFormulario[i].addEventListener('keyup', function () {
        this.Validacion.comprobarValidez(this);
    })
}