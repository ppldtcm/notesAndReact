import { useState, useEffect } from 'react';
import Header from './components/Header';
import ViewNotesR from './components/ViewNotesR';
import Registration from './components/Registration';
import Markdown from 'react-markdown';
import TagR from './components/components1/TagR';
import Note from './components/Note'

function AppSearch() {
  const [userId, setUserId] = useState(null);
  const [selectedTag, setSelectedTag] = useState('no tag'); // Состояние для выбранного тега
  const [notes, setNotes] = useState([]); // Состояние для сохранения найденных заметок

  useEffect(() => {
    const savedUserId = localStorage.getItem('userId');
    if (savedUserId) {
      setUserId(savedUserId);
    } else {
      console.error('userId не найден в localStorage');
    }
  }, []);



  async function search(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    if (!userId) {
      console.error("userId отсутствует");
      return;
    }

    formData.append('Note[id_user]', userId);
    console.log(formData);

    const response = await fetch('http://localhost/notes/back/web/api/search-project', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);

      setNotes(data.notes); // сохраняем найденные заметки в состояние

    } else {
      console.error('Ошибка при загрузке данных:', response);
    }
  }



  return (
    <div>
      <h1>Страница поиска</h1>
      <form onSubmit={search}>
        Поиск:
        <input type="text" placeholder="заголовок" name="Note[title]" />
        <input type="text" placeholder="заметка" name="Note[body]" />
        <TagR selectedTag={selectedTag} onTagChange={setSelectedTag} />
        <button type="submit">Search</button>
      </form>

      <br />

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

    </div>
  );
}

export default AppSearch;
