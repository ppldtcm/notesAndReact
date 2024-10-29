import { useEffect, useState } from 'react';
import axios from 'axios';
import TagCheckbox from './components1/TagCheckbox'

import Markdown from 'react-markdown'

export default function CreateNoteR({ userId, notes, setNotes }) {

    const [selectedTags, setSelectedTags] = useState('');

    const handleTagChange = (tagsString) => {
        setSelectedTags(tagsString); // Сохраняем строку с тегами
    };



    async function create(event) {

        event.preventDefault(); // предотвращаем стандартное поведение
        const formData = new FormData(event.target); // собираем данные из формы
        // console.log(formData)
        formData.append("Note[id_user]", userId);
        formData.append("Note[tags]", selectedTags); // Добавляем строку с тегами в FormData

        console.log(formData)

        const response = await fetch('http://localhost/notes/back/web/api/create-project', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setNotes([...notes, data]);
        } else {
            console.error('Ошибка при загрузке данных:', response);
        }

    }
    return (
        <form onSubmit={create}>
            <Markdown>{`### Создать заметку`}</Markdown>
            <input type="text" name="Note[title]" />
            <br />
            <br />
            <input type="text" name="Note[body]" />
            <br />
            <br />
            <input type="file" name="Note[file]" />
            <br />
            <br />
            tag:
            <TagCheckbox onTagChange={handleTagChange} />
            <br />
            <br />
            <button type="submit">Create</button>
        </form >
    )


}