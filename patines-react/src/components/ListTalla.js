import React from "react";

function ListTalla(props){
return(
    <div>
        <ul>
            <li>{props.talla} ( Existencias: {props.exist} )</li>
        </ul>            
    </div>
)

}
export default ListTalla;