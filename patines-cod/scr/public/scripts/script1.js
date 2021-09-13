fetch('http://localhost:3000/products')
.then(res=>{
    return res.json()
}) .then(
    ).then(
        products=>{
            console.log(products);
        }
    )