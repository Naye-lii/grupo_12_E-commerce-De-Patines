import React from "react";
import Imagen from "./Imagen";

function DetalleView(props){
return(
    <div>
        <h2> {props.name} </h2> 
        <h3> {props.price} </h3>
        <h4> {props.marca} </h4> 
        <p> {props.descripcion} </p>  
    </div>
)

}
export default DetalleView;