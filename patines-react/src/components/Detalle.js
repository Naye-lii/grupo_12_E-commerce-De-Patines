import React from "react";
import { useState, useEffect } from 'react';
import DetalleView from "./DetalleView";
import Imagen from "./Imagen";
import ListDetalle from "./ListDetalle";
import ListTalla from "./ListTalla";


function Detalle() {
    const [productsDetail, setDetail] = useState();
    const [productsCatalogo, setCatalogo] = useState();
    const [productsTalla, setTalla] = useState();

    const getProductsDetail = async function () {
        try {
            let response = await fetch('http://localhost:3001/apiProducts/ultimo');
            let data = await response.json();
            setDetail(data.data);
            setCatalogo(data.catalogo);
            setTalla(data.talla);            
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProductsDetail();
    }, []);



    return (
        <div className = "contDetalle">
            <h1>Descripcion</h1>
            {!productsCatalogo ? (
                    <p>Cargando...</p>
                ) :
                    (
                        productsCatalogo.map(catalogo => <Imagen
                            img= {catalogo.img}
                        />)
                        
                    )
                }
                {!productsDetail ? (
                    <p>Cargando...</p>
                ) :
                    (
                        productsDetail.map((detalle) =>  <DetalleView 
                            name = {detalle.name}
                            price = {detalle.proce}
                            descripcion = {detalle.descripcion}  
                        /> )
                        
                    )
                }
                {!productsCatalogo ? (
                    <p>Cargando...</p>
                ) :
                    (
                        productsCatalogo.map((c) =>  <ListDetalle 
                            color = {c.color}
                        /> )
                        
                    )
                }
                {!productsTalla ? (
                    <p>Cargando...</p>
                ) :
                    (
                        productsTalla.map((t) =>  <ListTalla 
                            talla = {t.talla}
                            exist = {t.existencia}
                        /> )
                        
                    )
                } 
      
         
        </div>

    )
}
export default Detalle;