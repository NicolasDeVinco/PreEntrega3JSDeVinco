

/* ARRAY INICIAL */
const productos = [
    {id: 1, nombre: "Original", categoria: "Yerbas", stock: 20, precio: 1500, imagen: "./images/original.png"},
    {id: 2, nombre: "Menta y Jengibre", categoria: "Yerbas", stock: 25, precio: 1200, imagen: "./images/menta_jengibre.png"},
    {id: 3, nombre: "Menta y Lavanda", categoria: "Yerbas", stock: 25, precio: 1300, imagen: "./images/menta_lavanda.png"},
    {id: 4, nombre: "Jengibre y Naranja", categoria: "Yerbas", stock: 20, precio: 1400, imagen: "./images/jengibre_naranja.png"},
    {id: 5, nombre: "Manzanilla", categoria: "Yerbas", stock: 30, precio: 1100, imagen: "./images/manzanilla_naranja.png"},
    {id: 6, nombre: "Mate de acero", categoria: "Mates", stock: 15, precio: 7500, imagen: "./images/mate_acero.png"},
    {id: 7, nombre: "Mate de madera", categoria: "Mates", stock: 10, precio: 6500, imagen: "./images/mate_madera.jpg"},
    {id: 8, nombre: "Bombilla de acero", categoria: "Bombillas", stock: 25, precio: 1800, imagen: "./images/bombilla_acero.jpg"},
    {id: 9, nombre: "Bombilla de madera", categoria: "Bombillas", stock: 10, precio: 1100, imagen: "./images/bombilla_madera.jpg"}
]


/* ARRAY ACTUALIZADO*/

class Agregados {
    constructor (id, nombre, categoria, stock, precio, imagen) {
        this.id = id,
        this.nombre = nombre,
        this.categoria = categoria,
        this.stock = stock,
        this.precio = precio
        this.imagen = imagen
    }
}

let agregado1 = new Agregados (11, "Matera de madera", "Materas", 20, 5500, "./images/matera_madera.jpg")
let agregado2 = new Agregados (12, "Matera de cuero", "Materas", 0, 6500, "./images/matera_cuero.jpg")
let agregado3= new Agregados (13, "Mate de bronce", "Mates", 30, 4500, "./images/mate_bronce.jpg")

productos.push(agregado1, agregado2, agregado3)


/* EMPAQUETAR */

function empaquetar (productos) {
    let containerProductos = document.getElementById("container__productos")
    containerProductos.innerHTML = ""

    productos.forEach(producto => {
        let card__productos = document.createElement("div")

        card__productos.innerHTML = `<h2 class="titulo__producto">${producto.nombre}</h2>
                                        <img src="${producto.imagen}" class="imagen__producto">
                                        <p> Precio: $${producto.precio}</p>
                                        <button class="button" id="button__producto" type="submit" value="${producto.id}">Comprar</button>
                                        <p class="parrafo__stock"> Quedan ${producto.stock} unidades</p>`
        

        card__productos.classList.add("card__productos")
        containerProductos.classList.add("container__productos")
        containerProductos.appendChild(card__productos)
                               
    })

    let botonesCompra = document.getElementsByClassName("button")  

    for (let i = 0; i < botonesCompra.length; i++) {
      botonesCompra[i].addEventListener("click", comprar)
    }

}


empaquetar(productos)


let botonesCategoria = document.getElementsByClassName("botones__categoria")

for (let i = 0; i < botonesCategoria.length; i++) {
    botonesCategoria[i].addEventListener ("click", categorizar)
}


/* CATEGORIAS */

let categoriaActual = "todos"

function categorizar(event) {
  let valorCategoria = event.target.value.toLowerCase()
  let resultadoCategoria = productos.filter(
    (producto) => producto.categoria.toLowerCase() === valorCategoria)

  /*Ternario */
  valorCategoria === "todos" ? empaquetar(productos) : empaquetar(resultadoCategoria)

  let nombreCategoria = document.getElementById("productos__title")
  nombreCategoria.innerText = event.target.value
  
  categoriaActual = event.target.value.toLowerCase()
}


/* ORDEN */

let botonOrden = document.getElementById("select__orden")
botonOrden.addEventListener("click", ordenar)


