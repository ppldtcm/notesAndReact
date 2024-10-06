import { useEffect, useState } from 'react';
import axios from 'axios';

export default function CreateNoteR({ userId, notes, setNotes }) {

    // const idUser = 1

    async function create(event) {

        event.preventDefault(); // предотвращаем стандартное поведение
        const formData = new FormData(event.target); // собираем данные из формы
        // console.log(formData)
        formData.append("Note[id_user]", userId);
        console.log(formData)

        const response = await fetch('http://localhost/notes/back/web/api/create-project', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setNotes(notes)
        } else {
            console.error('Ошибка при загрузке данных:', response);
        }

    }
    return (
        <form onSubmit={create}>
            <h3>Создать заметку</h3>
            <input type="text" name="Note[title]" />
            <br />
            <br />
            <input type="text" name="Note[body]" />
            <br />
            <br />
            <button type="submit">Create</button>
        </form >
    )
}
