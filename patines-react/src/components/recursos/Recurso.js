import React from 'react';
function Recurso (){
    return(
        <div className="cont-recurso">
            
            <div className = 'view-recurso'>
                <br/>
                <span class="material-icons material-icons-outlined icono">
                    face
                </span>
                <h2> Usuarios </h2>
            </div>  

            <div className = 'view-recurso'>
                <br/>
                <span class="material-icons material-icons-outlined icono">
                    store_mall_directory
                </span>
                <h2> Productos </h2>
            </div>

            <div className = 'view-recurso'>
                <br/>
                <span class="material-icons material-icons-outlined icono">
                    category
                </span>
                <h2> Categorías </h2>
            </div>

        </div>
        
    )
}
export default Recurso;