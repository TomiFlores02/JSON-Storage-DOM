const imgCarrito = document.getElementById("imgCarrito")
const container = document.querySelector("div#container")
const inputSearch = document.querySelector("input#inputSearch")
const carrito = recoverCarrito()

function productsFilter(valor) {
    let result = productos.filter(shoe => shoe.nombre.toLowerCase().includes(valor.toLowerCase()))
        if (result.length > 0) {
            loadProducts(result)
        }
}

function returnCardHTML(shoe) {
return `<div class="card">
        <div class="card-image"><img src="${shoe.imagen}" alt="Image"></div>
        <div class="card-model">${shoe.nombre}</div>
        <div class="price-button">
        <div class="card-price"><span class="price">$${shoe.precio}</span></div>
        <button class="buy-now" id="${shoe.id}">Comprar Ahora</button>
        </div>`
}

function loadProducts(array) {
    container.innerHTML = ""
    array.forEach(shoe => {
        container.innerHTML += returnCardHTML(shoe)
    })
    clickActivate()
}

inputSearch.addEventListener("search", (e)=> {
    productsFilter(e.target.value)
})

function clickActivate() {
    const botones = document.querySelectorAll("button.buy-now")
          for (const boton of botones) {
            boton.addEventListener("click", ()=> {
                let result = productos.find(shoe => shoe.id === parseInt(boton.id))
                    carrito.push(result)
                    saveCarrito()
            })
          }
}

function saveCarrito() {
    localStorage.setItem("carritoShoe", JSON.stringify(carrito))
}

function recoverCarrito() {
    return JSON.parse(localStorage.getItem("carritoShoe")) || []
}

loadProducts(productos)
recoverCarrito()