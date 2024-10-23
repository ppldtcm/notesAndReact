import { useEffect, useState } from 'react';
import Note from './Note'
import CreateNoteR from './CreateNoteR';
import Markdown from 'react-markdown'
import TagR from './components1/TagR'


export default function ViewNotesR({ userId }) {
    const [loading, setLoading] = useState(false);
    const [notes, setNotes] = useState([]);

    async function fetchNotes() {
        setLoading(true);
        let requestData = {
            id_user: userId
        };
        // console.log(requestData)
        const response = await fetch('http://localhost/notes/back/web/api/view-project', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            const notes = data.notes;
            setNotes(notes);
            // console.log(notes);
        } else {
            console.error('Ошибка при загрузке данных');
        }
        setLoading(false);
    }


    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <>
            <CreateNoteR userId={userId} notes={notes} setNotes={setNotes} />

            <hr />

            {loading ? <p>Loading...</p> : (
                <table>
                    <thead>
                        <tr>
                            <th>ID Note</th>
                            <th>Title</th>
                            <th>Body</th>
                            <th>Tag</th>
                            <th>File</th>
                            <th>Delete</th>
                            <th>Upadate / Save</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>

                        </tr> */}
                        {notes.map(note => (
                            <Note note={note} notes={notes} setNotes={setNotes} />
                        ))}
                    </tbody>
                </table >
            )
            }
        </>
    );
}