function ordenar(event) {
  
  if (event.target.value === "menorPrecio") {
    let resultadoOrden = productos.sort((a,b) => a.precio - b.precio)
    empaquetar(resultadoOrden)
  }
  else if (event.target.value === "mayorPrecio") {
    let resultadoOrden = productos.sort((a,b) => b.precio - a.precio)
    empaquetar(resultadoOrden)
  }

  else if (event.target.value === "menorStock") {
    let resultadoOrden = productos.sort((a,b) => a.stock - b.stock)
    empaquetar(resultadoOrden)
  }

  else if (event.target.value === "mayorStock") {
    let resultadoOrden = productos.sort((a,b) => b.stock - a.stock)
    empaquetar(resultadoOrden)
  }
  empaquetar(resultadoOrden)
 
}


/* BUSQUEDA */


let busquedaInput = document.getElementById("busqueda__input")
busquedaInput.addEventListener('input', recorrer)

function recorrer (event) {
  let busqueda = event.target.value.toLowerCase()
  let productoBuscado = productos.filter(producto => producto.nombre.toLowerCase().includes(busqueda))

  if (productoBuscado) {
    empaquetar(productoBuscado)
  } 
  else {
    empaquetar(productos)
  }
}


/* CARRITO */

let carrito = []

function comprar (event) {
    let productoId = parseInt(event.target.value)
    let producto = productos.find(producto => productoId === producto.id)

    if (producto && producto.stock > 0 ) {
      let productoEnCarrito = carrito.find(producto => parseInt(productoId) === producto.id)

        if (productoEnCarrito) {
            productoEnCarrito.cantidad++
            
        }
        else {
            productoEnCarrito = {
                id : producto.id,
                nombre: producto.nombre,
                categoria: producto.categoria,
                stock: producto.stock,
                precio: producto.precio,
                cantidad: 1
            }
            carrito.push(productoEnCarrito)
            sessionStorage.setItem(claveProducto(producto), JSON.stringify(`Producto: ${producto.nombre} - Cantidad: ${productoEnCarrito.cantidad} - Precio: ${producto.precio}`))
            
           
        }
        producto.stock--
        

        mostrarCarrito()
        let resultadoCategoria = productos.filter(
          (producto) => producto.categoria.toLowerCase() === categoriaActual)

          /*Ternario */
        categoriaActual !== "todos" ? empaquetar(resultadoCategoria) :  empaquetar(productos)

        Toastify({
          text: "Producto agregado al carrito",
          close: true,
          duration: 3000,
          stopOnFocus: true,
          style: {
            background: "linear-gradient(to right, #bbbaba, #358bf9)",
          },
          }).showToast()
    }
    else {
      Swal.fire(
        'No hay mas stock',
        'Lo siento, no contamos con stock de producto',
        'warning'
      )
    }
}


/* GENERA CLAVE EN LOCALSTORAGE */

function claveProducto(producto) {
  return `producto_${producto.id}`
}




/* MOSTRAR CARRITO */

function mostrarCarrito() {
    let carritoContainer = document.getElementById("carrito__productos")
    carritoContainer.innerHTML = ""
    let parrafoTotal = document.getElementById("parrafo__total")
    let total = 0
  
    carrito.forEach((producto, index) => {
      
      let contenedorProducto = document.createElement("div")
      contenedorProducto.innerHTML = `<p>${producto.nombre}</p> <p>${producto.cantidad}</p> <p>$${producto.precio}</p><img src="./images/equis.png" class="eliminar-producto">`

    
      
         

      contenedorProducto.className = "carrito__producto"
      carritoContainer.appendChild(contenedorProducto)
  
      let eliminarProducto = contenedorProducto.querySelector(".eliminar-producto")
      eliminarProducto.addEventListener("click", () => remove(index))
     
     
      total += producto.precio * producto.cantidad
  
    })
    parrafoTotal.innerText = `TOTAL: $${total}`
  
  }
  
