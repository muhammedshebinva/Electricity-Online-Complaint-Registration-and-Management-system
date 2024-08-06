import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import api from '../utils/api';

const Users = () => {
    const { token } = useContext(AuthContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await api.getUsers(token);
                setUsers(data);
            } catch (error) {
                console.error(error);
            }
        };

        if (token) {
            fetchUsers();
        }
    }, [token]);

    // ... render user details
};

export default Users;
