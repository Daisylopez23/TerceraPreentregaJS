const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

const productos = [
  {
    id: 1,
    nombre: "torta de chocolate",
    precio: 50,
    img: "https://cdn2.cocinadelirante.com/1020x600/filters:format(webp):quality(75)/sites/default/files/images/2023/08/receta-de-pastel-de-chocolate-facil.jpg",
    cantidad: 1,
  },
  {
    id: 2,
    nombre: "tarta frutal",
    precio: 100,
    img: "https://tse2.mm.bing.net/th?id=OIP.uGzPfovzp0DkgAilKIokegHaE6&pid=Api&P=0&h=180",
    cantidad: 1,
  },
  {
    id: 3,
    nombre: "macarons",
    precio: 150,
    img: "https://images.hola.com/imagenes/cocina/recetas/20200528168960/macarons-limon/0-829-317/macarons-limon-t.jpg?tx=w_1200",
    cantidad: 1,
  },
  {
    id: 4,
    nombre: "cuadrados de coco",
    precio: 400,
    img: "https://www.lanacion.com.ar/resizer/v2/cuadrados-de-coco-y-dulce-de-leche-por-antonio-MZI5W3E4RNCY5MPRVD3SU45ISA.jpg?auth=8ba6531479a294314554a75b3b32299267b2ff23121947c09968c6fca0c7bb82&width=880&height=586&quality=70&smart=true",
    cantidad: 1,
  },
  {
    id: 5,
    nombre: "budin de naranja",
    precio: 500,
    img: "https://saborargento.com.ar/wp-content/uploads/2023/05/Receta-de-Budin-de-Naranja-en-Licuadora.webp",
    cantidad: 1,
  },
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

productos.forEach((product) => {
  let content = document.createElement("div");
  content.className = "card";
  content.innerHTML = `
      <img src="${product.img}">
      <h3>${product.nombre}</h3>
      <p class="price">${product.precio}$</p>
    
    `;

  shopContent.append(content);

  let comprar = document.createElement("button");
  comprar.innerText = "comprar";
  comprar.className = "comprar";

  content.append(comprar);

  comprar.addEventListener("click", () => {
    const repeat = carrito.some(
      (repeatProduct) => repeatProduct.id === product.id
    );

    if (repeat) {
      carrito.map((prod) => {
        if (prod.id === product.id) {
          prod.cantidad++;
        }
      });
    } else {
      carrito.push({
        id: product.id,
        img: product.img,
        nombre: product.nombre,
        precio: product.precio,
        cantidad: product.cantidad,
      });
    }
    console.log(carrito);
    console.log(carrito.length);
    carritoCounter();
    saveLocal();
  });
});

//set item
const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const pintarCarrito = () => {
  modalContainer.innerHTML = "";
  modalContainer.style.display = "flex";
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = `
    <h1 class="modal-header-title">carrito.</h1>
    `;
  modalContainer.append(modalHeader);

  const modalbutton = document.createElement("h1");
  modalbutton.innerText = "x";
  modalbutton.className = "modal-header-button";

  modalbutton.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });

  modalHeader.append(modalbutton);

  carrito.forEach((product) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
      <img src="${product.img}">
      <h3>${product.nombre}</h3>
      <p>${product.precio} $</p>
      <span class="restar"> - </span>
      <p>cantidad: ${product.cantidad}</p>
      <span class="sumar"> + </span>
      <p>Total: ${product.cantidad * product.precio}</p>
      `;

    modalContainer.append(carritoContent);

    let restar = carritoContent.querySelector(".restar");

    restar.addEventListener("click", () => {
      if (product.cantidad !== 1) {
        product.cantidad--;
      }
      saveLocal();
      pintarCarrito();
    });

    let sumar = carritoContent.querySelector(".sumar");

    sumar.addEventListener("click", () => {
      product.cantidad++;
      saveLocal();
      pintarCarrito();
    });

    let eliminar = document.createElement("span");
    eliminar.innerText = "✖️";
    eliminar.className = "delete-product";
    carritoContent.append(eliminar);

    eliminar.addEventListener("click", () => {
      eliminarProducto(product.id);
    });
  });

  const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

  const totalBuying = document.createElement("div");
  totalBuying.className = "total-content";
  totalBuying.innerHTML = `total a pagar: ${total} $`;
  modalContainer.append(totalBuying);
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = (id) => {
  carrito = carrito.filter((product) => product.id !== id);

  carritoCounter();
  saveLocal();
  pintarCarrito();
};

const carritoCounter = () => {
  cantidadCarrito.style.display = "block";

  const carritoLength = carrito.length;
  localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

  cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

carritoCounter();
