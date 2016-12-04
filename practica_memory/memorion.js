
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

        //Iteramos sombre todas las condiciones de los input.
        for (var i = 0; i < this.comprobacionesDeValidez.length; i++) {

            var noValido = this.comprobacionesDeValidez[i].noValido(input);
            if (noValido) {
                //Si no valido es true añadimos los mensajes de invalidez al array y marcamos el elemento con la clase invalid.
                this.agregarInavalido(this.comprobacionesDeValidez[i].mensajesInvalidez);
                this.comprobacionesDeValidez[i].elemento.classList.add('invalid');
                this.comprobacionesDeValidez[i].elemento.classList.remove('valid');
            } else {
                this.comprobacionesDeValidez[i].elemento.classList.remove('invalid');
                this.comprobacionesDeValidez[i].elemento.classList.add('valid');
            }
        }
    }
};

//array para todos los checks  de validacioón.
var comprobacionCorreo = [
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
    },
];

var comprobacionPrimerNumero = [
    {
        noValido: function (input) {
            return input.value.length > 2;
        },
        mensajesInvalidez: 'El número debe solo puede ser entre 1 y 2 carácteres',
        elemento: document.querySelector('label[for="numeroUno"] li:nth-child(1)')
    },
    {
        noValido: function (input) {
            return input.value < 1.5;
        },
        mensajesInvalidez: 'El numero debe ser mayo que 1',
        elemento: document.querySelector('label[for="numeroUno"] li:nth-child(2)')
    },
    {
        noValido: function (input) {
            return input.value > 10;
        },
        mensajesInvalidez: 'El número no puede ser mayo que 10',
        elemento: document.querySelector('label[for="numeroUno"] li:nth-child(3)')
    },
    {
        noValido: function (input) {
            return input.value % 2 ==! 0;
        },
        mensajesInvalidez: 'El primer número debe ser par',
        elemento: document.querySelector('label[for="numeroUno"] li:nth-child(4)')
    },
    {
        noValido: function (input) {
            return input.value < 0.5;
        },
        mensajesInvalidez: 'Solo numeros positivos',
        elemento: document.querySelector('label[for="numeroUno"] li:nth-child(5)')

    }
];

var comprobacionSegundoNumero = [
    {
        noValido: function (input) {
            return input.value.length > 2;
        },
        mensajesInvalidez: 'El número debe solo puede ser entre 1 y 2 carácteres',
        elemento: document.querySelector('label[for="numeroDos"] li:nth-child(1)')
    },
    {
        noValido: function (input) {
            return input.value < 0.5;
        },
        mensajesInvalidez: 'El numero debe ser mayo que 1',
        elemento: document.querySelector('label[for="numeroDos"] li:nth-child(2)')
    },
    {
        noValido: function (input) {
            return input.value > 10;
        },
        mensajesInvalidez: 'El número no puede ser mayo que 10',
        elemento: document.querySelector('label[for="numeroDos"] li:nth-child(3)')
    },
    {
        noValido: function (input) {
            return input.value < 0.5;
        },
        mensajesInvalidez: 'Solo numeros positivos',
        elemento: document.querySelector('label[for="numeroDos"] li:nth-child(4)')

    }
];

//Recuperamos la información de los inputs y le asignamos la propiedad de validación.
var correoInput = document.getElementById('correo');
var numeroUnoInput = document.getElementById('numeroUno');
var numeroDosInput = document.getElementById('numeroDos');

correoInput.Validacion = new Validacion();
correoInput.Validacion.comprobacionesDeValidez = comprobacionCorreo;

numeroUnoInput.Validacion = new Validacion();
numeroUnoInput.Validacion.comprobacionesDeValidez = comprobacionPrimerNumero;

numeroDosInput.Validacion = new Validacion();
numeroDosInput.Validacion.comprobacionesDeValidez = comprobacionSegundoNumero;


// Se recuperan todos los inputs del formulario
var respuestasDelFormulario =  document.querySelectorAll('input:not([type="submit"])');
//Se itera sobre ellos y a cada uno se le añade un "listener" y se ejecuta la validación.
for  (var i = 0; i < respuestasDelFormulario.length; i++) {
    respuestasDelFormulario[i].addEventListener('keyup', function () {
        this.Validacion.comprobarValidez(this);
    })
}


