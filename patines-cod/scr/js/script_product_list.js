fetch("http://localhost:3000/products/products-list")
then((response) => {
    return response.json();
})

.then((products) =>{
    products.data.map((products) => {
        console.log(products);
        listProducts(products);
    });
})
.catch((e) => {
    console.log(e)
});

function listProducts(products){
    const divProduct = document.querySelector(".row-products");
    const div = document.createElement("div");
    div.classList.add('product');
    div.innerHTML = 
    `<img src= "${products.url_imagen}"></img>
    <div class="caption">
        <h2><a href="/products/detail/${products.id}">${products.name_product}</a></h2>
        <h3>${products.price}</h3>
            <p class="marca">${products.brand_name }</p>
    </div>

    <div class="contButton">
        <form action="/products/${products.id}/edit" method="GET">
            <button class="submit-btn" type="submit"><i class="fas fa-pencil-alt"></i>Editar</button>
        </form>
        <form action="/products/borrar/${products.id}?_method=DELETE"
            method="POST">
            <button class="submit-btn" type="submit"><i class="fas fa-trash-alt"></i>Eliminar</button>
        </form>
    </div>
    </div>
    
</div>`;

divProduct.appendChild(div)

}