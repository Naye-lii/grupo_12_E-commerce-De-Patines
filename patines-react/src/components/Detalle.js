import React from "react";
import { useState, useEffect } from 'react';
import Productos from "./Productos";

function Usuarios() {
    const [users, setUsers] = useState();
    const [usersCount, setCount] = useState();

    const getProductsData = async function () {
        try {
            let response = await fetch('http://localhost:3001/apiUsers');
            let data = await response.json();
            setUsers(data.data);
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
            <h1>Usuarios</h1>
            <h2>Total de Usuarios: {usersCount}</h2>
            
            <table className="table table-1">
            
                {!users ? (
                    <p>Cargando...</p>
                ) :
                    (
                    users.map((user, i) => <Productos id={user.id} name={user.name} />)
                    )
                }
            </table>
        </div>



    )
}
export default Listado;