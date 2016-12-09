
function Validacion(input) {
    //array para guardar los mensajes de error y sobreescribir los de html
    this.invalidos = [];
    //array para guardar los checks de validez de cada campo
    this.comprobacionesDeValidez = [];

    //add reference to the input node
    this.inputNode = input;

    //trigger method to attach the listener
    this.registerListener();
}

Validacion.prototype = {
    agregarInavalido: function(mensaje) {
        this.invalidos.push(mensaje);
    },
    devolverInvalido: function() {
        return this.invalidos.join('. \n');
    },
    comprobarValidez: function(input) {
        //Iteramos sombre todas las condiciones de los input.
        for ( var i = 0; i < this.comprobacionesDeValidez.length; i++ ) {

            var noValido = this.comprobacionesDeValidez[i].noValido(input);
            if (noValido) {
                //Si no valido es true añadimos los mensajes de invalidez al array y marcamos el elemento con la clase invalid.
                this.agregarInavalido(this.comprobacionesDeValidez[i].mensajesInvalidez);
            }

            var elementoRequerido = this.comprobacionesDeValidez[i].elemento;

            if (elementoRequerido) {
                if (noValido) {
                    elementoRequerido.classList.add('invalid');
                    elementoRequerido.classList.remove('valid');
                } else {
                    elementoRequerido.classList.remove('invalid');
                    elementoRequerido.classList.add('valid');
                }

            }
        }
    },
    comprobarEntrada: function() {

        this.inputNode.Validacion.invalidos = [];
        this.comprobarValidez(this.inputNode);

        if ( this.inputNode.Validacion.invalidos.length === 0 && this.inputNode.value !== '' ) {
            this.inputNode.setCustomValidity('');
        } else {
            var mensaje = this.inputNode.Validacion.devolverInvalido();
            this.inputNode.setCustomValidity(mensaje);
        }
    },
    registerListener: function() {

        var Validacion = this;

        this.inputNode.addEventListener('keyup', function() {
            Validacion.comprobarEntrada();
        });


    }

};

//array para todos los checks de validación de correo.
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
            var caracteresNoPermitidos =! input.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g);
            //Si se cumple caracteresPermitidos devuelve True si no False.
            return caracteresNoPermitidos ? true : false;
        },
        mensajesInvalidez: 'Debe ser como minimo de 3 carácteres',
        elemento: document.querySelector('label[for="correo"] li:nth-child(2)')
    },
];

//array para todos los checks de validación del primer número.
var comprobacionPrimerNumero = [
    {
        noValido: function (input) {
            return input.value.length > 1;
        },
        mensajesInvalidez: 'El número debe tener solo un carácter',
        elemento: document.querySelector('label[for="numeroUno"] li:nth-child(1)')
    },
    {
        noValido: function (input) {
            return input.value < 1.5;
        },
        mensajesInvalidez: 'El numero debe ser mayor que 1',
        elemento: document.querySelector('label[for="numeroUno"] li:nth-child(2)')
    },
    {
        noValido: function (input) {
            return input.value > 6;
        },
        mensajesInvalidez: 'El número debe ser menor que 7',
        elemento: document.querySelector('label[for="numeroUno"] li:nth-child(3)')
    },
    {
        noValido: function (input) {
            return input.value % 2 ==! 0;
        },
        mensajesInvalidez: 'El primer número debe ser par',
        elemento: document.querySelector('label[for="numeroUno"] li:nth-child(4)')
    }
];

//array para todos los checks de validación del segundo número.
var comprobacionSegundoNumero = [
    {
        noValido: function (input) {
            return input.value.length > 2;
        },
        mensajesInvalidez: 'El número debe tener solo un carácter',
        elemento: document.querySelector('label[for="numeroDos"] li:nth-child(1)')
    },
    {
        noValido: function (input) {
            return input.value < 1.5;
        },
        mensajesInvalidez: 'El numero debe ser mayor que 1',
        elemento: document.querySelector('label[for="numeroDos"] li:nth-child(2)')
    },
    {
        noValido: function (input) {
            return input.value > 6;
        },
        mensajesInvalidez: 'El número debe ser menor que 7',
        elemento: document.querySelector('label[for="numeroDos"] li:nth-child(3)')
    }
];

//Recuperamos la información de los inputs y le asignamos la propiedad de validación pasandole la propia información del campo.
var correoInput = document.getElementById('correo');
var numeroUnoInput = document.getElementById('numeroUno');
var numeroDosInput = document.getElementById('numeroDos');

correoInput.Validacion = new Validacion(correoInput);
correoInput.Validacion.comprobacionesDeValidez = comprobacionCorreo;

numeroUnoInput.Validacion = new Validacion(numeroUnoInput);
numeroUnoInput.Validacion.comprobacionesDeValidez = comprobacionPrimerNumero;

numeroDosInput.Validacion = new Validacion(numeroDosInput);
numeroDosInput.Validacion.comprobacionesDeValidez = comprobacionSegundoNumero;





// Se recuperan todos los inputs del formulario
var respuestasDelFormulario = document.querySelectorAll('input:not([type="submit"])');


var submit = document.querySelector('input[type="submit"');
var formulario = document.getElementById('formulario');

function validate() {
    for (var i = 0; i < respuestasDelFormulario.length; i++) {
        respuestasDelFormulario[i].Validacion.comprobarEntrada();
    }
}

submit.addEventListener('click', validate);
formulario.addEventListener('submit', validate);
