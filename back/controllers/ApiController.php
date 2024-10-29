<?php

namespace app\controllers;
use app\models\Note;
use app\models\UserNote;

use app\models\Tags;
use yii\web\Controller;
use yii\filters\VerbFilter;
use yii\web\UploadedFile;
use yii\web\Response;

class ApiController extends \yii\web\Controller
{
    public function actionIndex()
    {
        return $this->render('index');
    }

    public function behaviors()
    {
        $behaviors = parent::behaviors();

        // Настраиваем CORS
        $behaviors['corsFilter'] = [
            'class' => \yii\filters\Cors::class,
            'cors' => [
                'Origin' => ['*'],

                // allow OPTIONS
                'Access-Control-Expose-Headers' => ['*'],

                // allow POST
                'Access-Control-Allow-Headers' => ['*'],

            ],
        ];

        return $behaviors;
    }

    public function beforeAction($action)
    {
        $this->enableCsrfValidation = false;

        \Yii::$app->response->format = Response::FORMAT_JSON;

        return parent::beforeAction($action);
    }

    public function actionTest()
    {
        return [
            'msg' => 'api test ok',
        ];
    }

    public function actionCreateProject()
    {
        $request = \Yii::$app->request;

        $post = $request->post();

        \Yii::info([
            '$post' => $post,
        ], 'my / ' . __METHOD__);

        $newNote = new Note();

        $loadOk = $newNote->load($post);

        $saveOk = $newNote->save();

        $saveErrors = $newNote->errors;

        //Сохраняем тэги
        if (!empty($post['Note']['tags'])) {
            // Разделяем строку тегов на массив
            $tagsArray = explode(',', $post['Note']['tags']);
            foreach ($tagsArray as $tagName) {
                $tagName = trim($tagName); // Убираем лишние пробелы
                $noteTag = new Tags();
                $noteTag->id_note = $newNote->id_note;
                $noteTag->name = $tagName; 
                $noteTag->save(); 


                $newNote->tag = $post['Note']['tags'];
                $newNote->save();

            }
        }

        // Загружаем данные из формы в модель
        if ($newNote->load($post) && $newNote->save()) {

            $newNote->file = UploadedFile::getInstance($newNote, 'file');

            if ($newNote->file && $newNote->validate()) {
                $newNote->file->saveAs('uploads/' . $newNote->id_note . '.' . $newNote->file->extension);
                $newNote->file_path = 'uploads/' . $newNote->id_note . '.' . $newNote->file->extension;
                $newNote->save(false);

                return [
                    'message' => 'Заметка и файл успешно сохранены',
                    '$post' => $post,
                    '$loadOk' => $loadOk,
                    '$saveOk' => $saveOk,
                    '$newProject' => $newNote,
                    '$saveErrors' => $saveErrors,
                ];
            } else {
                return [
                    'message' => 'Не удалось загрузить файл',
                    '$post' => $post,
                    '$loadOk' => $loadOk,
                    '$saveOk' => $saveOk,
                    '$newProject' => $newNote,
                    '$saveErrors' => $saveErrors,

                ];
            }
        } else {
            return [
                'message' => 'Не удалось сохранить заметку',
                '$post' => $post,
                '$loadOk' => $loadOk,
                '$saveOk' => $saveOk,
                '$newProject' => $newNote,
                '$saveErrors' => $saveErrors,
            ];
        }
    }
    public function actionViewProject()
    {
        $request = \Yii::$app->request;

        //$id_user = $request->post('id_user');

        $data = \Yii::$app->request->getRawBody(); // Получаем сырые данные JSON

        $parsedData = json_decode($data, true); // Парсим JSON

        $id_user = $parsedData['id_user'] ?? null;

        \Yii::info([
            'id_user' => $id_user,
        ], 'my / ' . __METHOD__);

        $notes = Note::find()
            ->where(['id_user' => $id_user])
            ->asArray()
            ->all();

        // ссылка на скачивание для каждого файла
        foreach ($notes as &$note) {
            if (!empty($note['file_path'])) {
                $note['file_url'] = \Yii::$app->urlManager->createAbsoluteUrl(['api/download-file', 'id' => $note['id_note']]);
            } else {
                $note['file_url'] = null;
            }
        }
        return [
            'status' => 'success',
            'notes' => $notes,
        ];
    }

