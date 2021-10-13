import React from "react";

function Productos(props){
return(
    <div>            

               <tbody>
                    <tr>
                        <td>{props.id}</td>
                        <td>{props.name}</td>

                    </tr>
                </tbody>
            
    </div>
)

}
export default Productos;