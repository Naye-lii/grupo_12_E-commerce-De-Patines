import React from 'react';
import { Link} from 'react-router-dom';

function Recurso (){
    return(
        <div className="cont-recurso">

            <Link to ="/usuarios">
            <div className = 'view-recurso'>
                <br/>
                <span class="material-icons material-icons-outlined icono">
                    face
                </span>
                <h2> Usuarios </h2>
            </div>  
            </Link>
            
            <Link to ="/productos">
            <div className = 'view-recurso'>
                <br/>
                <span class="material-icons material-icons-outlined icono">
                    store_mall_directory
                </span>
                <h2> Productos </h2>
            </div>
            </Link>
            <Link to ="/categorias">
            <div className = 'view-recurso'>
                <br/>
                <span class="material-icons material-icons-outlined icono">
                    category
                </span>
                <h2> Categorías </h2>
            </div>
            </Link>
        </div>
        
    )
}
export default Recurso;