    public function actionDownloadFile($id)
    {
        $note = Note::findOne($id);

        if ($note && file_exists($note->file_path)) {
            return \Yii::$app->response->sendFile($note->file_path);
        }

        throw new \yii\web\NotFoundHttpException('Файл не найден.');
    }

    public function actionDeleteProject()
    {
        $request = \Yii::$app->request;

        //$id_user = $request->post('id_user');

        $data = \Yii::$app->request->getRawBody(); // Получаем сырые данные JSON

        $parsedData = json_decode($data, true); // Парсим JSON

        $id_note = $parsedData['id_note'] ?? null;
        $id_user = $parsedData['id_user'] ?? null;

        \Yii::info([
            'id_note' => $id_note,
            'id_user' => $id_user,
        ], 'my / ' . __METHOD__);


        $note = Note::findOne(['id_note' => $id_note]);

        $note->delete();

        // удаляем данный из таблицы тэгов
        Tags::deleteAll('id_note = :id_note', [':id_note' => $id_note]);

        if (!empty($note['file_path'])) {
            unlink($note->file_path);
        }

        $notes = Note::find()
            ->where(['id_user' => $id_user])
            ->asArray()
            ->all();
        return [
            'status' => 'success',
            'notes' => $notes,
        ];

    }

    public function actionUpdateProject()
    {
        $request = \Yii::$app->request;

        //$id_user = $request->post('id_user');

        $data = \Yii::$app->request->getRawBody(); // Получаем сырые данные JSON

        $parsedData = json_decode($data, true); // Парсим JSON

        $id_note = $parsedData['id_note'] ?? null;
        $title = $parsedData['title'] ?? null;
        $body = $parsedData['body'] ?? null;
        $id_user = $parsedData['id_user'] ?? null;
        $tag = $parsedData['tag'] ?? null;


        \Yii::info([
            'id_note' => $id_note,
            'title' => $title,
            'body' => $body,
            'id_user' => $id_user,
            'tag' => $tag,
        ], 'my / ' . __METHOD__);


        $note = Note::findOne(['id_note' => $id_note]);
        $note->title = $title;
        $note->body = $body;
        $note->tag = $tag;

        $note->save();

        // Возвращаем результат в виде JSON
        $notes = Note::find()
            ->where(['id_user' => $id_user])
            ->asArray()
            ->all();
        return [
            'status' => 'success',
            'notes' => $notes,
        ];

    }
    public function actionAuthProject()
    {
        $request = \Yii::$app->request;
        $post = $request->post();

        \Yii::info([
            '$post' => $post,
        ], 'my / ' . __METHOD__);

        $name = $post['User']['name'] ?? null;
        $password = $post['User']['password'] ?? null;

        if (!$name || !$password) {
            return $this->asJson([
                'status' => 'error',
                'message' => 'Не указаны имя или пароль',
            ]);
        }

        $user = UserNote::findOne(['name' => $name, 'password' => $password]);

        if ($user) {
            return $this->asJson([
                'status' => 'success',
                'user_id' => $user->id_user,
            ]);
        } else {
            return $this->asJson([
                'status' => 'error',
                'message' => 'Неверное имя пользователя или пароль',
            ]);
        }
    }

    public function actionSearchProject()
    {
        $request = \Yii::$app->request;
        $post = $request->post();

        \Yii::info($post, 'debug / ' . __METHOD__);

        $id_user = $post['Note']['id_user'] ?? null;
        $title = $post['Note']['title'] ?? null;
        $body = $post['Note']['body'] ?? null;
        $tag = $post['Note']['tag'] ?? null;

        if ($id_user == null) {
            return [
                'status' => 'error',
                'message' => 'id_user is required',
            ];
        }

        \Yii::info([
            'id_user' => $id_user,
            'title' => $title,
            'body' => $body,
            'tag' => $tag,
        ], 'my / ' . __METHOD__);

        $query = Note::find()->where(['id_user' => $id_user]);

        if ($title) {
            $query->andWhere(['like', 'title', $title]);
        }

        if ($body) {
            $query->andWhere(['like', 'body', $body]);
        }

        if ($tag != "no tag") {
            $query->andWhere(['like', 'tag', $tag]);
        }

        $notes = $query->asArray()->all();

        return [
            'status' => 'success',
            'notes' => $notes,
        ];
    }



}
