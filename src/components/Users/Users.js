import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
    const [user, setUser] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setUser(data))
    }, []);
    // DELETE IN USER
    const handleDeleteUser = id => {
        const proceed = window.confirm('Are you sure, You want to Delete?')
        if (proceed) {
            const url = `http://localhost:5000/users/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('Delete successfully');
                        const remainingUser = user.filter(user => user._id !== id)
                        setUser(remainingUser);
                    }
                })
        }
    }
    return (
        <div>
            <h2>This is Users:- {user.length} </h2>
            <ul>
                {
                    user.map(user => <li
                        key={user._id} >{user.name}::::{user.email}::
                        <Link to={`/users/update/${user._id}`}><button>Update</button></Link>
                        ::<button onClick={() => handleDeleteUser(user._id)}>X</button>
                    </li>)
                }
            </ul>
        </div>
    );
};

export default Users;