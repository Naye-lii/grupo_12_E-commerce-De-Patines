import React from "react";
import { useState, useEffect } from 'react';
import Productos from "./Productos";

function Listado() {
    const [products, setProducts] = useState();
    const [productsCount, setCount] = useState();

    const getProductsData = async function () {
        try {
            let response = await fetch('http://localhost:3001/apiProducts');
            let data = await response.json();
            setProducts(data.data);
            setCount(data.total)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProductsData();
    }, []);

    return (
        <div>
            <h1>Productos</h1>
            <h2>Total de productos: {productsCount}</h2>
            
            <table className="table table-1">
            
                {!products ? (
                    <p>Cargando...</p>
                ) :
                    (
                        products.map((product, i) => <Productos id={product.id} name={product.name} />)
                    )
                }
            </table>
        </div>



    )
}
export default Listado;