/* ELIMINAR PRODUCTOS */

  function remove(index) {
    let productoEliminado = carrito[index]
    carrito.splice(index, 1)
  
    
    let productoOriginal = productos.find(p => p.id === productoEliminado.id)
    productoOriginal.stock += productoEliminado.cantidad

    sessionStorage.removeItem(claveProducto(productoEliminado))
  
    mostrarCarrito()
    empaquetar(productos)

    Toastify({
      text: "Producto eliminado",
      close: true,
      duration: 3000,
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #c18a8a, #fb0000)",
      },
      }).showToast()
  }


  /* INGRESO*/

  let ingreso = document.getElementById("opcion__ingreso")
  ingreso.addEventListener("click", loguear)
  
  function loguear() {
    let megaContainer = document.getElementById("mega__container")
    megaContainer.classList.add("mega__container")
    
  
    let logueoContainer = document.createElement("div")
    logueoContainer.innerHTML = `<h2> Ingresá tus datos</h2>
                                <form id="form__ingreso">
                                  <input type="text" placeholder="Ingresá tu nombre" id="input__nombre">
                                  <input type="text" placeholder="Ingresá tu apellido" id="input__apellido">
                                  <input type="email" placeholder="Ingresá tu mail" id="input__mail">
                                  <input type="password" placeholder="Creá tu contraseña" id="input__contrasena">
                                  <button id="ingresar__button" type="button">Ingresar</button>
                                </form>
                                <img id="equis__ingreso" src="./images/equis.png">`
    logueoContainer.classList.add("logueo__container")
    document.body.appendChild(logueoContainer)
  
    let equisIngreso = logueoContainer.querySelector("#equis__ingreso")
    equisIngreso.addEventListener("click", function() {
      document.body.removeChild(logueoContainer)
      megaContainer.classList.remove("mega__container")
    });


    
  let inicioSesion = document.getElementById("ingresar__button")
  inicioSesion.addEventListener("click", iniciar)
  }
  



 /* INICIO SESION 1*/
  

  function iniciar (event) {

    event.preventDefault()

    let nombreUsuario = document.getElementById("input__nombre").value
    let apellidoUsuario = document.getElementById("input__apellido").value
    let mailUsuario = document.getElementById("input__mail").value
    let contrasenaUsuario = document.getElementById("input__contrasena").value
  
    let usuario = {
      nombre: nombreUsuario,
      apellido: apellidoUsuario,
      mail: mailUsuario,
      contrasena: contrasenaUsuario
    }

    sessionStorage.setItem('nombre', nombreUsuario)
    sessionStorage.setItem('apellido', apellidoUsuario)
    sessionStorage.setItem('mail', mailUsuario)
    sessionStorage.setItem('contrasena', contrasenaUsuario)
  
    let bienvenida = document.createElement("div")
    bienvenida.innerHTML = "Hola " + nombreUsuario + `<p id="cerrar__sesion">Cerrar Sesion</p>`
    document.getElementById("header__usuario").appendChild(bienvenida)
    document.getElementById("opcion__ingreso").classList.add("ingreso__off")


    let megaContainer = document.getElementById("mega__container")
      megaContainer.classList.remove("mega__container")
    let logueoContainer = document.querySelector(".logueo__container")
    document.body.removeChild(logueoContainer)

    let cerrarSesion = document.getElementById("cerrar__sesion")
    cerrarSesion.addEventListener("click", function() {
      sessionStorage.clear()
      location.reload()
    }
    )
    
  }



/* PAGO */

let botonPagar = document.getElementById("boton__pagar")
botonPagar.addEventListener("click", function(event) {
  event.preventDefault()
  pagar()
})


function pagar() {  

  if (sessionStorage.getItem('nombre')) {
    if (carrito.length === 0) {
      Swal.fire(
        'Tu carrito está vacio',
        'Primero agrega productos a tu carrito',
        'error'
      )
    } else {
      let contenedorCompra = document.createElement("div")
      contenedorCompra.classList.add("contenedor__compra")
      let megaContainer = document.getElementById("mega__container")
      megaContainer.classList.add("mega__container")
      contenedorCompra.innerHTML = "<h2>Estás por comprar:</h2>"

      let total = 0

      carrito.forEach(producto => {
        contenedorCompra.innerHTML += `<p>${producto.nombre} x ${producto.cantidad} - $${producto.precio}</p>` 
        total += producto.precio * producto.cantidad
      })

     
      contenedorCompra.innerHTML += `<p class="parrafo__pago">Total a pagar: $${total}</p>
                                      <button id="pago__final" type="button">Pagar</button>
                                      <img id="equis__pago" src="./images/equis.png">`
      

      document.body.appendChild(contenedorCompra)
      let pagoFinal = document.getElementById("pago__final")
      pagoFinal.addEventListener("click", function() {
        let contenedorCompra = document.querySelector(".contenedor__compra")
        document.body.removeChild(contenedorCompra)
    
    
        Swal.fire({
          icon: 'success',
          title:'GRACIAS POR TU COMPRA',  
          text:'Tu pago se ha realizado con éxito',
          
        }
        ).then((result)=> {
          sessionStorage.clear()
          location.reload()
        })
      })
      

      let equisPago = contenedorCompra.querySelector("#equis__pago")
      equisPago.addEventListener("click", function() {
        
        document.body.removeChild(contenedorCompra)
        megaContainer.classList.remove("mega__container")
       
      });
    }
  } else {
    loguear()
  }
}






