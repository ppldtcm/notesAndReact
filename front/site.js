const site = {

    backBaseUrl: 'http://localhost/notes/back/web',
    idUserr: localStorage.getItem('user_id') || 0,
    // idUserr: window.sessionStorage.getItem('user_id'),
    
    
    
    
    createProjectFormSubmit: async (event) => {
        event.preventDefault();
        let form = event.target;
        let formData = new FormData(form);        
        formData.append('Note[id_user]', site.idUserr);

        let response = await fetch(
            site.backBaseUrl + '/api/create-project',
            {
                method: 'POST',
                body: formData,
            }
        );

        let responseData = await response.json();
        site.viewNote();
    },
    


    viewNote: async (event) => {
        let idUser = site.idUserr
        let requestData = {
            id_user: idUser
        };

        try {
            let response = await fetch(
                site.backBaseUrl + '/api/view-project',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            let responseData = await response.json();

            // Вытаскиваем список заметок (notes) из ответа
            const notes = responseData.notes;

            site.insertRowInTable(notes);
            console.log(notes);


        } catch (error) {
            console.error('Ошибка при получении заметок:', error);
        }
    },

    deleteNote: async (id) => {
        //alert(site.idUserr);
        let idUser = site.idUserr
        let idNote = id
        let requestData = {
            id_note: idNote,
            id_user: idUser
        };
        try {
            let response = await fetch(
                site.backBaseUrl + '/api/delete-project',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            let responseData = await response.json();


            //тк мы удалили заметку, нам необходимо обновить их список у пользователя
            // Вытаскиваем список заметок (notes) из ответа
            const notes = responseData.notes;

            site.insertRowInTable(notes);
            console.log(notes);


        } catch (error) {
            console.error('Ошибка при получении заметок:', error);
        }
    },

    saveNoteChanges: async (id, updatedTitle, updatedBody) => {
        let idUser = site.idUserr
        let idNote = id
        let requestData = {
            id_note: idNote,
            title: updatedTitle,
            body: updatedBody,
            id_user: idUser
        };
        try {
            let response = await fetch(
                site.backBaseUrl + '/api/update-project',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            let responseData = await response.json();


            //тк мы изменили заметку, нам необходимо обновить их список у пользователя
            // Вытаскиваем список заметок (notes) из ответа
            const notes = responseData.notes;

            site.insertRowInTable(notes);
            console.log(notes);


            //site.viewNote();


        } catch (error) {
            console.error('Ошибка при получении заметок:', error);
        }
    },

    updateNote: async (id) => {
        const titleField = document.getElementById(`${id}title`);
        const bodyField = document.getElementById(`${id}body`);

        const currentTitle = titleField.textContent;
        const currentBody = bodyField.textContent;

        titleField.innerHTML = `<input type="text" id="input-title-${id}" value="${currentTitle}" />`;
        bodyField.innerHTML = `<input type="text" id="input-body-${id}" value="${currentBody}" />`;

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Сохранить';
        saveButton.addEventListener('click', () => {
            const updatedTitle = document.getElementById(`input-title-${id}`).value;
            const updatedBody = document.getElementById(`input-body-${id}`).value;
            site.saveNoteChanges(id, updatedTitle, updatedBody); // Функция для сохранения изменений
        });

        bodyField.appendChild(saveButton);
    },

    insertRowInTable(notes) {
        const tableBody = document.getElementById('aaa');
        tableBody.innerHTML = '';
        for (let i = 0; i < notes.length; i++) {
            note = notes[i];


            const row = document.createElement('tr');

            const idColumn = document.createElement('td');
            const titleColumn = document.createElement('td');
            const bodyColumn = document.createElement('td');
            const deleteButtonColumn = document.createElement('td');
            const updateButtonColumn = document.createElement('td');

            idColumn.textContent = note.id_note;
            titleColumn.textContent = note.title;
            bodyColumn.textContent = note.body;

            idColumn.setAttribute('id', note.id_note + "id");
            titleColumn.setAttribute('id', note.id_note + "title");
            bodyColumn.setAttribute('id', note.id_note + "body");


            //кнопка удаления
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Удалить';
            deleteButton.setAttribute('id', note.id_note);
            deleteButton.addEventListener('click', (event) => {
                const id = event.target.getAttribute('id');
                site.deleteNote(id); //удаления по айди заметки
            });
            deleteButtonColumn.appendChild(deleteButton);


            //кнопка обновления
            const updateButton = document.createElement('button');
            updateButton.textContent = 'Обновить';
            updateButton.setAttribute('id', note.id_note); // Правильный атрибут id
            updateButton.addEventListener('click', (event) => {
                const id = event.target.getAttribute('id');
                site.updateNote(id); // Обновление заметки по id
            });
            updateButtonColumn.appendChild(updateButton);


            row.appendChild(idColumn);
            row.appendChild(titleColumn);
            row.appendChild(bodyColumn);
            row.appendChild(deleteButtonColumn);
            row.appendChild(updateButtonColumn);

            tableBody.appendChild(row);
        }



    }
}

const userr = {
    authenticationForm: async (event) => {
        event.preventDefault();

        let form = event.target;

        let formData = new FormData(form);
        try {
            let response = await fetch(
                site.backBaseUrl + '/api/auth-project',
                {
                    method: 'POST',
                    body: formData,
                }
            );
            let responseData = await response.json();

            if (responseData.status === 'success') {
                userId = responseData.user_id;
                localStorage.setItem('user_id', userId);
                // window.sessionStorage.setItem('user_id', userId)

                // alert( localStorage.getItem('user_id') );
                document.getElementById('welcome').style.display = 'block';
                document.getElementById('login').style.display = 'none';
                document.getElementById('logout').style.display = 'block';

            } else {
                alert('Ошибка при авторизации: ' + responseData.message);
            }

        } catch (error) {
            console.error('Ошибка при входе:', error);
        }
    },

    logoutUser: async (event) =>{

        document.getElementById('welcome').style.display = 'none';
        document.getElementById('login').style.display = 'block';
        document.getElementById('logout').style.display = 'none';
        //localStorage.removeItem('user_id');
        localStorage.clear()
        // window.sessionStorage.clear() 
        // window.location.reload()
   }
};



window.addEventListener('DOMContentLoaded', (event) => {
    site.viewNote();
});