import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const UpdateUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState({})

    useEffect(() => {
        const url = `http://localhost:5000/users/${id}`
        fetch(url)
            .then(res => res.json())
            .then(data => setUser(data))
    }, [id]);
    // update user
    const handleNameChange = e => {
        const updateName = e.target.value;
        const updateUser = { name: updateName, email: user.email };
        setUser(updateUser);
    }
    const handleEmailChange = e => {
        const updateEmail = e.target.value;
        // const updateUser = { ...user };
        // updateUser.email = updateEmail;
        const updatedUser = { name: user.name, email: updateEmail }
        setUser(updatedUser);
    }

    const handleUpdate = e => {
        const proceed = window.confirm('Are you sure, You want to Update?')
        if (proceed) {
            const url = `http://localhost:5000/users/${id}`
            fetch(url, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.modifiedCount > 0) {
                        alert('Updating User')
                        setUser({});
                    }
                })
        }
        e.preventDefault()
    }
    return (
        <div>
            <h2>Update:{user.name} </h2>
            <h3>Email:{user.email} </h3>
            <form onSubmit={handleUpdate}>
                <input type="text" onChange={handleNameChange} value={user.name || ''} />
                <input type="email" onChange={handleEmailChange} value={user.email || ''} />
                <input type="submit" value="update" />
            </form>

        </div>
    );
};

export default UpdateUser;