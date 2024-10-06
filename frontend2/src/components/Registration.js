import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Registration({ userId, setUserId }) {

    // const idUser = 1

    async function valid(event) {

        event.preventDefault(); 
        const formData = new FormData(event.target); 
        console.log(formData)
        
        const response = await fetch('http://localhost/notes/back/web/api/auth-project', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            const userId = data.user_id;
            console.log(userId);
            setUserId(userId)
        } else {
            console.error('Ошибка при авторизации:', response);
        }

    }
    return (
        <form onSubmit={valid}>
            <input type="text" name="User[name]" />
            <br />
            <br />
            <input type="text" name="User[password]" />
            <br />
            <br />
            <button type="submit">Войти</button>
        </form >
    )
}

