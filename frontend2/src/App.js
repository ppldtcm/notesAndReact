import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // Импортируем Link
import Header from './components/Header';
import ViewNotesR from './components/ViewNotesR';
import Registration from './components/Registration';
import Markdown from 'react-markdown'

function App() {
  const [userId, setUserId] = useState(null);

  // при загрузке проверяем наличие айди чтобы при перезагрузке страницы у нас не вылетал аккаунт
  useEffect(() => {
    const savedUserId = localStorage.getItem('userId');
    if (savedUserId) {
      setUserId(savedUserId);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setUserId(null);
  };

  return (
    <>
      <Header />
      <hr />
      {!userId ? (
        <Registration setUserId={(id) => {
          localStorage.setItem('userId', id); // Сохраняем userId в localStorage
          setUserId(id);
        }} />
      ) : (
        <>
          <button onClick={handleLogout}>Выйти</button>

          <hr />

          <Link to="/search">
            <button>Перейти на страницу поиска</button> {/* Кнопка для перехода */}
          </Link>

          <hr />

          <ViewNotesR userId={userId} />
        </>
      )}
    </>
  );
}

export default App;
