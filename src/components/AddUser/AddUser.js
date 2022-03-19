import React from 'react';
import { useRef } from 'react';

const AddUser = () => {
    const nameRaf = useRef();
    const emailRaf = useRef();

    const handleAdded = e => {
        const name = nameRaf.current.value;
        const email = emailRaf.current.value;
        const newUser = { name, email };
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('Successfully user added')
                    e.target.reset();
                }
            })
        e.preventDefault();
    }

    return (
        <div>
            <h2>Please an Add User</h2>
            <form onSubmit={handleAdded}>
                <input type="text" ref={nameRaf} />
                <input type="email" ref={emailRaf} />
                <input type="submit" value="submit" />
            </form>
        </div>
    );
};

export default AddUser;