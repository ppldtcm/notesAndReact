<?php

use app\models\Note;
use yii\helpers\Html;
use yii\helpers\Url;
use yii\grid\ActionColumn;
use yii\grid\GridView;

/** @var yii\web\View $this */
/** @var app\models\NoteSearch $searchModel */
/** @var yii\data\ActiveDataProvider $dataProvider */

$this->title = 'Notes';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="note-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Create Note', ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            'id_note',
            'title',
            'body:ntext',
            'created_at',
            'id_user',
            //'tag',
            //'file_path',
            [
                'class' => ActionColumn::className(),
                'urlCreator' => function ($action, Note $model, $key, $index, $column) {
                    return Url::toRoute([$action, 'id_note' => $model->id_note]);
                 }
            ],
        ],
    ]); ?>


</div>
