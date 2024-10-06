<?php

namespace app\controllers;
use app\models\Note;
use app\models\UserNote;
use yii\web\Controller;
use yii\filters\VerbFilter;
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
        // $data = \Yii::$app->request->getRawBody(); // Получаем сырые данные JSON

        // $parsedData = json_decode($data, true); // Парсим JSON

        $post = $request->post();

        \Yii::info([
            '$post' => $post,
        ], 'my / ' . __METHOD__);


        $newNote = new Note();

        // $newProject->name = $post['name'];

        $loadOk = $newNote->load($post);

        $saveOk = $newNote->save();

        $saveErrors = $newNote->errors;

        return [
            // 'msg' => 'api create project ok',
            '$request' => $request,
            '$post' => $post,
            '$loadOk' => $loadOk,
            '$saveOk' => $saveOk,
            '$newProject' => $newNote,
            '$saveErrors' => $saveErrors,
        ];
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
        // $id_user = 1;
        $notes = Note::find()
            ->where(['id_user' => $id_user])
            ->asArray()
            ->all();

        // Возвращаем результат в виде JSON
        return [
            'status' => 'success',
            'notes' => $notes,
        ];

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

        \Yii::info([
            'id_note' => $id_note,
            'title' => $title,
            'body' => $body,
            'id_user' => $id_user,
        ], 'my / ' . __METHOD__);


        $note = Note::findOne(['id_note' => $id_note]);
        $note->title = $title;
        $note->body = $body;
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
}
