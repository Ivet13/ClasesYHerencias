'use strict'

// clase padre que representa el nivel mas basico del objeto de tipo usuario,
// con su metodo constructor que recibe dos argumentos pero
// asigna sin preguntar dos atributos ("rol" y "activo")
class Usuario {
  constructor (nombre, apellido) {
    this.nombre = nombre
    this.apellido = apellido
    this.rol = 'invitado'
    this.activo = true
  }

  // metodo para mostrar datos del mismo usuario
  imprimirUsuario () {
    console.log(`Me llamo ${this.nombre} ${this.apellido} y soy un usuario con rol ${this.rol}.`)
  }
}

// la clase UsuarioRegistrado extiende a la clase padre, hereda sus atributos pero tiene ademas un atributo "contrasena" y su "rol"
// es diferente del usuario de la clase padre
class UsuarioRegistrado extends Usuario {
  constructor (nombre, apellido, contrasena) {
    super(nombre, apellido)
    this.rol = 'usuarioRegistrado'
    this.contrasena = contrasena
  }

  // metodo para mostrar la contrasena del mismo usuarioRegistrado
  imprimirContrasena () {
    console.log(`${this.nombre}, tu contrasena actual es ${this.contrasena}.`)
  }

  // metodo para cambiar la contrasena del mismo usuarioRegistrado
  modificarContrasena (contrasenaNueva) {
    this.contrasena = contrasenaNueva
    console.log(`${this.nombre}, tu nueva contrasena es ${this.contrasena}.`)
  }
}

// sera la clase con mas "permisos", en su constructor se le asigna el valor "admin" para "rol", extiende la clase UsuarioRegistrado
class Admin extends UsuarioRegistrado {
  constructor (nombre, apellido, contrasena) {
    super(nombre, apellido, contrasena)
    this.rol = 'admin'
  }

  // metodo con el cual puede el admin cambiar el valor booleano de la propiedad "activo" de otro usuario
  desactivarUsuario (usuario) {
    usuario.activo = false
    console.log(`El usuario ${usuario.nombre} esta desactivado.`)
  }

  // metodo para consultar el estado de un usuario
  mostrarEstadoUsario (usuario) {
    if (usuario.activo === false) {
      console.log(`El usuario ${usuario.nombre} esta desactivado.`)
    } else {
      console.log(`El usuario ${usuario.nombre} esta activado.`)
    }
  }

  // admin tambien tiene a su disposicion un metodo para mostrar la contrasena de un usuario
  imprimirContrasenaDeUsuario (usuario) {
    console.log(`La contrasena del usuario ${usuario.nombre} es ${usuario.contrasena}.`)
  }

  // admin puede incluso modificar la contrasena de un usuario
  modificarContrasenaDeUsuario (usuario, contrasenaNueva) {
    usuario.contrasena = contrasenaNueva
    console.log(`La contrasena del usuario ${usuario.nombre} ahora es ${usuario.contrasena}.`)
  }
}

// para comprobar la funcionalidad de nuestro codigo:

// creamos una instancia de cada tipo de clase:
const invitado = new Usuario('Pedro', 'Lopez')
const usuarioRegistrado = new UsuarioRegistrado('Irene', 'Pena', 'qwerty123')
const administrador = new Admin('Jefe', 'DeLosJefes', '123ytrewq')

// llamamos el metodo para imprimir los datos de nuestras instancias
invitado.imprimirUsuario()
usuarioRegistrado.imprimirUsuario()
administrador.imprimirUsuario()

// llamamos el metodo para mostrar la contrasena en las instancias donde es posible
usuarioRegistrado.imprimirContrasena()
administrador.imprimirContrasena()

// modificamos la contrasena para las instancias donde se puede
usuarioRegistrado.modificarContrasena('miNuevaContrasena987')
administrador.modificarContrasena('mejorContrasenaDelMundo')

// probamos los metodos accesibles solo para las instancias de clase "Admin":

// cambiamos el valor de la propiedad booleana para el objeto "invitado"
administrador.desactivarUsuario(invitado)

// imprimimos para comprobar el estado de "invitado" despues de haberlo "desactivado"
administrador.mostrarEstadoUsario(invitado)

// mostramos el estado de la instancia de tipo "usuarioRegistrado"
administrador.mostrarEstadoUsario(usuarioRegistrado)

// mostramos el valor de la propiedad contrasena de la misma instancia (de clase "Admin")
administrador.imprimirContrasenaDeUsuario(administrador)

// el resultado seria lo mismo con el metodo propio de la clase "usuarioRegistrado"
administrador.imprimirContrasena()

// mostramos el valor de la propiedad contrasena de la instancia de clase "usuarioRegistrado",
// aqui si que hace falta usar este metodo, porque solo instancias de clase "Admin" tienen el metodo
// para imprimir la contrasena de otros usuarios
administrador.imprimirContrasenaDeUsuario(usuarioRegistrado)

// el objeto de clase "Admin" puede cambiarle el valor de la propiedad "contrasena" a otras instancias
administrador.modificarContrasenaDeUsuario(usuarioRegistrado, 'contrasenaReseteada')

// comprobamos el cambio de la contrasena que hicimos:
usuarioRegistrado.imprimirContrasena()
