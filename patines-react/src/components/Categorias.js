import React from "react";
import { useState, useEffect } from 'react';
import Productos from "./Productos";

function Categorias() {
    const [categorias, setProducts] = useState();

    const getProductsData = async function () {
        try {
            let response = await fetch('http://localhost:3001/apiProducts');
            let data = await response.json();
            setProducts(data.countByCategory);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProductsData();
    }, []);

    return (
        <div>
            <h1>Categorias</h1>
     
            <table className="table table-1">
            
                {!categorias ? (
                    <p>Cargando...</p>
                ) :
                    (
                        categorias.map((categoria, i) => <Productos id={categoria.name} name={categoria.cantidad} />)
                    )
                }
            </table>
        </div>

    )
}
export default Categorias;