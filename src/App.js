import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import UserTable from './componentes/UserTable';
import AddUserForm from './componentes/AddUserForm';
import EditUserForm from './componentes/EditUserForm';

function App() {

    const usersData = [
        { id: uuidv4(), name: 'Benito', username: 'TipinAdolorin123' },
        { id: uuidv4(), name: 'Martuchis', username: 'EstudienVagos92' },
        { id: uuidv4(), name: 'Emeritus', username: 'TontoElQueLoLea1234' },
      ]

    //state
    const [users,setUsers] = useState (usersData);

    //agregar usuarios
    const addUser = (user) => {
        user.id = uuidv4()
        setUsers([...users,user])
    }

    //eliminar usuarios
    const deleteUser = (id) =>{
        setUsers(users.filter(user => user.id !== id))
    }

    //editar usuario
    const [editing, setEditing] = useState (false);

    const [currentUser, setCurrentUser] = useState ({
        id: null, name: '', username: ''
    })

    const editRow = (user) => {
        setEditing(true);
        setCurrentUser({
            id: user.id, name: user.name, username: user.username
        })
    }

    const updateUser = (id, updateUser) => {
        setEditing(false);
        setUsers(users.map(user => (user.id === id ? updateUser : user)))
    }


    ///////////////////////////////////////////////////////////
    return (
    <div className="container">
        <h1>CRUD App aplicando hooks por: Ricardo Hung</h1>
        <hr></hr>
        <div className="flex-row">
            <div className="flex-large">
                
                {
                    editing ? (
                        <div>
                            <h2>Editar usuario</h2>
                            <EditUserForm
                                currentUser={currentUser}
                                updateUser={updateUser}
                            />
                        </div>
                    ):(
                        <div>
                            <h2>Agregar usuario nuevo</h2>
                            <AddUserForm addUser={addUser}/>                        
                        </div>
                    )
                }

            </div>
            <div className="flex-large">
                <h2>Visualizar usuarios</h2>
                <UserTable 
                    users={users} 
                    deleteUser={deleteUser} 
                    editRow={editRow}
                />
            </div>
        </div>
    </div>
    )
}

export default App;
